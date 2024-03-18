import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Signup() {
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('token1')) {
            navigate('/');
        }
        else if (localStorage.getItem('token2')) {
            navigate('/alumFront');
        }
    }, [])
    const [type, setType] = useState("student");
    const [details, setDetails] = useState({ name: "", mail: "", password: "" })
    const changehandler = (e) => {
        e.preventDefault();
        setDetails({ ...details, [e.target.name]: e.target.value })
    }

    const clickhandler = async (e) => {
        e.preventDefault();
        const data = {
            name: details.name,
            mail: details.mail,
            password: details.password
        }
        if (type === "student") {
            const response = await fetch(`http://localhost:5000/api/student/signup`, {
                method: "POST", // *GET, POST, PUT, DELETE, etc.
                headers: {
                    "Content-Type": "application/json",
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: JSON.stringify(data),
            });

            const json = await response.json();
            if (json.success === true) {
                navigate('/login')
            }
            else {
                if (json.message !== undefined) {
                    alert(`${json.message}`)
                }
                else {
                    alert(`${json.error[0].msg}`)
                }
            }
        }

        else {
            const response = await fetch(`http://localhost:5000/api/alum/signup`, {
                method: "POST", // *GET, POST, PUT, DELETE, etc.
                headers: {
                    "Content-Type": "application/json",
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: JSON.stringify(data),
            });

            const json = await response.json();
            if (json.success === true) {

                // console.log(localStorage.getItem('token1'))
                navigate('/login')
            }
            else {
                if (json.message !== undefined) {
                    alert(`${json.message}`)
                }
                else {
                    alert(`${json.error[0].msg}`)
                }
            }
        }


    }

    return (
        <>
            <div className="wrapper relative w-100 h-100 d-flex align-items-center justify-content-center bg-dark">
                <form className="outer d-flex flex-column align-items-center justify-content-center w-50">
                    <p className="m-4 mb-1 font-weight-bold text-white">{`Login to your AlumniX as ${type}!`}</p>
                    <input type="text" className="m-4 w-50 h-12 bg-dark text-light p-4 rounded-3 focus:outline-none focus:ring-1 focus:ring-light text-xs" id="name" name="name" placeholder="your name" onChange={changehandler} />
                    <input type="text" className="m-4 w-50 h-12 bg-dark text-light p-4 rounded-3 focus:outline-none focus:ring-1 focus:ring-light text-xs" id="username" name="mail" placeholder="email address" onChange={changehandler} />
                    <input type="password" className="m-4 w-50 h-12 bg-dark text-light p-4 rounded-3 focus:outline-none focus:ring-1 focus:ring-light text-xs" id="password" name="password" placeholder="Password" onChange={changehandler} />
                    <button className="m-4 w-50 h-12 bg-light text-dark p-2 rounded-3" onClick={clickhandler}>Signup</button>
                    <Link to="/login"><p className="m-4 mt-2 text-light">Have an account? Login?</p></Link>
                </form>
            </div>
            <div className="text-center my-4">
                <p className="fs-4">After signing up, login with the same credentials</p>
            </div>
            <div className="row text-center">
                <div className="col-md-5 mx-auto my-0">
                    <button className="btn btn-dark btn-lg rounded-3" onClick={() => {
                        setType("student");
                    }}>Signup as Student</button>
                </div>
                <div className="col-md-5 mx-auto my-0">
                    <button className="btn btn-dark btn-lg btn-block rounded-3" onClick={() => {
                        setType("Alumni");
                    }}>Signup as Alumni</button>
                </div>
            </div>
            
        </>

    )
}

export default Signup
