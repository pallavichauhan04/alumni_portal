import { create } from 'zustand'

export const setJobsstore = create((set) => ({
    jobs: [],
    profile: {},
    allJobs: async () => {
        const response = await fetch(`http://localhost:5000/api/job/fetchAll`, {
            method: "GET", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
                "token": localStorage.getItem('token1'),
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
        });
        const json = await response.json();
        set({ jobs: json.jobs })
    },
    appliedJobs: async () => {
        const response = await fetch(`http://localhost:5000/api/applied/fetchAllapplied`, {
            method: "GET", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
                "token": localStorage.getItem('token1'),
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
        });
        const json = await response.json();
        set({ jobs: json.jobs })
    },
    getProfile: async () => {
        const response = await fetch(`http://localhost:5000/api/student/fetchDetails`, {
            method: "GET", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "token": localStorage.getItem('token1'),
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
        });
        const json = await response.json();
        if (json.success === true) {
            set({ profile: json.stud })
        }
        else {
            alert(json.message);
        }
    },
    editProfile: async (name, skills, branch, GPA) => {
        const data = {
        }
        if(name){
            data.name=name;
        }
        if(skills){
            data.skills=skills;
        }
        if(branch){
            data.branch=branch;
        }
        if(GPA){
            data.GPA=GPA;
        }
        
        const response = await fetch(`http://localhost:5000/api/student/editDetails`, {
            method: "PUT", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
                "token": localStorage.getItem('token1'),
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(data),
        });
        const json = await response.json();
        console.log(json);
        
    },

}))

