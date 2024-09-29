const ModalContent = ({ isOpen = false, children }) => {
    return (
      isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">{children}</div>
        </div>
      )
    );
  };
  
  export default ModalContent;
  