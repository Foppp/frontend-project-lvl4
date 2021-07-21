import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import cn from 'classnames';
import { setCurrentChannel } from '../redux/channels';
import { openModal, closeModal } from '../redux/modal';

const Channels = () => {
  const channels = useSelector((state) => state.channelsInfo.channels);
  const currentChannelId = useSelector((state) => state.channelsInfo.currentChannelId);
  const [activeDropDown, setActiveDropDown] = useState(null);
  const dispatch = useDispatch();

  const handleSetCurrentChannel = (id) => () => {
    dispatch(setCurrentChannel(id));
    setActiveDropDown(null)
  };

  const handleOpenModal = (type, channelId = null) => () => {
    dispatch(openModal({ type, channelId }));
    setActiveDropDown(null)
  };

  const handleDropDown = (id) => {
    setActiveDropDown(!activeDropDown ? id : null);
  };

  return (
    <div className="col-4 col-md-2 border-end pt-5 px-0 bg-light">
      <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
        <span>Channels</span>
        <button type="button" className="btn btn-outline-primary btn-sm" onClick={handleOpenModal('addChannel')}>
          <span className="">+</span>
        </button>
      </div>
      <ul className="nav flex-column nav-pills nav-fill px-2">
        {channels.map(({ id, name, removable }) => {
          
          const classUnremovable = cn({
            'w-100 rounded-start text-start text-truncate btn': true,
            'btn-secondary': id === currentChannelId,
          });

          const classRemovable = cn({
            'flex-grow-0 text-start btn dropdown-toggle dropdown-toggle-split': true,
            'btn-secondary': id === currentChannelId,
          });

          const classDropDown = cn({
            "dropdown-menu mt-5 ms-5": true,
            show: activeDropDown === id,
          });

          return (
            <li className="nav-item w-100" key={id}>
              <div role="group" className="d-flex dropdown btn-group">
                <button
                  type="button"
                  className={classUnremovable}
                  onClick={handleSetCurrentChannel(id)}
                >
                  <span className="me-1">#</span>
                  {name}
                </button>
                {removable && (
                  <>
                    <button
                      type="button"
                      className={classRemovable}
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                      onClick={() => handleDropDown(id)}
                    >
                      <span className="visually-hidden">Toggle Dropdown</span>
                    </button>
                    <ul className={classDropDown}>
                      <li><a className="dropdown-item" href="#" onClick={handleOpenModal('renameChannel', id)}>Rename</a></li>
                      <li><a className="dropdown-item" href="#" onClick={handleOpenModal('removeChannel', id)}>Remove</a></li>
                    </ul>
                  </>
                )}
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  );
};

export default Channels;
