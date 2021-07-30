import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchChatData } from '../redux/user.js';
import InputForm from '../components/MessageInput';
import Channels from '../components/Channels';
import MessagesHead from '../components/MessagesHead';
import MessagesBody from '../components/MessagesBody';
import ModalComponent from '../components/modal/index.jsx';

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
