import Axios from "axios";
import { useEffect, useState } from "react";

export default function AxiosWithAuth() {
    const token = localStorage.getItem("sleepToken");

    return Axios.create({
        baseURL: "https://sleeptracker-back-end.onrender.com/api",
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
}