import React, { useEffect, useState } from 'react';

interface Props {
  items: any[];
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onOpenChange: () => void;
  onSelectionChange: (index: number) => void;
}

function Dropdown({ items, isOpen, setIsOpen, onSelectionChange }: Props) {
  const [selectionIndex, setSelectionIndex] = useState(-1);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (!isOpen) return;

      switch (e.keyCode) {
        case 40: // 아래 화살표
          e.preventDefault();
          setSelectionIndex((prevIndex) => (prevIndex < items.length - 1 ? prevIndex + 1 : prevIndex));
          break;
        case 38: // 위 화살표
          e.preventDefault();
          setSelectionIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));
          break;
        case 27: // ESC 키
          setIsOpen(false);
          break;
        case 13: // Enter 키
          if (selectionIndex !== -1) {
            alert(`${items[selectionIndex]} 선택됨`);
            setIsOpen(false);
          }
          break;
        default:
          break;
      }
    }

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, selectionIndex, items]);

  return (
    <div className="relative">
      {isOpen &&
        (items && items.length ? (
          <ul className="absolute right-0 mt-2 w-[300px] origin-top-right divide-y divide-gray-100 rounded border border-gray-200 bg-white shadow-lg">
            {items.map((item, index) => (
              <li
                key={item.id}
                className={`flex cursor-pointer gap-3 p-2 hover:bg-gray-100 ${selectionIndex === index ? 'bg-gray-200' : ''}`}
                onClick={() => {
                  setSelectionIndex(index);
                  onSelectionChange(index);
                }}
              >
                <span>{item.name}</span>
                <span>{item.description}</span>
              </li>
            ))}
          </ul>
        ) : (
          <span>검색 결과가 없습니다.</span>
        ))}
    </div>
  );
}

export default Dropdown;
