// src/helpers.ts

import { NodeData, CytoscapeEvent } from './types';

export const handleMouseOver = (cy: any, e: CytoscapeEvent) => {
  const sel = e.target;
  if (sel.parent().size() > 0 || cy.elements().filter((node: any) => node.isParent()).size() === 0) {
    const elements = sel.union(sel.successors()).union(sel.predecessors());
    elements.addClass("highlight");
    cy.elements().filter((node: any) => node.isChild()).difference(elements).addClass("semitransparent");
  }

  const parents = sel.data().parent_candidates;
  if (parents !== undefined && parents.length > 1) {
    const tmp_elem = parents.map(p => [
      { "data": { "id": p.name, "type": p.type, "temporary": true } },
      {
        "data": {
          "id": sel.data().id + "-" + p.name,
          "source": sel.data().id,
          "target": p.name,
          "temporary": true
        }
      }
    ]).reduce((x, y) => x.concat(y), []);

    if (cy.elements().filter((n: any) => n.data().temporary === true).size() === 0) {
      const zoom = cy.zoom();
      const pan = cy.pan();
      cy.add(tmp_elem);
      cy.elements().filter((n: any) => n.data().temporary === undefined).lock();
      cy.elements().filter((n: any) => n.data().temporary === true || n.data().id === sel.data().id)
        .layout({
          "boundingBox": {
            "x1": sel.position().x,
            "y1": sel.position().y,
            "w": 200,
            "h": 200
          },
          "circle": true,
          "name": "breadthfirst",
        })
        .run();
      cy.viewport({
        "zoom": zoom,
        "pan": pan
      });
    }
  }
};

export const handleMouseOut = (cy: any) => {
  cy.elements().removeClass("semitransparent");
  cy.elements().removeClass("highlight");
  cy.remove(cy.elements().filter((n: any) => n.data().temporary === true));
  cy.elements().filter((n: any) => n.data().temporary === undefined).unlock();
};

export const handleClick = (cy: any, e: CytoscapeEvent) => {
  const sel = e.target;
  const columnLevel = cy.elements().some((e: any) => e.isNode() && e.data().type === "Column");
  if (sel.data().type === "Column" || !columnLevel) {
    let elements = sel.union(sel.successors()).union(sel.predecessors());
    if (columnLevel) {
      elements = elements.filter((e: any) => e.isNode() && e.data().type === "Column");
    }
    if (elements.every((e: any) => e.hasClass("highlight_locked"))) {
      elements.removeClass("highlight_locked");
    } else {
      elements.addClass("highlight_locked");
    }
  }
};

export const styleEdges = (cy: any) => {
  cy.edges().forEach((edge: any) => {
    if (edge.source() !== edge.target()) {
      const x0 = edge.source().position("x");
      const x1 = edge.target().position("x");
      const y0 = edge.source().position("y");
      const y1 = edge.target().position("y");
      const x = x1 - x0;
      const y = y1 - y0;
      const z = Math.sqrt(x * x + y * y);
      const costheta = x / z;
      const alpha = 0.2;
      const controlPointDistances = [-alpha * y * costheta, alpha * y * costheta];
      edge.style("control-point-distances", controlPointDistances);
      edge.style("control-point-weights", [alpha, 1 - alpha]);
    }
  });
};