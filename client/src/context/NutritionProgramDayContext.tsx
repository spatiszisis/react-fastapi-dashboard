import { createContext, ReactNode, useContext, useState } from "react";
import api from "../api";
import { useAlert } from "../hooks/useAlert";
import {
  NutritionProgramDay,
  NutritionProgramDayCreate,
  NutritionProgramDayUpdate,
} from "../models/NutritionProgramDay";

interface NutritionProgramDayContextType {
  nutritionProgramDays: NutritionProgramDay[];
  getNutritionProgramDays: () => void;
  readNutritionProgramDay: (
    nutritionProgramDayId: number
  ) => Promise<NutritionProgramDay | undefined>;
  createNutritionProgramDay: (
    nutritionProgramDay: NutritionProgramDayCreate
  ) => void;
  updateNutritionProgramDay: (
    nutritionProgramDayId: number,
    nutritionProgramDay: NutritionProgramDayUpdate
  ) => void;
  deleteNutritionProgramDay: (nutritionProgramDayId: number) => void;
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

  const getNutritionProgramDays = async () => {
    try {
      const response = await api.get<NutritionProgramDay[]>(
        "/nutrition_program_days"
      );
      setNutritionProgramDays(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const readNutritionProgramDay = (nutritionProgramDayId: number) => {
    return api
      .get<NutritionProgramDay>(
        `/nutrition_program_days/${nutritionProgramDayId}`
      )
      .then((response) => response.data);
  };

  const createNutritionProgramDay = async (
    nutritionProgramDay: NutritionProgramDayCreate
  ) => {
    try {
      await api
        .post(`/nutrition_program_days`, nutritionProgramDay)
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
        .finally(() => getNutritionProgramDays());
    } catch (error) {
      console.error(error);
    }
  };

  const updateNutritionProgramDay = async (
    nutritionProgramDayId: number,
    updatedNutritionProgramDay: NutritionProgramDayUpdate
  ) => {
    try {
      await api
        .put(
          `/nutrition_program_days/${nutritionProgramDayId}`,
          updatedNutritionProgramDay
        )
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
        .finally(() => getNutritionProgramDays());
    } catch (error) {
      console.error(error);
    }
  };

  const deleteNutritionProgramDay = async (nutritionProgramDayId: number) => {
    try {
      await api
        .delete(`/nutrition_program_days/${nutritionProgramDayId}`)
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
        .finally(() => getNutritionProgramDays());
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
