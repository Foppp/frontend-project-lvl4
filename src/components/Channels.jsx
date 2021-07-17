import React from 'react';
import { useSelector } from 'react-redux';

const Channels = () => {
  const channels = useSelector((state) => state.channelsInfo.channels);
  return (
    <div className="col-4 col-md-2 border-end pt-5 px-0 bg-light">
      <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
        <span>Каналы</span>
        <button type="button" className="btn btn-outline-primary btn-sm">
          <span className="">+</span>
        </button>
      </div>
        <ul className="nav flex-column nav-pills nav-fill px-2">
          {channels.map(({ id, name}) => (
            <li className="nav-item w-100" key={id}>
              <button type="button" className="w-100 rounded-0 text-start btn">
                <span className="me-1">#</span>
                {name}
              </button>
            </li>
          ))}
        </ul>
    </div>
  );
}

export default Channels;
