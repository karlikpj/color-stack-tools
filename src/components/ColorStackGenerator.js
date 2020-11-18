import React, { useContext } from "react";
import ColorStack from "./ColorStack";
import ModalWindow from "./ModalWindow";
import SelectColor from "./SelectColor";

import { Store } from "../Store";
import { addLiveStack, setModalState, setStackSize } from "../Actions";

import css from "../styles/styles.less";

const ColorStackGenerator = (props) => {
  const { state, dispatch } = useContext(Store);
  const {
    stackSize,
    liveStacks,
    isModalOpen = false,
    modalContent = null,
  } = state;
  const handleSelect = (e) => {
    setStackSize(e.target.value, dispatch);
  };

  const handleClick = () => {
    addLiveStack(dispatch);
  };

  const handleCart = () => {
    setModalState({ isOpen: true, content: <SelectColor /> }, dispatch);
  };
  const isDisabled = liveStacks.length > 0;
  const dropDown = (
    <select value={stackSize} onChange={handleSelect} disabled={isDisabled}>
      <option value="4">4</option>
      <option value="6">6</option>
      <option value="8">8</option>
      <option value="10">10</option>
      <option value="12">12</option>
      <option value="14">14</option>
    </select>
  );

  const makeStacks = (stacks) => {
    return stacks.map((stack, index) => {
      return (
        <div className={css.wrapper} key={`STACK_${index}_${index}`}>
          <ColorStack stackObject={stack} />
        </div>
      );
    });
  };
  return (
    <div>
      <div className={css.header}>
        <h1>Color Stack Generator</h1>
        <ul className={css.controls}>
          <li>stack size</li>
          <li>{dropDown}</li>
          <li>&nbsp;</li>
          <li>
            <a href="#" className={css.button} onClick={handleCart}>
              add
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
