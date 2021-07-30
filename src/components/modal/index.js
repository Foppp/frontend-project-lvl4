import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import _ from 'lodash';
import {
  addChannel, removeChannel, renameChannel, setCurrentChannel,
} from '../../redux/channels.js';
import { closeModal } from '../../redux/modal.js';
import Add from './AddModal.jsx';
import Remove from './RemoveModal.jsx';
import Rename from './RenameModal.jsx';

const modals = {
  addChannel: Add,
  removeChannel: Remove,
  renameChannel: Rename,
};

const Modal = ({ socket }) => {
  const isOpened = useSelector((state) => state.modal.isOpened);
  const channels = useSelector((state) => state.channelsInfoReducer.channels);
  const defaultChannelId = _.get(_.head(channels), 'id', null);
  const modalType = useSelector((state) => state.modal.type);
  const socketRef = useRef(null);
  const dispatch = useDispatch();

  const Component = modals[modalType];

  useEffect(() => {
    socketRef.current = socket;
    socketRef.current.on('newChannel', (channel) => {
      dispatch(setCurrentChannel(channel.id));
      dispatch(addChannel(channel));
    });
    socketRef.current.on('removeChannel', ({ id }) => {
      dispatch(removeChannel({ id }));
    });
    socketRef.current.on('renameChannel', ({ id, name }) => {
      dispatch(renameChannel({ id, name }));
    });
  }, [dispatch, socketRef]);

  const handleCloseModal = () => {
    dispatch(closeModal());
  };

  const handleAddChannel = async (body) => {
    socketRef.current.emit('newChannel', { name: body }, (acknowledge) => {
      if (acknowledge.status === 'ok') console.log(acknowledge.data);
    });
  };

  const handleRenameChannel = async (id, name) => {
    socketRef.current.emit('renameChannel', { id, name }, (acknowledge) => {
      if (acknowledge.status === 'ok') console.log('ok');
    });
  };

  const handleRemoveChannel = async (id) => () => {
    dispatch(setCurrentChannel(defaultChannelId));
    socketRef.current.emit('removeChannel', { id }, (acknowledge) => {
      if (acknowledge.status === 'ok') console.log('ok');
    });
  };

  return (
    <>
      {modalType && (<Component
        isOpened={isOpened}
        addNewChannel={handleAddChannel}
        renameChannel={handleRenameChannel}
        removeChannel={handleRemoveChannel}
        closeModal={handleCloseModal}
      />)}
    </>
  );
};

export default Modal;
