import React, { useEffect, useState } from 'react'
import { setJobsstore } from '../zustandStores/studentJobs'
import { useNavigate } from 'react-router-dom';

export default function EditProfilestudent() {

  const navigate=useNavigate();

  useEffect(()=>{
    if(!localStorage.getItem('token1')){
        navigate('/login');
    }
  })

  const getProfile = setJobsstore((state) => state.getProfile);
  const editProfile= setJobsstore((state) => state.editProfile);
  const [profile, setProfile]=useState({name:"", skills:"", branch:"", GPA:0})
    const clickhandler=async (e)=>{
        e.preventDefault();
        if(profile.name===""){
            profile.name=null;
        }
        if(profile.skills===""){
            profile.skills=null;
        }
        if(profile.branch===""){
            profile.branch=null;
        }
        if(profile.GPA===""){
            profile.GPA=null;
        }
        editProfile(profile.name, profile.skills, profile.branch, profile.GPA);
        await getProfile();
        navigate('/');
    }

    const changehandler=(e)=>{
        e.preventDefault();
        setProfile({...profile, [e.target.name]:e.target.value})
        
    }
    return (
        <div>
            <form>
                <div className='container my-3'>
                    <div class="mb-3">
                        <label htmlFor="exampleInputEmail1" class="form-label">Name</label>
                        <input type="String" class="form-control" id="name" value={profile.name} name="name" aria-describedby="emailHelp" onChange={changehandler}/>
                        <div id="emailHelp" class="form-text">Only give if u want to change ur name.</div>
                    </div>
                    <div class="mb-3">
                        <label htmlFor="exampleInputEmail1" class="form-label">Skills</label>
                        <input type="String" class="form-control" id="skills" value={profile.skills} name="skills" aria-describedby="emailHelp" onChange={changehandler}/>
                    </div>
                    <div class="mb-3">
                        <label htmlFor="exampleInputPassword1" class="form-label">Branch</label>
                        <input type="number" class="form-control" id="branch" value={profile.branch} name='branch' onChange={changehandler}/>
                    </div>
                    <div class="mb-3">
                        <label htmlFor="exampleInputPassword1" class="form-label">GPA</label>
                        <input type="number" class="form-control" id="GPA" value={profile.GPA} name='GPA' onChange={changehandler}/>
                    </div>
                    <button type="submit" class="btn btn-primary" onClick={clickhandler}>Edit Profile</button>
                </div>
            </form>
        </div>
    )
}
