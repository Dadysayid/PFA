import React from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'

import {Outlet, Route } from 'react-router';
import AddEmployee from './addEmploye';

function Dash() {
  return (

    <div className="container-fluid">
       <Navbar />
      <div className="row" style={{marginTop : '54px'}}>

        <div className="col-lg-3 p-0">
          <Sidebar />
        </div>
        <div className="col-lg-9" style={{ backgroundColor: '#f0e9ee' }}  >
         
          <div className="content">
            {/* Votre contenu de tableau de bord va ici */}
            <Outlet/>
           
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dash
