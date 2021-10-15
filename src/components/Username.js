import { useSelector, useDispatch } from "react-redux";
import { useContext, useEffect } from "react";
import { SessionContext } from "../contexts/session";
import { addUser, removeUser } from "../slices/userSlice";
import { addMessage, clearAllMessages } from "../slices/messagesSlice";
import { removeLocalStorage, setLocalStorage } from "../lib/storage";
import "./Username.scss";

function Username() {
  const { user } = useSelector((state) => state.user);
  const { openSocket, closeSocket, emitSocketMessage } =
    useContext(SessionContext);
  const dispatch = useDispatch();

  const handleLogin = (e) => {
    e.preventDefault();

    const id = Date.now();
    const userName = e.target.elements["user-input"].value;
    const userObject = { id: id, name: userName };
    const message = {
      messageId: Date.now(),
      userId: id,
      userName: userName,
      content: `${userName} joined the chat!`,
    };

    // Login the user
    dispatch(addUser(userObject));

    // Open chat socket and send initial message
    openSocket();
    emitSocketMessage(message);
    setLocalStorage("tellyChatUser", JSON.stringify(userObject));
  };

  const handleLogout = (e) => {
    e.preventDefault();

    const message = {
      messageId: Date.now(),
      userId: user.id,
      userName: user.name,
      content: `${user.name} left the chat!`,
    };

    // Update state
    dispatch(removeUser());
    dispatch(addMessage(message));

    // Send message and close chat socket
    emitSocketMessage(message);
    closeSocket();

    // Remove user from local storage
    removeLocalStorage("tellyChatUser");
  };

  const handleClearMessages = (e) => {
    e.preventDefault();
    dispatch(clearAllMessages());
  };

  return (
    <div id="user-section">
      {user ? (
        <div className="logged-in">
          <p>
            You're currently signed in as{" "}
            <span className="user-name">{user.name}</span>.
          </p>
          <input
            type="submit"
            id="clear-messages"
            value="Clear Messages"
            onClick={handleClearMessages}
          />
          <input
            type="submit"
            id="log-out"
            value="Leave Chat"
            onClick={handleLogout}
          />
        </div>
      ) : (
        <form onSubmit={handleLogin} id="user-form">
          <input
            type="text"
            name="user-input"
            id="user-input"
            placeholder="Enter username..."
            maxLength={10}
          />
          <input type="submit" value="Join Chat!" id="user-submit" />
        </form>
      )}
    </div>
  );
}

export default Username;
