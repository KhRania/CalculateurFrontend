import { Button, Grid, TextField } from '@mui/material';
import React, { useState } from 'react';
import '../../css/ProjectsForm.css'
import useForm from '../../components/useForm';



const initialValues = {
    id : 0,
    projectname: '',
    adress: '',
    date: '', 
}

function ProjectsForm() {
   const {
    values,
    setValues,
    handleInputChange
   } = useForm(initialValues);

    

    
  

    return (
    <form>
<Grid container className='container-grid'>
    <Grid item xs={10} padding={1}>
        <TextField 
         variant="outlined"
         label="project name"
         name="projectname"
         value={values.projectname}
         onChange={handleInputChange}
        />
    </Grid>
    <Grid item xs={10} padding={1}>
        <TextField 
         variant="outlined"
         label="adress"
         name="adress"
         value={values.adress}
         onChange={handleInputChange}
         
        />
        <Button className='btn3'
         style={{'background-color':'#1a83ff', 'color':'white'}}
         sx={{marginLeft:16}}
        >Submit</Button> 
    </Grid>
</Grid>
    </form>
  )
}

export default ProjectsForm;