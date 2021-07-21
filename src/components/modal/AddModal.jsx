import React, { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import io from 'socket.io-client';
import { Modal, Button, Form, ModalFooter } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { addChannel, setCurrentChannel } from '../../redux/channels';
import { closeModal } from '../../redux/modal';

const Add = () => {
  const isOpened = useSelector((state) => state.modal.isOpened);
  const channels = useSelector((state) => state.channelsInfo.channels);
  const inputRef = useRef(null);
  const socketRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => inputRef.current.focus(), []);
  
  useEffect(() => {
    socketRef.current = io();
    socketRef.current.on('newChannel', (channel) => {
      dispatch(setCurrentChannel(channel.id))
      dispatch(addChannel(channel));
    })
  }, [addChannel]);

  const formik = useFormik({
    initialValues: {
      body: '',
    },
    onSubmit: ({ body }) => {
      socketRef.current.emit('newChannel', { name: body });
      dispatch(closeModal());
    },
    validationSchema: Yup.object().shape({
      body: Yup.string()
        .min(3, 'From 3 to 20 characters')
        .max(20, 'From 3 to 20 characters')
        .test(
          'is-exist',
          '${path} channel already exist',
          (value) => !_.some(channels, ['name', value]))
     }),
  });
  
  return (
    <Modal show={isOpened} onHide={() => dispatch(closeModal())}>
      <Modal.Header>
        <Modal.Title>Add Channel</Modal.Title>
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
          Add
        </Button>        
      </Modal.Footer>
    </Modal>
  );
};

export default Add;