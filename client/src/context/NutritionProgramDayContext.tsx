import { createContext, ReactNode, useContext, useState } from "react";
import api from "../api";
import { useAlert } from "../hooks/useAlert";
import {
  NutritionProgramDay,
  NutritionProgramDayCreate,
  NutritionProgramDayUpdate,
} from "../models/NutritionProgramDay";
import { useNutritionProgram } from "./NutritionProgramContext";

const PATH = "/nutrition_program_days";

interface NutritionProgramDayContextType {
  nutritionProgramDays: NutritionProgramDay[];
  getNutritionProgramDays: () => void;
  readNutritionProgramDay: (
    nutritionProgramDayId: number
  ) => Promise<NutritionProgramDay>;
  createNutritionProgramDay: (
    nutritionProgramDay: NutritionProgramDayCreate,
    nutritionProgramId: number
  ) => void;
  updateNutritionProgramDay: (
    nutritionProgramDayId: number,
    nutritionProgramDay: NutritionProgramDayUpdate,
    nutritionProgramId: number
  ) => void;
  deleteNutritionProgramDay: (
    nutritionProgramDayId: number,
    nutritionProgramId: number
  ) => void;
}

const NutritionProgramDayContext = createContext<
  NutritionProgramDayContextType | undefined
>(undefined);

export const useNutritionProgramDay = () => {
  const context = useContext(NutritionProgramDayContext);
  if (!context) {
    throw new Error(
      "useNutritionProgramDay must be used within a NutritionProgramDayProvider"
    );
  }
  return context;
};

interface NutritionProgramDayProviderProps {
  children: ReactNode;
}

export const NutritionProgramDayProvider = ({
  children,
}: NutritionProgramDayProviderProps) => {
  const [nutritionProgramDays, setNutritionProgramDays] = useState<
    NutritionProgramDay[]
  >([]);
  const { setAlert } = useAlert();
  const { readNutritionProgram } = useNutritionProgram();

  const getNutritionProgramDays = async () => {
    try {
      const response = await api.get<NutritionProgramDay[]>(PATH);
      setNutritionProgramDays(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const readNutritionProgramDay = (nutritionProgramDayId: number) => {
    return api
      .get<NutritionProgramDay>(`${PATH}/${nutritionProgramDayId}`)
      .then((response) => response.data);
  };

  const createNutritionProgramDay = async (
    nutritionProgramDay: NutritionProgramDayCreate,
    nutritionProgramId: number
  ) => {
    try {
      await api
        .post(PATH, nutritionProgramDay)
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
        .finally(() => readNutritionProgram(nutritionProgramId));
    } catch (error) {
      console.error(error);
    }
  };

  const updateNutritionProgramDay = async (
    nutritionProgramDayId: number,
    updatedNutritionProgramDay: NutritionProgramDayUpdate,
    nutritionProgramId: number
  ) => {
    try {
      await api
        .put(`${PATH}/${nutritionProgramDayId}`, updatedNutritionProgramDay)
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
        .finally(() => readNutritionProgram(nutritionProgramId));
    } catch (error) {
      console.error(error);
    }
  };

  const deleteNutritionProgramDay = async (
    nutritionProgramDayId: number,
    nutritionProgramId: number
  ) => {
    try {
      await api
        .delete(`${PATH}/${nutritionProgramDayId}`)
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
        .finally(() => readNutritionProgram(nutritionProgramId));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <NutritionProgramDayContext.Provider
      value={{
        nutritionProgramDays,
        getNutritionProgramDays,
        readNutritionProgramDay,
        createNutritionProgramDay,
        updateNutritionProgramDay,
        deleteNutritionProgramDay,
      }}
    >
      {children}
    </NutritionProgramDayContext.Provider>
  );
};
