import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';

function App() {
  console.log('App component rendering');
  console.log('Codespace Name:', process.env.REACT_APP_CODESPACE_NAME);

  const getBackendUrl = () => {
    if (process.env.REACT_APP_CODESPACE_NAME) {
      return `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev`;
    } else {
      return `http://localhost:8000`;
    }
  };

  console.log('Backend URL:', getBackendUrl());

  return (
    <Router>
      <div className="App">
        {/* Navigation Bar */}
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
              <i className="bi bi-github me-2"></i>🐙 OctoFit Tracker
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/activities">
                    <i className="bi bi-activity me-1"></i>Activities
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/workouts">
                    <i className="bi bi-heart-pulse me-1"></i>Workouts
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/teams">
                    <i className="bi bi-people me-1"></i>Teams
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/users">
                    <i className="bi bi-person-circle me-1"></i>Users
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/leaderboard">
                    <i className="bi bi-trophy me-1"></i>Leaderboard
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="py-4">
          <Routes>
            <Route
              path="/"
              element={
                <div className="container">
                  {/* Hero/Jumbotron Section */}
                  <div className="jumbotron bg-light p-5 rounded-lg mb-5">
                    <h1 className="display-4">Welcome to OctoFit Tracker</h1>
                    <p className="lead">
                      Track your fitness activities, manage teams, and compete on the leaderboard!
                    </p>
                    <hr className="my-4" />
                    <p>Get started by selecting an option from the navigation menu.</p>
                    <p className="mt-4">
                      <strong>🔗 Backend API URL:</strong>
                      <br />
                      <code className="bg-light p-2 rounded d-inline-block mt-2">
                        {getBackendUrl()}/api/
                      </code>
                    </p>
                  </div>

                  {/* Quick Stats Cards */}
                  <div className="row g-4 mt-4">
                    <div className="col-md-6 col-lg-3">
                      <div className="card text-center">
                        <div className="card-body">
                          <i className="bi bi-activity" style={{ fontSize: '2rem' }}></i>
                          <h5 className="card-title mt-2">Activities</h5>
                          <p className="card-text">Track your fitness activities and progress</p>
                          <Link to="/activities" className="btn btn-primary btn-sm">
                            View Activities
                          </Link>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-6 col-lg-3">
                      <div className="card text-center">
                        <div className="card-body">
                          <i className="bi bi-heart-pulse" style={{ fontSize: '2rem' }}></i>
                          <h5 className="card-title mt-2">Workouts</h5>
                          <p className="card-text">Get personalized workout suggestions</p>
                          <Link to="/workouts" className="btn btn-primary btn-sm">
                            View Workouts
                          </Link>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-6 col-lg-3">
                      <div className="card text-center">
                        <div className="card-body">
                          <i className="bi bi-people" style={{ fontSize: '2rem' }}></i>
                          <h5 className="card-title mt-2">Teams</h5>
                          <p className="card-text">Join or create a team</p>
                          <Link to="/teams" className="btn btn-primary btn-sm">
                            View Teams
                          </Link>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-6 col-lg-3">
                      <div className="card text-center">
                        <div className="card-body">
                          <i className="bi bi-trophy" style={{ fontSize: '2rem' }}></i>
                          <h5 className="card-title mt-2">Leaderboard</h5>
                          <p className="card-text">Compete and see rankings</p>
                          <Link to="/leaderboard" className="btn btn-primary btn-sm">
                            View Leaderboard
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              }
            />
            <Route path="/activities" element={<Activities />} />
            <Route path="/workouts" element={<Workouts />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/users" element={<Users />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="bg-dark text-white text-center py-4 mt-5">
          <div className="container">
            <p className="mb-2">&copy; 2024 OctoFit Tracker. All rights reserved.</p>
            <p className="small text-muted">
              Backend API: <code>{getBackendUrl()}/api/</code>
            </p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
