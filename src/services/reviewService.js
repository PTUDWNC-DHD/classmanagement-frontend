import * as notifications from "../utils/notifications"

export const fetchGetReview = async (token, classId, structureId, studentId) => {
    return fetch(
        `${process.env.REACT_APP_API_URL}/api/review/${classId}/${structureId}/${studentId}`,
        {
            method: "GET",
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
            },
        }
    ).then((res) => {
        console.log("res: ", res)
        if (res.status === 200) {
            return res.json().then((result) => {
                console.log("result: ", result)
                return { data: result }
            })
        }
        if (res.status === 400) 
        {
            return res.json().then((result) => {
                console.log("error: ", result)
                return { error: result }
            })
        }
        throw notifications.API_FAILED
    }).catch((error) => {
        return { error: error }
    })
}

export const fetchGetReviewByGrade = async (token, classId, structureId) => {
    return fetch(
        `${process.env.REACT_APP_API_URL}/api/review/${classId}/${structureId}`,
        {
            method: "GET",
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
            },
        }
    ).then((res) => {
        console.log("res: ", res)
        if (res.status === 200) {
            return res.json().then((result) => {
                console.log("result: ", result)
                return { data: result }
            })
        }
        if (res.status === 400) 
        {
            return res.json().then((result) => {
                console.log("error: ", result)
                return { error: result }
            })
        }
        throw notifications.API_FAILED
    }).catch((error) => {
        return { error: error }
    })
}

export const fetchGetReviewByClass = async (token, classId) => {
    return fetch(
        `${process.env.REACT_APP_API_URL}/api/review/${classId}`,
        {
            method: "GET",
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
            },
        }
    ).then((res) => {
        console.log("res: ", res)
        if (res.status === 200) {
            return res.json().then((result) => {
                console.log("result: ", result)
                return { data: result }
            })
        }
        if (res.status === 400) 
        {
            return res.json().then((result) => {
                console.log("error: ", result)
                return { error: result }
            })
        }
        throw notifications.API_FAILED
    }).catch((error) => {
        return { error: error }
    })
}

export const fetchPostReview = async (token, classId, structureId, studentId, currentGrade, expectedGrade, message) => {
    return fetch(
        `${process.env.REACT_APP_API_URL}/api/review/${classId}/${structureId}/${studentId}`,
        {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + token,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                currentGrade,
                expectedGrade,
                message,
            })
        }
    ).then((res) => {
        console.log("res: ", res)
        if (res.status === 200) {
            return res.json().then((result) => {
                console.log("result: ", result)
                return { data: result }
            })
        }
        if (res.status === 400) 
        {
            return res.json().then((result) => {
                console.log("error: ", result)
                return { error: result }
            })
        }
        throw notifications.API_FAILED
    }).catch((error) => {
        return { error: error }
    })
}

export const fetchAddMessageToReview = async (token, classId, structureId, studentId, message) => {
    return fetch(
        `${process.env.REACT_APP_API_URL}/api/review/${classId}/${structureId}/${studentId}/sendmessage`,
        {
            method: "PATCH",
            headers: {
                "Authorization": "Bearer " + token,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                message,
            })
        }
    ).then((res) => {
        console.log("res: ", res)
        if (res.status === 200) {
            return res.json().then((result) => {
                console.log("result: ", result)
                return { data: result }
            })
        }
        if (res.status === 400) 
        {
            return res.json().then((result) => {
                console.log("error: ", result)
                return { error: result }
            })
        }
        throw notifications.API_FAILED
    }).catch((error) => {
        return { error: error }
    })
}

export const fetchUpdateGradeToReview = async (token, classId, structureId, studentId, newGrade) => {
    return fetch(
        `${process.env.REACT_APP_API_URL}/api/review/${classId}/${structureId}/${studentId}/updategrade`,
        {
            method: "PATCH",
            headers: {
                "Authorization": "Bearer " + token,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                grade: newGrade,
            })
        }
    ).then((res) => {
        console.log("res: ", res)
        if (res.status === 200) {
            return res.json().then((result) => {
                console.log("result: ", result)
                return { data: result }
            })
        }
        if (res.status === 400) 
        {
            return res.json().then((result) => {
                console.log("error: ", result)
                return { error: result }
            })
        }
        throw notifications.API_FAILED
    }).catch((error) => {
        return { error: error }
    })
}

export const fetchDeleteReview = async (token, classId, structureId, studentId) => {
    return fetch(
        `${process.env.REACT_APP_API_URL}/api/review/${classId}/${structureId}/${studentId}`,
        {
            method: "DELETE",
            headers: {
                "Authorization": "Bearer " + token,
                "Content-Type": "application/json",
            },
        }
    ).then((res) => {
        console.log("res: ", res)
        if (res.status === 200) {
            return res.json().then((result) => {
                console.log("result: ", result)
                return { data: result }
            })
        }
        if (res.status === 400) 
        {
            return res.json().then((result) => {
                console.log("error: ", result)
                return { error: result }
            })
        }
        throw notifications.API_FAILED
    }).catch((error) => {
        return { error: error }
    })
}
