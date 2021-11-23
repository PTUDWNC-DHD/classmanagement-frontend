import React, { useState, useContext } from "react";

import { Button, DialogActions, TextField } from "@mui/material";

import AuthContext from "../../context/AuthContext";



const InviteForm = (props) => {
  const { currentUser } = useContext(AuthContext);

  const [emailTo, setEmailTo] = useState('');
  const [invitationCode, setInvitationCode] = useState(props.invite)
  const { setShowInvitePopup } = props;

  const handleSendInvitation = (e) => {
    e.preventDefault();

    fetch(process.env.REACT_APP_API_URL+'/api/invite/invite', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer '+ currentUser.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        to: [emailTo],
        invitecode: invitationCode
      })
    })
    .then((res) => res.json())
    .then((result) => {
      if (result.errors) {
        window.alert(`Send invitation failed: ${result.errors[0]}`);
      } else {
        window.alert('Send invitation successfully !!!');
      }
      setShowInvitePopup(false)
    })
    .catch((error) => {
      setShowInvitePopup(false)
      console.log('Send invitation error: ', error)
    })
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
