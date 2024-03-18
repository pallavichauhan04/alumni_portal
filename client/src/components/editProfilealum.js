import React, { useEffect, useState } from 'react'
import { alumJobsstore } from '../zustandStores/alumJobs'
import { useNavigate } from 'react-router-dom';

export default function EditProfilealum() {

  const navigate=useNavigate();

  useEffect(()=>{
    if(!localStorage.getItem('token2')){
        navigate('/login');
    }
  })

  const getProfile = alumJobsstore((state) => state.getProfile);
  const editProfile= alumJobsstore((state) => state.editProfile);
  const [profile, setProfile]=useState({work:"", founders:"", ph_no:0, year_founded_in:0})
    const clickhandler=async (e)=>{
        e.preventDefault();
        if(profile.work===""){
            profile.work=null;
        }
        if(profile.founders===""){
            profile.founders=null;
        }
        if(profile.ph_no==="" || profile.ph_no===0){
            profile.ph_no=null;
        }
        if(profile.year_founded_in==="" || profile.year_founded_in===0){
            profile.year_founded_in=null;
        }
        editProfile(profile.work, profile.founders, profile.ph_no, profile.year_founded_in);
        await getProfile();
        navigate('/alumFront');
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
                        <label htmlFor="exampleInputEmail1" class="form-label">Work</label>
                        <input type="String" class="form-control" id="work" value={profile.work} name="work" aria-describedby="emailHelp" onChange={changehandler}/>
                        <div id="emailHelp" class="form-text">Give a brief context of what your company does.</div>
                    </div>
                    <div class="mb-3">
                        <label htmlFor="exampleInputEmail1" class="form-label">Founders</label>
                        <input type="String" class="form-control" id="founders" value={profile.founders} name="founders" aria-describedby="emailHelp" onChange={changehandler}/>
                    </div>
                    <div class="mb-3">
                        <label htmlFor="exampleInputPassword1" class="form-label">Phone Number</label>
                        <input type="number" class="form-control" id="ph_no" value={profile.ph_no} name='ph_no' onChange={changehandler}/>
                        <div id="emailHelp" class="form-text">Give a number which can be used to contact you.</div>
                    </div>
                    <div class="mb-3">
                        <label htmlFor="exampleInputPassword1" class="form-label">Year Founded In</label>
                        <input type="number" class="form-control" id="year_founded_in" value={profile.year_founded_in} name='year_founded_in' onChange={changehandler}/>
                        <div id="emailHelp" class="form-text">The year in which your company was found.</div>
                    </div>
                    <button type="submit" class="btn btn-primary" onClick={clickhandler}>Edit Profile</button>
                </div>
            </form>
        </div>
    )
}
