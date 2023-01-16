import { useEffect, useRef, useState } from 'react';

export function useKeyboard(
  keyboardRef: React.MutableRefObject<HTMLDivElement>
): [
  (ev: React.MouseEvent<HTMLDivElement, MouseEvent>, key: string) => void,
  boolean
] {
  const currentfocusedElement = useRef<HTMLInputElement | undefined>();
  const [showKeyboard, setShowKeyboard] = useState(false);
  // This is another way to do it
  // const setCurrentElement = (ev: FocusEvent) => {
  //   //
  //   if (document.activeElement.tagName === 'A') {
  //     return;
  //   }
  //   console.log(document.activeElement.tagName);
  //   currentfocusedElement.current = document.activeElement as HTMLInputElement;
  // };

  const onKeyPress = (
    ev: React.MouseEvent<HTMLDivElement, MouseEvent>,
    key: string
  ) => {
    const currentElement = currentfocusedElement.current;
    if (!currentElement) {
      return;
    }

    // Update Input Logic
    const value = currentElement.value;
    const splitValue = value.split('');

    if (splitValue) {
      const sectionStart = currentElement.selectionStart;
      splitValue.splice(sectionStart as number, 0, key);
      const joinedValue = splitValue.join('');
      // https://stackoverflow.com/questions/23892547/what-is-the-best-way-to-trigger-onchange-event-in-react-js
      // Also Prevent Re-Render
      const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
        window.HTMLInputElement.prototype,
        'value'
      );
      nativeInputValueSetter?.set?.call(currentElement, joinedValue);
      // Ensures We set the value to React
      const event = new Event('input', { bubbles: true });
      currentElement.dispatchEvent(event);
      // Sets Cursor to expected place
      currentElement.selectionStart = sectionStart + 1;
      currentElement.selectionEnd = sectionStart + 1;
    }
  };

  useEffect(() => {
    // This is another way to do it
    // document.addEventListener('focusin', setCurrentElement);
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      // WE are not inside the keyboard dov
      console.log(event.target.type);
      if (keyboardRef.current && !keyboardRef.current.contains(event.target)) {
        console.log(event.target.tagName);
        if (event.target.tagName === 'INPUT' && event.target.type === 'text') {
          setShowKeyboard(true);
          return (currentfocusedElement.current =
            event.target as HTMLInputElement);
        } else {
          setShowKeyboard(false);
          currentfocusedElement.current = undefined;
        }
      }
    }
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [keyboardRef]);

  return [onKeyPress, showKeyboard];
}
