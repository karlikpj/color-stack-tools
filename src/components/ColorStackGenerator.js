import React, { useContext } from "react";
import ColorStack from "./ColorStack";

import { Store } from "../Store";
import { setStackSize, addLiveStack } from "../Actions";

import css from "../styles/styles.less";

const ColorStackGenerator = (props) => {
  const { state, dispatch } = useContext(Store);
  const { stackSize, liveStacks } = state;

  const handleSelect = (e) => {
    setStackSize(e.target.value, dispatch);
  };

  const handleClick = () => {
    addLiveStack(dispatch);
  };

  const dropDown = (
    <select value={stackSize} onChange={handleSelect}>
      <option value="4">4</option>
      <option value="6">6</option>
      <option value="10">10</option>
      <option value="14">14</option>
      <option value="16">16</option>
      <option value="20">20</option>
    </select>
  );

  const makeStacks = (stacks) => {
    return stacks.map((item, index) => {
      return (
        <div className={css.wrapper} key={`STACK_${index}_${index}`}>
          <ColorStack color={item} />
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
            <a href="#" onClick={handleClick}>
              add
            </a>
          </li>
        </ul>
      </div>
      {makeStacks(liveStacks)}
    </div>
  );
};

export default ColorStackGenerator;
