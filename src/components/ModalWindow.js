import React, { useState } from "react";
import css from "../styles/styles.less";

const ModalWindow = (props) => {
  const handleCallBack = () => {
    props.closeModal();
  };
  const shaderId = props.content;
  const modalgl = (
    <iframe
      src={`https://www.shadertoy.com/embed/${shaderId}?gui=false&t=10&paused=false&muted=true`}
      width="640"
      height="360"
      frameborder="0"
      allowfullscreen="allowfullscreen"
    ></iframe>
  );
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
          <div className={css.cow}>{modalgl}</div>
        </div>
      </div>
    </div>
  );
};

export default ModalWindow;
