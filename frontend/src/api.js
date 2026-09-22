const BASE_URL = 'http://localhost:3000/api/users';

async function handleResponse(res) {
  if (!res.ok) {
    let message = `Request failed (${res.status})`;
    try {
      const body = await res.json();
      if (body?.error) message = body.error;
    } catch {
      // response had no JSON body
    }
    throw new Error(message);
  }
  if (res.status === 204) return null;
  return res.json();
}

export async function fetchUsers() {
  const res = await fetch(BASE_URL);
  return handleResponse(res);
}

export async function createUser({ name, email }) {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email })
  });
  return handleResponse(res);
}

export async function deleteUser(id) {
  const res = await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' });
  return handleResponse(res);
}
