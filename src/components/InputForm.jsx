import React, { useEffect, useRef, useState } from 'react';
import { useFormik } from 'formik';
import _ from 'lodash';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { getUserId } from '../redux/user.js';
import io from 'socket.io-client';
import { addMessage } from '../redux/masseges.js';

const InputForm = () => {
  const { t } = useTranslation();
  const messages = useSelector((state) => state.messagesInfo.messages);
  const channels = useSelector((state) => state.channelsInfo.channels);
  const channelId = useSelector((state) => state.channelsInfo.currentChannelId);
  const inputFocus = useRef(null);
  const socketRef = useRef();
  const dispatch = useDispatch();
  const [ messageSendStatus, setMessageSendStatus ] = useState(null);

  useEffect(() => inputFocus.current.focus(), [channelId, messages, messageSendStatus]);

  useEffect(() => {
    socketRef.current = io();
    
    socketRef.current.on('newMessage', (message) => {
      dispatch(addMessage(message));
    })
  }, [socketRef]);

  const onSubmit = ({ body }) => {
    setMessageSendStatus('sending');
    const userId = getUserId();
    const username = userId.username;
    const id = _.uniqueId();
    const message = { id, body, username, channelId };
    if (socketRef.current.connected) {
      socketRef.current.emit('newMessage', message);
      setMessageSendStatus('sent');
    }
    setTimeout(() => setMessageSendStatus('failed'), 2000)
  };

  const formik = useFormik({
    initialValues: {
      body: '',
    },
    onSubmit: (values) => {
      onSubmit(values);
      formik.resetForm();
    }
  });

  return (
    <div className="mt-auto px-5 py-3">
      <form noValidate="" className="py-1 border rounded-2" onSubmit={formik.handleSubmit}>
        <div className="input-group has-validation">
          <input
            required
            ref={inputFocus}
            name="body"
            data-testid="new-message"
            placeholder={t('messages.messageInput')}
            className="border-0 p-0 ps-2 form-control"
            onChange={formik.handleChange}
            value={formik.values.body}
            disabled={messageSendStatus === 'sending'}
          />
          <div className="input-group-append">
            <button type="submit" className="btn btn-group-vertical" disabled={!formik.values.body}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor"><path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"></path></svg>
              <span className="visually-hidden">Send</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default InputForm;
