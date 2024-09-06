// src/DAGComponent.tsx

import React, { useEffect, useRef } from 'react';
import cytoscape from 'cytoscape';
import { handleMouseOver, handleMouseOut, handleClick, styleEdges } from './helpers';

const DAGComponent: React.FC = () => {
  const cyRef = useRef<any>(null);

  useEffect(() => {
    if (cyRef.current) {
      const cy = cyRef.current._cy;

      cy.on("mouseover", "node", (e: any) => handleMouseOver(cy, e));
      cy.on("mouseout", "node", () => handleMouseOut(cy));
      cy.removeListener("click", "node");
      cy.on("click", "node", (e: any) => handleClick(cy, e));
      styleEdges(cy);
    }
  }, []);

  return (
    <div id="cy" ref={cyRef}></div>
  );
};

export default DAGComponent;