import { useEffect } from "react";
import { RouterProvider } from "react-router-dom"; 
import { routes } from "./app/routes";
import { useDispatch } from "react-redux";
import { messagesAction, notificationAction } from "./store/reducers/messages/action";
import io from "socket.io-client";


export const App = () => { 

  const dispatch = useDispatch();

  useEffect(() => {
    const socket = io("ws://localhost:5000", {
      query: { userId: "69797a4c-f0aa-4859-985a-3309da6f159e" },
    });
    
    socket.on("messages", (data: any) => {
      // Викликаємо екшен messagesAction лише при отриманні нового повідомлення
      dispatch(messagesAction());
    });
    socket.on("newMessage", (data: any) => {
      // Викликаємо екшен messagesAction лише при отриманні нового повідомлення
      dispatch(notificationAction(data));
      dispatch(messagesAction());
    });

    return () => {
      // Відключаємо підписку на подію "newMessage" при розмонтуванні компонента
      socket.off("newMessage");
    };
  }, [dispatch]);

  return <RouterProvider router={routes} />
};
