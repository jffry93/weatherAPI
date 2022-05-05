{
  /* <BenType poo={20} text='boo' handleChange={handleChange} /> */
}

import React, { FC, useState, useRef } from 'react';

interface Props {
  text: string;
  poo: number;
  handleChange: () => void;
}

export const BenType: FC<Props> = ({ poo, text, handleChange }) => {
  // USE STATE TYPESCRIPT
  // Can pass interfaces, object or types
  const [count, setCount] = useState<number | null>(null);

  //USE REF TYPESCRIPT

  const inputRef = useRef<HTMLInputElement>(null);
  const divRef = useRef<HTMLDivElement>(null);

  //USE REDUCER

  return (
    <div ref={divRef}>
      <h1>{text}</h1>
      <input ref={inputRef} onChange={handleChange} />
    </div>
  );
};
