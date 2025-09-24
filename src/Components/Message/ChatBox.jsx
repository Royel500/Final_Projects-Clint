import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosecure from "../../hooks/useAxiosecure";
import useRole from "../../hooks/useRole";

export default function ChatBox({ partner }) {
  const { user } = useAuth();
  const axiosSecure = useAxiosecure();
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const { role } = useRole();


useEffect(() => {
  if (!partner) return;

  const fetchMessages = () => {
    axiosSecure.get(`/messages/${user.uid}/${partner.id}`)
      .then(res => setMessages(res.data))
      .catch(err => console.error(err));
  };

  fetchMessages();
  const interval = setInterval(fetchMessages, 3000); // every 3s
  return () => clearInterval(interval);
}, [partner, user.uid]);


const sendMessage = async () => {
  if (!text || !partner) return;

  const newMsg = {
    senderId: user.uid,
    senderRole: role, // useRole hook
    receiverId: partner.id,
    receiverRole: partner.role,
    text,
  };

  try {
    const res = await axiosSecure.post("/messages", newMsg);
    if (res.data.insertedId) {
      setMessages(prev => [...prev, { ...newMsg, createdAt: new Date(), _id: res.data.insertedId }]);
      setText("");
    }
  } catch (err) {
    console.error("Failed to send message:", err);
  }
};


  if (!partner) return <div className="flex-1 flex items-center justify-center">Select a chat</div>;

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex-1 p-4 overflow-y-auto">
        {messages.map((m, i) => (
          <div key={i} className={`mb-2 ${m.senderId === user.uid ? "text-right" : "text-left"}`}>
            <span className="inline-block px-3 py-2 bg-gray-200 rounded-lg">{m.text}</span>
          </div>
        ))}
      </div>
      <div className="p-2 flex border-t">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="flex-1 border rounded px-2"
          placeholder="Type message..."
        />
        <button onClick={sendMessage} className="ml-2 bg-blue-500 text-white px-4 rounded">Send</button>
      </div>
    </div>
  );
}
