import { GridOverlay } from '@mui/x-data-grid';
import { LinearProgress } from '@mui/material';

const CustomLoadingOverlay = () => {
  return (
    <GridOverlay>
      <div style={{ position: 'absolute', top: 0, width: '100%' }}>
        <LinearProgress />
      </div>
    </GridOverlay>
  );
}

export default CustomLoadingOverlay;