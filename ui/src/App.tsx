import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { routes, routesNonToken } from "./app/routes";
import { useDispatch } from "react-redux";
import {
  messagesAction,
  notificationAction,
} from "./store/reducers/messages/action";
import { Notification } from "./components";
import { useSelector } from "react-redux";
import { setNotification } from "./store/reducers/messages/action";
import io from "socket.io-client";

export const App = () => {
  const dispatch = useDispatch();

  const {
    showNotification,
    notificationMessage,
    notificationUsername,
    notificationImage,
    userId,
  } = useSelector((state) => state?.messagesReducer);
  const token = localStorage.getItem("token");
  const USER_ID = localStorage.getItem("userId");
  console.log("userId", userId);
  useEffect(() => {
    const socket = io("ws://localhost:5000", {
      query: { userId: USER_ID },
    });

    socket.on("messages", (data: any) => {
      dispatch(messagesAction());
    });
    socket.on("newMessage", (data: any) => {
      dispatch(notificationAction(data));
      dispatch(messagesAction());
    });

    return () => {
      socket.off("newMessage");
    };
  }, [dispatch]);

  return (
    <>
      {token ? (
        <RouterProvider router={routes} />
      ) : (
        <RouterProvider router={routesNonToken} />
      )}
      {showNotification && (
        <Notification
          username={notificationUsername}
          message={notificationMessage}
          image={notificationImage}
          onClose={() => dispatch(setNotification(!showNotification))}
        />
      )}
    </>
  );
};
