import * as React from 'react';
import Box from '@mui/material/Box';
import { 
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
  gridClasses, 
} from '@mui/x-data-grid';


export default function GradeTable() {
  const columns = [
    { field: 'name', headerName: 'Name', width: 180, editable: true },
    { field: 'grade', headerName: 'Grade', type: 'number', editable: true },
    { field: 'grade1', headerName: 'Grade1', type: 'number', editable: true },
    { field: 'grade2', headerName: 'Grade2', type: 'number', editable: true },
    { field: 'grade3', headerName: 'Grade3', type: 'number', editable: true },
    { field: 'grade4', headerName: 'Grade', type: 'number', editable: true },
  ];
  
  
  const rows = [
    {
      id: 1,
      name: "Hieu",
      grade: 10,
      grade1: 5,
      grade2: 8,
      grade3: 9,
      grade4: 7,
    },
    {
      id: 2,
      name: "Duc",
      grade: 9,
      grade1: 8,
      grade2: 7,
      grade3: 9,
      grade4: 10,
    },
    {
      id: 3,
      name: "Danh",
      grade: 6,
      grade1: 10,
      grade2: 8,
      grade3: 9,
      grade4: 9,
    },
    {
      id: 4,
      name: "Dung",
      grade: 8,
      grade1: 9,
      grade2: 8,
      grade3: 9,
      grade4: 9,
    },
    {
      id: 5,
      name: "Bao",
      grade: 8,
      grade1: 8,
      grade2: 8,
      grade3: 6,
      grade4: 7,
    },
  ];
  
  return (
    <Box
      sx={{
        height: 2000,
        width: 1,
        '& .cold': {
          backgroundColor: '#b9d5ff91',
          color: '#1a3e72',
        },
        '& .hot': {
          backgroundColor: '#ff943975',
          color: '#1a3e72',
        },
      }}
    >
      <div style={{ height: 2000, width: '100%' }}>
        <DataGrid 
   
        rows={rows} 
        columns={columns} 
        getCellClassName={(params) => {
          if (params.field === 'name') {
            return '';
          }
          return params.value >= 7 ? 'hot' : 'cold';
        }}
        />
      </div>
    </Box>
  );
}

