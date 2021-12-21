import { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Button } from '@mui/material';
import { UploadButton } from '../components'
import { uploadStudentGrade } from '../../services/classroomService';
import { GridColumnMenu, GridColumnMenuContainer } from '@mui/x-data-grid';


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



const CustomColumnMenu = ({ hideMenu, currentColumn, color, callFetchToGetGrades, currentUser, classroomId, ...other }) => {
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

  const handleUploadGrade = (file) => {
    callFetchToUploadStudentGrade(currentUser.token, classroomId, currentGradeId, file)
  }



  if (currentGradeId !== 'studentId' && currentGradeId !== 'name' && currentGradeId !== 'total')  {
    return (
      <StyledGridColumnMenuContainer
        hideMenu={hideMenu}
        currentColumn={currentColumn}
        ownerState={{ color }}
        {...other}
      >
        <UploadButton content="Upload grade" handleFile={handleUploadGrade} />
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


export {
  CustomColumnMenu
}