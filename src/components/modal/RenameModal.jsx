import React, { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import io from 'socket.io-client';
import { Modal, Button, Form, ModalFooter } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { renameChannel } from '../../redux/channels';
import { closeModal } from '../../redux/modal';

const Rename = () => {
  const isOpened = useSelector((state) => state.modal.isOpened);
  const channels = useSelector((state) => state.channelsInfo.channels);
  const modalChannelId = useSelector((state) => state.modal.extra.channelId);
  const currentChannelName = channels.find(({ id }) => id === modalChannelId).name;
  const inputRef = useRef();
  const socketRef = useRef();

  const dispatch = useDispatch();

  useEffect(() => inputRef.current.select(), []);
  
  useEffect(() => {
    socketRef.current = io();
    socketRef.current.on('renameChannel', ({ id, name }) => {
      dispatch(renameChannel({ id, name }));
    })
  }, []);
  
  const handleRenameChannel = (id, name) => {
    socketRef.current.emit('renameChannel', { id, name })
  };

  const formik = useFormik({
    initialValues: {
      body: currentChannelName,
    },
    onSubmit: ({ body }) => {
      dispatch(closeModal())
      handleRenameChannel(modalChannelId, body);
    },
    validationSchema: Yup.object().shape({
      body: Yup.string()
        .min(3, 'From 3 to 20 characters')
        .max(20, 'From 3 to 20 characters')
        .test(
          'is-exist',
          'This channel name already exist',
          (value) => !_.some(channels, ['name', value]))
    }),
  });
  
  return (
    <Modal show={isOpened} onHide={() => dispatch(closeModal())}>
      <Modal.Header>
        <Modal.Title>Rename Channel</Modal.Title>
        <Button variant="close" onClick={() => dispatch(closeModal())}></Button>
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
        <Button variant="secondary" onClick={() => dispatch(closeModal())}>
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