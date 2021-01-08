import React, { useContext, useMemo } from "react";
import ColorChips from "./ColorChips";

import { Store } from "../Store";
import { deleteLiveStack, exportStack, formatStack } from "../Actions";

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

  const handleFormat = () => {
    formatStack(id, dispatch);
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
      {memoizedColorChips}
      <a href="#" className={css.export} onClick={(e) => handleExport(e)}>
        export
      </a>
      <br />
      <a href="#" className={css.export} onClick={(e) => handleFormat(e)}>
        format
      </a>
    </div>
  );
};

export default ColorStack;
