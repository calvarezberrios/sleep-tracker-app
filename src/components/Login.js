import React, { useState, useEffect } from 'react';
import * as Icons from "@mui/icons-material";
import { TextContainer, FormContainer, TextField, PasswordField, IconButton, Button, PageContainer } from "../styled-components";
import { Checkbox, FormControlLabel } from "@mui/material";
import { Link } from 'react-router-dom';
import useForm from '../hooks/useForm';
import { useSelector, useDispatch } from 'react-redux';
import { login, logout } from '../actions/user-actions';

const initialValues = {username: "", password: ""};

const Login = props => {
    const [isVisible, setIsVisible] = useState(false);
    const [keepLogged, setKeepLogged] = useState(false);
    const [formUser, handleChanges] = useForm(initialValues);
    const {user, error} = useSelector(state => state.usersReducer);
    const dispatch = useDispatch();

    const toggleKeepLogged = e => {
        setKeepLogged(!keepLogged);
    }

    const togglePasswordVisible = e => {
        e.preventDefault();

        setIsVisible(!isVisible)
    }

    const postLogin = e => {
        e.preventDefault();

        dispatch(login(formUser, keepLogged));
    } 

    useEffect(() => {
        
        if((user || localStorage.getItem("savedUser") || sessionStorage.getItem("currentUser")) && !error) {
            props.history.push("/dashboard");
        } else if (error) {
            console.log(error);
        }

    }, [user, props.history, error])

    return (
        <PageContainer>
            <TextContainer>
                <h2>Welcome back!</h2>
                <p>You're one step closer to finding your ideal sleep schedule.</p>
            </TextContainer>

            <FormContainer onSubmit = {postLogin}>
                <TextField 
                    id = "username" 
                    type = "text" 
                    name = "username"
                    value = {formUser.username}
                    onChange = {handleChanges}
                    placeholder = "Username" 
                />

                
                <PasswordField>
                    <input 
                        id = "password"
                        type = {isVisible ? "text" : "password"}
                        name = "password"
                        value = {formUser.password}
                        onChange = {handleChanges}
                        placeholder = "Password"
                    />
                    <IconButton onClick = {togglePasswordVisible}>
                        {isVisible ? <Icons.VisibilityOff /> : <Icons.Visibility /> }
                    </IconButton>
                </PasswordField>

                <Link className = "formLink" to = "/signup" onClick = {() => dispatch(logout())}>Don't have an account?</Link>
                <br />
                <FormControlLabel
                    control={
                        <Checkbox
                            color = "default"
                            style = {{ color: "rgba(255, 255, 255, 0.6)" }}
                            checked = {keepLogged}
                            onChange = {toggleKeepLogged}
                        />
                    }
                    label="Keep me logged in"
                />

                <Button>Log in</Button>
            </FormContainer>
        </PageContainer>
    );
};

export default Login;

