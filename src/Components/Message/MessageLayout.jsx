import React, { useState } from "react";
import Inbox from "./Inbox";
import ChatBox from "./ChatBox";

export default function Messenger() {
  const [selected, setSelected] = useState(null);

  return (
    <div className="flex my-20">
      <Inbox onSelect={setSelected} />
      <ChatBox partner={selected} />
    </div>
  );
}
