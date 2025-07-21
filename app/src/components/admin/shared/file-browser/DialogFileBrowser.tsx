"use client";

// ** react
import { Dispatch, SetStateAction } from "react";

// ** mui
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";

// ** components
import FileBrowser, {
  FileBrowserProps,
} from "@/components/admin/shared/file-browser";

type DialogFileBrowserProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  handleConfirmFunction: () => void;
} & FileBrowserProps;

const DialogFileBrowser = ({
  open,
  setOpen,
  handleConfirmFunction,
  ...props
}: DialogFileBrowserProps) => {
  const handleClose = () => {
    console.log("DialogFileBrowser handleClose called");
    setOpen(false);
  };

  const handleConfirm = () => {
    console.log("DialogFileBrowser handleConfirm called");
    handleConfirmFunction();
  };

  console.log("DialogFileBrowser render - open:", open);

  return (
    <Dialog fullWidth maxWidth={"xl"} open={open} onClose={handleClose}>
      <DialogTitle>Select Image</DialogTitle>
      <DialogContent>
        <DialogContentText>
          <FileBrowser {...props} />
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
        <Button onClick={handleConfirm} autoFocus>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogFileBrowser;
