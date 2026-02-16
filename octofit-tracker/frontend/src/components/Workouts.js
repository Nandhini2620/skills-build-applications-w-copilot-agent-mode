import React, { useState, useEffect } from 'react';

const Workouts = () => {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        let apiUrl;
        if (process.env.REACT_APP_CODESPACE_NAME) {
          apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`;
        } else {
          apiUrl = `http://localhost:8000/api/workouts/`;
        }
        
        console.log('Fetching Workouts from:', apiUrl);
        
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Workouts data received:', data);
        
        // Handle both paginated and plain array responses
        const workoutsList = data.results || data;
        setWorkouts(Array.isArray(workoutsList) ? workoutsList : []);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching workouts:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, []);

  if (loading)
    return (
      <div className="container mt-5">
        <div className="alert alert-info text-center">
          <div className="spinner-border text-info me-2" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          Loading Workouts...
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
        <i className="bi bi-heart-pulse me-2"></i>Personalized Workout Suggestions
      </h2>

      {workouts.length === 0 ? (
        <div className="alert alert-warning" role="alert">
          <strong>No Workouts</strong> - No workout suggestions available. Create a workout plan!
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover table-striped">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Workout Name</th>
                <th scope="col">Duration (min)</th>
                <th scope="col">Calories Burned</th>
                <th scope="col">Intensity</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {workouts.map((workout, index) => {
                const intensity = workout.intensity || 'Medium';
                const intensityClass =
                  intensity === 'High' ? 'danger' : intensity === 'Low' ? 'info' : 'warning';

                return (
                  <tr key={workout._id || workout.id}>
                    <th scope="row">{index + 1}</th>
                    <td>
                      <strong>{workout.name}</strong>
                    </td>
                    <td>
                      <i className="bi bi-hourglass-end me-2"></i>
                      {workout.duration || 0} min
                    </td>
                    <td>
                      <i className="bi bi-fire me-2"></i>
                      <span className="badge bg-danger">{workout.calories || 0}</span>
                    </td>
                    <td>
                      <span className={`badge bg-${intensityClass}`}>{intensity}</span>
                    </td>
                    <td>
                      <button className="btn btn-sm btn-primary me-2">
                        <i className="bi bi-play-fill"></i>
                      </button>
                      <button className="btn btn-sm btn-secondary">
                        <i className="bi bi-pencil"></i>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {workouts.length > 0 && (
        <div className="row mt-4">
          <div className="col-md-4">
            <div className="card text-center">
              <div className="card-body">
                <h5 className="card-title">Total Workouts</h5>
                <p className="display-4 text-success">{workouts.length}</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card text-center">
              <div className="card-body">
                <h5 className="card-title">Avg Duration</h5>
                <p className="display-4 text-primary">
                  {Math.round(
                    workouts.reduce((sum, w) => sum + (w.duration || 0), 0) / workouts.length
                  )}{' '}
                  min
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card text-center">
              <div className="card-body">
                <h5 className="card-title">Total Calories</h5>
                <p className="display-4 text-danger">
                  {workouts.reduce((sum, w) => sum + (w.calories || 0), 0)}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Workouts;
