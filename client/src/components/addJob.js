import React, { useEffect, useState } from 'react'
import { alumJobsstore } from '../zustandStores/alumJobs'
import { useNavigate } from 'react-router-dom';

export default function AddJob() {

  const navigate=useNavigate();

  useEffect(()=>{
    if(!localStorage.getItem('token2')){
        navigate('/login');
    }
  })

  const addJob = alumJobsstore((state) => state.addJob);
  const allCompanyJobs = alumJobsstore((state) => state.allCompanyJobs);
  const [job, setJob]=useState({name:"", role:"", stipend:0})
    const clickhandler=(e)=>{
        e.preventDefault();
        addJob(job.name, job.role, job.stipend);
        allCompanyJobs();
        navigate('/alumFront');
    }

    const changehandler=(e)=>{
        e.preventDefault();
        setJob({...job, [e.target.name]:e.target.value})
        
    }
    return (
        <div>
            <form>
                <div className='container my-3'>
                    <div class="mb-3">
                        <label htmlFor="exampleInputEmail1" class="form-label">Name</label>
                        <input type="String" class="form-control" id="name" value={job.name} name="name" aria-describedby="emailHelp" onChange={changehandler}/>
                        <div id="emailHelp" class="form-text">Always keep a brief Name for the company.</div>
                    </div>
                    <div class="mb-3">
                        <label htmlFor="exampleInputEmail1" class="form-label">Role</label>
                        <input type="String" class="form-control" id="role" value={job.role} name="role" aria-describedby="emailHelp" onChange={changehandler}/>
                    </div>
                    <div class="mb-3">
                        <label htmlFor="exampleInputPassword1" class="form-label">Stipend</label>
                        <input type="number" class="form-control" id="stipend" value={job.stipend} name='stipend' onChange={changehandler}/>
                    </div>
                    <button type="submit" class="btn btn-primary" onClick={clickhandler}>Add Job</button>
                </div>
            </form>
        </div>
    )
}
