import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import loader from "../assets/loader.gif";
import Welcome from "../components/Welcome";
import Contacts from "../components/Contacts";
import { httpGetUser, httpLoadAllContacts } from "../utils/requests";

export default function Chat() {
  const navigate = useNavigate();

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const [isLoading, setIsLoading] = useState(true);
  const [contacts, setContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [currentUser, setCurrentUser] = useState(undefined);

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };

  useEffect(() => {
    async function getUser() {
      const response = await httpGetUser();

      if (response.ok === false) {
        navigate("/login");
      } else {
        setCurrentUser(response.user);
      }
    }
    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    async function loadAllContacts() {
      const response = await httpLoadAllContacts(currentUser.username);

      if (response.ok === false) {
        toast.error("Failed to load contacts", toastOptions);
      } else {
        setContacts(response.users);
        setIsLoading(false);
      }
    }

    if (currentUser) {
      loadAllContacts();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  return (
    <>
      {isLoading ? (
        <Container>
          <img src={loader} alt="loader" className="loader" />
        </Container>
      ) : (
        <Container>
          <div className="container">
            <Contacts
              contacts={contacts}
              currentUser={currentUser}
              changeChat={handleChatChange}
            />
            {currentChat === undefined ? (
              <Welcome username={currentUser.username} />
            ) : (
              <div>Chat</div>
            )}
          </div>
        </Container>
      )}
      <ToastContainer />
    </>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;
