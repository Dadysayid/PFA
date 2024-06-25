import React, { useState } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link } from 'react-router-dom';
import logo from '../assest/HrHub (1).png';

function Sidebar() {
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
      setIsEmployeMenuOpen(false); // Ferme le menu "Employe" s'il est ouvert, position : 'fixed' , top : 0
    }
  };

  return (
    <div className='sidebar d-flex flex-column justify-content-space-between  text-dark p-4 vh-100' style={{ zIndex: 2 }}>
      <img src={logo} alt="Logo" style={{ width: '100px', height: 'auto', marginLeft: '50px' }} />
      <hr className='text-secondary mt-2' />
      <ul className='nav nav-pills flex-column p-0 m-0'>
        <li className='nav-item'>
          <a className='nav-link dropdown-toggle text-dark' onClick={toggleEmployeMenu}>
            <i className='bi bi-person-fill me-2 fs-5'></i>
            <span className='fs-5'>Employe</span>
          </a>
          {/* Ne ferme le sous-menu "Employe" que si ce dernier est déjà ouvert */}
          {isEmployeMenuOpen && (
            <div>
              <Link to="/dashboard/addemploye" className='nav-link text-dark'>
                {/* <i className='bi bi-person-fill me-2 fs-5'></i> */}
                <span className='fs-5'>Add Employe</span>
              </Link>
              <Link to="/dashboard/listemploye" className='nav-link text-dark'>
                {/* <i className='bi bi-table me-2 fs-5'></i> */}
                <span className='fs-5'>List Employe</span>
              </Link>
            </div>
          )}
        </li>
        <li className='nav-item'>
          <a className='nav-link dropdown-toggle text-dark' onClick={toggleResponsablrhMenu}>
            <i className='bi bi-person-fill me-2 fs-5'></i>
            <span className='fs-5'>Responsable RH</span>
          </a>
          {/* Ne ferme le sous-menu "Responsable RH" que si ce dernier est déjà ouvert */}
          {isResponsablrhMenuOpen && (
            <div>
              <Link to="/dashboard/addresponsablerh" className='nav-link text-dark'>
                {/* <i className='bi bi-person-fill me-2 fs-5'></i> */}
                <span className='fs-5'>Add ResponsableRH</span>
              </Link>
              <Link to="/dashboard/Listresponsablerh" className='nav-link text-dark'>
                {/* <i className='bi bi-table me-2 fs-5'></i> */}
                <span className='fs-5'>List ResponsableRH</span>
              </Link>
            </div>
          )}
        </li>
        <li className='nav-item'>
          <Link to="/dashboard/Vacation" className='nav-link text-dark'>
          <i className='bi bi-table me-2 fs-5'></i>
            <span className='fs-5'>Vacation</span>
          </Link>
        </li>
        <li className='nav-item'>
          <Link to="/dashboard/Meeting" className='nav-link text-dark'>
            <i className='bi bi-people-fill me-2 fs-5'></i>
            <span className='fs-5'>Meeting</span>
          </Link>
        </li>
        <li className='nav-item'>
          <Link to="/dashboard/annoncement" className='nav-link text-dark'>
          <i class="bi bi-bell-fill me-2 fs-5"></i>
            <span className='fs-5'>Annocement</span>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
