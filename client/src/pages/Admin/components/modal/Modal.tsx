import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useContext } from "react";
import ModalContext from "./modal.context";

const DeleteModal = ({ closeModal, content, submitAction }) => {
  return (
    <>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {content}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => closeModal()}
          color="neutral"
          variant="contained"
          type="button"
        >
          Cancel
        </Button>
        <Button onClick={() => submitAction()} color="error" autoFocus>
          Delete
        </Button>
      </DialogActions>
    </>
  );
};

const Modal = () => {
  const [modal, setModal] = useContext(ModalContext);

  if (!modal) {
    return null;
  }

  const handleCloseModal = () => {
    setModal(null);
  };

  return (
    <Dialog
      open={modal.open}
      onClose={() => setModal(null)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{modal.title}</DialogTitle>
      {modal.type === "delete" ? (
        <DeleteModal
          closeModal={handleCloseModal}
          content={modal.content}
          submitAction={modal.submitAction}
        />
      ) : (
        modal.children
      )}
    </Dialog>
  );
};

export default Modal;
