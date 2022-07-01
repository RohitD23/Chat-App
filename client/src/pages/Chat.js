import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { httpCheckUserLoggedIn } from "../utils/requests";

export default function Chat() {
  const navigate = useNavigate();

  useEffect(() => {
    async function checkUserLoggedIn() {
      const response = await httpCheckUserLoggedIn();
      if (response === false) {
        navigate("/login");
      }
    }
    checkUserLoggedIn();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div>Chat</div>;
}
