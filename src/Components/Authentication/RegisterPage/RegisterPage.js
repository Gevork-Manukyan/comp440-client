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
        <div className='Register'>
             <form onSubmit={handleOnSubmit}>
                <div className="authForm">
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