import Axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function AxiosWithAuth() {
    const user = JSON.parse(localStorage.getItem("savedUser") || sessionStorage.getItem("currentUser"));
    
    return Axios.create({
        baseURL: "https://sleeptracker-back-end.onrender.com/api",
        headers: {
            Authorization: `Bearer ${user.token}`,
        }
    });
}