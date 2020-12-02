import React, { useContext, useState } from "react";
import ColorStack from "./ColorStack";
import ModalWindow from "./ModalWindow";
import SelectColor from "./SelectColor";

import { Store } from "../Store";
import { addLiveStack, setModalState, loadLiveStack } from "../Actions";

import css from "../styles/styles.less";

const ColorStackGenerator = (props) => {
  const { state, dispatch } = useContext(Store);
  const {
    liveStacks,
    tokenSections,
    isModalOpen = false,
    modalContent = null,
  } = state;

  const [stackSelected, setStackSelected] = useState(tokenSections[0]);

  const handleSelect = (e) => {
    setStackSelected(e.target.value);
  };

  const handleAdd = () => {
    setModalState({ isOpen: true, content: <SelectColor /> }, dispatch);
  };

  const handleLoad = (e) => {
    loadLiveStack(stackSelected, dispatch);
  };

  const dropDown = (
    <select value={stackSelected} onChange={handleSelect}>
      {tokenSections.map((item) => {
        return (
          <option key={item} value={item}>
            {item}
          </option>
        );
      })}
    </select>
  );

  const makeStacks = (stacks) => {
    const stackNames = Object.keys(stacks);
    return stackNames.map((stack, index) => {
      return (
        <div className={css.wrapper} key={`STACK_${stack}_${index}`}>
          <ColorStack stackObject={stacks[stack]} id={stack} />
        </div>
      );
    });
  };

  return (
    <div>
      <div className={css.header}>
        <h1>USWDS Color Palette Generator</h1>
        <p>
          Tool for creating WCAG accessibile color palettes for use in web media
          and content
        </p>
        <ul className={css.controls}>
          <li>Select:</li>
          <li>{dropDown}</li>
          <li>
            <a href="#" className={css.button} onClick={handleLoad}>
              Load
            </a>
          </li>
          <li></li>
          <li>Create:</li>
          <li>
            <a href="#" className={css.button} onClick={handleAdd}>
              New
            </a>
          </li>
        </ul>
      </div>
      {makeStacks(liveStacks)}
      {isModalOpen && <ModalWindow content={modalContent} />}
    </div>
  );
};

export default ColorStackGenerator;
