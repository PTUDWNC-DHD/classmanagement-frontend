import * as React from 'react';
import PropTypes from 'prop-types';

import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import {
  GridColumnMenu,
  GridColumnMenuContainer,
  GridFilterMenuItem,
  SortGridMenuItems,
  useGridApiRef,
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
  gridClasses,
} from '@mui/x-data-grid';

function CustomToolbar() {
  return (
    <GridToolbarContainer className={gridClasses.toolbarContainer}>
      <GridToolbarExport csvOptions={{ fields: ['name','mssv'] }} />
    </GridToolbarContainer>
  );
}

const StyledGridColumnMenuContainer = styled(GridColumnMenuContainer)(
  ({ theme, ownerState }) => ({
    background: theme.palette[ownerState.color].main,
    color: theme.palette[ownerState.color].contrastText,
  }),
);

const StyledGridColumnMenu = styled(GridColumnMenu)(({ theme, ownerState }) => ({
  background: theme.palette[ownerState.color].main,
  color: theme.palette[ownerState.color].contrastText,
}));

function CustomColumnMenuComponent(props) {
  const { hideMenu, currentColumn, color, ...other } = props;

  if (currentColumn.field === 'grade'||'grade1'||'grade2'||'grade3'||'grade4') {
    return (
      <StyledGridColumnMenuContainer
        hideMenu={hideMenu}
        currentColumn={currentColumn}
        ownerState={{ color }}
        {...other}
      >
        <SortGridMenuItems onClick={hideMenu} column={currentColumn} />
        <GridFilterMenuItem onClick={hideMenu} column={currentColumn} />
        <Checkbox />
      </StyledGridColumnMenuContainer>
    );
  }
  
  return (
    <StyledGridColumnMenu
      hideMenu={hideMenu}
      currentColumn={currentColumn}
      ownerState={{ color }}
      {...other}
    />
  );
}

CustomColumnMenuComponent.propTypes = {
  color: PropTypes.string.isRequired,
  currentColumn: PropTypes.object.isRequired,
  hideMenu: PropTypes.func.isRequired,
};

export { CustomColumnMenuComponent };

export default function CustomColumnMenu() {
  const [color, setColor] = React.useState('success');
  const apiRef = useGridApiRef();

  return (
    <div
      style={{
        width: '100%',
      }}
    >
      
      <div style={{ height: 2500, width: '100%', marginTop: 16 }}>
        <DataGrid
          apiRef={apiRef}
          columns = {[
            { field: 'name', headerName: 'Name', width: 180, editable: true },
            { field: 'mssv', headerName: 'MSSV', editable: true },
            { field: 'grade', headerName: 'Grade', type: 'number', editable: true },
            { field: 'grade1', headerName: 'Grade1', type: 'number', editable: true },
            { field: 'grade2', headerName: 'Grade2', type: 'number', editable: true },
            { field: 'grade3', headerName: 'Grade3', type: 'number', editable: true },
            { field: 'grade4', headerName: 'Grade4', type: 'number', editable: true },
          ]}
          rows={[
            {
              id: 1,
              name: "Hieu",
              mssv: "18120179",
              grade: 10,
              grade1: 5,
              grade2: 8,
              grade3: 9,
              grade4: 7,
            },
            {
              id: 2,
              name: "Duc",
              mssv:"18120164",
              grade: 9,
              grade1: 8,
              grade2: 7,
              grade3: 9,
              grade4: 10,
            },
            {
              id: 3,
              name: "Danh",
              mssv:"18120161",
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
          ]}
          
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

