import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { fetchChatData } from '../redux/user.js';
import { useDispatch } from 'react-redux';
import InputForm from '../components/InputForm';
import Channels from '../components/Channels';
import MessagesHead from '../components/MessagesTop';
import MessagesBody from '../components/Messages';


const HomePage = (props) => {
  const dispatch = useDispatch();
  dispatch(fetchChatData());
  return (
  <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <Channels />
        <div className="col p-0 h-100">
          <div className="d-flex flex-column h-100">
            <MessagesHead />
            <MessagesBody />
            <InputForm />
          </div>
        </div>
      </div>
    </div>
  )
};

export default HomePage;
