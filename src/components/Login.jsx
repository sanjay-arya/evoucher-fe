import {useState} from 'react'
import { useHistory } from "react-router-dom";
import {Login as LoginAPI} from "../Api";
// import { CContainer, CRow, CCol, CForm, CFormGroup, CLabel, CInput, CFormText } from '@coreui/react';
export default function Login() {
    const history = useHistory();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    function validateForm() {
        return username.length > 0 && password.length > 0;
      }

    async function onLoginClick(e){
        e.preventDefault();
        
        // setLoading(true);

        // const requestOptions = {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({ 
        //         "username": username,
        //         "password": password
        //     })
        // };
        try {
            let response = await LoginAPI(username, password);
            response = await response.json();
            localStorage.setItem('auth', response.token);
            setLoading(false);
            history.push("/");
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
        
    }
    
    return (
        <div className="c-app flex-row align-items-center">
            <div className="c-main container col-md-6 col-3" >
                <div className="card p-5">
                    <form>
                        <div className="form-group row">
                            <label htmlFor="inputUsername" className="col-4 col-form-label">Username</label>
                            <div className="col-8">
                                <input type="text" className="form-control" id="inputUsername" placeholder="Enter username here" value={username} onChange={e => setUsername(e.target.value)}/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="inputPassword" className="col-4 col-form-label">Password</label>
                            <div className="col-8">
                                <input type="password" className="form-control" id="inputPassword" placeholder="Enter password here" value={password} onChange={e => setPassword(e.target.value)}/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <div className="col-12">
                                <button type="submit" className="btn btn-primary btn-block" onClick={onLoginClick} disabled={!validateForm()}>
                                    {loading && <span className="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span>}
                                    Sign in
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
