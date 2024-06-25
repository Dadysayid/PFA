import React, { useState } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link } from 'react-router-dom';
import logo from '../../assest/HrHub (1).png';

function SidebarR() {
  const [isEmployeMenuOpen, setIsEmployeMenuOpen] = useState(false);
  const [isResponsablrhMenuOpen, setIsResponsablrhMenuOpen] = useState(false);
  const [isMeetingsOpen, setisMeetingsOpen] = useState(false);

  const toggleEmployeMenu = () => {
    setIsEmployeMenuOpen(!isEmployeMenuOpen);
    if (!isEmployeMenuOpen) {
      setIsResponsablrhMenuOpen(false); // Ferme le menu "Responsable RH" s'il est ouvert
      setisMeetingsOpen(false); // Ferme le menu "Announcement" s'il est ouvert
    }
  };

  const toggleResponsablrhMenu = () => {
    setIsResponsablrhMenuOpen(!isResponsablrhMenuOpen);
    if (!isResponsablrhMenuOpen) {
      setIsEmployeMenuOpen(false); // Ferme le menu "Employe" s'il est ouvert
      setisMeetingsOpen(false); // Ferme le menu "Announcement" s'il est ouvert
    }
  };

  const toggleMeetingOpen = () => {
    setisMeetingsOpen(!isMeetingsOpen);
    if (!isMeetingsOpen) {
      setIsEmployeMenuOpen(false); // Ferme le menu "Employe" s'il est ouvert
      setIsResponsablrhMenuOpen(false); // Ferme le menu "Responsable RH" s'il est ouvert
    }
  };

  return (
    <div className='sidebar d-flex flex-column justify-content-space-between text-dark p-4 vh-100' style={{ zIndex: 2 }}>
      <img src={logo} alt="Logo" style={{ width: '100px', height: 'auto', marginLeft: '50px' }} />
      <hr className='text-secondary mt-2' />
      <ul className='nav nav-pills flex-column p-0 m-0'>
        <li className='nav-item'>
          <Link to="/dashborresponsablerh/profiler" className='nav-link text-dark'>
            <i className='bi bi-person-fill me-2 fs-5'></i>
            <span className='fs-5'>Profile</span>
          </Link>
        </li>
        <li className='nav-item'>
          <a className='nav-link dropdown-toggle text-dark' onClick={toggleResponsablrhMenu}>
            <i className='bi bi-table me-2 fs-5'></i>
            <span className='fs-5'>Vacation</span>
          </a>
          {isResponsablrhMenuOpen && (
            <div>
              <Link to="/dashborresponsablerh/requestvacation" className='nav-link text-dark'>
                <span className='fs-5'>Requests for Vacation</span>
              </Link>
              <Link to="/dashborresponsablerh/reviewvacation" className='nav-link text-dark'>
                <span className='fs-5'>Review Vacation</span>
              </Link>
            </div>
          )}
        </li>
        <li className='nav-item'>
          <a className='nav-link dropdown-toggle text-dark' onClick={toggleEmployeMenu}>
            <i className='bi bi-people-fill me-2 fs-5'></i>
            <span className='fs-5'>Meeting</span>
          </a>
          {isEmployeMenuOpen && (
            <div>
              <Link to="/dashborresponsablerh/addmeetings" className='nav-link text-dark'>
                <span className='fs-5'>Add Meeting</span>
              </Link>
              <Link to="/dashborresponsablerh/listmeetings" className='nav-link text-dark'>
                <span className='fs-5'>List Meeting</span>
              </Link>
            </div>
          )}
        </li>
        <li className='nav-item'>
          <a className='nav-link dropdown-toggle text-dark' onClick={toggleMeetingOpen}>
            <i className="bi bi-bell-fill me-2 fs-5"></i>
            <span className='fs-5'>Announcement</span>
          </a>
          {isMeetingsOpen && (
            <div>
              <Link to="/dashborresponsablerh/addannoncement" className='nav-link text-dark'>
                <span className='fs-5'>Add Announcement</span>
              </Link>
              <Link to="/dashborresponsablerh/listannoncement" className='nav-link text-dark'>
                <span className='fs-5'>List Announcement</span>
              </Link>
            </div>
          )}
        </li>
      </ul>
    </div>
  );
}

export default SidebarR;
