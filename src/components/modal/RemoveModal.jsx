import React from 'react';
import { Modal, Button, ModalFooter } from 'react-bootstrap';
import { useSelector } from 'react-redux';

const Remove = ({ removeChannel, closeModal }) => {
  const isOpened = useSelector((state) => state.modal.isOpened);
  const modalChannelId = useSelector((state) => state.modal.extra.channelId);
  
  return (
    <Modal show={isOpened} onHide={closeModal}>
      <Modal.Header>
        <Modal.Title>Remove Channel</Modal.Title>
        <Button variant="close" onClick={closeModal}></Button>
      </Modal.Header>
      <Modal.Body>
        Are You sure?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeModal}>
          Close
        </Button>
        <Button variant="danger" type="submit" onClick={removeChannel(modalChannelId)}>
          Remove
        </Button>        
      </Modal.Footer>
    </Modal>
  );
};

export default Remove;