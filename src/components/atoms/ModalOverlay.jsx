const ModalOverlay = ({ isOpen = false, onClose = {}}) => {
    return (
      isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={onClose}
        ></div>
      )
    );
  };
  
  export default ModalOverlay;
  