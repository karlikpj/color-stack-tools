import React, { useRef } from "react";

import css from "../styles/styles.less";

const LoadingBlock = (props) => {
  const loaderBlock = useRef();

  const throbber = (
    <div className={css.spinner}>
      <div className={css.rect1}></div>
      <div className={css.rect2}></div>
      <div className={css.rect3}></div>
      <div className={css.rect4}></div>
      <div className={css.rect5}></div>
    </div>
  );

  const { hasLoaded } = props;
  return (
    <div ref={loaderBlock}>
      {!hasLoaded && (
        <p className={css.loader}>please wait while loading shaders...</p>
      )}
      {!hasLoaded && throbber}
    </div>
  );
};

export default LoadingBlock;
