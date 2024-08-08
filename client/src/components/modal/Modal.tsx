import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useModal } from "../../hooks/useModal";

const DeleteModal = ({
  closeModal,
  content,
  submitAction,
}: {
  closeModal: any;
  content: any;
  submitAction: any;
}) => {
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
          color="secondary"
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
  const { modal, setModal } = useModal();

  if (!modal) {
    return null;
  }

  const handleCloseModal = () => {
    setModal(undefined);
  };

  return (
    <Dialog
      open={modal.open}
      onClose={() => setModal(undefined)}
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
