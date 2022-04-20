import * as React from 'react'
import { FC } from 'react';
import classnames from 'classnames';
import { imgUrl as imgLink } from '@/src/utils';
import './App.scss'

type props = {
  name?: string
}

type otherProps<T> = {
  some?: T
}

const prefixCls = 'site'
const App: FC<props & otherProps<string>> = () => {
  return (
    <div className="app">
      <h1> React Webpack Demo</h1>
      <img
        className={classnames('img', {
          [prefixCls]: true,
          [`${prefixCls}--widescreen`]: true,
        })}
        src={imgLink}
      />
      <div className="app__img"></div>

    </div>
  );
}

export default App;
