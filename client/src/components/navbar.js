import React from 'react'
import { Link, useNavigate } from 'react-router-dom'


export default function Navbar() {
    const navigate = useNavigate();

    // const loginhandler=()=>{
    //     navigate('/login');
    // }
    // const signuphandler=()=>{
    //     navigate('/login');
    // }
    const logouthandler = () => {
        if (localStorage.getItem('token1')) {
            localStorage.removeItem('token1');
        }
        if (localStorage.getItem('token2')) {
            localStorage.removeItem('token2');
        }
        navigate('/login')
    }
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">Navbar</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="/">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/">Link</a>
                        </li>
                        {localStorage.getItem('token2') && <li className="mx-3">
                            <Link to="/addAlumJob" className="btn btn-success">Add Job</Link>
                        </li>}
                    </ul>
                    {
                        (localStorage.getItem('token1') || localStorage.getItem('token2')) ? <button className='btn btn-secondary' onClick={logouthandler}>Logout</button> :
                            <>
                                <Link to='/login'><button className="btn btn-primary">Login</button></Link>
                                <Link to='/signup'><button className='mx-3 btn btn-primary'>Signup</button></Link>
                            </>}
                </div>
            </div>
        </nav>
    )
}
