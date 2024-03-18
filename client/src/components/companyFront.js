import React, { useEffect } from 'react'
import Jobcards from './jobcards';
import { alumJobsstore } from '../zustandStores/alumJobs'
import { useNavigate } from 'react-router-dom';

export default function CompanyFront() {
    const jobs = alumJobsstore((state) => state.jobs);
    const allCompanyJobs = alumJobsstore((state) => state.allCompanyJobs);
    const profile=alumJobsstore((state) => state.profile);
    const getProfile=alumJobsstore((state) => state.getProfile);
    const navigate = useNavigate();


    useEffect(() => {
        if (localStorage.getItem('token2')) {
            allCompanyJobs();
            getProfile();
        }
        else {
            navigate('/login');
        }
    });



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
                                <li><strong>Name: </strong> {profile.name}</li>
                                <li><strong>Email: </strong>{profile.mail} </li>
                                <li><strong>Work: </strong>{profile.work}</li>
                                <li><strong>phone no.: </strong>{profile.ph_no}</li>
                                <li><strong>Year Founded In: </strong>{profile.year_founded_in}</li>
                                <li><strong>Founders: </strong>{profile.founders}</li>

                            </ul>
                            <button className="btn btn-secondary btn-lg mt-4" onClick={()=>{
                                navigate('/editProfilealum')
                            }}>Edit Info</button>
                        </div>
                    </div>
                    <div className="col-md-6 text-center my-5">
                        <div className="card border-success shadow">
                            <img src="path-to-your-profile-photo.jpg" className="card-img-top rounded-circle" alt="Profile Photo" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Job Section */}
            <section className="container-fluid bg-light py-5">
                <div className="container">
                    <h2 className="text-center text-dark mb-4">Jobs posted by you</h2>
                    <Jobcards typecards='allAlumjobs' appliedJobs={jobs} />
                </div>
            </section>

            {/* Add more sections, features, or content as needed */}

            {/* Footer Section */}
            <footer className="container-fluid py-4 text-center bg-secondary text-light">
                <p>&copy; 2024 Your Alumni Network</p>
            </footer>
        </div>
    )
}
