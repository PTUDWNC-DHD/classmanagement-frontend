import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import Swal from 'sweetalert2'

import { Box } from '@mui/material';
import {  DataGrid } from '@mui/x-data-grid';

import { DownloadButton, UploadButton } from '../components';

import CustomColumnMenu from './CustomColumnMenu';
import CustomLoadingOverlay from './CustomLoadingOverlay';
import CustomNoRowsOverlay from './CustomNoRowsOverLay';

import { getAllStudentGrades, saveStudentGrade, uploadStudentList } from '../../services/classroomService';

import * as Constant from '../../utils/constant'



const GradeTable = ({ currentUser, isOwner, isTeacher, classroomId, gradeStructure, studentList }) => {
  //state for data
  const [grades, setGrades] = useState(null);
  const [totalWeight, setTotalWeight] = useState(0);
  const [gradesWeight, setGradesWeight] = useState({});
  
  //state for export csv file
  const [studentIdList, setStudentIdList] = useState([]);
  const [gradeBoardHeader , setGradeBoardHeader] = useState([]);

  //state for table
  const [headers, setHeaders] = useState(['ID', 'StudentID', 'Name']);
  const [fields, setFields] = useState(['index', 'studentId', 'name']);
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);

  // state for display
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [color, setColor] = useState('success');


  // do once after render
  useEffect(()=>{
    //console.log('start effect')
    const gradeNames = [];
    const gradeFields = [];
    const newGradesWeight = {};
    let sum = 0;
    gradeStructure.forEach((grade)=>{
      if (isTeacher || grade.isFinalized){
        gradeNames.push(grade.name)
        gradeFields.push(grade._id)
        sum += grade.weight
        newGradesWeight[grade._id] = grade.weight
      }
    })
    //add total grade column header
    gradeNames.push('Total Grade')
    gradeFields.push('total')
    setHeaders([...headers, ...gradeNames])
    setFields([...fields, ...gradeFields])
    setTotalWeight(sum)
    setGradesWeight(newGradesWeight)
  },[])

  // map header names and fields to columns
  useEffect(()=>{
    //console.log('column effect')
    const columnsData = [];
    const csvGradeBoardHeader = [];
    for (let index = 0; index < headers.length; index++) {
      const column = { 
        field: fields[index],
        headerName: headers[index],
        width: 180,
        type: fields[index].indexOf('grade') > -1 ? 'number' : '',
        editable: (fields[index] === 'studentId' || fields[index] === 'name' || fields[index] === 'total') ? false : isTeacher
      }
      if (fields[index] === 'name') {
        column.renderCell = (params) => {
          if (params.row.userId)
            return <Link to={`/users/${params.row.userId}`}>{params.value}</Link>
          else 
            return params.value
        }
      }
      columnsData.push(column)
      csvGradeBoardHeader.push({
        label: headers[index],
        key: fields[index]
      })
    }
    //console.log('columns data: ', columnsData)
    setColumns(columnsData)
    setGradeBoardHeader(csvGradeBoardHeader)
  },[headers, fields, isTeacher])

  // run when columns has been updated
  useEffect(()=>{
    // get grades of all students in class
    callFetchToGetGrades(currentUser.token, classroomId)
  },[columns, currentUser, classroomId])

  // run when grades has been fetch and all data is ready to calculate
  useEffect(()=>{
    //console.log('grades effect')
    
    if (grades) {
      const getUserIdAccount = (studentId) => {
        for (let student of studentList) {
          if (student.studentId === studentId)
            return student._id
        }
        return null;
      }
      
      const rowsData = [];
      const newStudentIdList = [];
      for (let [studentId, studentValues] of Object.entries(grades)) {
        let totalGrade = 0;
        // calculate sum of each student grade
        for (let [gradeId, gradeValue] of Object.entries(studentValues)) {
          let weight = 1;
          if (gradeId !== 'name') {
            let grade = 0;
            // check if the grade is finalized
            if (fields.find(field => field === gradeId)) {
              grade = parseFloat(gradeValue) || 0;
              weight = gradesWeight[gradeId] / totalWeight;
            }
            totalGrade += grade * weight;
          }
        }
        // init row of table
        const row = { 
          index: rowsData.length + 1,
          id: studentId,
          studentId: studentId,
          ...studentValues,
          total: totalGrade.toFixed(4)
        }
        const userId = getUserIdAccount(studentId)
        if (userId){
          row.userId = userId;
        }
        rowsData.push(row)
        newStudentIdList.push({studentId: studentId})
      }
      setRows(rowsData)
      setStudentIdList(newStudentIdList)
    }
  },[grades, fields, gradesWeight, totalWeight, studentList])

  // run when error happen 
  useEffect(()=>{
    if (errorMessage){
      Swal.fire({
        title: "Error happen",
        text: errorMessage,
        icon: "error",
        button: "Close",
      })
    }
  },[errorMessage])

  // call fetch
  const callFetchToGetGrades = async (token, classroomId) => {
    //console.log('call get grade')
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
    console.log('save result: ', studentId)   
    if (result.error)
      setErrorMessage(result.error)
    setIsLoading(false);
  }

  const callFetchToUploadStudentList = async (token, classroomId, file) => {
    setIsLoading(true);
    const result = await uploadStudentList(token, classroomId, file);
    //console.log('result student list upload: ', result)
    if (result.data)
      callFetchToGetGrades(token, classroomId)
    else if (result.error)
      setErrorMessage(result.error)
    setIsLoading(false);
  }
  


  // handle upload
  const handleUploadStudentList = (file) => {
    callFetchToUploadStudentList(currentUser.token, classroomId, file)
  }

  const handleCellEditCommit = (params) => {
    console.log('params: ', params)
    console.log('debug: ', rows)
    callFetchToSaveGrade(currentUser.token, classroomId, params.id, params.field, params.value)
    //update new grades
    const newGrades = {...grades}
    const studentIdToUpdate = getStudentId(params.id)
    if (studentIdToUpdate)
      newGrades[studentIdToUpdate][params.field] = parseFloat(params.value)
    setGrades(newGrades)
  }

  const getStudentId = (rowId) => {
    for (let row of rows) {
      if (row.id === rowId)
        return row.studentId;
    }
    return null;
  }

  return (
    <div style={{ width: '100%' }}>
      {isTeacher && (
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          {/* Download button */}
          <Box sx={{ display: 'flex', gap: 1 }}>
            {/* download button */}
            <DownloadButton 
              variant='outlined' 
              content='Student List Template'
              filename="StudentListTemplate.csv"
              headers={Constant.STUDENT_LIST_CSV_TEMPLATE.headers}
              data={Constant.STUDENT_LIST_CSV_TEMPLATE.data}
            />

            <DownloadButton 
              variant='outlined' 
              content='Student Grade Template'
              filename="StudentGradesTemplate.csv"
              headers={Constant.STUDENT_GRADES_CSV_TEMPLATE.headers}
              data={studentIdList}
            />

            <DownloadButton 
              variant='outlined' 
              content='Export Grade Board'
              filename="StudentGradeBoard.csv"
              headers={gradeBoardHeader}
              data={rows}
            />

          </Box>
          {/* Upload button */}
          <Box sx={{ display: 'flex', gap: 1 }}>
            <UploadButton 
              variant='contained' 
              content='Upload Student List'
              handleFile={handleUploadStudentList}
            />
          </Box>
        </Box>
      )}
      
      <div style={{ height: 2500, width: '100%', marginTop: 16 }}>
        <DataGrid
          columns = {columns}
          rows={rows}
          onCellEditCommit={handleCellEditCommit}
          components={{
            ColumnMenu: CustomColumnMenu,
            LoadingOverlay: CustomLoadingOverlay,
            NoRowsOverlay: CustomNoRowsOverlay
          }}
          loading={isLoading}
          componentsProps={{
            columnMenu: { 
              color,
              callFetchToGetGrades: callFetchToGetGrades,
              currentUser: currentUser,
              classroomId: classroomId,
              gradeStructure: gradeStructure,
              isOwner: isOwner,
              isTeacher: isTeacher
            },
            
          }}
        />
      </div>
    </div>
  );
}

export default GradeTable;