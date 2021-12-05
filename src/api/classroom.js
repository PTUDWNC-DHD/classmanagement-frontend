
//get all classrooms that user joined
const fetchAllClassrooms = (token, setIsLoading, setError) => {
  setIsLoading(true);
  fetch(process.env.REACT_APP_API_URL + '/api/user/me/classes', { 
    method: 'GET',
    headers: {
      'Authorization': 'Bearer '+ token,
      'Content-Type': 'application/json'
    }
  })
  .then((res)=>{
    if (res.status === 401) {
      setError(res.statusText)
      setIsLoading(false);
      //console.log('res status text: ', res.statusText)
    } 
    else {
      res.json()
      .then((result) => {
        //console.log('result: ', result)
        setIsLoading(false);
        return result
      })
    }
  })
  .catch((error) => {
    //console.log('error: ', error)
    setError(error);
    setIsLoading(false);
  })
}

//get detail of a classroom
const fetchClassroomDetail = (token, classroomId, setIsLoading, setError) => {
  setIsLoading(true);
  fetch(process.env.REACT_APP_API_URL + '/api/class/' + classroomId, { 
    method: 'GET',
    headers: {
      'Authorization': 'Bearer '+ token,
      'Content-Type': 'application/json'
    }
  })
  .then(res => res.json())
  .then((result) => {
    setIsLoading(false);
    return result
  })
  .catch((error) => {
    setError(error);
    setIsLoading(false);
  })
}

export {
  fetchAllClassrooms,
  fetchClassroomDetail
}