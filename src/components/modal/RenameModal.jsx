import React, { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import io from 'socket.io-client';
import { Modal, Button, Form, ModalFooter } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { renameChannel } from '../../redux/channels';
import { closeModal } from '../../redux/modal';
import { validate } from './schemaValidation';

const Rename = ({ handleRenameChannel, handleCloseModal }) => {
  const isOpened = useSelector((state) => state.modal.isOpened);
  const channels = useSelector((state) => state.channelsInfo.channels);
  const modalChannelId = useSelector((state) => state.modal.extra.channelId);
  const currentChannelName = channels.find(({ id }) => id === modalChannelId).name;
  const inputRef = useRef();

  useEffect(() => inputRef.current.select(), []);
  
  const formik = useFormik({
    initialValues: {
      body: currentChannelName,
    },
    onSubmit: ({ body }) => {
      handleRenameChannel(modalChannelId, body);
    },
    validationSchema: validate(channels),
  });
  
  return (
    <Modal show={isOpened} onHide={handleCloseModal}>
      <Modal.Header>
        <Modal.Title>Rename Channel</Modal.Title>
        <Button variant="close" onClick={handleCloseModal}></Button>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Control
              isInvalid={formik.touched.body && formik.errors.body}
              required
              ref={inputRef}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.body}
              data-testid="input-body"
              name="body"
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.body}
            </Form.Control.Feedback>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>
          Close
        </Button>
        <Button variant="primary" type="submit" onClick={formik.handleSubmit}>
          Rename
        </Button>        
      </Modal.Footer>
    </Modal>
  );
};

export default Rename;