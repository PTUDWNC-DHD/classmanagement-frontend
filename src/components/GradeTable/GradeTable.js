import React, { useState, useRef, useEffect, useContext } from 'react';

import { Box } from '@mui/material';

import {  DataGrid } from '@mui/x-data-grid';

import { DownloadButton, UploadButton } from '../components';
import { CustomColumnMenu } from './CustomColumnMenu';
import { getAllStudentGrades, saveStudentGrade, uploadStudentList } from '../../services/classroomService';
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


  // do once after render
  useEffect(()=>{
    // get data of headers and fields from grade structure
    const gradeName = [];
    const gradeField = [];
    classroom.gradeStructure.forEach((grade, index)=>{
      gradeName.push(grade.name)
      gradeField.push(grade._id)
    })
    gradeName.push('Total Grade')
    gradeField.push('total')
    setHeaders([...headers, ...gradeName])
    setFields([...fields, ...gradeField])
    // get grades of all students in class
    callFetchToGetGrades(currentUser.token, classroom._id)
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
      console.log('grades: ', grades)
      const rowsData = [];
      for (let [id, values] of Object.entries(grades)) {
        // calculate sum of each student grade
        const sum = Object.values(values).reduce((total, element) => {
          const elementNumber = parseFloat(element) || 0;
          return total + elementNumber
        }, 0)

        let row = { 
          id: id,
          studentId: id,
          ...values,
          total: sum
        }
        rowsData.push(row)
      }
      setRows(rowsData)
    }
  },[grades])

  const callFetchToGetGrades = async (token, classroomId) => {
    setIsLoading(true);
    const result = await getAllStudentGrades(token, classroomId)    
    if (result.data)
      setGrades(result.data)
    else if (result.error)
      setErrorMessage(result.error)
    setIsLoading(false);
  }

  const callFetchToSaveGrade = async (token, classroomId, studentId, gradeId, score) => {
    setIsLoading(true);
    const result = await saveStudentGrade(token, classroomId, studentId, gradeId, score)    
    if (result.error)
      setErrorMessage(result.error)
    setIsLoading(false);
  }

  const callFetchToUploadStudentList = async (token, classroomId, file) => {
    setIsLoading(true);
    const result = await uploadStudentList(token, classroomId, file);
    console.log('result student list upload: ', result)
    if (result.data)
      callFetchToGetGrades(token, classroomId)
    else if (result.error)
      setErrorMessage(result.error)
    setIsLoading(false);
  }

  const handleUploadStudentList = (file) => {
    callFetchToUploadStudentList(currentUser.token, classroom._id, file)
  }
  const handleUploadStudentGrades = (file) => {
    
  }

  const handleCellEditCommit = (params) => {
    callFetchToSaveGrade(currentUser.token, classroom._id, params.id, params.field, params.value)
    //update new grades
    const newGrades = {...grades}
    newGrades[params.id][params.field] = parseFloat(params.value)
    setGrades(newGrades)
  }



  

  return (
    <div style={{ width: '100%' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        {/* Download button */}
        <Box sx={{ display: 'flex', gap: 1 }}>
          {/* download button */}
          <DownloadButton 
            variant='outlined' 
            content='Student List'
            filename="StudentListTemplate.csv"
            headers={csvTemplate.STUDENT_LIST_CSV_TEMPLATE.headers}
            data={csvTemplate.STUDENT_LIST_CSV_TEMPLATE.data}
          />

          <DownloadButton 
            variant='outlined' 
            content='Student Grade'
            filename="StudentGradesTemplate.csv"
            headers={csvTemplate.STUDENT_GRADES_CSV_TEMPLATE.headers}
            data={csvTemplate.STUDENT_GRADES_CSV_TEMPLATE.data}
          />

        </Box>
        {/* Upload button */}
        <Box sx={{ display: 'flex', gap: 1 }}>
          <UploadButton 
            variant='contained' 
            content='Student List'
            handleFile={handleUploadStudentList}
          />

          <UploadButton 
            variant='contained' 
            content='Student Grade'
            handleFile={handleUploadStudentGrades}
          />
        </Box>
      </Box>
      <div style={{ height: 2500, width: '100%', marginTop: 16 }}>
        <DataGrid
          columns = {columns}
          rows={rows}
          onCellEditCommit={handleCellEditCommit}
          components={{
            ColumnMenu: CustomColumnMenu
          }}
          componentsProps={{
            columnMenu: { 
              color,
              callFetchToGetGrades: callFetchToGetGrades,
              currentUser: currentUser,
              classroomId: classroom._id
            },
            
          }}
        />
      </div>
    </div>
  );
}

export default GradeTable;