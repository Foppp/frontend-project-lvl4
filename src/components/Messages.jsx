import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

const MessagesBody = () => {
  const divRef = useRef(null);
  const messages = useSelector((state) => state.messagesInfo.messages);
  useEffect(() => {
    divRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [messages])
  return (
    <div id="messages-box" className="chat-messages overflow-auto px-5 ">
      {messages.map(({ body, id, username }) => {
        return (
          <div key={id} className="text-break mb-2">
            <b>{ username }</b> : { body }
          </div>
        );
      })}
      <div ref={ divRef } />
    </div >
  );
}

export default MessagesBody;
