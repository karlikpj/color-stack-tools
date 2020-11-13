import React, { useState } from "react";
import ColorStack from "./ColorStack";
import css from "../styles/styles.less";

const baseColors = ["#201FF3", "#f9319f", "#33FF9f", "#f9f100"];
const ColorStackGenerator = (props) => {
  const [stackSize, setStackSize] = useState(10);
  const [liveStacks, setLiveStacks] = useState(baseColors);

  const randomColor = () => {
    return "#" + Math.floor(Math.random() * 16777214).toString(16);
  };

  const handleSelect = (e) => {
    setStackSize(e.target.value);
  };

  const handleClick = () => {
    const newStack = JSON.parse(JSON.stringify(liveStacks));
    newStack.push(randomColor());
    setLiveStacks(newStack);
  };

  const handleUpdate = (newcolor, color) => {
    let newStack = JSON.parse(JSON.stringify(liveStacks));
    const i = newStack.findIndex((colors) => colors === color);
    newStack[i] = newcolor;
    setLiveStacks(newStack);
  };

  const handleDelete = (color) => {
    if (liveStacks.length < 2) return;
    let newStack = JSON.parse(JSON.stringify(liveStacks));
    const i = newStack.findIndex((colors) => colors === color);
    newStack.splice(i, 1);
    setLiveStacks(newStack);
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
          <ColorStack
            color={item}
            updateColor={handleUpdate}
            removeColor={handleDelete}
            stackSize={~~(stackSize / 2)}
          />
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
