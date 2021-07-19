import React, { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import _ from 'lodash';
import Add from './AddModal.jsx';
import Remove from './RemoveModal.jsx';
import Rename from './RenameModal.jsx';
import { closeModal } from '../../redux/modal.js';

const modals = {
  addChannel: Add,
  removeChannel: Remove,
  renameChannel: Rename,
};

const Modal = () => {
  const isOpened = useSelector((state) => state.modal.isOpened);
  const modalType = useSelector((state) => state.modal.type);
  const modalExtra = useSelector((state) => state.modal.extra);
  const Component = modals[modalType];
  const dispatch = useDispatch();

  const handleCloseModal = () => {
    dispatch(closeModal())
  };

  const handleRemoveChannel = (id) => {
    dispatch(removeChannel({ id }))
  };



  return (
    <>
      {modalType && <Component closeModal={handleCloseModal}/>}
    </>
  );
}

export default Modal;