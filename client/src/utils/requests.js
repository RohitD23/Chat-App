const API_URL = "http://localhost:8000/";

async function httpAddNewUser(user) {
  const response = await fetch(`${API_URL}auth/register`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  return await response.json();
}

export { httpAddNewUser };
