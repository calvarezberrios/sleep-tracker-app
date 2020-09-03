import React, { useState } from 'react';
import styled from "styled-components";
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {logout} from "../actions/user-actions";

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

    div {
        display: flex;
        align-items: center;
        width: 80%;
        font-weight: bold;

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

    a {
        color: rgba(255, 255, 255, 0.4);
        text-decoration: none;
        line-height: 27px;
    }
`;

const NavBar = () => {
    const [token, setToken] = useState(localStorage.getItem("sleepToken"));
    const { user } = useSelector(state => state.usersReducer);
    const dispatch = useDispatch();
    const {push} = useHistory();

    const logoutUser = () => {
        localStorage.removeItem("sleepToken");
        setToken(null);
        dispatch(logout());
    }
    return (
        <Nav>
            <div>
                <h1 style = {{cursor: "pointer"}} onClick = {() => push("/")}>Sleep Tracker</h1>
                {(user || token) && <Link to = "/dashboard">Dashboard</Link>}
            </div>
            <Link to = "/" onClick = {logoutUser}>{user || token ? "Log out" : "Log in"}</Link>
            
        </Nav>
    );
};

export default NavBar;