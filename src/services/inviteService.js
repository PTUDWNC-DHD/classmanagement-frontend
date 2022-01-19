import * as Notifications from '../utils/notifications'

// SEND invitation
const sendInvitation = (token, emails, classroomId, isPublic, isStudent) => {
  return fetch(process.env.REACT_APP_API_URL+'/api/invite/invite', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer '+ token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      to: emails,
      classId: classroomId,
      isPublic: isPublic,
      isStudent: isStudent
    })
  })
  .then(res => {
    console.log('res: ', res)
    if (res.ok) {
      return res.json().then((result) => {
        console.log('result: ', result)
        if (!result)
          return { error: Notifications.API_RETURN_NULL_RESULT}
        else if (result.errors)
          return { error: result.errors}
        else
          return { data: result }
      })
    } 
    else {
      return { error: Notifications.API_FAILED}
    }
  })
  .catch((error) => {
    //console.log('error: ', error)
    return { error: error}
  })
}

export {
  sendInvitation
}