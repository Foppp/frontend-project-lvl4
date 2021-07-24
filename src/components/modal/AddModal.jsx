import React, { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Modal, Button, Form, ModalFooter } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

const Add = ({ addNewChannel, closeModal }) => {
  const { t } = useTranslation();
  const isOpened = useSelector((state) => state.modal.isOpened);
  const channels = useSelector((state) => state.channelsInfo.channels);
  const inputRef = useRef(null);
  const socketRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => inputRef.current.focus(), []);

  const formik = useFormik({
    initialValues: {
      body: '',
    },
    onSubmit: ({ body }) => {
      addNewChannel(body)
    },
    validationSchema: Yup.object().shape({
      body: Yup.string()
        .min(3)
        .max(20)
        .notOneOf(channels.map(({name}) => name))
    }),
  });
  
  return (
    <Modal show={isOpened} onHide={closeModal}>
      <Modal.Header>
        <Modal.Title>{t('channels.modal.addChannel')}</Modal.Title>
        <Button variant="close" onClick={closeModal}></Button>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Control
              isInvalid={formik.touched.body && formik.errors.body}
              required
              ref={inputRef}
              onChange={formik.handleChange}
              value={formik.values.body}
              data-testid="add-channel"
              name="body"
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.body}
            </Form.Control.Feedback>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeModal}>
          {t('buttons.modal.close')}
        </Button>
        <Button variant="primary" type="submit" onClick={formik.handleSubmit}>
          {t('buttons.modal.add')}
        </Button>        
      </Modal.Footer>
    </Modal>
  );
};

export default Add;