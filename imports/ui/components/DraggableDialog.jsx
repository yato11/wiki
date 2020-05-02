import React, { useEffect } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Paper from "@material-ui/core/Paper";
import Draggable from "react-draggable";
import PropTypes from "prop-types";

function PaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

export default function DraggableDialog(props) {
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    setOpen(props.open);
  });

  const handleClose = () => {
    props.onClose(!open);
  };
  const handleAgree = () => {
    setOpen(false);
    props.onAggree();
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
          {props.title || ""}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>{props.message}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            No
          </Button>
          <Button onClick={handleAgree} color="secondary">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
DraggableDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onAggree: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
};
