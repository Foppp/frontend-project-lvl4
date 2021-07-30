import React, { useRef } from 'react';
import { useSelector } from 'react-redux';

const MessagesBody = () => {
  const divRef = useRef(null);
  const messages = useSelector((state) => state.messagesInfoReducer.messages);
  const currentChannelId = useSelector((state) => state.channelsInfoReducer.currentChannelId);
  const currentChannelMessages = messages.filter(({ channelId }) => channelId === currentChannelId);

  // useEffect(() => {
  // setTimeout(() => divRef.current.scrollIntoView({ behavior: 'smooth' }), 0),
  // [messages, currentChannelId] });
  return (
    <div id="messages-box" className="chat-messages overflow-auto px-5 ">
      {currentChannelMessages.map(({ body, id, username }) => (
          <div key={id} className="text-break mb-2">
            <b>{ username }</b> : { body }
          </div>
      ))}
      <div ref={ divRef } />
    </div >
  );
};

export default MessagesBody;
