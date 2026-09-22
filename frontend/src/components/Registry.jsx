export default function Registry({ users }) {
  return (
    <section className="registry">
      
      {/* Header */}
      <div className="registry-header">
        <div className="registry-title">
          <div className="registry-icon">👥</div>

          <div>
            <h2>User Registry</h2>
            <p>Manage registered users</p>
          </div>
        </div>

        <span className="record-badge">
          {users.length} RECORDS
        </span>
      </div>

      {/* Users */}
      {users.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">👤</div>
          <h3>No users yet</h3>
          <p>Add your first user to get started.</p>
        </div>
      ) : (
        <div className="users-list">

          {users.map((user) => (
            <div className="user-row" key={user.id}>

              {/* Avatar */}
              <div className="user-avatar">
                {user.name?.charAt(0).toUpperCase()}
              </div>

              {/* User information */}
              <div className="user-info">
                <h3>{user.name}</h3>
                <p>{user.email}</p>
              </div>

              {/* Status */}
              <div className="user-status">
                <span className="status-dot"></span>
                Active
              </div>

            </div>
          ))}

        </div>
      )}
    </section>
  );
}
