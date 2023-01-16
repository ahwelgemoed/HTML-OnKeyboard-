import * as React from 'react';
import { keys } from './keys.helper';
import './style.css';
import { useKeyboard } from './useKeyboard';

export function Keyboard() {
  const keyboardRef = React.useRef<HTMLDivElement>(null);
  const [onKeyPress, showKeyboard] = useKeyboard(keyboardRef);

  return (
    <div ref={keyboardRef} className={`keyboard ${showKeyboard ? '' : 'none'}`}>
      {keys.map((keyRow, i) => {
        return (
          <div className="keyRow" key={i + 'keyRow'}>
            {keyRow.map((key, ii) => {
              return (
                <div
                  className="key"
                  key={ii + 'key' + key}
                  onClick={(ev: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
                    onKeyPress(ev, key)
                  }
                >
                  {key}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
