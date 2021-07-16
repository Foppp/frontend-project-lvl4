import React from 'react';
import { useFormik } from 'formik';
import _ from 'lodash';
import { useSelector, useDispatch } from 'react-redux';
import { getUserId } from '../redux/user.js';

const InputForm = () => {
  const channels = useSelector((state) => state.channelsInfo.channels);
  const channelId = useSelector((state) => state.channelsInfo.currentChannelId);

  const onSubmit = ({ body }) => {
    const userId = getUserId();
    const username = userId.username;
    const message = { id: _.uniqueId(), body, username, channelId };
  }
const formik = useFormik({
  initialValues: {
    body: '',
  },
  onSubmit: (values) => {
    onSubmit(values);
  }
});
  return (
  <div className="mt-auto px-5 py-3">
    <form noValidate="" className="py-1 border rounded-2" onSubmit={formik.handleSubmit}>
      <div className="input-group has-validation">
        <input
          name="body"
          data-testid="new-message"
          placeholder="Type your message here..."
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
