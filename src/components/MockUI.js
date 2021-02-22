import React, { useContext, useState } from "react";

import StackSample from "./StackSample";
import LuminanceDisplay from "./LuminanceDisplay";

import generateSpread from "../utils/generateSpread";
import grade from "../utils/grade";
import hexToRgb from "../utils/hexToRgb";
import luminance from "../utils/luminance";

import { Store } from "../Store";
import { setModalState } from "../Actions";

import mock from "../styles/mock.less";
import css from "../styles/styles.less";

const MockUI = (props) => {
  const { state, dispatch } = useContext(Store);
  const { demo } = state;

  const demoStyle = {
    background: demo.background,
    color: demo.foreground,
    padding: 10,
  };
  const buttonStyle = {
    background: demo.primary,
    color: demo.foreground,
  };
  const dropStyle = {
    background: demo.foreground,
    color: demo.background,
    borderColor: demo.rimary,
  };

  return (
    <div className={mock.mock_container} style={demoStyle}>
      <div className={mock.usa_card__container}>
        <header className={mock.usa_card__header}>
          <h2 className={mock.usa_card__heading}>Media and header first</h2>
        </header>
        <div className={mock.usa_card__media}>
          <div className={mock.usa_card__img}>
            <img
              src="https://designsystem.digital.gov/img/introducing-uswds-2-0/built-to-grow--alt.jpg"
              alt="A placeholder image"
            />
          </div>
        </div>
        <div className={mock.usa_card__body}>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis
            earum tenetur quo cupiditate, eaque qui officia recusandae.
          </p>
        </div>
        <div className={mock.usa_card__footer}>
          <button style={buttonStyle} className={mock.usa_button}>
            Visit Florida Keys
          </button>
        </div>
      </div>
    </div>
  );
};

export default MockUI;
