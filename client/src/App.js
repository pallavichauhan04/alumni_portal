import './App.css';
import AddJob from './components/addJob';
import CompanyFront from './components/companyFront';
import Login from './components/login';
import Navbar from './components/navbar';
import Signup from './components/signup';
import StudentFront from './components/studentFront';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React from 'react';
import EditProfilestudent from './components/editProfilestudent';
import EditProfilealum from './components/editProfilealum';
import MainChat from './components/mainChat';



function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<StudentFront />} />
        <Route path='/alumFront' element={<CompanyFront />} />
        <Route path='/addAlumJob' element={<AddJob />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/editProfilestudent' element={<EditProfilestudent />} />
        <Route path='/editProfilealum' element={<EditProfilealum />} />
        <Route path='/chattingRoom' element={<MainChat />} />

      </Routes>
    </Router>

  );
}

export default App;
