import React, { useEffect, useState } from 'react';

type Props = {
  children: React.ReactElement;
  onClick: (on: boolean) => void;
  selected: boolean;
};
const ToggleButton = ({ children, onClick, selected }: Props) => {
  const [on, setOn] = useState<boolean>(selected);

  const onClickButton = () => {
    const toggledState = !on;
    setOn(toggledState);
    onClick(toggledState);
  };

  useEffect(() => {
    setOn(selected);
  }, [selected]);
  return (
    <button
      type="button"
      className={`p-1 ${on ? 'rounded bg-slate-400 text-black' : ''}`}
      onClick={onClickButton}
    >
      {children}
    </button>
  );
};

export default ToggleButton;
