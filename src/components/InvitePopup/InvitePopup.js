import React, { useState, useContext } from "react";

import { Button, Checkbox, Dialog, DialogActions, DialogContent } from "@mui/material";

import InviteForm from "./InviteForm";

import "./style.css";


const InvitePopup = (props) => {
  const { showInvitePopup, setShowInvitePopup } = props
  const [check, setChecked] = useState(false);
  const [showInviteForm, setShowInviteForm] = useState(false);
  return (
    <div>
      <Dialog
        onClose={() => setShowInvitePopup(false)}
        aria-labelledby="customized-dialog-title"
        open={showInvitePopup}
        maxWidth={showInviteForm ? "lg" : "xs"}
        className="form__dialog"
      >
        {showInviteForm ? (
          <InviteForm 
            invite={props.invite} 
            setShowInvitePopup={setShowInvitePopup}
          />
        ) : (
          <>
            <div className="class__title">
              Using Classroom at a school with students?
            </div>
            <DialogContent className="class__content">
              <p className="class__text">
                You will send an invitation link by email to invite someone to your class.
              </p>

              <div className="class__checkboxWrapper">
                <Checkbox color="primary" onChange={() => setChecked(!check)} />
                <p>
                  I've read and understand the above notice
                </p>
              </div>
            </DialogContent>
            <DialogActions>
              <Button autoFocus onClick={() => setShowInvitePopup(false)}>
                Close
              </Button>

              <Button
                autoFocus
                color="primary"
                disabled={!check}
                onClick={() => setShowInviteForm(true)}
              >
                Continue
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </div>
  );
};

export default InvitePopup;
