import { createContext, useEffect, useRef, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import socket from "socket.io-client";
import settings from "../data/settings";
import { addMessage } from "../slices/messagesSlice";

export const SessionContext = createContext();

const Provider = ({ children }) => {
  let connection = useRef(null);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const channel = settings.Room;

  const openSocket = useCallback(() => {
    if (!connection.current) {
      connection.current = socket.connect(settings.Host);

      connection.current.on("connect", () => {
        connection.current.emit("join-channel", channel);
      });

      connection.current.on("error", (e) => {
        // Do something with error
        console.error(e);
      });

      connection.current.on("message", (message) => {
        dispatch(addMessage(message.message));
      });
    }
  }, []);

  const closeSocket = useCallback(() => {
    if (connection.current) {
      connection.current.disconnect();
      connection.current = null;
    }
  }, [connection.current]);

  const emitSocketMessage = useCallback(
    (message) => {
      if (connection.current) {
        connection.current.emit(
          "message",
          {
            user,
            message,
          },
          channel
        );
      }
    },
    [connection.current, user]
  );

  useEffect(() => {
    openSocket();
    return () => closeSocket();
  }, []);

  const values = { openSocket, closeSocket, emitSocketMessage };

  return (
    <SessionContext.Provider value={values}>{children}</SessionContext.Provider>
  );
};

export default { Provider: Provider, Consumer: SessionContext.Consumer };
