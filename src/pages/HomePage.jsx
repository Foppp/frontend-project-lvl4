import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { fetchChatData } from '../redux/channels.js';
import { useSelector, useDispatch } from 'react-redux';
import InputForm from '../components/InputForm';
import Channels from '../components/Channels';
import MessagesHead from '../components/MessagesHead';
import MessagesBody from '../components/Messages';
import ModalComponent from '../components/modal/index.js';

const HomePage = (props) => {
  const dispatch = useDispatch();
  const modalType = useSelector((state) => state.modal.type);
  
  useEffect(() => {
    dispatch(fetchChatData());
  }, [])
  
  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <Channels />
        <div className="col p-0 h-100">
          <div className="d-flex flex-column h-100">
            <MessagesHead />
            <MessagesBody />
            <InputForm />
            <ModalComponent />
          </div>
        </div>
      </div>
    </div>
  )
};

export default HomePage;
