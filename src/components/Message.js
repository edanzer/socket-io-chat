import { useEffect } from "react";
import { useSelector } from "react-redux";
import { setLocalStorage } from "../lib/storage";
import classNames from 'classnames';
import "./Message.scss";

function Message() {
  const { user } = useSelector((state) => state.user);
  const { messages } = useSelector((state) => state.messages);

  const isCurrentUser = (user, message) => {
    if (!user) return false;
    return user.id === message.userId;
  };

  const getRecentMessages = (messages) => {
    const oneHour = 1000 * 60 * 60;
    const recentMessages = messages.filter(message => {
        return (Date.now() - message.messageId) <= oneHour;
    });
    return recentMessages;
  };

  useEffect(() => {
    const recentMessages = getRecentMessages(messages);
    setLocalStorage("tellyChatMessages", JSON.stringify(recentMessages));
  }, [messages]);

  return (
    <div className="messages">
      {user ? (
        messages.map((message) => {
          return (
            <div
              className={classNames({
                "message-bubble": true,
                "current-user": isCurrentUser(user, message)
              })}
              key={message.messageId}
            >
              <span className="user">
                {isCurrentUser(user, message) ? "You" : message.userName}:{" "}
              </span>
              {message.content}
            </div>
          );
        })
      ) : (
        <div className="not-in-chat">Please join chat.</div>
      )}
    </div>
  );
}

export default Message;
