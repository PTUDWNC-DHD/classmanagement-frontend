import * as Notifications from '../utils/notifications'

// GET all classrooms that user joined
const getAllClassrooms = (token) => {
  return fetch(process.env.REACT_APP_API_URL + '/api/user/me/classes', { 
    method: 'GET',
    headers: {
      'Authorization': 'Bearer '+ token,
      'Content-Type': 'application/json'
    }
  })
  .then((res)=>{
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

// GET detail of a classroom
const getClassroomDetail = (token, classroomId) => {
  return fetch(process.env.REACT_APP_API_URL + '/api/class/' + classroomId, { 
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

// CREATE new classroom
const createClassroom = (token, classroom) => {
  return fetch(process.env.REACT_APP_API_URL+'/api/class', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer '+ token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: classroom.name,
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

// UPDATE grade structure of classroom
const updateGradeStructure = (token, classroomId, grades) => {
  return fetch(process.env.REACT_APP_API_URL + '/api/class/' + classroomId, { 
    method: 'PATCH',
    headers: {
      'Authorization': 'Bearer '+ token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      gradeStructure: grades
    })
  })
  .then(res => {
    //console.log('res: ', res)
    if (res.ok) {
      return res.json().then((result) => {
        //console.log('result: ', result)
        if (!result || !result.gradeStructure)
          return { error: Notifications.API_RETURN_NULL_RESULT}
        else if (result.errors)
          return { error: result.errors}
        else
          return { data: result.gradeStructure }
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

// GET all classroom member (teachers and students)
const getAllClassroomMembers = (token, classroomId) => {
  return fetch(process.env.REACT_APP_API_URL + '/api/class/' + classroomId + '/users', { 
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

export {
  getAllClassrooms,
  getClassroomDetail,
  getAllClassroomMembers,
  createClassroom,
  updateGradeStructure
}