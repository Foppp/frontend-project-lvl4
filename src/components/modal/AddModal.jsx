import React, { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import { Modal, Button, Form, ModalFooter } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { addChannel } from '../../redux/channels';

const Add = ({ closeModal }) => {
  const isOpened = useSelector((state) => state.modal.isOpened);
  const channels = useSelector((state) => state.channelsInfo.channels);
  const inputRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => inputRef.current.focus(), []);
  
  const handleAddChannel = (name) => {
    const id = channels.length + _.uniqueId();
    const newChannel = { id , name, removable: true };
    dispatch(addChannel(newChannel));
  };

  const formik = useFormik({
    initialValues: {
      body: '',
    },
    onSubmit: ({ body }) => {
      handleAddChannel(body);
      closeModal();
    },
  });
  
  return (
    <Modal show={isOpened} onHide={closeModal}>
      <Modal.Header>
        <Modal.Title>Add Channel</Modal.Title>
        <Button variant="close" onClick={closeModal}></Button>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Control
              required
              ref={inputRef}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.body}
              data-testid="input-body"
              name="body"
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeModal}>
          Close
        </Button>
        <Button variant="primary" type="submit" onClick={formik.handleSubmit}>
          Add
        </Button>        
      </Modal.Footer>
    </Modal>
  );
};

export default Add;