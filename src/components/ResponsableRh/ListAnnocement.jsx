import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../../foldercss/Listannocemnt.module.css';

function ListAnnouncement() {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 2; // Limite d'annonces par page

  const fetchAnnouncements = async (page) => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8000/api/v1/annocement?page=${currentPage}&limit=${limit}`);
      if (!response.ok) {
        throw new Error('Failed to fetch announcements');
      }
      const data = await response.json();
      setAnnouncements(data.data);
      // Assume we get the total number of announcements from the API for simplicity
      const totalAnnouncements = data.total; 
      setTotalPages(totalAnnouncements);
    } catch (error) {
      console.error('Error fetching announcements:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnnouncements(currentPage);
  }, [currentPage]);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`container mt-5 ${styles.container}`}>
      <div className="card shadow-sm">
        <div className="card-header bg-primary text-white text-center">
          <h4 className="mb-0">List of Announcements</h4>
        </div>
        <div className="card-body">
          {announcements.length > 0 ? (
            <table className="table table-striped table-hover">
              <thead className="thead-dark">
                <tr>
                  <th scope="col">Title</th>
                  <th scope="col">Content</th>
                </tr>
              </thead>
              <tbody>
                {announcements.map((announcement) => (
                  <tr key={announcement._id}>
                    <td className="border-right">{announcement.title}</td>
                    <td>{announcement.content}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="alert alert-warning text-center" role="alert">
              No announcements found.
            </div>
          )}
        </div>
        <div className="pagination d-flex justify-content-between">
          <button onClick={handlePreviousPage} disabled={currentPage === 1} className="btn btn-primary">
            Previous
          </button>
          <span className="align-self-center">{currentPage} / {totalPages}</span>
          <button onClick={handleNextPage} disabled={currentPage === totalPages} className="btn btn-primary">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default ListAnnouncement;
