'use client';

import { Weight } from '@/lib/util/cvss';
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

  //base group
  const bg = {
    AV: 'Attack Vector',
    AC: 'Attack Complexity',
    PR: 'Privileges Required',
    UI: 'User Interaction',
    S: 'Scope',
    C: 'Confidentiality',
    I: 'Integrity',
    A: 'Availability',
  };

  const calculate = () => {
    //
    //  🗂️ 가중치 데이터 정리
    //
    let metricWeight: { [key: string]: number } = {};

    try {
      for (let p in bg) {
        metricWeight[p] = Weight[p][val[p]];
      }
    } catch (e) {
      return e;
    }

    metricWeight.PR = Weight.PR[val.S][val.PR];

    //
    // 🧮 CVSS BASE SCORE 계산
    //

    const exploitabilityCoefficient = 8.22;
    const scopeCoefficient = 1.08;

    try {
      let baseScore;
      let impactSubScore;
      let exploitabalitySubScore =
        exploitabilityCoefficient * metricWeight.AV * metricWeight.AC * metricWeight.PR * metricWeight.UI;
      let impactSubScoreMultiplier = 1 - (1 - metricWeight.C) * (1 - metricWeight.I) * (1 - metricWeight.A);
      if (val.S === 'U') {
        impactSubScore = metricWeight.S * impactSubScoreMultiplier;
      } else {
        impactSubScore =
          metricWeight.S * (impactSubScoreMultiplier - 0.029) - 3.25 * Math.pow(impactSubScoreMultiplier - 0.02, 15);
      }

      if (impactSubScore <= 0) {
        baseScore = 0;
      } else {
        if (val.S === 'U') {
          baseScore = Math.min(exploitabalitySubScore + impactSubScore, 10);
        } else {
          baseScore = Math.min((exploitabalitySubScore + impactSubScore) * scopeCoefficient, 10);
        }
      }

      baseScore = Math.ceil(baseScore * 10) / 10;
      return baseScore;
    } catch (e) {
      return e;
    }
  };

  const onSelectionChange = (pk: string, k: string) => {
    setVal((prev) => ({ ...prev, [pk]: k }));
  };

  return (
    <CardBody className="flex flex-col gap-2">
      <div className="flex gap-2 items-center">
        <h5 className="w-[150px]">Attack vector</h5>
        <Tabs variant="solid" onSelectionChange={(k) => onSelectionChange('AV', k.toString())}>
          <Tab key="N" title="Network"></Tab>
          <Tab key="A" title="Adjacent"></Tab>
          <Tab key="L" title="Local"></Tab>
          <Tab key="P" title="Physical"></Tab>
        </Tabs>
      </div>
      <div className="flex gap-2 items-center">
        <h5 className="w-[150px]">Attack complexity</h5>
        <Tabs key="solid" variant="solid" onSelectionChange={(k) => onSelectionChange('AC', k.toString())}>
          <Tab key="L" title="Low" />
          <Tab key="H" title="High" />
        </Tabs>
      </div>
      <div className="flex gap-2 items-center">
        <h5 className="w-[150px]">Privileges required</h5>
        <Tabs key="solid" variant="solid" onSelectionChange={(k) => onSelectionChange('PR', k.toString())}>
          <Tab key="N" title="None" />
          <Tab key="L" title="Low" />
          <Tab key="H" title="High" />
        </Tabs>
      </div>
      <div className="flex gap-2 items-center">
        <h5 className="w-[150px]">User interaction</h5>
        <Tabs key="solid" variant="solid" onSelectionChange={(k) => onSelectionChange('UI', k.toString())}>
          <Tab key="N" title="None" />
          <Tab key="R" title="Required" />
        </Tabs>
      </div>
      <div className="flex gap-2 items-center">
        <h5 className="w-[150px]">Scope</h5>
        <Tabs key="solid" variant="solid" onSelectionChange={(k) => onSelectionChange('S', k.toString())}>
          <Tab key="U" title="Unchanged" />
          <Tab key="C" title="Changed" />
        </Tabs>
      </div>
      <div className="flex gap-2 items-center">
        <h5 className="w-[150px]">Confidentiality</h5>
        <Tabs key="solid" variant="solid" onSelectionChange={(k) => onSelectionChange('C', k.toString())}>
          <Tab key="N" title="None" />
          <Tab key="L" title="Low" />
          <Tab key="H" title="High" />
        </Tabs>
      </div>

      <div className="flex gap-2 items-center">
        <h5 className="w-[150px]">Integrity</h5>
        <Tabs key="solid" variant="solid" onSelectionChange={(k) => onSelectionChange('I', k.toString())}>
          <Tab key="N" title="None" />
          <Tab key="L" title="Low" />
          <Tab key="H" title="High" />
        </Tabs>
      </div>
      <div className="flex gap-2 items-center">
        <h5 className="w-[150px]">Availability</h5>
        <Tabs key="solid" variant="solid" onSelectionChange={(k) => onSelectionChange('A', k.toString())}>
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
