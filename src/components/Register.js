import React, { useState, useEffect } from 'react';
import * as Icons from "@material-ui/icons";
import {TextContainer, FormContainer, NameInputGroup, TextField, PasswordField, IconButton, Button} from "../styled-components";
import { Checkbox, FormControlLabel } from "@material-ui/core";
import useForm from "../hooks/useForm";
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { register, logout } from '../actions/user-actions';


const initialValues = {
    fname: "",
    lname: "",
    email: "",
    username: "",
    password: ""
}

const Register = props => {
    const [isVisible, setIsVisible] = useState(false);
    const [keepLogged, setKeepLogged] = useState(false);
    const [formValues, handleChanges] = useForm(initialValues);
    const {user, error} = useSelector(state => state.usersReducer);
    const dispatch = useDispatch();

    const toggleKeepLogged = e => {
        setKeepLogged(!keepLogged);
    }

    const togglePasswordVisible = e => {
        e.preventDefault();

        setIsVisible(!isVisible)
    }

    const postRegister = e => {
        e.preventDefault();

        dispatch(register(formValues, keepLogged));
    }

    useEffect(() => {
        
        if((user || localStorage.getItem("sleepToken")) && !error) {
            props.history.push("/dashboard");
        } else if (error) {
            console.log(error);
        }

    }, [user, props.history, error])

    return (
        <>
            <TextContainer>
                <h2>Let's get started!</h2>
                <p>Let Sleep Tracker help you discover your ideal sleep schedule.</p>
            </TextContainer>

            <FormContainer onSubmit = {postRegister}>
                <NameInputGroup>
                    <TextField 
                        id = "fname"
                        type = "text"
                        name = "fname"
                        value = {formValues.fname}
                        onChange = {handleChanges}
                        placeholder = "First Name"
                        width = "48%"
                    />

                    <TextField 
                        id = "lname"
                        type = "text"
                        name = "lname"
                        value = {formValues.lname}
                        onChange = {handleChanges}
                        placeholder = "Last Name"
                        width = "48%"
                    />
                </NameInputGroup>

                <br /><br />

                <TextField 
                    id = "email" 
                    type = "email" 
                    name = "email"
                    value = {formValues.email}
                    onChange = {handleChanges}
                    placeholder = "Email" 
                />

                <TextField 
                    id = "username" 
                    type = "text" 
                    name = "username"
                    value = {formValues.username}
                    onChange = {handleChanges}
                    placeholder = "Username" 
                />

                
                <PasswordField>
                    <input 
                        id = "password"
                        type = {isVisible ? "text" : "password"}
                        name = "password"
                        value = {formValues.password}
                        onChange = {handleChanges}
                        placeholder = "Password"
                    />
                    <IconButton onClick = {togglePasswordVisible}>
                        {isVisible ? <Icons.VisibilityOff /> : <Icons.Visibility /> }
                    </IconButton>
                </PasswordField>

                <Link className = "formLink" to = "/" onClick = {() => dispatch(logout())}>Already have an account?</Link>
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

                <Button type = "submit">Sign Up</Button>
            </FormContainer>
        </>
    );
};

export default Register;

