import React, { useContext, useMemo } from "react";
import ColorChips from "./ColorChips";

import { Store } from "../Store";
import { deleteLiveStack, exportStack } from "../Actions";

import css from "../styles/styles.less";

const ColorStack = (props) => {
  const { stackObject, id } = props;
  const { dispatch } = useContext(Store);

  const handleDelete = () => {
    deleteLiveStack(id, dispatch);
  };

  const handleExport = () => {
    exportStack(id, dispatch);
  };

  const memoizedColorChips = useMemo(
    () => <ColorChips isActive stack={stackObject} id={id} />,
    [stackObject]
  );

  return (
    <div className={css.stackWrapper}>
      <a href="#" className={css.delete} onClick={(e) => handleDelete(e)}>
        X
      </a>
      <h3>{id}</h3>
      {memoizedColorChips}
      <a href="#" className={css.export} onClick={(e) => handleExport(e)}>
        export
      </a>
    </div>
  );
};

export default ColorStack;
