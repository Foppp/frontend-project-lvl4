import React from 'react';
import { Modal, Button, ModalFooter } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

const Remove = ({ removeChannel, closeModal }) => {
  const { t } = useTranslation();
  const isOpened = useSelector((state) => state.modal.isOpened);
  const modalChannelId = useSelector((state) => state.modal.extra.channelId);
  
  return (
    <Modal show={isOpened} onHide={closeModal}>
      <Modal.Header>
        <Modal.Title>{t('channels.modal.removeChannel')}</Modal.Title>
        <Button variant="close" onClick={closeModal}></Button>
      </Modal.Header>
      <Modal.Body>
        {t('channels.modal.confirmRemove')}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeModal}>
          {t('buttons.modal.close')}
        </Button>
        <Button variant="danger" type="submit" onClick={removeChannel(modalChannelId)}>
          {t('buttons.modal.remove')}
        </Button>        
      </Modal.Footer>
    </Modal>
  );
};

export default Remove;