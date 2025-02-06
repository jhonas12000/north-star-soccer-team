import { Route, Routes } from 'react-router-dom';
import './App.css'
import React from "react";
import Navbar from './components/Navbar';
import  About  from './components/pages/About';
import  Contact  from './components/pages/Contact';
import  Matches  from './components/pages/Matches';
import Players from './components/pages/Players';
import Home from './components/pages/Home';
import Login from './components/pages/Login';
import Layout from './components/Layout';
import Parents from './components/pages/Parents';
//import  {About, Contact, Matches, Players, Home} from './components/pages;


const App: React.FC = () => {
  return (
    <div>
      <Navbar />
      <Layout>
        <Routes>
        
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contacts" element={<Contact />} />
          <Route path="/matches" element={<Matches />} />
          <Route path="/players" element={<Players />} />
          <Route path="/parents" element={<Parents />} />
          <Route path="/login" element={<Login />} />
        
        </Routes>
       </Layout>
    </div>
    
  );
};

export default App;
