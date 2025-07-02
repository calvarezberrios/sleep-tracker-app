import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getUser, logout } from "../actions/user-actions";
import { getEntries } from '../actions/entry-actions';
import { Menu, MenuItem, IconButton, Drawer, List, ListItem, ListItemText, ListItemButton } from "@mui/material";
import * as Icons from "@mui/icons-material";

const Nav = styled.nav`
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
  font-size: 1.25rem;
  background: linear-gradient(0deg, rgba(255, 255, 255, 0.09), rgba(255, 255, 255, 0.09)), #121212;
  font-family: 'Comfortaa', cursive;
  position: sticky;
  top: 0;
  z-index: 1000;

  .main {
    display: flex;
    align-items: center;
    flex: 1;
    justify-content: space-between;

    h1 {
      font-size: 2.5rem;
      color: rgba(255, 255, 255, 0.87);
      line-height: 1;
      margin: 0;
      cursor: pointer;
      white-space: nowrap;
    }
  }

  .links {
    display: flex;
    flex-direction: row;
    gap: 2rem;
    margin-right: 3rem;
  }

  .right {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .menuButton {
    display: none;
  }

  @media (max-width: 768px) {
    .right, .links {
      display: none;
    }
    .menuButton {
      display: block;
      color: rgba(255, 255, 255, 0.6);
    }
  }
`;

const NavBar = () => {
  const { user } = useSelector(state => state.usersReducer);
  const dispatch = useDispatch();
  const { push, go } = useHistory();
  const [anchorEl, setAnchorEl] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (localStorage.getItem("savedUser") || sessionStorage.getItem("currentUser")) {
      dispatch(getUser());
      dispatch(getEntries());
    } else {
      push("/");
    }
  }, [dispatch, push]);

  const logoutUser = () => {
    localStorage.removeItem("savedUser");
    sessionStorage.removeItem("currentUser");
    dispatch(logout());
    push("/");
  };

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  return (
    <Nav>
      <div className="main">
        <h1 onClick={() => push("/")}>Sleep Tracker</h1>
        {user && (
          <div className="links">
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/history">History</Link>
          </div>
        )}
      </div>
      {user && (
        <>
          <div className="right">
            <IconButton onClick={() => { push("/sleep/new"); go(0); }}>
              <Icons.AddCircleOutline sx={{ fontSize: 30, color: "rgba(255, 255, 255, 0.6)" }} />
            </IconButton>
            <IconButton onClick={handleMenuClick}>
              <Icons.AccountCircle sx={{ fontSize: 50, color: "rgba(255, 255, 255, 0.6)" }} />
            </IconButton>
          </div>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            slotProps={{
              paper: {
                style: {
                  backgroundColor: "#1e1e1e",
                  color: "#fff",
                },
              },
            }}
          >
            <MenuItem onClick={() => { logoutUser(); handleMenuClose(); }}>Log Out</MenuItem>
          </Menu>

          <IconButton className="menuButton" onClick={toggleDrawer(true)}>
            <Icons.Menu sx={{ fontSize: 36 }} />
          </IconButton>

          <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
            <List sx={{ width: 250, backgroundColor: "#121212", color: "#fff", height: "100%" }}>
              <ListItem disablePadding>
                <ListItemButton onClick={() => { push("/dashboard"); setDrawerOpen(false); }}>
                  <ListItemText primary="Dashboard" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton onClick={() => { push("/history"); setDrawerOpen(false); }}>
                  <ListItemText primary="History" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton onClick={() => { push("/sleep/new"); go(0); setDrawerOpen(false); }}>
                  <ListItemText primary="New Entry" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton onClick={() => { logoutUser(); setDrawerOpen(false); }}>
                  <ListItemText primary="Log Out" />
                </ListItemButton>
              </ListItem>
            </List>
          </Drawer>
        </>
      )}

    </Nav>
  );
};

export default NavBar;
