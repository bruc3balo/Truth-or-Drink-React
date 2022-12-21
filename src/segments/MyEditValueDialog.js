import {useRef, useState} from "react";
import Dialog from '@mui/material/Dialog';
import {DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";


const MyEditValueDialog = ({open, closeDialog, title, message, hint, onChangeFunction, okText, okFunction}) => {

    const fieldRef = useRef()
    const handleClose = () => {
        closeDialog()
    };

    return(
        <div>
            <Dialog PaperProps={{
                style: {
                    backgroundColor: 'transparent',
                    boxShadow: 'none',
                }
            }} open={open} onClose={handleClose} fullWidth={true}>
                <div className="center-column" style={{backgroundColor: "white"}}>
                    {title && <DialogTitle>{title}</DialogTitle>}
                    <DialogContent>
                        {message && <DialogContentText>{message}</DialogContentText>}
                    </DialogContent>

                    <input className="field" onChange={() => {
                        if(onChangeFunction) onChangeFunction();
                    }} ref={fieldRef} placeholder={hint ?? "Enter details"} />
                    <div style={{margin: 20}}/>

                    <DialogActions>
                        <div className="inner-parent">
                            <div className="center-column">
                                <button className="rounded_button" onClick={() => {
                                    if(okFunction) okFunction(fieldRef.current.value);
                                    else console.error("No ok click function")
                                }}>{okText ?? "Accept"}</button>
                                <button className="rounded_button" onClick={handleClose}>Cancel</button>
                            </div>
                        </div>
                    </DialogActions>
                </div>
            </Dialog>
        </div>
    )
}

export default MyEditValueDialog;