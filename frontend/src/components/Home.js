import React from 'react'
import Sidebar from './Sidebar';
import { Paper } from '@mui/material';
import '../css/Home.css';
import EnhancedTable from './createData';

function Home() {
  return (
    <>
        <Sidebar />
        
        <Paper className='page1'>
          <EnhancedTable />
        </Paper>
    </>
  )
}

export default Home;