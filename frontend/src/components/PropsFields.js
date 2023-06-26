import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function PropsFields() {
  const [projectName, setProjectName] = React.useState('');
  const [address, setAddress] = React.useState('');
  const [projectNameTouched, setProjectNameTouched] = React.useState(false);
  const [addressTouched, setAddressTouched] = React.useState(false);

  const handleProjectNameChange = (event) => {
    setProjectName(event.target.value);
  };

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const handleProjectNameBlur = () => {
    setProjectNameTouched(true);
  };

  const handleAddressBlur = () => {
    setAddressTouched(true);
  };

  const projectNameError = projectNameTouched && projectName === '';
  const addressError = addressTouched && address === '';

  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 2, width: '30ch' }, marginTop: 2
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          required
          id="outlined-required"
          label="Project Name"
          value={projectName}
          onChange={handleProjectNameChange}
          onBlur={handleProjectNameBlur}
          error={projectNameError}
          helperText={projectNameError && 'Project Name is required'}
        />
      </div>
      <div>
        <TextField
          required
          id="outlined-required"
          label="Address"
          value={address}
          onChange={handleAddressChange}
          onBlur={handleAddressBlur}
          error={addressError}
          helperText={addressError && 'Address is required'}
        />
      </div>
      <div>
        <TextField
          id="outlined-multiline-flexible"
          label="Description"
          multiline
        />
      </div>
    </Box>
  );
}
