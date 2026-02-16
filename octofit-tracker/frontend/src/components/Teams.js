import React, { useState, useEffect } from 'react';

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        let apiUrl;
        if (process.env.REACT_APP_CODESPACE_NAME) {
          apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/teams/`;
        } else {
          apiUrl = `http://localhost:8000/api/teams/`;
        }
        
        console.log('Fetching Teams from:', apiUrl);
        
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Teams data received:', data);
        
        // Handle both paginated and plain array responses
        const teamsList = data.results || data;
        setTeams(Array.isArray(teamsList) ? teamsList : []);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching teams:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  if (loading)
    return (
      <div className="container mt-5">
        <div className="alert alert-info text-center">
          <div className="spinner-border text-info me-2" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          Loading Teams...
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
        <i className="bi bi-people me-2"></i>Team Management
      </h2>

      {teams.length === 0 ? (
        <div className="alert alert-warning" role="alert">
          <strong>No Teams</strong> - No teams found. Create a team to get started!
        </div>
      ) : (
        <div className="row g-4">
          {teams.map((team) => (
            <div key={team._id || team.id} className="col-md-6 col-lg-4">
              <div className="card h-100">
                <div className="card-header bg-primary text-white">
                  <h5 className="card-title mb-0">
                    <i className="bi bi-flag me-2"></i>
                    {team.name}
                  </h5>
                </div>
                <div className="card-body">
                  <p className="card-text">{team.description || 'No description provided.'}</p>

                  <div className="row mt-3">
                    <div className="col-6">
                      <div className="text-center p-2 bg-light rounded">
                        <p className="small text-muted mb-1">Members</p>
                        <p className="h4 mb-0 text-primary">
                          {team.member_count || team.members?.length || 0}
                        </p>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="text-center p-2 bg-light rounded">
                        <p className="small text-muted mb-1">Status</p>
                        <span className="badge bg-success">Active</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card-footer bg-light">
                  <button className="btn btn-primary btn-sm me-2 w-45">
                    <i className="bi bi-eye me-1"></i>View
                  </button>
                  <button className="btn btn-secondary btn-sm">
                    <i className="bi bi-pencil me-1"></i>Edit
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {teams.length > 0 && (
        <div className="row mt-5">
          <div className="col-md-3">
            <div className="card text-center">
              <div className="card-body">
                <h6 className="card-title">Total Teams</h6>
                <p className="display-5 text-success">{teams.length}</p>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card text-center">
              <div className="card-body">
                <h6 className="card-title">Total Members</h6>
                <p className="display-5 text-primary">
                  {teams.reduce((sum, team) => sum + (team.member_count || team.members?.length || 0), 0)}
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card text-center">
              <div className="card-body">
                <h6 className="card-title">Largest Team</h6>
                <p className="display-5 text-info">
                  {Math.max(...teams.map((t) => t.member_count || t.members?.length || 0))}
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card text-center">
              <div className="card-body">
                <h6 className="card-title">Status</h6>
                <span className="badge bg-success p-2">All Active</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Teams;
