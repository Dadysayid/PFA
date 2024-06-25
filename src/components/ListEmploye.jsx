import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit'; 

function ListEmploye() {
  const [employeUsers, setEmployeUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchEmployeUsers();
  }, [currentPage, searchTerm]); 

  const fetchEmployeUsers = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/v1/users/pagi?role=employe&page=${currentPage}&search=${searchTerm}`);
      const responseData = await response.json();
      const { data, totalPages } = responseData;
      setEmployeUsers(data);
      setTotalPages(totalPages);
    } catch (error) {
      console.error('Erreur lors de la récupération des utilisateurs employés :', error);
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
      fetchEmployeUsers();
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'utilisateur :', error);
    }
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  return (
    <div>
      {/* Search Form */}
      <div className="card" style={{marginTop:20}}>
        <div className="card-header" style={{backgroundColor:"#007bff"}}>Recherche Employé</div>
        <div className="card-body">
          <form className="form-group">
            <input
              type="text"
              className="form-control"
              id="exampleInputCle1"
              formControlName="keyword"
              placeholder="Taper un mot-clé"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </form>
        </div>
      </div>

      {/* Users Table */}
      <div className="card">
        <div className="card-header" style={{backgroundColor:"#007bff"}}>Liste des employés</div>
        <div className="card-body">
          <table className="table">
            <thead className="thead-dark">
              <tr>
                <th scope="col">First Name</th>
                <th scope="col">Last Name</th>
                <th scope="col">Email</th>
                <th scope="col">Phone</th>
                <th scope="col">Post</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {employeUsers.map(user => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.prenom}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{user.post}</td>
                  <td className="btns">
                    <Link to={`/dashboard/updateE/${user._id}`}>
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
        <div className="pagination">
          <button onClick={handlePreviousPage} disabled={currentPage === 1}>Previous</button>
          <span>{currentPage}</span> / <span>{totalPages}</span>
          <button onClick={handleNextPage} disabled={currentPage === totalPages}>Next</button>
        </div>
      </div>
    </div>
  );
}

export default ListEmploye;
