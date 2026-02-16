import React, { useState, useEffect } from 'react';

const Leaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        let apiUrl;
        if (process.env.REACT_APP_CODESPACE_NAME) {
          apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/leaderboards/`;
        } else {
          apiUrl = `http://localhost:8000/api/leaderboards/`;
        }
        
        console.log('Fetching Leaderboard from:', apiUrl);
        
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Leaderboard data received:', data);
        
        // Handle both paginated and plain array responses
        const leaderboardList = data.results || data;
        setLeaderboardData(Array.isArray(leaderboardList) ? leaderboardList : []);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  if (loading)
    return (
      <div className="container mt-5">
        <div className="alert alert-info text-center">
          <div className="spinner-border text-info me-2" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          Loading Leaderboard...
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
        <i className="bi bi-trophy me-2"></i>Competitive Leaderboard
      </h2>

      {leaderboardData.length === 0 ? (
        <div className="alert alert-warning" role="alert">
          <strong>No Data</strong> - Leaderboard is empty. Start earning points!
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover table-striped">
            <thead>
              <tr>
                <th scope="col" style={{ width: '5%' }}>
                  🏅
                </th>
                <th scope="col">User</th>
                <th scope="col" style={{ width: '15%' }}>
                  Points
                </th>
                <th scope="col" style={{ width: '15%' }}>
                  Activities
                </th>
              </tr>
            </thead>
            <tbody>
              {leaderboardData.map((entry, index) => {
                const medals = ['🥇', '🥈', '🥉'];
                const medal = medals[index] || '•';

                return (
                  <tr
                    key={entry._id || entry.id}
                    className={index < 3 ? `table-${['success', 'warning', 'info'][index]}` : ''}
                  >
                    <td>
                      <strong>{medal}</strong>
                    </td>
                    <td>
                      <strong>{entry.user_name || entry.username || entry.user}</strong>
                    </td>
                    <td>
                      <span className="badge bg-primary">{entry.points || 0}</span>
                    </td>
                    <td>
                      <span className="badge bg-secondary">
                        {entry.activity_count || entry.activities || 0}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      <div className="row mt-4">
        <div className="col-md-4">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title">Total Participants</h5>
              <p className="display-4 text-success">{leaderboardData.length}</p>
            </div>
          </div>
        </div>
        {leaderboardData.length > 0 && (
          <>
            <div className="col-md-4">
              <div className="card text-center">
                <div className="card-body">
                  <h5 className="card-title">Top Points</h5>
                  <p className="display-4 text-primary">{leaderboardData[0]?.points || 0}</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card text-center">
                <div className="card-body">
                  <h5 className="card-title">Top User</h5>
                  <p className="display-6">
                    {leaderboardData[0]?.user_name || leaderboardData[0]?.username || 'N/A'}
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Leaderboard;
