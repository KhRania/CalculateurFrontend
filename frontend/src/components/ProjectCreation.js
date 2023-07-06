import React from 'react';
import Sidebar from './Sidebar';
import { Paper } from '@mui/material';
import HorizontalLinearStepper from './HorizontalLinearStepper';
import '../css/ProjectCreation.css';

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