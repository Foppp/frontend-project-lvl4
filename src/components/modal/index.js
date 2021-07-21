import React, { useEffect , useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import io from 'socket.io-client';
import _ from 'lodash';
import { addChannel, removeChannel, renameChannel, setCurrentChannel } from '../../redux/channels.js';
import { closeModal } from '../../redux/modal.js';
import Add from './AddModal.jsx';
import Remove from './RemoveModal.jsx';
import Rename from './RenameModal.jsx';

const modals = {
  addChannel: Add,
  removeChannel: Remove,
  renameChannel: Rename,
};

const Modal = () => {
  const isOpened = useSelector((state) => state.modal.isOpened);
  const channels = useSelector((state) => state.channelsInfo.channels);
  const defaultChannelId = _.get(_.head(channels), 'id', null);
  const modalType = useSelector((state) => state.modal.type);
  const socketRef = useRef(null);
  const dispatch = useDispatch();

  const Component = modals[modalType];

  useEffect(() => {
    socketRef.current = io();
    socketRef.current.on('newChannel', (channel) => {
      dispatch(setCurrentChannel(channel.id))
      dispatch(addChannel(channel));
    });
    socketRef.current.on('removeChannel', ({ id }) => {
      dispatch(setCurrentChannel(defaultChannelId))
      dispatch(removeChannel({ id }));
    });
    socketRef.current.on('renameChannel', ({ id, name }) => {
      dispatch(renameChannel({ id, name }));
    });
  }, []);

  const handleCloseModal = () => {
    dispatch(closeModal())
  };
  const handleAdd = (body) => {
    socketRef.current.emit('newChannel', { name: body });
  };

  const handleRename = (id, name) => {
    socketRef.current.emit('renameChannel', { id, name })
  };

  const handleRemove = (id) => () => {
    dispatch(removeChannel({ id }));
    dispatch(setCurrentChannel(defaultChannelId))
    socketRef.current.emit('removeChannel', { id });
  };

  return (
    <>
      {modalType && <Component
        isOpened={isOpened}
        handleAddChannel={handleAdd}
        handleRenameChannel={handleRename}
        handleRemoveChannel={handleRemove}
        handleCloseModal={handleCloseModal}
      />}
    </>
  );
}

export default Modal;
