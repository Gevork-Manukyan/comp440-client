import './RegisterPage.css'
import "../Authentication.css"
import { useReducer, useState } from "react"
import { Link } from "react-router-dom"
import apiClient from '../../../services/apiClient'

export default function Register() {
    
    /* VARIABLES */
    const [formData, setFormData] = useReducer(formReducer, {})
    const [errorMessage, setErrorMessage] = useState("")

    /* HANDLER FUNCTIONS */
    async function handleOnSubmit(event) {
        event.preventDefault()

        if (formData?.confirm_password !== formData?.password) {
            console.log("FAIL REGISTER")
            setErrorMessage("Passwords Don't Match")
            return
        }

        console.log('SUCCESSFUL REGISTER')
        const response = await apiClient.register({
            firstName: formData.firstName,
            lastName: formData.lastName,
            username: formData.username,
            email: formData.email,
            password: formData.password
        })
        setErrorMessage("")
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
        <div className='RegisterPage'>
             <form onSubmit={handleOnSubmit}>
                <div className="authForm">
                    <div id='name-area'>
                        <fieldset className="authFieldset">
                            <label>
                                <p id="signup-firstName-title" className="form-title">First</p>
                                <input name="firstName" type={"firstName"} onChange={handleOnChange} />
                            </label>
                        </fieldset>
                        <fieldset className="authFieldset">
                            <label>
                                <p id="signup-lastName-title" className="form-title">Last</p>
                                <input name="lastName" type={"lastName"} onChange={handleOnChange} />
                            </label>
                        </fieldset>
                    </div>
                    <fieldset className="authFieldset">
                        <label>
                            <p id="signup-username-title" className="form-title">Username</p>
                            <input name="username" type={"username"} onChange={handleOnChange} />
                        </label>
                    </fieldset>
                    <fieldset className="authFieldset">
                        <label>
                            <p id="signup-email-title" className="form-title">Email</p>
                            <input name="email" type={"email"} onChange={handleOnChange} />
                        </label>
                    </fieldset>
                    <fieldset className="authFieldset">
                        <label>
                            <p id="signup-password-title" className="form-title">Password</p>
                            <input name="password" type={"password"} onChange={handleOnChange} />
                        </label>
                    </fieldset>
                    <fieldset className="authFieldset">
                        <label>
                            <p id="signup-confirm-password-title" className="form-title">Confirm Password</p>
                            <input name="confirm_password" type={"password"} onChange={handleOnChange} />
                        </label>
                    </fieldset>
                    <div className='error-message'>
                        <p>{errorMessage}</p>
                    </div>
                    <button className="authSubmitBtn" type="submit">Submit</button>
                </div>
            </form>
            <div>
                <Link to={"/login"}>
                    <p>Have an account?</p>
                </Link>
            </div>
        </div>
    )
}