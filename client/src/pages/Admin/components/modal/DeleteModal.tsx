import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import { deleteUser } from "../../contexts/user";
import ModalContext from "./modal.context";
import { useContext } from "react";

const DeleteModal = () => {
  const [modal, setModal] = useContext(ModalContext);

  if (!modal) {
    return null;
  }

  return (
    <Dialog
      open={modal.open}
      onClose={setModal(null)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Delete this user</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Do you really want to delete this user?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={setModal(null)}
          color="neutral"
          variant="contained"
          type="button"
        >
          Cancel
        </Button>
        <Button
          onClick={() => {
            setOpen(false);
            deleteUser();
          }}
          color="error"
          autoFocus
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteModal;
