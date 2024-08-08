import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Box, Button, useTheme } from "@mui/material";
import { DataGrid, GridActionsCellItem, GridColDef } from "@mui/x-data-grid";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import NutritionProgramModal from "../../components/modal/NutritionProgramModal";
import { useNutritionProgram } from "../../context/NutritionProgramContext";
import { useUsers } from "../../context/UsersContext";
import { useModal } from "../../hooks/useModal";
import { tokens } from "../../theme";

const NutritionPrograms = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { nutritionPrograms, deleteNutritionProgram } = useNutritionProgram();
  const { users } = useUsers();
  const { setModal } = useModal();
  const navigate = useNavigate();

  const columns = useMemo<GridColDef[]>(
    () => [
      { field: "id", headerName: "ID", flex: 0.5 },
      {
        field: "title",
        headerName: "Text",
        flex: 1,
      },
      {
        field: "notes",
        headerName: "Notes",
        flex: 1,
      },
      {
        field: "date",
        headerName: "Dates",
        flex: 1,
        valueGetter: (_value, row) =>
          `${new Date(row.start_date).toLocaleDateString()} - ${new Date(
            row.end_date
          ).toLocaleDateString()}`,
      },
      {
        field: "user_id",
        headerName: "Customer",
        flex: 1,
        valueGetter: (_value, row) => {
          const user = users.find((user) => user.id === row.user_id);
          return user ? `${user.first_name} ${user.last_name}` : "-";
        },
      },
      {
        field: "actions",
        type: "actions",
        headerName: "Actions",
        width: 100,
        cellClassName: "actions",
        getActions: (params: any) => [
          <GridActionsCellItem
            label="Edit"
            showInMenu
            icon={<EditIcon />}
            onClick={() =>
              setModal({
                open: true,
                type: "edit",
                title: "Edit this Nutrition Program",
                children: (
                  <NutritionProgramModal nutritionProgram={params.row} />
                ),
              })
            }
          />,
          <GridActionsCellItem
            label="Delete"
            showInMenu
            icon={<DeleteIcon />}
            onClick={() =>
              setModal({
                open: true,
                type: "delete",
                title: "Delete this Nutrition Program",
                content: "Do you really want to delete this nutrition program?",
                submitAction: () => {
                  deleteNutritionProgram(params.row.id);
                  setModal(undefined);
                },
              })
            }
          />,
        ],
      },
    ],
    []
  );

  const handleRowClick = (row: any) => {
    navigate(`/admin/nutrition-program/${row.id}`);
  };

  return (
    <Box m="20px">
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb="25px"
      >
        <Header
          title="Nutrition Programs"
          subtitle="List of nutrition programs"
        />

        <Button
          type="button"
          onClick={() =>
            setModal({
              type: "add",
              open: true,
              title: "Create new user",
              children: <NutritionProgramModal nutritionProgram={null} />,
            })
          }
          color="secondary"
          variant="contained"
        >
          Add new Nutrition Program
        </Button>
      </Box>

      <Box
        m="10px 0 0 0"
        height="75vh"
        sx={{
          width: "100%",
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          rows={nutritionPrograms}
          columns={columns}
          onRowClick={handleRowClick}
        />
      </Box>
    </Box>
  );
};

export default NutritionPrograms;
