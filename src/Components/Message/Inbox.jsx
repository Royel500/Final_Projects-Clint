import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosecure from "../../hooks/useAxiosecure";
import useRole from "../../hooks/useRole";

export default function Inbox({ onSelect }) {
  const { user } = useAuth();
  const axiosSecure = useAxiosecure();
  const { role } = useRole(); // custom hook for role
  const [partners, setPartners] = useState([]);

useEffect(() => {
  if (!user?.uid) return;

  axiosSecure.get(`/inbox/${user.uid}`)
    .then((res) => {
      let filtered = res.data;
      if (role === "rider") {
        filtered = res.data.filter((p) => p.role === "admin"); // rider sees only admin
      } else if (role === "user") {
        filtered = res.data.filter((p) => p.role === "admin" || p.role === "rider");
      }
      setPartners(filtered);
    });
}, [user, role]);


  return (
    <div className="w-64 border-r h-full">
      <h2 className="font-bold p-2">Inbox</h2>
      {partners.length === 0 && (
        <p className="p-2 text-gray-400">No messages yet</p>
      )}
      {partners.map((p) => (
        <div
          key={p.id}
          className="p-2 cursor-pointer hover:bg-gray-100"
          onClick={() => onSelect(p)}
        >
          <span className="font-semibold">{p.role}</span> - {p.id}
        </div>
      ))}
    </div>
  );
}
