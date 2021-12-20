import * as Notifications from '../utils/notifications'

// JOIN classroom
const joinClassroom = (token, joinCode, type) => {
  console.log('token, joincode, type: ', token, joinCode, type)
  return fetch(`${process.env.REACT_APP_API_URL}/api/join/${joinCode}/${type}`, {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer '+ token,
      'Content-Type': 'application/json'
    }
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
  joinClassroom
}