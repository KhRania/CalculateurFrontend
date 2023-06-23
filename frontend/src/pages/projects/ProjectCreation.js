import React from 'react';
import Sidebar from '../../components/Sidebar';
import { Paper } from '@mui/material';
import HorizontalLinearStepper from '../../components/HorizontalLinearStepper';
import '../../css/ProjectCreation.css';
function ProjectCreation() {
  return (
    <>
     <Sidebar />
     <Paper className='proj-creation'>
        <HorizontalLinearStepper />
     </Paper>
    </>
  )
}

export default ProjectCreation;