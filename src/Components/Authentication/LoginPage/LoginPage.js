import "./LoginPage.css"
import "../Authentication.css"
import { useReducer, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import apiClient from "../../../services/apiClient"

export default function LoginPage({ setUser, setAuthenticated }) {

    /* VARIABLES */
    const [formData, setFormData] = useReducer(formReducer, {})
    const [errorMessage, setErrorMessage] = useState("")
    const navigate = useNavigate()

    /* HANDLER FUNCTIONS */
    async function handleOnSubmit(event) {
        event.preventDefault()

        const { data, error } = await apiClient.login(formData);
        
        if (error) {
            setErrorMessage(error);
        }
        
        if (data?.user) {
            setUser(data.user);
            setAuthenticated(true);
            apiClient.setToken(data.token);
            localStorage.setItem("token", data.token);
            navigate("/");
        }
    }

    function handleOnChange(event) {
        setFormData({
          name: event.target.name,
          value: event.target.value
        })
    }

    // Form Reducer Function
    function formReducer(state, dispatchParams) {
        return ({
            ...state,
            [dispatchParams.name]: dispatchParams.value
        })
    }
    
    
    return (
        <div className="LoginPage">
            <h1>Login</h1>
            <form onSubmit={handleOnSubmit}>
                <div className="authForm">
                    <fieldset className="authFieldset">
                        <label>
                            <p id="login-username-title" className="form-title">Username</p>
                            <input name="username" type={"username"} onChange={handleOnChange} />
                        </label>
                    </fieldset>
                    <fieldset className="authFieldset">
                        <label>
                            <p id="login-password-title" className="form-title">Password</p>
                            <input name="password" type={"password"} onChange={handleOnChange} />
                        </label>
                    </fieldset>
                    <div className='error-message'>
                        <p>{errorMessage}</p>
                    </div>
                    <button className="authSubmitBtn" type="submit">Submit</button>
                </div>
            </form>
            <div className="sendTo-register">
                <Link to={"/register"}>
                    <p>Need an account?</p>
                </Link>
            </div>
        </div>
    )
}