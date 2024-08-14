import { useContext, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import "./chat.css";
import ApiRequest from "../../lib/ApiRequest";
import pic from '../../Assets/Download Blank Default Pfp Wallpaper _ Wallpapers_com.jpeg';
import { format } from 'timeago.js';
import { SocketContext } from "../../Context/SocketContext";
import { IoCloseCircleOutline, IoSend } from "react-icons/io5";

function Chat() {
  const [chat, setChat] = useState(null);
  const [chats, setChats] = useState([]);
  const currentUser = useSelector((state) => state.auth.currentUser);
  const { socket } = useContext(SocketContext);
  const messageEndRef = useRef();

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat?.messages]);

  const getChats = async () => {
    try {
      const response = await ApiRequest.get('/chat/');
      setChats(response.data);
    } catch (error) {
      alert(error)
    }
  };

  const handleOpenChat = async (id, receiver) => {
    try {
      const res = await ApiRequest.get(`/chat/${id}`);
      setChat({ ...res.data, receiver });
    } catch (error) {
      alert(error)

    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const text = formData.get("text");

    if (!text) {
      return;
    }

    try {
      const res = await ApiRequest.post(`/message/${chat._id}`, { text });
      setChat(prev => ({
        ...prev,
        messages: [...prev.messages, res.data]
      }));
    e.target.reset();

      if (chat.receiver?._id) {
        socket.emit("sendMessage", {
          receiverId: chat.receiver._id,
          data: res.data,
        });
      } else {
        console.log("Receiver ID is not defined");
      }
    } catch (error) {
      alert(error)
    }
  };

  useEffect(() => {
    const read = async () => {
      try {
        await ApiRequest.put(`/chat/read/${chat._id}`);
      } catch (err) {
        alert(err)

      }
    };

    if (chat && socket) {
      const messageHandler = (data) => {
        if (chat._id === data.chatId) {
          setChat((prev) => ({ ...prev, messages: [...prev.messages, data] }));
          read();
        }
      };

      socket.on("getMessage", messageHandler);

      // Cleanup function to remove the listener when the component unmounts or dependencies change
      return () => {
        socket.off("getMessage", messageHandler);
      };
    }
  }, [chat, socket, setChat]);

  useEffect(() => {
    getChats();
  }, []);

  return (
    <div className="chat">
      <h1>Messages</h1>
      {chats.map((items) => (
        <div className="messages" key={items._id}>
          <div className="message" onClick={() => handleOpenChat(items._id, items.receiver)}>
            <img
              src={items.receiver?.photo || pic}
              alt={items.receiver?.name || "Default Avatar"}
            />
            <span>{items.receiver?.name || "Unknown User"}</span>
            <p>{items.lastMessage || "No messages yet"}</p>
          </div>
        </div>
      ))}
      <div ref={messageEndRef}></div>

      {chat && (
        <div className="chatBox">
          <div className="top">
            <div className="user">
              <img
                src={chat.receiver?.photo || pic}
                alt={chat.receiver?.name || "Default Avatar"}
              />
              {chat.receiver?.name || "Unknown User"}
            </div>
            <span className="close" onClick={() => setChat(null)}><IoCloseCircleOutline style={{width:"50px",height:"50px"}} />
            </span>
          </div>
          <div className="center">
            {chat.messages.map((item) => (
              <div className="chatMessage" style={{
                alignSelf: item.userId === currentUser._id ? "flex-end" : "flex-start",
                textAlign: item.userId === currentUser._id ? "right" : "left",
              }} key={item._id}>
                <p className="chattext">{item.text}</p>
                <span style={{color:'white'}}>{format(item.createdAt)}</span>
              </div>
            ))}
            <div ref={messageEndRef}></div>
          </div>
          <form onSubmit={handleSubmit} className="bottom">
            <input type="text" name="text" className="chatarea" placeholder="Type Message"/>
            <button type="submit" className="chatbtn"><IoSend style={{height:"40px", width:"40px",marginLeft:"9px",color:"white"}} /></button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Chat;
