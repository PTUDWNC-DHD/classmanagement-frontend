import * as Notifications from '../utils/notifications'


// GET user detail
const getUserDetail = (token, userId) => {
  return fetch(process.env.REACT_APP_API_URL + '/api/user/' + userId, { 
    method: 'GET',
    headers: {
      'Authorization': 'Bearer '+ token,
      'Content-Type': 'application/json'
    }
  })
  .then(res => {
    //console.log('res: ', res)
    if (res.ok) {
      return res.json().then((result) => {
        //console.log('result: ', result)
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

//PATCH to update user account information
const updateUserAccountInformation = (token, fullname, email) => {
  return fetch(process.env.REACT_APP_API_URL + '/api/user/me', { 
    method: 'PATCH',
    headers: {
      'Authorization': 'Bearer '+ token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: fullname,
      email: email,
    })
  })
  .then(res => {
    //console.log('res: ', res)
    if (res.ok) {
      return res.json().then((result) => {
        //console.log('result: ', result)
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
  getUserDetail,
  updateUserAccountInformation
}