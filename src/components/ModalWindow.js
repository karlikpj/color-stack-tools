import React, { useState } from "react";
import css from "../styles/styles.less";

const ModalWindow = (props) => {
  const handleCallBack = () => {
    props.closeModal();
  };
  const shaderId = props.content;
  const content = "tbd";
  return (
    <div className={css.overlay}>
      <div className={css.modalWindow}>
        <a
          className={css.modalClose}
          href="#"
          onClick={(e) => {
            e.preventDefault();
            handleCallBack();
          }}
        >
          x
        </a>
        <div className={css.row}>
          <div className={css.cow}>{content}</div>
        </div>
      </div>
    </div>
  );
};

export default ModalWindow;
