import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MeetingE = () => {
  const [meetings, setMeetings] = useState([]);



  useEffect(() => {
    fetchMeetings();
  }, []);

  const fetchMeetings = async () => {
    try {
      const id =localStorage.getItem("id")
      const response = await axios.get(`http://localhost:8000/api/v1/meeting/paticipant?id=${id}`);
      setMeetings(response.data.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des réunions :', error);
    }
  };
  
  return (
    <div className="card " style={{marginTop:20}}>
      <div className="card-header bg-primary">Meeting</div>
      <div className="card-body">
        <table className="table">
          <thead>
            <tr>
              <th>title</th>
              <th>Date</th>
              <th>time</th>
              <th>Room</th>
            </tr>
          </thead>
          <tbody>
            {meetings.map((meeting) => (
              <tr key={meeting._id}>
                <td>{meeting.title}</td>
                <td>{new Date(meeting.date).toLocaleDateString()}</td>
                <td>{meeting.time}</td>
                <td>{meeting.salle}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MeetingE;
