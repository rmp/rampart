import React, {useState} from 'react';
import CoveragePlot from "./Coverage";
import ReadLengthDistribution from "./ReadLengthDistribution";
import CoverageOverTime from "./CoverageOverTime";
import {select} from "d3-selection";
import {consensusCoverage, okCoverage} from "../magics";
import {heatColourScale} from "../utils/colours";

const InfoRow = ({sampleName, sampleData, handleClick, isExpanded}) => {
  const summaryTitle = `${sampleName}`;
  const summaryText = `${sampleData.demuxedCount} reads demuxed, ${sampleData.mappedCount} mapped.`;
  return (
    <div className="infoRow" onClick={handleClick}>
      <span style={{flexBasis: "15%"}}>{summaryTitle}</span>
      <span>{summaryText}</span>
      <span className="toggle">
        {isExpanded ? "click to contract" : "click to expand"}
      </span>
    </div>
  );
};

const Panel = ({sampleName, sampleData, sampleColour, viewOptions, reference}) => {
  const [expanded, setExpanded] = useState(false);
  const coverageData = {};
  coverageData[sampleName] = sampleData;
  return (
    <div
      className={`panelContainer ${expanded ? "expanded" : "collapsed"}`}
      style={{borderColor: sampleColour}}
    >
      <InfoRow sampleName={sampleName} sampleData={sampleData} handleClick={() => setExpanded(!expanded)} isExpanded={expanded}/>

      {
        expanded ? (
          <div className="panelFlexRow">
            <CoveragePlot
              className="graphContainer"
              width="45%"
              showReferenceMatches={true}
              data={coverageData}
              reference={reference}
              viewOptions={viewOptions}
              fillIn={true}
            />
          </div>
        ) : null
      }

    </div>
  )

}

export default Panel;
