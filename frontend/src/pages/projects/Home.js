import React from 'react'
import ProjectsForm from './ProjectsForm';
import Sidebar from '../../components/Sidebar';
import { Paper } from '@mui/material';
import '../../css/Home.css'
import EnhancedTable from '../../components/createData';

function Home() {
  return (
    <>
        <Sidebar />
        <Paper className='page' >      
            <ProjectsForm />
        </Paper>
        <Paper className='page1'>
          <EnhancedTable />
        </Paper>
    </>
  )
}

export default Home;