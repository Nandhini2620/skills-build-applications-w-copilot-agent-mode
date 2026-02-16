import React, { useState, useEffect } from 'react';

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        let apiUrl;
        if (process.env.REACT_APP_CODESPACE_NAME) {
          apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/activities/`;
        } else {
          apiUrl = `http://localhost:8000/api/activities/`;
        }
        
        console.log('Fetching Activities from:', apiUrl);
        
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Activities data received:', data);
        
        // Handle both paginated and plain array responses
        const activitiesList = data.results || data;
        setActivities(Array.isArray(activitiesList) ? activitiesList : []);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching activities:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  if (loading)
    return (
      <div className="container mt-5">
        <div className="alert alert-info text-center">
          <div className="spinner-border text-info me-2" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          Loading Activities...
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
        <i className="bi bi-activity me-2"></i>Activities Management
      </h2>

      {activities.length === 0 ? (
        <div className="alert alert-warning" role="alert">
          <strong>No Data</strong> - No activities found. Add activities to get started!
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover table-striped">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Activity Name</th>
                <th scope="col">Description</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((activity, index) => (
                <tr key={activity._id || activity.id}>
                  <th scope="row">{index + 1}</th>
                  <td>
                    <strong>{activity.name}</strong>
                  </td>
                  <td>{activity.description || 'N/A'}</td>
                  <td>
                    <button className="btn btn-sm btn-primary me-2">
                      View
                    </button>
                    <button className="btn btn-sm btn-secondary">
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Activities;
