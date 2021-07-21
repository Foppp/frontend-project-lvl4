import React, { useEffect, useRef } from 'react';
import io from 'socket.io-client';
import { Modal, Button, ModalFooter } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { removeChannel, setCurrentChannel } from '../../redux/channels';
import { closeModal } from '../../redux/modal';

const Remove = ({ handleRemoveChannel, handleCloseModal }) => {
  const isOpened = useSelector((state) => state.modal.isOpened);
  const modalChannelId = useSelector((state) => state.modal.extra.channelId);
  
  return (
    <Modal show={isOpened} onHide={handleCloseModal}>
      <Modal.Header>
        <Modal.Title>Remove Channel</Modal.Title>
        <Button variant="close" onClick={handleCloseModal}></Button>
      </Modal.Header>
      <Modal.Body>
        Are You sure?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>
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