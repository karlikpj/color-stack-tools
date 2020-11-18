import React, { useState, useContext } from "react";
import { Store } from "../Store";
import { setModalState } from "../Actions";

import css from "../styles/styles.less";

const ModalWindow = (props) => {
  const { state, dispatch } = useContext(Store);
  const handleCallBack = () => {
    setModalState({ isOpen: false, content: null }, dispatch);
  };

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
        {props.content}
      </div>
    </div>
  );
};

export default ModalWindow;
