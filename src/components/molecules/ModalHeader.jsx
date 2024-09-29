import Button from "../atoms/Button";

const ModalHeader = ({ title = '', onClose = {} }) => {
    return (
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">{title}</h2>
        <Button onClick={onClose} className="text-gray-600 hover:text-gray-900">
          X
        </Button>
      </div>
    );
  };
  
  export default ModalHeader;
  