import React from 'react'
import { forwardRef } from 'react';
import MaterialTable from 'material-table'
import { Search,AddBox,ArrowDownward,Check,ChevronLeft,ChevronRight,Clear,DeleteOutline,Edit,FilterList,FirstPage,LastPage,Remove,SaveAlt,ViewColumn } from '@mui/icons-material'

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

export default function CellEditable() {
  const { useState } = React;

  const [columns, setColumns] = useState([
    { title: 'Name', field: 'name', cellStyle: {minWidth: 150} },
    { title: 'Grade', field: 'grade', cellStyle: {minWidth: 150}, initialEditValue: 'initial edit value' },
    { title: 'Grade1', field: 'grade1', cellStyle: {minWidth: 150}, initialEditValue: 'initial edit value' },
    { title: 'Grade2', field: 'grade2', cellStyle: {minWidth: 150}, initialEditValue: 'initial edit value' },
    { title: 'Grade3', field: 'grade3', cellStyle: {minWidth: 150}, initialEditValue: 'initial edit value' },
    { title: 'Grade4', field: 'grade4', cellStyle: {minWidth: 150}, initialEditValue: 'initial edit value' },

  ]);

  const [data, setData] = useState([
    { name: 'Hieu', grade: '10', grade1: '9', grade2: '9', grade3: '9', grade4: '9' },
    { name: 'Danh', grade: '10', grade1: '9', grade2: '9', grade3: '9', grade4: '9' },
    { name: 'Duc', grade: '10', grade1: '9', grade2: '9', grade3: '9', grade4: '9' },
  ]);

  return (
    <MaterialTable
      title="Cell Editable Preview"
      columns={columns}
      data={data}
      options={{
        exportButton:true,
      }}
      cellEditable={{
        onCellEditApproved: (newValue, oldValue, rowData, columnDef) => {
          return new Promise((resolve, reject) => {
            console.log('newValue: ' + newValue);
            setTimeout(resolve, 1000);
          });
        }
      }}
    />
  )
}
