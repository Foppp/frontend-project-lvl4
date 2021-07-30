import React, { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';

const MessagesBody = () => {
  const messageBoxRef = useRef(null);
  const messages = useSelector((state) => state.messagesInfoReducer.messages);
  const currentChannelId = useSelector((state) => state.channelsInfoReducer.currentChannelId);
  const currentChannelMessages = messages.filter(({ channelId }) => channelId === currentChannelId);

  useEffect(() => {
    const messageBox = messageBoxRef.current;
    messageBox.scrollTop = messageBox.scrollHeight;
  });

  return (
    <div id="messages-box" ref={messageBoxRef} className="chat-messages overflow-auto px-5 ">
      {currentChannelMessages.map(({ body, id, username }) => (
        <div key={id} className="text-break mb-2">
          <b>{username}</b>
          :
          {body}
        </div>
      ))}
    </div>
  );
};

export default MessagesBody;
