import React, { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import { Modal, Button, Form, ModalFooter } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import { useSelector } from 'react-redux';

const Rename = ({ renameChannel, closeModal }) => {
  const { t } = useTranslation();
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
      renameChannel(modalChannelId, body);
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
        <Modal.Title>{t('channels.modal.renameChannel')}</Modal.Title>
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
              data-testid="rename-channel"
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
          {t('buttons.modal.rename')}
        </Button>        
      </Modal.Footer>
    </Modal>
  );
};

export default Rename;