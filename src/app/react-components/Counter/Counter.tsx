import * as React from 'react';
import Note from "./Note"
import {FunctionComponent, useEffect, useRef, useState} from 'react';


export interface IMyComponentProps {
  counter: number;
  onClick?: () => void;
  onDecrease?: () => void;
}

export const CounterComponent: FunctionComponent<IMyComponentProps> = (props: IMyComponentProps) => {

  const [stateCounter, setStateCounter] = useState(0);

  // useEffect(() => {
  //   timerHandle.current = +setInterval(() => {
  //     setStateCounter(stateCounter + 1);
  //   }, 2500);

  //   return () => {
  //     if (timerHandle.current) {
  //       clearInterval(timerHandle.current);
  //       timerHandle.current = null;
  //     }
  //   };
  // });

  const {counter: propsCounter, onClick, onDecrease} = props;

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  const handleDecrease = () => {
    if (onDecrease) {
      onDecrease();
    }
  };

  const [inputValue, setInputValue] = useState("");
  const [notes, setNotes] = useState([]);


  const updateNoteText = event => {
    setInputValue(event.target.value);
  };

  const handleKeyPress = e => {
    if (e.key === "Enter") {
      addTask();
    }
  };

  const addTask = () => {
    // if (!inputValue.replace(/\s/, "").length) {
    //   return;
    // }
    const newNotesArray = [...notes, inputValue];
    setNotes(newNotesArray);
    setInputValue("");
  };

  const deleteTask = index => {
    const notesArray = [...notes];
    notesArray.splice(index, 1);
    setNotes(notesArray);
  };

  return <div>
    <div>Counter</div>
      <div className={`my-graph-component`}>
        <div className={'comp-props'}>Counter: {propsCounter}</div>
        <div className={'comp-props'}>
          <span onClick={handleDecrease}className={'increase-button'}>click to decrease</span>
          <span onClick={handleClick}className={'increase-button'}>click to increase</span>
        </div>
    </div>

    <div className={`header-text`}>Todo</div>
    <div className={`my-graph-component`}>
      <div className="container">
      <div className={'comp-props'}>
        <span >
          <input
            type="text"
            className="textInput"
            value={inputValue}
            onChange={updateNoteText}
            onKeyPress={handleKeyPress}
          />
          <span className={'btn'} onClick={addTask}>
          +
        </span>
        </span>
        
        </div>
        
        {notes.map((item, index) => (
          <Note
            item={item}
            onClick={() => deleteTask(index)}
            key={`task${index}`}
          />
        ))}
      </div>
    </div>
  </div>;
};
