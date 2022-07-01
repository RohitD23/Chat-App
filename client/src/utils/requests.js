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
  const { userId, avatarImage } = avatarData;
  const response = await fetch(`${API_URL}/user/avatars/${userId}`, {
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

async function httpLogin(user) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  return await response.json();
}

export {
  httpAddNewUser,
  httpLoadAvatars,
  httpSaveAvatar,
  httpGetUserId,
  httpCheckUserLoggedIn,
  httpLogin,
};
