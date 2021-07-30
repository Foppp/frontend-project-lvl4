import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

const MessagesHead = () => {
  const { t } = useTranslation();
  const currentChannelId = useSelector((state) => state.channelsInfoReducer.currentChannelId);
  const channels = useSelector((state) => state.channelsInfoReducer.channels);
  const messages = useSelector((state) => state.messagesInfoReducer.messages);
  const countMessages = messages.filter(({ channelId }) => channelId === currentChannelId).length;
  const currentChannel = channels.find(({ id }) => id === currentChannelId);

  return (
    <div className="bg-light mb-4 p-3 shadow-sm small">
      <p className="m-0"><b>{currentChannel && currentChannel.name}</b></p>
      <span className="text-muted">{t('messages.messagesCount.keyWithCount', { count: countMessages })}</span>
    </div>
  );
};
export default MessagesHead;
