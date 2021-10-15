import Username from "../components/Username";
import Message from "../components/Message";
import MessageInput from "../components/MessageInput";

import "./Chat.scss";

function Chat() {
  return (
    <div className="chat">
      <Username />
      <div className="chat-container">
        <Message />
        <MessageInput />
      </div>
    </div>
  );
}

export default Chat;
