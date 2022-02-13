import { useEffect } from "react";
import css from "./Modal.module.css";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";
const modalWindow = document.querySelector("#modalRoot");
const Modal = ({ onClose, children }) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.code === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);
  const handleBackdropClick = (event) => {
    if (event.currentTarget === event.target) {
      onClose();
    }
  };
  return createPortal(
    <div className={css.overlay} onClick={handleBackdropClick}>
      <div className={css.modal}>{children}</div>
    </div>,
    modalWindow
  );
};
export default Modal;
Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.object.isRequired,
};
