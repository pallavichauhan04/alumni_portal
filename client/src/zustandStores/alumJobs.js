import { create } from 'zustand'

export const alumJobsstore = create((set) => ({
    jobs: [],
    profile:{},
    addJob: async (name, role, stipend) => {
        const data = {
            name: name,
            role: role,
            stipend: stipend
        }
        const response = await fetch(`http://localhost:5000/api/job/addJob`, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
                "token": localStorage.getItem('token2'),
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(data),
        });
        const json = await response.json();
        console.log(json);
    },
    allCompanyJobs: async () => {
        const response = await fetch(`http://localhost:5000/api/job/fetchAllbyId`, {
            method: "GET", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
                "token": localStorage.getItem('token2'),
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
        });
        const json = await response.json();
        set({ jobs: json.jobs })
    },
    getProfile: async () => {
        const response = await fetch(`http://localhost:5000/api/alum/fetchDetails`, {
            method: "GET", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "token": localStorage.getItem('token2'),
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
        });
        const json = await response.json();
        if (json.success === true) {
            set({ profile: json.alum })
        }
        else {
            alert(json.message);
        }
    },
    editProfile: async (work, founders, ph_no, year_founded_in) => {
        const data = {
        }
        if(work){
            data.work=work;
        }
        if(founders){
            data.founders=founders;
        }
        if(ph_no){
            data.ph_no=ph_no;
        }
        if(year_founded_in){
            data.year_founded_in=year_founded_in;
        }
        
        const response = await fetch(`http://localhost:5000/api/alum/editDetails`, {
            method: "PUT", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
                "token": localStorage.getItem('token2'),
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(data),
        });
        const json = await response.json();
        console.log(json);
        
    }

    

}))

