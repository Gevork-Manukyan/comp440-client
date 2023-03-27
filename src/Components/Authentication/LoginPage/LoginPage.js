import "./LoginPage.css"
import "../Authentication.css"
import { useReducer, useState } from "react"
import { Link } from "react-router-dom"
import apiClient from "../../../services/apiClient"

export default function LoginPage() {

    /* VARIABLES */
    const [formData, setFormData] = useReducer(formReducer, {})
    const [errorMessage, setErrorMessage] = useState("")

    /* HANDLER FUNCTIONS */
    async function handleOnSubmit(event) {
        event.preventDefault()
        const response = await apiClient.login(formData)
        // const data = response.data
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
            <form onSubmit={handleOnSubmit}>
                <div className="authForm">
                    <fieldset className="authFieldset">
                        <label>
                            <p id="login-email-title" className="form-title">Email</p>
                            <input name="email" type={"email"} onChange={handleOnChange} />
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
            <div>
                <Link to={"/"}>
                    <p>Need an account?</p>
                </Link>
            </div>
        </div>
    )
}