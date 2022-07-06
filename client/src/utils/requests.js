const API_URL = "http://localhost:8000/api";

async function httpAddNewUser(user) {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  return await response.json();
}

async function httpLoadAvatars() {
  const response = await fetch(`${API_URL}/user/avatars`);
  return await response.json();
}

async function httpSaveAvatar(avatarData) {
  const { username, avatarImage } = avatarData;
  const response = await fetch(`${API_URL}/user/avatars/${username}`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ avatarImage }),
  });

  return await response.json();
}

async function httpGetUserId() {
  const response = await fetch(`${API_URL}/auth/session`);
  return await response.json();
}

async function httpCheckUserLoggedIn() {
  const { ok } = await fetch(`${API_URL}/auth/session`);
  return ok;
}

async function httpLogIn(user) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  return await response.json();
}

async function httpLogOut() {
  await fetch(`${API_URL}/auth/logout`);
}

async function httpGetUser() {
  const response = await fetch(`${API_URL}/user`);
  return await response.json();
}

async function httpLoadAllContacts(username) {
  const response = await fetch(`${API_URL}/user/users/${username}`);
  return await response.json();
}

async function httpSaveMessage({ from, to, msg }) {
  const response = await fetch(`${API_URL}/messages/save`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ from, to, msg }),
  });
  return await response.json();
}

export {
  httpAddNewUser,
  httpLoadAvatars,
  httpSaveAvatar,
  httpGetUserId,
  httpCheckUserLoggedIn,
  httpLogIn,
  httpLogOut,
  httpGetUser,
  httpLoadAllContacts,
  httpSaveMessage,
};
