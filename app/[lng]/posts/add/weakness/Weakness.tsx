'use client';

import React, { useEffect, useState } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';
import {
  CardBody,
  Input,
  Listbox,
  ListboxItem,
  Select,
  SelectItem,
  Selection,
} from '@nextui-org/react';
import { IoMdSearch } from 'react-icons/io';

async function getCWE() {
  // delay test
  // await new Promise((resolve) => setTimeout(resolve, delay));
  const res = await fetch('http://localhost:4444/cwe');
  return res.json();
}

export default function Weakness() {
  const { data: cwe } = useSuspenseQuery({
    queryKey: ['cwe'],
    queryFn: getCWE,
  });

  const [clusterList] = useState<ClusterType[]>(
    cwe
      ? [{ id: -1, name: 'All clusters', description: '' }, ...cwe.clusters]
      : [],
  );
  const [weakList, setWeakList] = useState<WeaknessType[]>(
    cwe ? cwe.weaknesses : [],
  );
  const [clusterWeakList, setClusterWeakList] = useState<WeaknessType[]>([]); //검색 시 선택된 클러스터내에서 검색하기 위해 정의
  const [selectedCwe, setSelectedCwe] = useState<WeaknessType | null>(null);

  const onSelectCluster = (selection: Selection) => {
    const selectedKey = Number(Array.from(selection)[0]);
    if (selectedKey === -1) setWeakList(cwe.weaknesses);
    else {
      const filteredData = cwe.weaknesses.filter((value: WeaknessType) =>
        value.cluster_ids.some((id) => selectedKey === id),
      );
      setWeakList(filteredData);
      setClusterWeakList(filteredData);
    }
  };

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchKeyword = e.target.value;
    if (!searchKeyword) setWeakList(clusterWeakList);

    const regex = new RegExp(searchKeyword, 'gi');
    setWeakList(() =>
      clusterWeakList.filter((value) => regex.test(value.name)),
    );
  };

  useEffect(()=>{
    console.log("test husky")
  },[])

  return (
    <CardBody className="flex flex-col gap-3 ">
      <div className="border-1">
        <div className="flex gap-1 items-center border-b-1">
          <Input
            classNames={{
              input: ['bg-transparent'],
              innerWrapper: ['bg-transparent'],
              inputWrapper: [
                'bg-transparent',
                'hover:bg-white',
                'rounded-none',
                'focus-within:!bg-white',
                'shadow-none',
              ],
            }}
            onChange={onSearch}
            startContent={<IoMdSearch />}
          />
          <Select
            size="md"
            label="Select Asset Type"
            classNames={{
              base: ['max-w-xs'],
              trigger: [
                'bg-transparent',
                'shadow-none',
                'rounded-none',
                'border-l-1',
              ],
            }}
            onSelectionChange={onSelectCluster}
          >
            {clusterList.map((cluster: ClusterType) => (
              <SelectItem key={cluster.id} value={cluster.name}>
                {cluster.name}
              </SelectItem>
            ))}
          </Select>
        </div>
        <Listbox className="h-[300px] overflow-y-auto	" aria-label="Actions">
          {weakList.map((weakness) => (
            <ListboxItem
              key={weakness.id}
              onClick={() => setSelectedCwe(weakness)}
              textValue={weakness.name}
            >
              {weakness.name}({weakness.external_id})
            </ListboxItem>
          ))}
        </Listbox>
      </div>
      <div className="bg-zinc-100	p-3 rounded">
        <span>
          <span className="text-slate-500">Currently selected:</span>
          {selectedCwe ? (
            <span
              className="text-blue-600 cursor-pointer"
              onClick={() => setSelectedCwe(null)}
            >
              (Deselect)
            </span>
          ) : (
            'None'
          )}
        </span>

        {selectedCwe && (
          <div>
            <div className="flex flex-col">
              <span className="font-bold">Business Logic Errors</span>
              <span>{selectedCwe.external_id.toUpperCase()}</span>
            </div>
            <div>
              <p>{selectedCwe.description}</p>
            </div>
          </div>
        )}
      </div>
    </CardBody>
  );
}
