import { Input } from '@nextui-org/react';
import { chosungIncludes } from 'es-hangul';
import React, { useRef, useState } from 'react';
import { dummyData } from './dummyData';

function MyCustomAutocomplete() {
  const [value, setValue] = useState<{ id: number; name: string }>({
    id: -1,
    name: '',
  });

  const [items, setItems] = useState<{ id: number; name: string; description: string }[]>(dummyData);

  const ref = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  const result = chosungIncludes('양소연', 'ㅇㅅ');

  const filterKeys: ['name', 'description'] = ['name', 'description'];

  return (
    <div>
      <h1>Autocomplete</h1>

      <div className="w-[300px]">
        <Input
          variant="bordered"
          autoComplete="off"
          value={value.name}
          onChange={(e) => {
            setValue({ id: -1, name: e.target.value });
            const newItems = dummyData
              .filter((p: { id: number; name: string; description: string }) => {
                let res = false;
                filterKeys.forEach((key) => {
                  const value = p[key];
                  console.log('value, ', value, e.target.value);
                  const chosungResult = chosungIncludes(value, e.target.value);
                  if (chosungResult) {
                    res = true;
                    return;
                  }
                  res = p[key].includes(e.target.value);
                  if (res) return;
                });
                return res;
              })
              .sort();
            setItems(newItems);
          }}
          onFocus={(e) => {
            console.log('onFocus');
            setOpen(true);
          }}
        />
        {/* <div>
          <Dropdown
            items={items}
            isOpen={open}
            setIsOpen={(isOpen) => setOpen(isOpen)}
            onOpenChange={() => setOpen(!open)}
            onSelectionChange={(index) => {}}
          />
        </div> */}
      </div>
    </div>
  );
}

export default MyCustomAutocomplete;
