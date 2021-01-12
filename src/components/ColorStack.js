import React, { useContext, useMemo } from "react";
import StackLoader from "./Stackloader";

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
    () => <StackLoader isActive stackObject={stackObject} id={id} />,
    [stackObject]
  );

  /**
      <a href="#" className={css.export} onClick={(e) => handleExport(e)}>
        export
      </a>
   */
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
