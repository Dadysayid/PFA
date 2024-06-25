import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Employe from "./components/Employe"; // Chemin modifié

import Meeting from "./components/Meeting";
import Vacation from "./components/Vacation";
import LoginPage from "./components/Login";

import Responsablrh from "./components/Responsablrh";


import ListEmploye from "./components/ListEmploye";
import Dash from "./components/Dashbord";
import AddEmployee from "./components/addEmploye";
import AddResponsablrh from "./components/AddResponsablrh";
import Dashbordemploye from "./components/Dashbordemploye";
import Dashbordresponsablerh from "./components/Dashbordresponsablerh";
import ListResponsablerh from "./components/ListResponsablerh";
import UpdateR from "./components/UpdateR";
import UpdateE from "./components/Update.E";
import ProfileEm from "./components/Employe/ProfileEm";

import DemandVacation from "./components/Employe/DemandVacation";

import MyVacation from "./components/Employe/MyVacation";
import MeetingE from "./components/Employe/MeetingE";
import ProfilRe from "./components/ResponsableRh/ProfilRe";
import MeetingRe from "./components/ResponsableRh/MeetingRe";

import ReveiwVacation from "./components/ResponsableRh/ReveiwVacation";
import RequestVacaTion from "./components/ResponsableRh/RequestVacaTion";
import AddMeeting from "./components/ResponsableRh/AddMeeting";
import ListMeeting from "./components/ResponsableRh/ListMeeting";
import Annoncement from "./components/Annoncement";
import AddAnnoncement from "./components/ResponsableRh/AddAnnoncement";
import ListAnnocement from "./components/ResponsableRh/ListAnnocement";
import UpdateMeeting from "./components/ResponsableRh/UpdateMeeting";
import AnnocemnetE from "./components/Employe/AnnocemntE";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dash />}>
          <Route path="addemploye" element={<AddEmployee />} />
          <Route path="employe" element={<Employe />} />
          <Route path="addresponsablerh" element={<AddResponsablrh/>} />
        <Route path="Listemploye" element={<ListEmploye />} />
        <Route path="Listresponsablerh" element={<ListResponsablerh />} />
        <Route path="Responsablerh" element={<Responsablrh />} />
        <Route path="Meeting" element={<Meeting />} />
        <Route path="vacation" element={<Vacation />} />
        <Route path="updateR/:userId" element={<UpdateR />} />
        <Route path="updateE/:userId" element={<UpdateE />} />
        <Route path="annoncement" element={<Annoncement />} />
        </Route>
        <Route path="/dashbordemploye" element={<Dashbordemploye />} >
        <Route path="profile" element={<ProfileEm/>} />
        <Route path="myvacation" element={<MyVacation/>} />
        <Route path="demandvacation" element={<DemandVacation/>} />
        <Route path="meetings" element={<MeetingE/>} />
        <Route path="annocemntE" element={<AnnocemnetE/>} />
        </Route>
        <Route path="/dashborresponsablerh" element={<Dashbordresponsablerh />} >
        <Route path="profiler" element={<ProfilRe/>} />

        <Route path="addannoncement" element={<AddAnnoncement/>} />
        <Route path="listannoncement" element={<ListAnnocement/>} />
        <Route path="reviewvacation" element={<ReveiwVacation/>} />
        <Route path="requestvacation" element={<RequestVacaTion/>} />
        <Route path="updatemeeting/:id" element={<UpdateMeeting/>} />
        <Route path="meetings" element={<MeetingRe/>} />
        <Route path="addmeetings" element={<AddMeeting/>} />
        <Route path="listmeetings" element={<ListMeeting/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
