import Add from './AddModal.jsx';
import Remove from './RemoveModal.jsx';
import Rename from './RenameModal.jsx';

const modals = {
  addChannel: Add,
  removeChannel: Remove,
  renameChannel: Rename,
};

// const Modal = () => {
//   const modalType = useSelector((state) => state.modal.type);
//   const Component = modals[modalType];
//   const dispatch = useDispatch();

//   // const handleCloseModal = () => {
//   //   dispatch(closeModal())
//   // };

//   return (
//     <>
//       {modalType && <Component/>}
//     </>
//   );
// }

export default (modalType) => modals[modalType];