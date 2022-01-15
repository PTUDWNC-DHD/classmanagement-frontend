import { useState } from 'react';
import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { GridColumnMenu, GridColumnMenuContainer } from '@mui/x-data-grid';

import { UploadButton } from '../components'

import { uploadStudentGrade, updateGradeStructure } from '../../services/classroomService';



const StyledGridColumnMenuContainer = styled(GridColumnMenuContainer)(
  ({ theme, ownerState }) => ({
    background: theme.palette[ownerState.color].main,
    color: theme.palette[ownerState.color].contrastText,
  })
);

const StyledGridColumnMenu = styled(GridColumnMenu)(
  ({ theme, ownerState }) => ({
    background: theme.palette[ownerState.color].main,
    color: theme.palette[ownerState.color].contrastText,
  })
);



const CustomColumnMenu = (
  { hideMenu, 
    currentColumn, 
    color, 
    callFetchToGetGrades, 
    currentUser, 
    classroomId,
    gradeStructure,
    isOwner, 
    isTeacher,
    ...other }
  ) => {
  const currentGradeId = currentColumn.field;
  // state for display
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const callFetchToUploadStudentGrade = async (token, classroomId, gradeId, file) => {
    setIsLoading(true);
    const result = await uploadStudentGrade(token, classroomId, gradeId, file)
    console.log('result grade upload: ', result)
    if (result.data)
      callFetchToGetGrades(token, classroomId)
    else if (result.error)
      setErrorMessage(result.error)
    setIsLoading(false);
  }

  const callFetchToFinalizeGrade = async (token, classroomId, gradeId, isFinalized) => {
    const newGradeStructure = [...gradeStructure];
    for (const grade of newGradeStructure) {
      if (grade._id === gradeId) {
        grade.isFinalized = isFinalized
        break;
      }
    }
    setIsLoading(true);
    const result = await updateGradeStructure(token, classroomId, newGradeStructure)
    console.log('result finalized: ', result)
    if (result.data)
      console.log('finalized successfully !')
    else if (result.error)
      setErrorMessage(result.error)
    setIsLoading(false);
  }
  

  const handleUploadGrade = (file) => {
    callFetchToUploadStudentGrade(currentUser.token, classroomId, currentGradeId, file)
  }

  const handleFinalize = () => {
    callFetchToFinalizeGrade(currentUser.token, classroomId, currentGradeId, true)
  }



  if (currentGradeId !== 'studentId' && currentGradeId !== 'name' && currentGradeId !== 'total')  {
    return (
      <StyledGridColumnMenuContainer
        hideMenu={hideMenu}
        currentColumn={currentColumn}
        ownerState={{ color }}
        {...other}
      >
        {isOwner && <Button variant="contained" sx={{backgroundColor: 'transparent', display: 'block'}} onClick={handleFinalize}>Finalize</Button>}
        {isTeacher && <UploadButton content="Upload grade" sx={{backgroundColor: 'transparent' }} handleFile={handleUploadGrade} />}
        <StyledGridColumnMenu
          hideMenu={hideMenu}
          currentColumn={currentColumn}
          ownerState={{ color }}
          {...other}
        />
      </StyledGridColumnMenuContainer>
    );
  }
  else {
    return (
      <StyledGridColumnMenu
        hideMenu={hideMenu}
        currentColumn={currentColumn}
        ownerState={{ color }}
        {...other}
      />
    );
  }
}


export default CustomColumnMenu