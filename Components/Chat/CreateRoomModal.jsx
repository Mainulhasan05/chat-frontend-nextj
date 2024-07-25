import React, { useState } from "react";
import { useChatApp } from "@/context/ChatAppContext";

const CreateRoomModal = () => {
  const { createRoom } = useChatApp();
  // createRoom
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await createRoom({ name, password });
      console.log(res);
      setMessage({ type: "success", text: "Room created successfully!" });
      setName("");
      setPassword("");
    } catch (error) {
      setMessage({ type: "danger", text: error.message });
    }
  };

  return (
    <div>
      <div
        className="modal fade"
        id="createRoomModal"
        tabIndex="-1"
        aria-labelledby="createRoomModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="createRoomModalLabel">
                Create Chat Room
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {message && (
                <div className={`alert alert-${message.type}`} role="alert">
                  {message.text}
                </div>
              )}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="roomName" className="form-label">
                    Room Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="roomName"
                    placeholder="Enter room name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="roomPassword" className="form-label">
                    Password (Optional)
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="roomPassword"
                    placeholder="Enter room password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Create Room
                </button>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateRoomModal;
