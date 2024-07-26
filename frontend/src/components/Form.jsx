import { useState } from "react"
import api from "../api"
import { useNavigate } from "react-router-dom"
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants"
import "../styles/Form.css"

function Form({ route, method }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const formName = method === "login" ? "Login" : "Register";

    const handleSubmit = async (e) => {
        setIsLoading(true);
        e.preventDefault();

        try {
            const response = await api.post(route, { username, password });
            const { access, refresh } = response.data;

            if (method === "login") {
                localStorage.setItem(ACCESS_TOKEN, access);
                localStorage.setItem(REFRESH_TOKEN, refresh);
                console.log("Successful Login Backend.")
                navigate("/");
            } else {
                navigate("/login");
            }
        } catch (error) {
        console.error(error);
        } finally {
        setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="form-container">
        <h1>{formName}</h1>

        <input
            className="form-input"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
        />

        <input
            className="form-input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
        />

        <button className="form-button" type="submit" disabled={isLoading}>
            {formName}
        </button>
        </form>
    );
}



export default Form;
