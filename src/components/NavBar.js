import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {getUser, logout} from "../actions/user-actions";
import { getEntries } from '../actions/entry-actions';
import { Menu, MenuItem, Avatar, IconButton } from "@mui/material";
import * as Icons from "@mui/icons-material";

const Nav = styled.div`
    width: 100%;
    height: 80px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 10%;
    padding-right: 2%;
    font-size: 24px;
    background: linear-gradient(0deg, rgba(255, 255, 255, 0.09), rgba(255, 255, 255, 0.09)), #121212;
    font-family: 'Comfortaa', cursive;

    .main {
        display: flex;
        align-items: center;
        width: 80%;
        font-weight: bold;
        justify-content: space-between;

        h1 {
            font-size: 48px;
            color: rgba(255, 255, 255, 0.87);
            line-height: 54px;
        }

        a {
            margin-left: 18%;
            color: rgba(255, 255, 255, 0.6);
            text-decoration: none;
        }
    }

    .links {
        font-size: 1.3rem;

    }

    a {
        color: rgba(255, 255, 255, 0.4);
        text-decoration: none;
        line-height: 27px;
    }
`;

const NavBar = () => {
    const { user } = useSelector(state => state.usersReducer);
    const dispatch = useDispatch();
    const { push, go } = useHistory();
    const [anchorEl, setAnchorEl] = useState(null);

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    useEffect(() => {   
        if(localStorage.getItem("savedUser") || sessionStorage.getItem("currentUser")) {   
            dispatch(getUser());
            dispatch(getEntries());
        } else {
            push("/");
        }
    }, [dispatch]);

    const logoutUser = () => {
        localStorage.removeItem("savedUser");
        sessionStorage.removeItem("currentUser");
        dispatch(logout());
        push("/");
    }

    return (
        <Nav>
            <div className = "main">
                <h1 style = {{cursor: "pointer"}} onClick = {() => push("/")}>Sleep Tracker</h1>
                {user && 
                    <div className="links">
                        <Link to = "/dashboard">Dashboard</Link>
                        <Link to = "/history">History</Link>
                    </div>
                }
            </div>
            {user &&
                <div style = {{ display: "flex", alignItems: "center", gap: "1rem" }}>
                    <IconButton onClick = {() => {push("/sleep/new"); go(0)}}>
                        <Icons.AddCircleOutline sx = {{ fontSize: 30, color: "rgba(255, 255, 255, 0.4)" }}/>
                    </IconButton>

                    <IconButton onClick = { handleMenuClick }>
                        <Icons.AccountCircle sx = {{ fontSize: 60, color: "rgba(255, 255, 255, 0.4)" }} />
                    </IconButton>

                    <Menu
                        anchorEl = {anchorEl}
                        open = {Boolean(anchorEl)}
                        onClose = {handleMenuClose}
                        slotProps = {{
                            paper: {
                                style: {
                                    backgroundColor: "#1e1e1e",
                                    color: "#fff"
                                }
                            }
                            
                        }}
                    >
                        {/* <MenuItem onClick = {() => { push("/profile"); handleMenuClose(); }}>Profile</MenuItem> */}
                        <MenuItem onClick = {() => { logoutUser(); handleMenuClose(); }}>Log Out</MenuItem>
                    </Menu>
                </div>
            }
        </Nav>
    );
};

export default NavBar;