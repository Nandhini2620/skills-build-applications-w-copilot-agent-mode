import React, { useState, useEffect } from 'react';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        let apiUrl;
        if (process.env.REACT_APP_CODESPACE_NAME) {
          apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/users/`;
        } else {
          apiUrl = `http://localhost:8000/api/users/`;
        }
        
        console.log('Fetching Users from:', apiUrl);
        
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Users data received:', data);
        
        // Handle both paginated and plain array responses
        const usersList = data.results || data;
        setUsers(Array.isArray(usersList) ? usersList : []);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching users:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading)
    return (
      <div className="container mt-5">
        <div className="alert alert-info text-center">
          <div className="spinner-border text-info me-2" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          Loading Users...
        </div>
      </div>
    );

  if (error)
    return (
      <div className="container mt-5">
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
          <strong>Error:</strong> {error}
          <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
      </div>
    );

  return (
    <div className="container mt-4 mb-4">
      <h2 className="mb-4">
        <i className="bi bi-person-circle me-2"></i>User Profiles
      </h2>

      {users.length === 0 ? (
        <div className="alert alert-warning" role="alert">
          <strong>No Users</strong> - No user profiles found.
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover table-striped">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Username</th>
                <th scope="col">Email</th>
                <th scope="col">Team</th>
                <th scope="col">Status</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user._id || user.id}>
                  <th scope="row">{index + 1}</th>
                  <td>
                    <strong>{user.username}</strong>
                  </td>
                  <td>
                    <a href={`mailto:${user.email}`}>{user.email}</a>
                  </td>
                  <td>
                    <span className="badge bg-info text-dark">
                      {user.team_name || user.team || 'Unassigned'}
                    </span>
                  </td>
                  <td>
                    <span className={`badge bg-${user.is_active ? 'success' : 'secondary'}`}>
                      {user.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td>
                    <button className="btn btn-sm btn-primary me-2">
                      <i className="bi bi-eye"></i>
                    </button>
                    <button className="btn btn-sm btn-secondary">
                      <i className="bi bi-pencil"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {users.length > 0 && (
        <div className="row mt-4">
          <div className="col-md-4">
            <div className="card text-center">
              <div className="card-body">
                <h5 className="card-title">Total Users</h5>
                <p className="display-4 text-success">{users.length}</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card text-center">
              <div className="card-body">
                <h5 className="card-title">Active Users</h5>
                <p className="display-4 text-primary">
                  {users.filter((u) => u.is_active).length}
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card text-center">
              <div className="card-body">
                <h5 className="card-title">Teams</h5>
                <p className="display-4 text-info">
                  {new Set(users.map((u) => u.team_name || u.team || 'Unassigned')).size}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
