import { useState } from 'react';

export default function AddEntryForm({ onAdd, isSubmitting }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');

    if (!name.trim() || !email.trim()) {
      setError('Enter a name and an email to add an entry.');
      return;
    }

    try {
      await onAdd({ name: name.trim(), email: email.trim() });
      setName('');
      setEmail('');
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <form className="entry-form" onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Jane Doe"
          autoComplete="off"
        />
      </div>
      <div className="field">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="jane@example.com"
          autoComplete="off"
        />
      </div>
      <button className="btn btn-primary" type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Adding…' : 'Add entry'}
      </button>
      {error && <p className="form-error" role="alert">{error}</p>}
    </form>
  );
}
