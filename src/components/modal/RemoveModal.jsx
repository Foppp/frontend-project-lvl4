import React, { useEffect, useRef } from 'react';
import { Modal, Button } from 'react-bootstrap';
// import { closeModal } from '../../redux/modal';

const Rename = (props) => {
  const { isOpened, handleClose, onRemove, onBlur } = props;

  return (
    <Modal show={isOpened} onHide={handleClose}>
      <Modal.Header>
        <Modal.Title>Remove Channel</Modal.Title>
        <Button variant="close" onClick={handleCloseModal}></Button>
      </Modal.Header>
      <Modal.Body>Are you sure to remove this channel ?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>
          Close
        </Button>
        <Button variant="danger" type="submit" onClick={onRemove}>
          Remove
        </Button>        
      </Modal.Footer>
    </Modal>
  );
};

export default Rename;