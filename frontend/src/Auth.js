import React, { useState } from "react";
import { Box , Button, Input, TextField, Typography, inputBaseClasses } from "@mui/material";
import AppRegistrationOutlinedIcon from '@mui/icons-material/AppRegistrationOutlined';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
const Auth = () => {
    const [isSignup, setIsSignup] = useState(false);
    const [inputs, setInputs] = useState({
        name: "",
        email: "",
        password: "",
    });
    const handleChange = (e) => {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name] : e.target.value
        }));
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(inputs);
    };
    const resetState = () => {
        setIsSignup(!isSignup);
        setInputs({ name: "", email: "", password: ""});
    };
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <Box 
                display="flex" 
                flexDirection={"column"} 
                maxWidth={400} 
                alignItems="center" 
                justifyContent="center"
                margin="auto"
                marginTop={5}
                padding={3}
                borderRadius={5}
                boxShadow={"5px 5px 10px 5px #ccc"}
                sx={{
                    ":hover":{
                        boxShadow: '5px 10px 20px #ccc',
                    },
                }}>
                    <Typography variant="h2" padding={3} textAlign="center">
                        {isSignup ? "Sign Up" : "Login"}
                    </Typography>
                    
                    { isSignup && (<TextField  
                    onChange={handleChange}
                    name="name" 
                    value={inputs.name}
                    margin="normal"
                    type={'text'} 
                    variant="outlined" 
                    placeholder="Name"/> 
                    )}
                    <TextField 
                    onChange={handleChange}
                    name="email"
                    value={inputs.email}
                    margin="normal" 
                    type={'email'} 
                    varient="outlined" 
                    placeholder="Email"/>
                    
                    <TextField                     
                    onChange={handleChange}
                    name="password"
                    value={inputs.password}
                    margin="normal" 
                    type={'password'} 
                    variant="outlined" 
                    placeholder="Password"/>

                    <Button 
                    endIcon={isSignup ? <AppRegistrationOutlinedIcon/> : <LoginOutlinedIcon/>}
                    type="submit"
                    sx={{marginTop:3, borderRadius:3}} 
                    variant="oulined" 
                    style={{'background-color':'blue', 'color':'white'}} 
                    > {isSignup ? "Signup" : "login"}
                    </Button>

                    <Button  
                    endIcon={isSignup ? <LoginOutlinedIcon/> : <AppRegistrationOutlinedIcon/>}
                    onClick={resetState} 
                    sx={{marginTop:3, borderRadius:3}} 
                    
                    >Go to {isSignup ? "Login" : "Sign Up"}
                    </Button>
                </Box>
            </form>
        </div>
    );
};

export default Auth;