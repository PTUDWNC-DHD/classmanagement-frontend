export const LOCAL_STORAGE_USER = "user_infor"

export const EMAIL_VALIDATE_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export const STUDENT_LIST_CSV_TEMPLATE = {
  headers: [
    { label: "studentId", key: "studentId" },
    { label: "name", key: "name" }
  ],
  data: [
    { studentId: "18120xxx", name: "Nguyễn Văn A"},
    { studentId: "18120xyz", name: "Nguyễn Văn B"}
  ]
}

export const STUDENT_GRADES_CSV_TEMPLATE = {
  headers: [
    { label: "studentId", key: "studentId" },
    { label: "score", key: "score" }
  ]
}

