import * as Notifications from "../utils/notifications"

const fetchLogin = (usernameToFetch, passwordToFetch) => {
    return fetch(process.env.REACT_APP_API_URL + "/api/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username: usernameToFetch,
            password: passwordToFetch,
        }),
    })
        .then((res) => {
            //console.log('res: ', res)
            if (res.status === 401)
                return res.json().then((result) => {
                    //console.log('result: ', result)
                    return {
                        error: result.message || Notifications.LOGIN_FAILED,
                    }
                })
            if (res.status === 200) {
                return res.json().then((result) => {
                    //console.log('result: ', result)
                    return { data: result }
                })
            }
            return { error: Notifications.LOGIN_FAILED }
        })
        .catch((error) => {
            //console.log('error: ', error)
            return { error: error }
        })
}

const fetchRegister = (username, fullname, email, password) => {
    return fetch(process.env.REACT_APP_API_URL + "/api/user", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username: username,
            name: fullname,
            email: email,
            password: password,
        }),
    })
        .then((res) => {
            //console.log('res: ', res)
            if (res.ok)
                return res.json().then((result) => {
                    //console.log('result: ', result)
                    if (!result)
                        return { error: Notifications.API_RETURN_NULL_RESULT }
                    else if (result.errors) return { error: result.errors }
                    else return { data: result }
                })
            else return { error: Notifications.REGISTER_FAILED }
        })
        .catch((error) => {
            //console.log('error: ', error)
            return { error: error }
        })
}

const fetchActivateAccount = (email, code) => {
    return fetch(process.env.REACT_APP_API_URL + "/api/auth/active", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email,
            code,
        }),
    })
        .then((resJS) => {
            if (resJS.status === 200)
                return resJS.json().then((res) => {
                    return { data: res.result }
                })
            if (resJS.status === 400) {
                return resJS.json().then((res) => {
                    return { error: res.errors[0] }
                })
            }
            return { error: Notifications.ACTIVATE_FAILED }
        })
        .catch((error) => {
            //console.log('error: ', error)
            return { error: error }
        })
}

const fetchRequestActivateAccount = (email) => {
    return fetch(process.env.REACT_APP_API_URL + "/api/auth/requestactive", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email,
        }),
    })
        .then((resJS) => {
            if (resJS.status === 200)
                return resJS.json().then((res) => {
                    return { data: res.result }
                })
            if (resJS.status === 400) {
                return resJS.json().then((res) => {
                    return { error: res.errors[0] }
                })
            }
            return { error: Notifications.REQUEST_ACTIVATE_FAILED }
        })
        .catch((error) => {
            //console.log('error: ', error)
            return { error: error }
        })
}

const fetchForgotPassword = (email) => {
  return fetch(process.env.REACT_APP_API_URL + "/api/auth/forgotpassword", {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify({
          email,
      }),
  })
      .then((resJS) => {
          if (resJS.status === 200)
              return resJS.json().then((res) => {
                  return { result: res.result }
              })
          if (resJS.status === 400) {
              return resJS.json().then((res) => {
                  return { result: res.result, error: res.errors[0] }
              })
          }
          return { result: false, error: Notifications.REQUEST_RESET_PASSWORD_FAILED }
      })
      .catch((error) => {
          //console.log('error: ', error)
          return { result: false, error: error }
      })
}

const fetchCheckResetPasswordCode = (email, code) => {
  return fetch(process.env.REACT_APP_API_URL + "/api/auth/checkresetpasswordcode", {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify({
          email,
          code,
      }),
  })
      .then((resJS) => {
          if (resJS.status === 200)
              return resJS.json().then((res) => {
                  return { result: res.result, token: res.token }
              })
          if (resJS.status === 400) {
              return resJS.json().then((res) => {
                  return { result: res.result, error: res.errors[0] }
              })
          }
          return { result: false, error: Notifications.API_FAILED }
      })
      .catch((error) => {
          //console.log('error: ', error)
          return { result: false, error: error }
      })
}

const fetchResetPassword = (token, newPassword) => {
  return fetch(process.env.REACT_APP_API_URL + "/api/auth/resetpassword", {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify({
          token,
          password: newPassword,
      }),
  })
      .then((resJS) => {
          if (resJS.status === 200)
              return resJS.json().then((res) => {
                  return { result: res.result }
              })
          if (resJS.status === 400) {
              return resJS.json().then((res) => {
                  return { result: res.result, error: res.errors[0] }
              })
          }
          return { result: false, error: Notifications.RESET_PASSWORD_FAILED }
      })
      .catch((error) => {
          //console.log('error: ', error)
          return { result: false, error: error }
      })
}

export { 
  fetchLogin, 
  fetchRegister, 
  fetchActivateAccount,
  fetchRequestActivateAccount,
  fetchForgotPassword,
  fetchCheckResetPasswordCode,
  fetchResetPassword,
}
