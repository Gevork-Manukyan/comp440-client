import './RegisterPage.css'
import "../Authentication.css"
import { useReducer } from "react"
import { Link } from "react-router-dom"

export default function Register() {
    
    /* VARIABLES */
    const [formData, setFormData] = useReducer(formReducer, {})

    /* HANDLER FUNCTIONS */
    function handleOnSubmit(event) {
        event.preventDefault()
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
                            <input name="confirm-password" type={"password"} onChange={handleOnChange} />
                        </label>
                    </fieldset>
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