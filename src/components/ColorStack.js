import React, { useContext, useMemo } from "react";
import ColorChips from "./ColorChips";

import { Store } from "../Store";
import { deleteLiveStack } from "../Actions";

import css from "../styles/styles.less";

const ColorStack = (props) => {
  const { stackObject } = props;
  const { dispatch } = useContext(Store);

  const handleDelete = () => {
    deleteLiveStack(stackObject.target, dispatch);
  };

  const memoizedColorChips = useMemo(
    () => (
      <ColorChips
        isActive
        stack={stackObject.stack}
        target={stackObject.target}
      />
    ),
    [stackObject.stack]
  );

  return (
    <div className={css.stackWrapper}>
      <a href="#" className={css.delete} onClick={(e) => handleDelete(e)}>
        X
      </a>
      {memoizedColorChips}
    </div>
  );
};

export default ColorStack;
