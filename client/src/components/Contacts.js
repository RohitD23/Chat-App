import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { BsThreeDotsVertical } from "react-icons/bs";

import Logo from "../assets/logo.svg";
import { httpLogOut } from "../utils/requests";

export default function Contacts({ contacts, currentUser, changeChat }) {
  const navigate = useNavigate();

  const [currentSelected, setCurrentSelected] = useState(undefined);

  const logOut = async () => {
    await httpLogOut();
    navigate("/login");
  };

  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };

  return (
    <>
      <Container>
        <div className="brand">
          <img src={Logo} alt="logo" />
          <h3>snappy</h3>
        </div>
        <div className="contacts">
          {contacts.map((contact, index) => {
            return (
              <div
                key={contact._id}
                className={`contact ${
                  index === currentSelected ? "selected" : ""
                }`}
                onClick={() => changeCurrentChat(index, contact)}
              >
                <div className="avatar">
                  <img
                    src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                    alt=""
                  />
                </div>
                <div className="username">
                  <h3>{contact.username}</h3>
                </div>
              </div>
            );
          })}
        </div>
        <div className="current-user">
          <div className="avatar">
            <img
              src={`data:image/svg+xml;base64,${currentUser.avatarImage}`}
              alt="avatar"
            />
          </div>
          <div className="username">
            <h2>{currentUser.username}</h2>
          </div>
          <div className="dropup">
            <button className="dropbtn">
              <BsThreeDotsVertical />
            </button>
            <div className="dropup-content">
              <a href="/setAvatar">Change Avatar</a>
              <a href="/#" onClick={logOut}>
                Log Out
              </a>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 75% 15%;
  overflow: hidden;
  background-color: #080420;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 2rem;
    }
    h3 {
      color: white;
      text-transform: uppercase;
    }
  }
  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.8rem;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .contact {
      background-color: #ffffff34;
      min-height: 5rem;
      cursor: pointer;
      width: 90%;
      border-radius: 0.2rem;
      padding: 0.4rem;
      display: flex;
      gap: 1rem;
      align-items: center;
      transition: 0.5s ease-in-out;
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
    .selected {
      background-color: #9a86f3;
    }
  }
  .current-user {
    background-color: #0d0d30;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    .avatar {
      img {
        height: 4rem;
        max-inline-size: 100%;
      }
    }
    .username {
      h2 {
        color: white;
      }
    }
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      gap: 0.5rem;
      .username {
        h2 {
          font-size: 1rem;
        }
      }
    }
  }
  .dropup {
    margin-left: 5rem;
    position: relative;
    display: inline-block;
  }

  .dropup-content {
    display: none;
    position: absolute;
    background-color: #f1f1f1;
    min-width: 8rem;
    bottom: 1.8rem;
    right: 0.1rem;
    z-index: 1;
  }

  .dropup-content a {
    color: black;
    padding: 0.5rem;
    text-decoration: none;
    display: block;
  }

  .dropup-content a:hover {
    background-color: #ccc;
  }

  .dropup:hover .dropup-content {
    display: block;
  }

  .dropbtn {
    background-color: #4e0eff;
    color: white;
    padding: 0.5rem 0.5rem;
    border: none;
    border-radius: 100%;
  }

  .dropup:hover .dropbtn {
    background-color: #7345f5;
  }
`;
