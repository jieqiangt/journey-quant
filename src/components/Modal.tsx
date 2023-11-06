interface ModalProps {
  modalClass: string;
  classes: { [cssClassName: string]: string };
  updateItem:
    | { [colName: string]: string | number | boolean | undefined }
    | undefined;
  closeModal: () => void;
  dataType: string;
}

const Modal: React.FC<ModalProps> = (props) => {
  const { modalClass, updateItem, closeModal, classes, dataType } = props;

  const modalClassName = updateItem
    ? `${classes[modalClass]} modal--show`
    : `${classes[modalClass]}`;

  let updateForm;

  switch (dataType) {
    case "expense":
      updateForm = "";
      break;
    case "category":
      updateForm = "";
      break;
    case "recurring":
      updateForm = "";
      break;
  }

  return (
    <dialog className={modalClassName}>
      <button className={classes[`${modalClass}-close`]} onClick={closeModal}>
        {updateForm}
      </button>
    </dialog>
  );
};

export default Modal;
