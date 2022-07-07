import io from "socket.io-client";
import styled from "styled-components";
import React, { useState, useEffect, useRef } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ChatInput from "./ChatInput";
import { httpSaveMessage, httpGetMessages } from "../utils/requests";

const socket = io("http://localhost:8000");

export default function ChatContainer({ currentChat, currentUser }) {
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const [messages, setMessages] = useState([]);
  const [arrivalMsg, setArrivalMsg] = useState(null);
  const room = useRef("");
  const scrollRef = useRef();

  const handleSendMsg = async (msg) => {
    const from = currentUser._id;
    const to = currentChat._id;
    const response = await httpSaveMessage({ from, to, msg });

    if (response.ok === false) {
      toast.error("Failed to send message!", toastOptions);
    }

    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: msg });
    setMessages(msgs);

    socket.emit("send-msg", {
      message: msg,
      room: room.current,
    });
  };

  useEffect(() => {
    async function getMessages() {
      const from = currentUser._id;
      const to = currentChat._id;
      const response = await httpGetMessages({ from, to });

      if (response.ok === false) {
        toast.error("Failed to load previous chat", toastOptions);
      } else {
        setMessages(response.messages);
      }
    }

    function joinRoom() {
      const user1 = currentUser.username;
      const user2 = currentChat.username;
      const roomName = user1 < user2 ? user1 + user2 : user2 + user1;
      socket.emit("join_room", roomName);
      room.current = roomName;
    }

    getMessages();
    joinRoom();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentChat]);

  useEffect(() => {
    socket.on("rec-msg", (data) => {
      const { message } = data;

      if (room.current === data.room) {
        setArrivalMsg({ fromSelf: false, message });
      }
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  useEffect(() => {
    arrivalMsg && setMessages((prev) => [...prev, arrivalMsg]);
  }, [arrivalMsg]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <Container>
      <div className="chat-header">
        <div className="user-details">
          <div className="avatar">
            <img
              src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
              alt=""
            />
          </div>
          <div className="username">
            <h3>{currentChat.username}</h3>
          </div>
        </div>
      </div>
      <div className="chat-messages">
        {messages.map((message) => {
          return (
            <div ref={scrollRef}>
              <div
                className={`message ${
                  message.fromSelf ? "sended" : "recieved"
                }`}
              >
                <div className="content ">
                  <p>{message.message}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <ChatInput handleSendMsg={handleSendMsg} />
      <ToastContainer />
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 80% 10%;
  gap: 0.1rem;
  overflow: hidden;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-rows: 15% 70% 15%;
  }
  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: white;
        }
      }
    }
  }
  .chat-messages {
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;
  }
  .message {
    display: flex;
    align-items: center;
    .content {
      max-width: 40%;
      overflow-wrap: break-word;
      padding: 1rem;
      font-size: 1.1rem;
      border-radius: 1rem;
      color: #d1d1d1;
      @media screen and (min-width: 720px) and (max-width: 1080px) {
        max-width: 70%;
      }
    }
  }
  .sended {
    justify-content: flex-end;
    .content {
      background-color: #4f04ff21;
    }
  }
  .recieved {
    justify-content: flex-start;
    .content {
      background-color: #9900ff20;
    }
  }
`;
