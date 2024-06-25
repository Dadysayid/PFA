import React, { useState } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link } from 'react-router-dom';
import logo from "../../assest/HrHub (1).png";

function SidebarE() {
    const [isEmployeMenuOpen, setIsEmployeMenuOpen] = useState(false);
    const [isResponsablrhMenuOpen, setIsResponsablrhMenuOpen] = useState(false);
  
    const toggleEmployeMenu = () => {
      setIsEmployeMenuOpen(!isEmployeMenuOpen);
      if (!isEmployeMenuOpen) {
        setIsResponsablrhMenuOpen(false); // Ferme le menu "Responsable RH" s'il est ouvert
      }
    };
  
    const toggleResponsablrhMenu = () => {
      setIsResponsablrhMenuOpen(!isResponsablrhMenuOpen);
      if (!isResponsablrhMenuOpen) {
        setIsEmployeMenuOpen(false); // Ferme le menu "Employe" s'il est ouvert
      }
    };
  
    return (
      <div className='sidebar d-flex flex-column justify-content-space-between text-dark p-4 vh-100' style={{ zIndex: 2 }}>
        <img src={logo} alt="Logo" style={{ width: '100px', height: 'auto', marginLeft: '50px' }} />
        <hr className='text-secondary mt-2' />
        <ul className='nav nav-pills flex-column p-0 m-0'>
          <li className='nav-item'>
            <Link to="/dashbordemploye/profile" className='nav-link text-dark' onClick={toggleEmployeMenu}>
              <i className='bi bi-person-fill me-2 fs-5'></i>
              <span className='fs-5'>Profile</span>
            </Link>
            
          
          </li>
          <li className='nav-item'>
            <a className='nav-link dropdown-toggle text-dark' onClick={toggleResponsablrhMenu}>
            <i className='bi bi-table me-2 fs-5'></i>
              <span className='fs-5'>Vacation</span>
            </a>
            {/* Ne ferme le sous-menu "Responsable RH" que si ce dernier est déjà ouvert */}
            {isResponsablrhMenuOpen && (
              <div>
                <Link to="/dashbordemploye/demandvacation" className='nav-link text-dark'>
                {/* <i className='bi bi-table me-2 fs-5'></i> */}
                  <span className='fs-5'>Request Vacation</span>
                </Link>
                <Link to="/dashbordemploye/myvacation" className='nav-link text-dark'>
                  {/* <i className='bi bi-table me-2 fs-5'></i> */}
                  <span className='fs-5'>My Vacations</span>
                </Link>
              </div>
            )}
          </li>
        
          <li className='nav-item'>
            <Link to="/dashbordemploye/meetings" className='nav-link text-dark'>
              <i className='bi bi-people-fill me-2 fs-5'></i>
              <span className='fs-5'>Meeting</span>
            </Link>
          </li>
          <li className='nav-item'>
          <Link to="/dashbordemploye/annocemntE" className='nav-link text-dark'>
          <i class="bi bi-bell-fill me-2 fs-5"></i>
            <span className='fs-5'>Annocement</span>
          </Link>
        </li>
        </ul>
      </div>
  )
}

export default SidebarE
