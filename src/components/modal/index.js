import React, { useEffect , useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import io from 'socket.io-client';

import { addChannel, setCurrentChannel } from '../../redux/channels.js';
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
  // const isOpened = useSelector((state) => state.modal.isOpened);
  // const channels = useSelector((state) => state.channelsInfo.channels);
  // const inputRef = useRef(null);
  const socketRef = useRef(null);
  const dispatch = useDispatch();

  // useEffect(() => inputRef.current.focus(), []);
  
  useEffect(() => {
    socketRef.current = io();
    socketRef.current.on('newChannel', (channel) => {
      dispatch(setCurrentChannel(channel.id))
      dispatch(addChannel(channel));
    })
  }, [addChannel]);

  const modalType = useSelector((state) => state.modal.type);
  const Component = modals[modalType];
  // const handleCloseModal = () => {
  //   dispatch(closeModal())
  // };
  const handleAdd = (body) => {
    socketRef.current.emit('newChannel', { name: body });
    // dispatch(closeModal());
  };

  return (
    <>
      {modalType && <Component handleAddChannel={handleAdd}/>}
    </>
  );
}

export default Modal;
//export default (modalType) => modals[modalType];