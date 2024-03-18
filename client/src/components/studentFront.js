import React, { useEffect, useState } from 'react'
import Jobcards from './jobcards';
import { setJobsstore } from '../zustandStores/studentJobs'
import { useNavigate } from 'react-router-dom';

export default function StudentFront() {

    const navigate = useNavigate();
    
    
    const jobs = setJobsstore((state) => state.jobs);
    const allJobs = setJobsstore((state) => state.allJobs);
    const appliedJobs = setJobsstore((state) => state.appliedJobs);
    const profile = setJobsstore((state) => state.profile);
    const getProfile=setJobsstore((state)=>state.getProfile);
    const [typecards, setTypecards] = useState('allStudentJobs');
    const edithandler=(e)=>{
        e.preventDefault();
        navigate('/EditProfilestudent');
    }
    useEffect(() => {
        if (localStorage.getItem('token1')) {
            allJobs();
            getProfile();
        }
        else {
            navigate('/login');
        }
    }, [])

    return (

        <div className='bg-dark text-light'>
            {/* Header Section */}
            <header className="container-fluid py-5 text-center">
                <h1 className="display-3">Welcome to Your Alumni Network</h1>
            </header>

            {/* Profile Section */}
            <section className="container my-5">
                <div className="row">
                    <div className="col-md-6">
                        <div className="card border-primary shadow p-4">
                            <h2 className="card-title text-secondary">{`${profile.name}'s Profile`}</h2>
                            <ul className="list-unstyled">
                                <li><strong>Name:</strong> {profile.name}</li>
                                <li><strong>Email:</strong> {profile.mail}</li>
                                <li><strong>Branch:</strong>{profile.branch}</li>
                                <li><strong>Skills:</strong> {`${profile.skills}...`}</li>
                            </ul>
                            <button className="btn btn-secondary btn-lg mt-4" onClick={edithandler}>Edit Info</button>

                        </div>
                        
                    </div>
                    <div className="col-md-6 text-center my-5">
                        <div className="card border-success shadow">
                            <img src="path-to-your-profile-photo.jpg" className="card-img-top rounded-circle" alt="Profile Photo" />
                        </div>
                    </div>
                </div>
                <div className="mt-5 text-center">
                    <button onClick={() => {
                        setTypecards('allStudentJobs');
                        allJobs();
                    }} className="btn btn-info">All Jobs</button>
                    <button onClick={() => {
                        setTypecards('');
                        appliedJobs();
                    }} className="btn btn-warning mx-5">Applied Jobs</button>
                </div>
            </section>

            {/* Job Section */}
            <section className="container-fluid bg-light py-5">
                <div className="container">
                    <h2 className="text-center text-dark mb-4">Alumni Jobs</h2>
                    <Jobcards typecards={typecards} appliedJobs={jobs} />
                </div>
            </section>

            {/* Footer Section */}
            <footer className="container-fluid py-4 text-center bg-secondary text-light">
                <p>&copy; 2024 Your Alumni Network</p>
            </footer>
        </div>

    )
}
