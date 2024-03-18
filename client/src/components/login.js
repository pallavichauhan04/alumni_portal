import React, { useState , useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Login() {

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
    const [details, setDetails] = useState({ mail: "", password: "" })
    const changehandler = (e) => {
        e.preventDefault();
        setDetails({ ...details, [e.target.name]: e.target.value })
    }

    const clickhandler = async (e) => {
        e.preventDefault();
        const data = {
            mail: details.mail,
            password: details.password
        }
        if (type === "student") {
            const response = await fetch(`http://localhost:5000/api/student/login`, {
                method: "POST", // *GET, POST, PUT, DELETE, etc.
                headers: {
                    "Content-Type": "application/json",
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: JSON.stringify(data),
            });

            const json = await response.json();
            if (json.success === true) {
                localStorage.setItem('token1', json.token);
                console.log(localStorage.getItem('token1'))
                navigate('/')
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
            const response = await fetch(`http://localhost:5000/api/alum/login`, {
                method: "POST", // *GET, POST, PUT, DELETE, etc.
                headers: {
                    "Content-Type": "application/json",
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: JSON.stringify(data),
            });

            const json = await response.json();
            if (json.success === true) {
                localStorage.setItem('token2', json.token);
                // console.log(localStorage.getItem('token1'))
                navigate('/alumFront')
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
                    <input type="text" className="m-4 w-50 h-12 bg-dark text-light p-4 rounded-3 focus:outline-none focus:ring-1 focus:ring-light text-xs" id="username" name="mail" placeholder="email address" onChange={changehandler} />
                    <input type="password" className="m-4 w-50 h-12 bg-dark text-light p-4 rounded-3 focus:outline-none focus:ring-1 focus:ring-light text-xs" id="password" name="password" placeholder="Password" onChange={changehandler} />
                    <button className="m-4 w-50 h-12 bg-light text-dark p-2 rounded-3" onClick={clickhandler}>Log In</button>
                    <Link to="/signup"><p className="m-4 mt-2 text-light">Don't have an account? Signup?</p></Link>
                </form>
            </div>
            <div className="row text-center">
                <div className="col-md-5 mx-auto my-5">
                    <button className="btn btn-dark btn-lg rounded-3" onClick={() => {
                        setType("student");
                    }}>Log In as Student</button>
                </div>
                <div className="col-md-5 mx-auto my-5">
                    <button className="btn btn-dark btn-lg btn-block rounded-3" onClick={() => {
                        setType("Alumni");
                    }}>Log In as Alumni</button>
                </div>
            </div>
        </>

    )
}

export default Login
