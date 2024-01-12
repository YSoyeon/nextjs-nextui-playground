import { Editor } from '@tiptap/react';
import React from 'react';

const headings = [
  { key: 'normal', value: 'Normal' },
  { key: 'h1', value: 'H1' },
  { key: 'h2', value: 'H2' },
  { key: 'h3', value: 'H3' },
  { key: 'h4', value: 'H4' },
  { key: 'h5', value: 'H5' },
  { key: 'h6', value: 'H6' },
];

type Level = 1 | 2 | 3 | 4 | 5 | 6;

type Props = {
  editor: Editor;
  selected: string;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
};
const HeadingSelect = ({ editor, selected, setSelected }: Props) => {
  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;

    if (value === 'normal') {
      editor.chain().focus().setParagraph().run();
    } else {
      editor
        .chain()
        .focus()
        .setHeading({ level: parseInt(value[1]) as Level })
        .run();
    }

    setSelected(value);
  };

  return (
    <select value={selected} className="max-w-xs" onChange={onChange}>
      {headings.map((heading) => (
        <option key={heading.key} value={heading.value}>
          {heading.value}
        </option>
      ))}
    </select>
  );
};

export default HeadingSelect;
