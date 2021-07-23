import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

const MessagesBody = () => {
  const divRef = useRef(null);
  const messages = useSelector((state) => state.messagesInfo.messages);
  const currentChannelId = useSelector((state) => state.channelsInfo.currentChannelId);
  const currentChannelMessages = messages.filter(({ channelId }) => channelId === currentChannelId);
  
  useEffect(() => setTimeout(() => divRef.current.scrollIntoView({ behavior: 'smooth' }), 0), [messages, divRef]);
  return (
    <div id="messages-box" className="chat-messages overflow-auto px-5 ">
      {currentChannelMessages.map(({ body, id, username }) => {
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
