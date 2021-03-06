import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import parse from 'html-react-parser'

function Dialogue(props) {
    const [open, setOpen] = React.useState(false);
    if (props.open && !open) {
        setOpen(true);
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        props.handleClose();

    };
  var contenu = ""
  var img = ""
  if (props.contenu) {
    contenu = props.contenu;
    console.log(typeof contenu)
    console.log(contenu)
  }
  if (props.img) {
    img = props.img;
    console.log(img)
  }

    return (
      <>
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
              maxWidth={"xl"}
              fullWidth={true}
            >
              <DialogTitle id="alert-dialog-title">{props.titre}</DialogTitle>
                <DialogContent>
                  {typeof props.img !== 'undefined' ? (<img src={props.img}/>) : ""}
                      {typeof contenu === 'object' ? contenu : parse(contenu)}
                </DialogContent>
                <DialogActions>
                  {/*<Button onClick={handleClose} color="primary" autoFocus>
                        <GiCancel/>
                    </Button>*/}
                </DialogActions>
            </Dialog>
      </>
    );

}

export default Dialogue
