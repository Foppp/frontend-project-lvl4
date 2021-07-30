import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';
import { setCurrentChannel } from '../../redux/channels.js';
import { openModal } from '../../redux/modal.js';

const Channels = () => {
  const { t } = useTranslation();
  const channels = useSelector((state) => state.channelsInfoReducer.channels);
  const currentChannelId = useSelector((state) => state.channelsInfoReducer.currentChannelId);
  const [activeDropDown, setActiveDropDown] = useState(null);
  const dispatch = useDispatch();

  const handleSetCurrentChannel = (id) => () => {
    dispatch(setCurrentChannel(id));
    setActiveDropDown(null);
  };

  const handleOpenModal = (type, channelId = null) => () => {
    dispatch(openModal({ type, channelId }));
    setActiveDropDown(null);
  };

  const handleDropDown = (id) => {
    setActiveDropDown(!activeDropDown ? id : null);
  };

  return (
    <div className="col-4 col-md-2 border-end pt-5 px-0 bg-light">
      <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
        <span>{t('channels.title')}</span>
        <button type="button" className="p-0 text-primary btn btn-group-vertical" onClick={handleOpenModal('addChannel')}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
          </svg>
          <span className="visually-hidden">+</span>
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
            'dropdown-menu mt-5 ms-5': true,
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
                      <li><button type="button" className="dropdown-item" onClick={handleOpenModal('renameChannel', id)}>{t('channels.rename')}</button></li>
                      <li><button type="button" className="dropdown-item" onClick={handleOpenModal('removeChannel', id)}>{t('channels.remove')}</button></li>
                    </ul>
                  </>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Channels;
