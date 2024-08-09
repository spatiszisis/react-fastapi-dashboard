import { createContext, ReactNode, useContext, useState } from "react";
import api from "../api";
import { useAlert } from "../hooks/useAlert";
import {
  NutritionProgram,
  NutritionProgramCreate,
  NutritionProgramUpdate,
} from "../models/NutritionProgram";

const PATH = "/nutrition_programs";

interface NutritionProgramContextType {
  nutritionPrograms: NutritionProgram[];
  nutritionProgram: NutritionProgram;
  getNutritionPrograms: () => void;
  readNutritionProgram: (nutritionProgramId: number) => void;
  createNutritionProgram: (NutritionProgram: NutritionProgramCreate) => void;
  updateNutritionProgram: (
    nutritionProgramId: number,
    nutritionProgram: NutritionProgramUpdate
  ) => void;
  deleteNutritionProgram: (nutritionProgramId: number) => void;
}

const NutritionProgramContext = createContext<
  NutritionProgramContextType | undefined
>(undefined);

export const useNutritionProgram = () => {
  const context = useContext(NutritionProgramContext);
  if (!context) {
    throw new Error(
      "useNutritionProgram must be used within a NutritionProgramProvider"
    );
  }
  return context;
};

interface NutritionProgramProviderProps {
  children: ReactNode;
}

export const NutritionProgramProvider = ({
  children,
}: NutritionProgramProviderProps) => {
  const [nutritionPrograms, setNutritionPrograms] = useState<
    NutritionProgram[]
  >([]);
  const [nutritionProgram, setNutritionProgram] = useState<NutritionProgram>(
    {} as NutritionProgram
  );
  const { setAlert } = useAlert();

  const getNutritionPrograms = async () => {
    try {
      const response = await api.get<NutritionProgram[]>(PATH);
      setNutritionPrograms(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const readNutritionProgram = (nutritionProgramId: number) => {
    return api
      .get<NutritionProgram>(`${PATH}/${nutritionProgramId}`)
      .then((response) => setNutritionProgram(response.data));
  };

  const createNutritionProgram = async (
    nutritionProgram: NutritionProgramCreate
  ) => {
    try {
      await api
        .post(PATH, nutritionProgram)
        .then((value: any) =>
          setAlert({
            type: "success",
            text: value.data.message,
          })
        )
        .catch((error: any) =>
          setAlert({
            type: "error",
            text: error.response.data.detail,
          })
        )
        .finally(() => getNutritionPrograms());
    } catch (error) {
      console.error(error);
    }
  };

  const updateNutritionProgram = async (
    nutritionProgramId: number,
    updatedNutritionProgram: NutritionProgramUpdate
  ) => {
    try {
      await api
        .put(`${PATH}/${nutritionProgramId}`, updatedNutritionProgram)
        .then((value: any) =>
          setAlert({
            type: "success",
            text: value.data.message,
          })
        )
        .catch((error: any) =>
          setAlert({
            type: "error",
            text: error.response.data.detail,
          })
        )
        .finally(() => getNutritionPrograms());
    } catch (error) {
      console.error(error);
    }
  };

  const deleteNutritionProgram = async (nutritionProgramId: number) => {
    try {
      await api
        .delete(`${PATH}/${nutritionProgramId}`)
        .then((value: any) =>
          setAlert({
            type: "success",
            text: value.data.message,
          })
        )
        .catch((error: any) =>
          setAlert({
            type: "error",
            text: error.response.data.detail,
          })
        )
        .finally(() => getNutritionPrograms());
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <NutritionProgramContext.Provider
      value={{
        nutritionPrograms,
        nutritionProgram,
        getNutritionPrograms,
        readNutritionProgram,
        createNutritionProgram,
        updateNutritionProgram,
        deleteNutritionProgram,
      }}
    >
      {children}
    </NutritionProgramContext.Provider>
  );
};
