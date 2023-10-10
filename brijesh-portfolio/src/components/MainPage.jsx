import React from 'react'
import { Routes, Route } from 'react-router-dom';
import { NavLink } from 'react-router-dom'
import Students from './Students'
import Attendence from './Attendence'
import Login from './Login'
import Icon from "../images/favicon.png"

const MainPage = () => {
    return (
        <>
            <section className="mainpage_sec">
                <div className="container-fluid">
                    <div className="row mainpage">
                        <div className="col-lg-12 p-0">
                            <div className="topbar_mainpage">
                                <h4><img src={Icon} alt="" />Admin Login</h4>
                            </div>
                        </div>
                        <div className="col-lg-2 p-0">
                            <div className="sidebar_mainpage">
                                <ul>
                                    <li><NavLink exact="true" to="/"><i className="fa fa-graduation-cap" aria-hidden="true"></i> Students</NavLink></li>
                                    <li><NavLink exact="true" to="/attendence"><i className="fa fa-user-circle-o" aria-hidden="true"></i> Attendence</NavLink></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-10 p-0">
                            <div className="content_mainpage">
                                <Routes>
                                    <Route exact="true" path='/' element={<Students />} />
                                    <Route exact="true" path='/attendence' element={<Attendence/>} />
                                    <Route exact="true" path='/login' element={<Login/>} />
                                </Routes>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default MainPage
