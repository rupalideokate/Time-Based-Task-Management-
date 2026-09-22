
import { useEffect, useState } from "react";
import AddEntryForm from "./components/AddEntryForm.jsx";
import Registry from "./components/Registry.jsx";
import { fetchUsers, createUser, deleteUser } from "./api.js";
import "./App.css";

export default function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    load();
  }, []);

  async function load() {
    setLoading(true);
    setLoadError("");

    try {
      const data = await fetchUsers();
      setUsers(data);
    } catch (err) {
      setLoadError(
        `Couldn't reach the API at http://localhost:3000. (${err.message})`
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleAdd({ name, email }) {
    setSubmitting(true);
    setLoadError("");

    try {
      const newUser = await createUser({ name, email });
      setUsers((prev) => [newUser, ...prev]);
    } catch (err) {
      setLoadError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(id) {
    const previous = users;
    setUsers((prev) => prev.filter((u) => u.id !== id));

    try {
      await deleteUser(id);
    } catch (err) {
      setUsers(previous);
      setLoadError(`Couldn't remove that entry: ${err.message}`);
    }
  }

  return (
    <div className="page">
      <aside className="sidebar">
        <div className="logo">
          Task<span>Flow</span>
        </div>

        <div className="menu-title">WORKSPACE</div>

        <a className="nav-link active" href="#dashboard">
          🏠 Dashboard
        </a>

        <a className="nav-link" href="#registry">
          👥 User Registry
        </a>

        <a className="nav-link" href="#activity">
          📊 Activity
        </a>

        <div className="menu-title">MANAGEMENT</div>

        <a className="nav-link" href="#users">
          ⚙️ Settings
        </a>

        <div className="sidebar-footer">
          <strong>Workspace Status</strong>
          <br />
          <br />
          Your workspace is ready to manage users.
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div className="welcome">
            <div className="breadcrumb">WORKSPACE / OVERVIEW</div>
            <h1>Welcome back, Admin!</h1>
            <p>Manage your users and keep your workspace organized.</p>
          </div>

          <div className="profile">
            <div className="avatar">R</div>
            <div>
              <strong>Admin</strong>
              <br />
              <small>Administrator</small>
            </div>
          </div>
        </header>

        {loadError && (
          <div className="status-banner error" role="alert">
            {loadError}
          </div>
        )}

        <section className="stats-grid">
          <div className="stat-card blue">
            <div className="stat-icon">👥</div>
            <h3>{users.length}</h3>
            <p>Total Users</p>
          </div>

          <div className="stat-card green">
            <div className="stat-icon">✓</div>
            <h3>{users.length}</h3>
            <p>Active Records</p>
          </div>

          <div className="stat-card purple">
            <div className="stat-icon">📈</div>
            <h3>{users.length}</h3>
            <p>Successfully Stored</p>
          </div>

          <div className="stat-card orange">
            <div className="stat-icon">🗄️</div>
            <h3>Online</h3>
            <p>MySQL Connection</p>
          </div>
        </section>

        <section className="dashboard-grid">
          <div className="panel" id="users">
            <div className="panel-header">
              <h2>➕ Add New User</h2>
              <span>CREATE RECORD</span>
            </div>

            <AddEntryForm
              onAdd={handleAdd}
              isSubmitting={submitting}
            />
          </div>

          <div className="panel" id="activity">
            <div className="panel-header">
              <h2>📊 Quick Overview</h2>
              <span>LIVE DATA</span>
            </div>

            <p>
              Your dashboard is connected to the backend API.
            </p>

            <p>
              <strong>{users.length}</strong> users are currently
              registered in your workspace.
            </p>

            <button className="primary-btn" onClick={load}>
              ↻ Refresh Data
            </button>
          </div>

          <div className="panel" id="registry">
            <div className="panel-header">
              <h2>👥 User Registry</h2>
              <span>{users.length} RECORDS</span>
            </div>

            {loading ? (
              <p>Loading users...</p>
            ) : (
              <Registry users={users} onDelete={handleDelete} />
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
