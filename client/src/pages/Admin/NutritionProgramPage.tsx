import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AdminLayout from "../../components/AdminLayout";
import { useNutritionProgram } from "../../context/NutritionProgramContext";
import { NutritionProgram } from "../../models/NutritionProgram";

const NutritionProgramPage = () => {
  const { id } = useParams();
  const { readNutritionProgram } = useNutritionProgram();
  const [nutritionProgram, setNutritionProgram] = useState<NutritionProgram>();

  useEffect(() => {
    // setLoading(true);
    if (id) {
      const nutritionProgramId = parseInt(id);
      readNutritionProgram(nutritionProgramId).then(
        (nutritionProgramResult: NutritionProgram) => {
          setNutritionProgram(nutritionProgramResult);
          //   setLoading(false);
        }
      );
    }
  }, [id]);

  return (
    <AdminLayout
      title={`Nutrition Program - ${nutritionProgram?.title}`}
      subtitle="See details about the nutrition program"
    >
      NutritionProgramPage
    </AdminLayout>
  );
};

export default NutritionProgramPage;
