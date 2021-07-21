import React, { useEffect, useRef } from 'react';
import io from 'socket.io-client';
import { Modal, Button, ModalFooter } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { removeChannel, setCurrentChannel } from '../../redux/channels';
import { closeModal } from '../../redux/modal';

const Remove = () => {
  const isOpened = useSelector((state) => state.modal.isOpened);
  const modalChannelId = useSelector((state) => state.modal.extra.channelId);
  const channels = useSelector((state) => state.channelsInfo.channels);
  const defaultChannelId = channels[0].id;
  const socketRef = useRef(); 
  const dispatch = useDispatch();
  
  useEffect(() => {
    socketRef.current = io();
    socketRef.current.on('removeChannel', ({ id }) => {
      dispatch(removeChannel({ id }));
    });
  }, []);
  

  const handleRemoveChannel = (id) => () => {
    dispatch(removeChannel({ id }));
    dispatch(closeModal())
    dispatch(setCurrentChannel(defaultChannelId))
    socketRef.current.emit('removeChannel', { id });
  };

  return (
    <Modal show={isOpened} onHide={() => dispatch(closeModal())}>
      <Modal.Header>
        <Modal.Title>Remove Channel</Modal.Title>
        <Button variant="close" onClick={() => dispatch(closeModal())}></Button>
      </Modal.Header>
      <Modal.Body>
        Are You sure?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => dispatch(closeModal())}>
          Close
        </Button>
        <Button variant="danger" type="submit" onClick={handleRemoveChannel(modalChannelId)}>
          Remove
        </Button>        
      </Modal.Footer>
    </Modal>
  );
};

export default Remove;