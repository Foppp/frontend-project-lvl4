import React, { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import _ from 'lodash';
import { useSelector, useDispatch } from 'react-redux';
import { getUserId } from '../redux/user.js';
import io from 'socket.io-client';
import { addMessage } from '../redux/masseges.js';


const InputForm = () => {
  const messages = useSelector((state) => state.messagesInfo.messages);
  const channels = useSelector((state) => state.channelsInfo.channels);
  const channelId = useSelector((state) => state.channelsInfo.currentChannelId);
  const inputFocus = useRef(null);
  const socketRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => inputFocus.current.focus(), [channelId, messages]);

  useEffect(() => {
    socketRef.current = io();
    socketRef.current.on('newMessage', (message) => {
      dispatch(addMessage(message));
    })
  }, []);

  const onSubmit = ({ body }) => {
    const userId = getUserId();
    const username = userId.username;
    const id = _.uniqueId();
    const message = { id, body, username, channelId };
    socketRef.current.emit('newMessage', message)
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
            ref={inputFocus}
            name="body"
            data-testid="new-message"
            placeholder="Type text here..."
            className="border-0 p-0 ps-2 form-control"
            onChange={formik.handleChange}
            value={formik.values.body}
          />
          <div className="input-group-append">
            <button disabled="" type="submit" className="btn btn-group-vertical">
              <span className="">Send</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default InputForm;
