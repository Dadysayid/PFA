import React, { useState, useEffect } from 'react';
import { Dropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from "../foldercss/nav.module.css"; // Importe les styles du module CSS
import defaultProfileImg from '../assest/profile.png';
import { storage_path } from '../config';

function Navbar() {
  const [profileImg, setProfileImg] = useState('');

  useEffect(() => {
    // Charger l'image de profil depuis l'API au montage du composant
    const userId = localStorage.getItem('id');
    if (userId) {
      fetch(`http://localhost:8000/api/v1/users/${userId}`)
        .then(response => response.json())
        .then(data => {
          setProfileImg(data.data.profileImg || ''); // Ensure profileImg is not undefined
        })
        .catch(error => {
          console.error('Error fetching profile image:', error);
        });
    }
  }, []);

  const handleLogout = () => {
    // Supprimer l'ID de l'utilisateur et l'image de profil du stockage local
    localStorage.removeItem('id');
    localStorage.removeItem('profileImg');
    // Rediriger l'utilisateur vers la page de connexion ou toute autre page appropriée
    window.location.href = '/';
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark  fixed-top" style={{ zIndex: 1,background:"#808080",direction:"rtl" }}>
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Dropdown>
            <Dropdown.Toggle variant="link" id="dropdown-basic" className={`${styles.user} nav-link user mt-2 d-flex align-items-center`}>
            <img src={profileImg ?
              (storage_path + profileImg):defaultProfileImg
              } alt="" className={`${styles['user-image']} user-image mr-1 p-2 `} />
            </Dropdown.Toggle>
            <Dropdown.Menu className={styles['dropdown-menu']}>
              <Dropdown.Item onClick={handleLogout} className={styles['dropdown-item']}>
                Logout
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
