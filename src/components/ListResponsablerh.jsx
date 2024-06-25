// ListResponsablerh.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "../foldercss/list.css";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit'; 

function ListResponsablerh() {
  const [responsablerhUsers, setResponsablerhUsers] = useState([]);

  useEffect(() => {
    fetchResponsablerhUsers();
  }, []);

  const fetchResponsablerhUsers = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/v1/users?role=responsablerh');
      const responseData = await response.json();
      const usersData = responseData.data;
      setResponsablerhUsers(usersData);
    } catch (error) {
      console.error('Erreur lors de la récupération des utilisateurs responsablerh :', error);
    }
  };

  const deleteUser = async (userId) => {
    try {
      await fetch(`http://localhost:8000/api/v1/users/${userId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      fetchResponsablerhUsers();
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'utilisateur :', error);
    }
  };

  return (
    <div>
      <div className="card" style={{marginTop:20}}>
        <div className="card-header" style={{backgroundColor:"#007bff"}}>Recherche Responsble RH</div>
        <div className="card-body">
          <form className="form-group">
            <input
              type="text"
              className="form-control"
              id="exampleInputCle1"
              formControlName="keyword"
              placeholder="Taper un mot-clé"
            />
          </form>
        </div>
      </div>

      <div className="card">
        <div className="card-header" style={{backgroundColor:"#007bff"}}>Liste des Responsable Rh</div>
        <div className="card-body">
          <table className="table">
            <thead className="thead-dark">
              <tr>
                <th scope="col">Nom</th>
                <th scope="col">Prénom</th>
                <th scope="col">Email</th>
                <th scope="col">Téléphone</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {responsablerhUsers.map(user => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.prenom}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td className="btns">
                    <Link to={`/dashboard/updateR/${user._id}`}>
                      <EditIcon aria-hidden="false" className="edit" aria-label="Modifier" />
                    </Link>
                    <Link onClick={() => deleteUser(user._id)}>
                      <DeleteIcon aria-hidden="false" className="delete" aria-label="Supprimer" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <ul className="nav nav-pills">
          <li>
            <a className="btn mt-1 ms-1"></a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default ListResponsablerh;
