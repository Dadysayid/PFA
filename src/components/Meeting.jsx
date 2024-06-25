import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

const Meeting = () => {
  const [meetings, setMeetings] = useState([]);

  useEffect(() => {
    fetchMeetings();
  }, []);

  const fetchMeetings = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/v1/meeting');
      setMeetings(response.data.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des réunions :', error);
    }
  };

  const handleEdit = (meetingId) => {
    // Logique pour gérer l'édition de la réunion avec l'ID meetingId
    console.log(`Modifier la réunion avec l'ID ${meetingId}`);
  };

  const handleDelete = (meetingId) => {
    // Logique pour gérer la suppression de la réunion avec l'ID meetingId
    console.log(`Supprimer la réunion avec l'ID ${meetingId}`);
  };

  return (
    <div className="card " style={{marginTop:40}}>
      <div className="card-header bg-primary" >Liste des réunions</div>
      <div className="card-body">
        <table className="table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Title</th>
              <th>Heure</th>
              <th>Salle</th>
              <th>Participants</th>
           
            </tr>
          </thead>
          <tbody>
            {meetings.map((meeting) => (
              <tr key={meeting._id}>
                <td>{new Date(meeting.date).toLocaleDateString()}</td>
                <td>{meeting.title}</td>
                <td>{meeting.time}</td>
                <td>{meeting.salle}</td>
                <td>
                  {meeting.participants.map((res, index) => (
                    <span key={index}>
                      <strong style={{ fontSize: "10px" }}>
                        {res.name} {res.prenom} {res.post}
                      </strong>
                      {index !== meeting.participants.length - 1 && ", "}
                    </span>
                  ))}
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Meeting;
