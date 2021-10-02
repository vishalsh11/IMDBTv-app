import React from "react";
import ReactDOM from "react-dom";

import Backdrop from "./Backdrop";

import "./Modal.css";

const ModalOverlay = (props) => {
  const content = (
    <div>
      <div onClick={props.onCancel} className="modal">
        <h2>Clicked on {props.element}</h2>
      </div>
    </div>
  );

  return ReactDOM.createPortal(content, document.getElementById("modal-hook"));
};

const Modal = (props) => {
  return (
    <React.Fragment>
      {props.show && <Backdrop onClick={props.onCancel} />}
      <ModalOverlay {...props} />
    </React.Fragment>
  );
};

export default Modal;
