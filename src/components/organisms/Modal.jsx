import ModalContent from "../atoms/ModalContent";
import ModalOverlay from "../atoms/ModalOverlay";
import ModalFooter from "../molecules/ModalFooter";
import ModalHeader from "../molecules/ModalHeader";


const Modal = ({ isOpen = false, onClose = {}, onSave = {}, children, title = "Agregar nueva mesa" }) => {
  return (
    <>
      <ModalOverlay isOpen={isOpen} onClose={onClose} />
      <ModalContent isOpen={isOpen}>
        <ModalHeader title={title} onClose={onClose} />
        <div className="mb-4">
          {
            children
          }
        </div>
        <ModalFooter onSave={onSave} onClose={onClose} />
      </ModalContent>
    </>
  );
};

export default Modal;
