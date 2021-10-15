import { useState, useContext } from "react";
import { useSelector } from "react-redux";
import { SessionContext } from "../contexts/session";

import "./MessageInput.scss";

function MessageInput() {
  const [inputValue, setInputValue] = useState("");
  const { user } = useSelector((state) => state.user);
  const { emitSocketMessage } = useContext(SessionContext);

  const handleMessageSubmit = (e) => {
    e.preventDefault();
    const message = {
      messageId: Date.now(),
      userId: user.id,
      userName: user.name,
      content: inputValue,
    };
    emitSocketMessage(message);
    setInputValue("");
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <form onSubmit={handleMessageSubmit} id="message-input-form">
      <input
        autoFocus
        value={inputValue}
        type="text"
        name="message-input"
        onChange={handleInputChange}
        id="message-input"
      />
      <button id="message-submit" disabled={user ? false : true}>
        Send
      </button>
    </form>
  );
}

export default MessageInput;
