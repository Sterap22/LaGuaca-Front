import Button from "../atoms/Button";


const ModalFooter = ({ onSave = {}, onClose = {} }) => {
    return (
      <div className="flex justify-end space-x-2">
        <Button
          onClick={()=>onClose()}
          className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
        >
          Cancelar
        </Button>
        <Button
          onClick={()=>onSave()}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Guardar
        </Button>
      </div>
    );
  };
  
  export default ModalFooter;
  