import Axios from "axios";

export default function AxiosWithAuth() {
    const token = localStorage.getItem("sleepToken");

    return Axios.create({
        baseURL: "https://webpt15-sleep-tracker-api.herokuapp.com/api",
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
}