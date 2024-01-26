'use client';

import React, { useEffect, useState } from 'react';
import { CardBody, Input, Listbox, ListboxItem, Select, SelectItem } from '@nextui-org/react';
import { IoMdSearch } from 'react-icons/io';

async function getCWE() {
  const res = await fetch('http://localhost:4444/cwe');
  return res.json();
}

export default function Weakness() {
  const [clusters, setClusters] = useState<ClusterType[]>([]);
  const [weaknesses, setWeaknesses] = useState<ClusterType[]>([]);
  // const { clusters, weaknesses } = await getCWE();

  const getCwe = async () => {
    const res = await getCWE();
    setClusters(res.clusters);
    setWeaknesses(res.weaknesses);
  };
  useEffect(() => {
    getCwe();
  }, []);

  console.log('cluster');
  console.log(clusters);

  return (
    <CardBody>
      <div className="border-1">
        <div className="flex gap-1 items-center">
          <Input startContent={<IoMdSearch />} />
          <Select size="md" label="Select Asset Type" className="max-w-xs">
            {clusters.map((cluster: ClusterType) => (
              <SelectItem key={cluster.id} value={cluster.name}>
                {cluster.name}
              </SelectItem>
            ))}
          </Select>
        </div>
        <Listbox className="h-[300px] overflow-y-auto	">
          {weaknesses.map((weakness) => (
            <ListboxItem key={weakness.id}>{weakness.name}</ListboxItem>
          ))}
        </Listbox>
      </div>
      <div>
        <span>
          Currently selected: <span>(Deselect)</span>
        </span>
      </div>
    </CardBody>
  );
}
