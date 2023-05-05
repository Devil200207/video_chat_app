import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../context/SocketProvider";
import "./lobby.css";

const LobbyScreen = () => {
  const [email, setEmail] = useState("");
  const [room, setRoom] = useState("");

  const socket = useSocket();
  const navigate = useNavigate();

  const handleSubmitForm = useCallback(
    (e) => {
      e.preventDefault();
      socket.emit("room:join", { email, room });
    },
    [email, room, socket]
  );

  const handleJoinRoom = useCallback(
    (data) => {
      const { email, room } = data;
      navigate(`/room/${room}`);
    },
    [navigate]
  );

  useEffect(() => {
    socket.on("room:join", handleJoinRoom);
    return () => {
      socket.off("room:join", handleJoinRoom);
    };
  }, [socket, handleJoinRoom]);

  return (
    <>
    
      <div className="form">
              <div className="title">Lobby</div>
              <div className="subtitle">Your Email & Room, Please:</div>
              <form onSubmit={handleSubmitForm}>
                <div className="input-container ic1">
                  <input
                      className="input"
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)} />
                      <div className="cut"></div>
                      <label className="placeholder" htmlFor="email">Email ID</label>
                </div>
                <div class="input-container ic2">
                    <input
                    className="input"
                    type="text"
                    id="room"
                    value={room}
                    onChange={(e) => setRoom(e.target.value)} />  
                    <div class="cut"></div>
                    <label className="placeholder" htmlFor="room">Room Number</label>
                </div>
                <button type="text" className="submit">Join</button>
              </form>
        </div>
    </>

    
  );
};

export default LobbyScreen;