import React from 'react'
import SidebarR from './ResponsableRh/SidebarR'
import Navbar from './Navbar'

import {Outlet, Route } from 'react-router';
function Dashbordresponsablerh() {
  return (
    <div className="container-fluid">
    <Navbar/>
   <div className="row" style={{marginTop : '54px'}}>

     <div className="col-lg-3 p-0">
       <SidebarR/>
     </div>
     <div className="col-lg-9"  style={{ backgroundColor: '#f0e9ee' }}>
      
       <div className="content">
         {/* Votre contenu de tableau de bord va ici */}
         <Outlet/>
        
       </div>
     </div>
   </div>
 </div>
  )
}

export default Dashbordresponsablerh
