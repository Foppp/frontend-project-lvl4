import React from 'react';
import { useSelector } from 'react-redux';

const MessagesHead = () => {
  const currentChannelId = useSelector((state) => state.channelsInfo.currentChannelId);
  const channels = useSelector((state) => state.channelsInfo.channels)
  const messages = useSelector((state) => state.messagesInfo.messages);
  const countMessages = messages.filter(({ channelId }) => channelId === currentChannelId).length;
  const currentChannel = channels.find(({id}) => id === currentChannelId);

  return (
    <div className="bg-light mb-4 p-3 shadow-sm small">
      <p className="m-0"><b>{currentChannel && currentChannel.name}</b></p>
      <span className="text-muted">{ countMessages } messages</span>
    </div>
  );

};
export default MessagesHead;
