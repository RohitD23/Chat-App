import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { httpCheckUserLoggedIn } from "../utils/requests";

function Chat() {
  const navigate = useNavigate();

  useEffect(() => {
    async function checkLogIn() {
      const isLoggedIn = await httpCheckUserLoggedIn();
      if (isLoggedIn.ok === false) {
        navigate("/login");
      }
    }
    checkLogIn();
  }, []);

  return <div>Chat</div>;
}

export default Chat;
