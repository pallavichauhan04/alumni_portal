import React from 'react'

export default function Jobcards(props) {
    const applyhandler = async (id) => {
        const response = await fetch(`http://localhost:5000/api/applied/applyJob/${id}`, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
                "token": localStorage.getItem('token1')
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },

        });

        const json = await response.json();
        if (json.success === false) {
            alert(json.message);
        }
    }

    const deletehandler = async (id) => {
        const response = await fetch(`http://localhost:5000/api/job/deleteJob/${id}`, {
            method: "DELETE", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
                "token": localStorage.getItem('token2')
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },

        });

        const json = await response.json();
        if (json.success === false) {
            alert(json.message);
        }
    }
    return (
        <div data-bs-spy="scroll" data-bs-target="#navbar-example2" data-bs-root-margin="0px 0px -40%" data-bs-smooth-scroll="true" className="col-6 scrollspy-example bg-body-tertiary p-3 rounded-2 container" tabIndex="0">
            {props.appliedJobs.map((job) => {
                return (
                    // <div key={appliedJobs.indexOf(job)} style={styles}>
                    //     {fruit}
                    // </div>
                    // <div key={job._id} className="card my-2">
                    //     <div className="card-body">
                    //         <h5 className="card-title">{job.name}</h5>
                    //         <p className="card-text">{job.role}</p>
                    //         <p className="card-text">{`Rs ${job.stipend}`}</p>

                    //         {props.typecards === 'allStudentJobs' && <button className="btn btn-secondary" onClick={(e) => {
                    //             e.preventDefault();
                    //             applyhandler(job._id);
                    //         }}>Apply</button>}
                    //         {props.typecards === 'allAlumjobs' && <button className="btn btn-danger" onClick={(e) => {
                    //             e.preventDefault();
                    //             deletehandler(job._id);
                    //         }}>Delete</button>}
                    //     </div>
                    // </div>
                    <div key={job._id} className="card my-2 border-dark">
                        <div className="card-body">
                            <h5 className="card-title text-secondary">{job.name}</h5>
                            <p className="card-text">{job.role}</p>
                            <p className="card-text">Stipend: Rs {job.stipend}</p>

                            {props.typecards === 'allStudentJobs' &&
                                <button className="btn btn-outline-success" onClick={(e) => {
                                    e.preventDefault();
                                    applyhandler(job._id);
                                }}>
                                    Apply Now
                                </button>
                            }

                            {props.typecards === 'allAlumjobs' &&
                                <button className="btn btn-outline-danger" onClick={(e) => {
                                    e.preventDefault();
                                    deletehandler(job._id);
                                }}>
                                    Delete Job
                                </button>
                            }
                        </div>
                    </div>

                )
            })}
        </div>
    )
}
