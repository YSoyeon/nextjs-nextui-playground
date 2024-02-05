'use client';

import { CardBody, Tab, Tabs } from '@nextui-org/react';
import React, { useState } from 'react';

const Severity = () => {
  const [val, setVal] = useState<{ [key: string]: string }>({
    AV: '?',
    AC: '?',
    PR: '?',
    UI: '?',
    S: '?',
    C: '?',
    I: '?',
    A: '?',
  });
  console.log('val', val);

  const onSelectionChange = (pk: string, k: string) => {
    setVal((prev) => ({ ...prev, [pk]: k }));
  };

  return (
    <CardBody className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <h5 className="w-[150px]">Attack vector</h5>
        <Tabs
          variant="solid"
          onSelectionChange={(k) => onSelectionChange('AV', k.toString())}
        >
          <Tab key="N" title="Network"></Tab>
          <Tab key="A" title="Adjacent"></Tab>
          <Tab key="L" title="Local"></Tab>
          <Tab key="P" title="Physical"></Tab>
        </Tabs>
      </div>
      <div className="flex items-center gap-2">
        <h5 className="w-[150px]">Attack complexity</h5>
        <Tabs
          key="solid"
          variant="solid"
          onSelectionChange={(k) => onSelectionChange('AC', k.toString())}
        >
          <Tab key="L" title="Low" />
          <Tab key="H" title="High" />
        </Tabs>
      </div>
      <div className="flex items-center gap-2">
        <h5 className="w-[150px]">Privileges required</h5>
        <Tabs
          key="solid"
          variant="solid"
          onSelectionChange={(k) => onSelectionChange('PR', k.toString())}
        >
          <Tab key="N" title="None" />
          <Tab key="L" title="Low" />
          <Tab key="H" title="High" />
        </Tabs>
      </div>
      <div className="flex items-center gap-2">
        <h5 className="w-[150px]">User interaction</h5>
        <Tabs
          key="solid"
          variant="solid"
          onSelectionChange={(k) => onSelectionChange('UI', k.toString())}
        >
          <Tab key="N" title="None" />
          <Tab key="R" title="Required" />
        </Tabs>
      </div>
      <div className="flex items-center gap-2">
        <h5 className="w-[150px]">Scope</h5>
        <Tabs
          key="solid"
          variant="solid"
          onSelectionChange={(k) => onSelectionChange('S', k.toString())}
        >
          <Tab key="U" title="Unchanged" />
          <Tab key="C" title="Changed" />
        </Tabs>
      </div>
      <div className="flex items-center gap-2">
        <h5 className="w-[150px]">Confidentiality</h5>
        <Tabs
          key="solid"
          variant="solid"
          onSelectionChange={(k) => onSelectionChange('C', k.toString())}
        >
          <Tab key="N" title="None" />
          <Tab key="L" title="Low" />
          <Tab key="H" title="High" />
        </Tabs>
      </div>

      <div className="flex items-center gap-2">
        <h5 className="w-[150px]">Integrity</h5>
        <Tabs
          key="solid"
          variant="solid"
          onSelectionChange={(k) => onSelectionChange('I', k.toString())}
        >
          <Tab key="N" title="None" />
          <Tab key="L" title="Low" />
          <Tab key="H" title="High" />
        </Tabs>
      </div>
      <div className="flex items-center gap-2">
        <h5 className="w-[150px]">Availability</h5>
        <Tabs
          key="solid"
          variant="solid"
          onSelectionChange={(k) => onSelectionChange('A', k.toString())}
        >
          <Tab key="N" title="None" />
          <Tab key="L" title="Low" />
          <Tab key="H" title="High" />
        </Tabs>
      </div>

      <div className="border-1"></div>
    </CardBody>
  );
};

export default Severity;
