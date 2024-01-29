"use client";

import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { CardBody, Input, Listbox, ListboxItem, Select, SelectItem, Selection } from "@nextui-org/react";
import { IoMdSearch } from "react-icons/io";

async function getCWE() {
	const res = await fetch("http://localhost:4444/cwe");
	console.log("get CWE");
	console.log(res);
	return res.json();
}

export default function Weakness() {
	const {
		isLoading,
		error,
		data: cwe,
	} = useQuery({
		queryKey: ["cwe"],
		queryFn: getCWE,
	});

	console.log("cwe");
	console.log(cwe);

	const clusters: ClusterType[] = cwe.clusters;
	const weaknesses: WeaknessType[] = cwe.weaknesses;
	const [weakList, setWeakList] = useState<WeaknessType[]>([]);

	const [value, setValue] = useState<string>("");

	// const { clusters, weaknesses } = await getCWE();

	const getCwe = async () => {
		const res = await getCWE();
		// setClusters([{ id: -1, name: "All clusters", description: "" }, ...res.clusters]);
		// setWeaknesses(res.weaknesses);
		setWeakList(res.weaknesses);
	};

	console.log("cluster");
	console.log(clusters);

	const onSelectionUpdate = (selection: Selection) => {
		const selectedKey = Number(Array.from(selection)[0]);
		if (selectedKey === -1) setWeakList(weaknesses);
		else {
			const filteredData = weaknesses.filter((value) => value.cluster_ids.some((id) => selectedKey === id));
			setWeakList(filteredData);
		}
	};

	if (isLoading) return "Loading...";

	if (error) return "An error has occurred: " + error.message;

	return (
		<CardBody>
			<div className="border-1">
				<div className="flex gap-1 items-center">
					<Input startContent={<IoMdSearch />} />
					<Select size="md" label="Select Asset Type" className="max-w-xs" onSelectionChange={onSelectionUpdate}>
						{clusters.map((cluster: ClusterType) => (
							<SelectItem key={cluster.id} value={cluster.name}>
								{cluster.name}
							</SelectItem>
						))}
					</Select>
				</div>
				<Listbox className="h-[300px] overflow-y-auto	">
					{weakList.map((weakness) => (
						<ListboxItem key={weakness.id}>
							{weakness.name}({weakness.external_id})
						</ListboxItem>
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
