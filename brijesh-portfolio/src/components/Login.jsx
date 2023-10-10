import React, { useState } from 'react'
import Logo from '../images/favicon.png'
import {useNavigate} from 'react-router-dom'

const Login = () => {

    const navigate = useNavigate()
    const [inptData, setInptData] = useState({
        inputEmail: "", password: ""
    });


    const handleInput = (e) =>{
        setInptData({...inptData, [e.target.name]:e.target.value})
    }

    const submitForm = () =>{
        fetch('http://localhost:5001/login', {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(inptData)
      })
      .then((response) => response.json())
      .then((data) => {
        if(data.status===201 || data.message==='Admin is login'){
            navigate('/')
        }else {
            localStorage.setItem('jwtToken', data.token);
            navigate('/attendence')
        }
    })
      .catch((err) => {
        console.log(err)
      });
    }


    return (
        <>
            <section className="h-100 gradient-form" style={{ backgroundColor: "#eee" }}>
                <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-xl-10">
                            <div className="card rounded-3 text-black">
                                <div className="row g-0">
                                    <div className="col-lg-6">
                                        <div className="card-body p-md-5 mx-md-4">

                                            <div className="text-center">
                                                <a href="http://brijes.in/" target="_brijesh">
                                                    <img src={Logo} style={{ width: "100px" }} alt="logo" />
                                                </a>
                                                <h4 className="mt-1 mb-5 pb-1">Attendence App Login Form</h4>
                                            </div>

                                            <form>
                                                <p><b>Please login to your account</b></p>

                                                <div className="form-outline mb-4">
                                                    <label className="form-label" htmlFor="form2Example11">Username</label>
                                                    <input type="email" id="form2Example11" className="form-control"
                                                        placeholder="Phone number or email address"
                                                        value={inptData.inputEmail} name='inputEmail' onChange={handleInput} />
                                                </div>

                                                <div className="form-outline mb-4">
                                                    <label className="form-label" htmlFor="form2Example22">Password</label>
                                                    <input type="password" id="form2Example22" className="form-control" value={inptData.password} name='password' onChange={handleInput} />
                                                </div>

                                                <div className="text-center pt-1 mb-5 pb-1">
                                                    <button className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3" type="button" onClick={submitForm} >Log
                                                        in</button>
                                                    <a className="text-muted" href="#.">Forgot password?</a>
                                                </div>

                                                {/* <div className="d-flex align-items-center justify-content-center pb-4">
                                                    <p className="mb-0 me-2">Don't have an account?</p>
                                                    <button type="button" className="btn btn-outline-danger">Create new</button>
                                                </div> */}

                                            </form>

                                        </div>
                                    </div>
                                    <div className="col-lg-6 d-flex align-items-center gradient-custom-2">
                                        <div className="text-black px-3 py-4 p-md-5 mx-md-4">
                                            <h4 className="mb-4">Lorem Ipsum Sr. Sec. School</h4>
                                            <p className="small mb-0">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                                                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                                                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Login
