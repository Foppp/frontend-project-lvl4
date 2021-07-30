import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { getAuthHeader } from '../auth/index.js';
import { setInitialState } from '../redux/channels.js';
import InputForm from '../components/chat/MessageInput';
import Channels from '../components/chat/Channels';
import MessagesHead from '../components/chat/MessagesHead';
import MessagesBody from '../components/chat/MessagesBody';
import ModalComponent from '../components/modal/index.jsx';

const fetchChatData = () => async (dispatch) => {
  const headers = getAuthHeader();
  axios.get('/api/v1/data', { headers }).then((response) => {
    dispatch(setInitialState(response.data));
  }).catch((err) => err);
};

const HomePage = ({ socket }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchChatData());
  }, [dispatch]);

  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <Channels />
        <div className="col p-0 h-100">
          <div className="d-flex flex-column h-100">
            <MessagesHead />
            <MessagesBody />
            <InputForm socket={socket} />
            <ModalComponent socket={socket} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
