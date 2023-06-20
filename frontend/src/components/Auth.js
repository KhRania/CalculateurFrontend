import React, { useState } from "react";
import { Box , Button, Input, TextField, Typography, inputBaseClasses } from "@mui/material";
import AppRegistrationOutlinedIcon from '@mui/icons-material/AppRegistrationOutlined';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import '../css/Auth.css';
import { Link } from "react-router-dom";

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
        <div className="div1">
            <form className="form" onSubmit={handleSubmit}>
                <Box className="box" >
                    <Typography className="typo" variant="h2" padding={3} textAlign="center">
                        {isSignup ? "Sign Up" : "Login"}
                    </Typography>
                    
                    { isSignup && (<TextField 
                    className="field" 
                    onChange={handleChange}
                    name="name" 
                    value={inputs.name}
                    margin="normal"
                    type={'text'} 
                    variant="outlined" 
                    placeholder="Name"/> 
                    )}
                    <TextField 
                    className="field"
                    onChange={handleChange}
                    name="email"
                    value={inputs.email}
                    margin="normal" 
                    type={'email'} 
                    varient="outlined" 
                    placeholder="Email"/>
                    
                    <TextField  
                    className="field"                   
                    onChange={handleChange}
                    name="password"
                    value={inputs.password}
                    margin="normal" 
                    type={'password'} 
                    variant="outlined" 
                    placeholder="Password"/>

                 <Link to='/Myprojects'>
                    <Button className="btn1"
                      endIcon={isSignup ? <AppRegistrationOutlinedIcon/> : <LoginOutlinedIcon/>}
                      type="submit"
                      sx={{marginTop:3, borderRadius:3}} 
                      variant="oulined" 
                      style={{'background-color':'blue', 'color':'white'}} 
                      > {isSignup ? "Signup" : "login"}
                    </Button>
                 </Link>
                    

                    <Button  className="btn2"
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