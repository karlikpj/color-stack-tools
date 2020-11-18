import React, { useContext, useMemo } from "react";
import ColorChips from "./ColorChips";

import { Store } from "../Store";
import { deleteLiveStack, exportStack } from "../Actions";

import css from "../styles/styles.less";

const ColorStack = (props) => {
  const { stackObject } = props;
  const { dispatch } = useContext(Store);

  const handleDelete = () => {
    deleteLiveStack(stackObject.target, dispatch);
  };

  const handleExport = () => {
    exportStack(stackObject, dispatch);
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
      <h3>{stackObject.id}</h3>
      {memoizedColorChips}
      <a href="#" className={css.export} onClick={(e) => handleExport(e)}>
        export
      </a>
    </div>
  );
};

export default ColorStack;
