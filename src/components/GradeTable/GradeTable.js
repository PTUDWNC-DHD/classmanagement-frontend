import React, { useState, useRef, useEffect, useContext } from 'react';
import { CSVLink } from "react-csv";

import { Box, Button } from '@mui/material';
import { FileDownload, FileUpload } from '@mui/icons-material';
import {  DataGrid } from '@mui/x-data-grid';

import { CustomToolbar, CustomColumnMenuComponent } from './TableCustomComponent';
import { getAllStudentGrades } from '../../services/classroomService';
import AuthContext from '../../contexts/authContext';

import * as csvTemplate from '../../utils/csvTemplate'



const GradeTable = ({ classroom }) => {
  const { currentUser } = useContext(AuthContext)
  //state for data
  const [headers, setHeaders] = useState(['StudentID', 'Name']);
  const [fields, setFields] = useState(['studentId', 'name']);
  const [grades, setGrades] = useState(null);
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);

  // state for display
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [color, setColor] = useState('success');

  
  const fetchToGetGrades = async (token, classroomId) => {
    setIsLoading(true);
    const result = await getAllStudentGrades(token, classroomId)    
    if (result.data)
      setGrades(result.data)
    else if (result.error)
      setErrorMessage(result.error)
    setIsLoading(false);
  }

  // do once after render
  useEffect(()=>{
    // get data of headers and fields from grade structure
    const gradeName = [];
    const gradeField = [];
    classroom.gradeStructure.forEach((grade, index)=>{
      gradeName.push(grade.name)
      gradeField.push(grade._id)
    })
    setHeaders([...headers, ...gradeName])
    setFields([...fields, ...gradeField])

    // get grades of all students in class
    fetchToGetGrades(currentUser.token, classroom._id)
  },[])

  // map header names and fields to columns
  useEffect(()=>{
    const columnsData = [];
    for (let index = 0; index < headers.length; index++) {
      columnsData.push({ 
        field: fields[index],
        headerName: headers[index],
        width: 180,
        type: fields[index].indexOf('grade') > -1 ? 'number' : '',
        editable: true
      })
    }
    setColumns(columnsData)
  },[headers, fields])

  // map grade of students to rows
  useEffect(()=>{
    if (grades) {
      const gradeStructure = grades.gradeStructure;
      const allGrades = grades.grades;
      const allStudentIds = grades.studentIds;
      const rowsData = []
      console.log('grades: ', grades)
  
      for (let [id, grades] of Object.entries(allGrades)) {
        let row = { 
          id: id,
          studentId: id,
          name: 'N/A',
          ...grades
        }
        rowsData.push(row)
      }
      setRows(rowsData)
    }
  },[grades])

  

  const studentListDownloadRef = useRef(null);

  const handleDownloadStudentList = () => {
    studentListDownloadRef.current.link.click();
  }
  const handleDownloadStudentGrades = () => {
    
  }
  const handleUploadStudentList = () => {
    
  }
  const handleUploadStudentGrades = () => {
    
  }

  

  return (
    <div style={{ width: '100%' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', gap: 1 }}>
          {/* download button */}
          <Button variant="outlined" endIcon={<FileDownload />} onClick={handleDownloadStudentList}>
            Student List
          </Button>
          <CSVLink
            headers={csvTemplate.STUDENT_LIST_CSV_TEMPLATE.headers}
            filename="StudentListTemplate.csv"
            data={csvTemplate.STUDENT_LIST_CSV_TEMPLATE.data}
            ref={studentListDownloadRef}
          />

          <Button variant="outlined" endIcon={<FileDownload />} onClick={handleDownloadStudentGrades}>
            Student Grade
          </Button>
        </Box>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button variant="contained" startIcon={<FileUpload />} onClick={handleUploadStudentList}>
            Student List
          </Button>
          <Button variant="contained" startIcon={<FileUpload />} onClick={handleUploadStudentGrades}>
            Student Grade
          </Button>
        </Box>
      </Box>
      <div style={{ height: 2500, width: '100%', marginTop: 16 }}>
        <DataGrid
          columns = {columns}
          rows={rows}
          components={{
            ColumnMenu: CustomColumnMenuComponent,
            Toolbar: CustomToolbar,
          }}
          componentsProps={{
            columnMenu: { color },
          }}
        />
      </div>
    </div>
  );
}

export default GradeTable;