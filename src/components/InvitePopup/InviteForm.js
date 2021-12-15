import React, { useState, useContext } from "react";

import { Button, DialogActions, TextField } from "@mui/material";

import AuthContext from "../../contexts/authContext";
import { sendInvitation } from "../../services/inviteService";
import * as Notifications from "../../utils/notifications"

import Swal from 'sweetalert2'



const InviteForm = (props) => {
  const { currentUser } = useContext(AuthContext);

  const [emailTo, setEmailTo] = useState('');
  const [invitationCode, setInvitationCode] = useState(props.invite)
  const { setShowInvitePopup } = props;

  const handleSendInvitation = async (e) => {
    e.preventDefault();
    const result = await sendInvitation(currentUser.token, [emailTo], invitationCode)
    if (result.data) {
      Swal.fire({
        title: "Success",
        text: Notifications.SEND_INVITATION_SUCCESSFULLY,
        icon: "success",
        button: "Close",
      })
    }
    else if (result.error) {
      Swal.fire({
        title: "Error",
        text: Notifications.SEND_INVITATION_FAILED,
        icon: "error",
        button: "Close",
      });
    }
    setShowInvitePopup(false)
  }

  return (
    <div className="form">
      <p className="class__title">Invitation Form</p>

      <div className="form__inputs">
        <TextField
          id="mail-to"
          label="Email to (required)"
          className="form__input"
          variant="filled"
          value={emailTo}
          onChange={(e) => setEmailTo(e.target.value)}
          required
        />
        <TextField
          id="mail-to"
          label="Email to (required)"
          className="form__input"
          variant="filled"
          type="email"
          value={invitationCode}
          onChange={(e) => setInvitationCode(e.target.value)}
          required
          disabled
        />
      </div>
      <DialogActions>
        <Button onClick={handleSendInvitation} color="primary">
          Send
        </Button>
      </DialogActions>
    </div>
  );
};

export default InviteForm;
