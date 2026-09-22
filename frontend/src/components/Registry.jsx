export default function Registry({ users }) {
  return (
    <section className="registry">
      <div className="registry-header">
        <h2>👥 User Registry</h2>
        <span>{users.length} RECORDS</span>
      </div>

      {users.length === 0 ? (
        <div className="empty-state">
          <h3>No entries yet</h3>
          <p>Add your first user using the form above.</p>
        </div>
      ) : (
        <div className="table-wrapper">
          <table className="user-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="user-name">
                    <div className="user-name-wrapper">
                      <div className="user-avatar">
                        {user.name?.charAt(0).toUpperCase()}
                      </div>

                      <span>{user.name}</span>
                    </div>
                  </td>

                  <td className="user-email">
                    {user.email}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}