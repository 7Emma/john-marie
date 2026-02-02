import Toast from "./Toast";

const ToastContainer = ({ toast, onClose }) => {
  if (!toast) return null;

  return <Toast message={toast.message} type={toast.type} onClose={onClose} />;
};

export default ToastContainer;
