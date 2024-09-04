import React from 'react';
import CytoscapeComponent from 'react-cytoscapejs';
import cytoscape, { Stylesheet } from 'cytoscape';
import dagre from 'cytoscape-dagre';

cytoscape.use(dagre);

const stylesheet: Stylesheet[] = [
  {
    selector: 'node',
    style: {
      height: 10,
      width: 10,
      content: 'data(id)',
      'text-valign': 'top',
      'text-halign': 'right',
      'font-size': 10,
      'color': '#35393e',
      'background-color': '#2fc1d3',
      'border-color': '#000',
      'border-width': 1,
      'border-opacity': 0.8
    }
  },
  {
    selector: ':parent',
    style: {
      content: (elem: cytoscape.SingularElementReturnValue) => elem.data("type") + ": " + elem.data("id"),
      'font-size': 16,
      'font-weight': 'bold',
      'text-halign': 'center',
      'text-valign': 'top'
    }
  },
  {
    selector: ':parent[type = "Table"], :parent[type = "Path"]',
    style: {
      'background-color': '#f5f5f5',
      'border-color': '#00516c',
    }
  },
  {
    selector: ':parent[type = "SubQuery"]',
    style: {
      'background-color': '#f5f5f5',
      'border-color': '#b46c4f',
    }
  },
  {
    selector: ':parent[type = "Table or SubQuery"]',
    style: {
      'background-color': '#f5f5f5',
      'border-color': '#b46c4f',
      'border-style': 'dashed',
    }
  },
  {
    selector: 'edge',
    style: {
      width: 1,
      'line-color': '#9ab5c7',
      'target-arrow-color': '#9ab5c7',
      'target-arrow-shape': 'triangle',
      'arrow-scale': 0.8,
      'curve-style': 'unbundled-bezier',
    }
  },
  {
    selector: '.highlight',
    style: {
      'background-color': '#076fa1',
    }
  },
  {
    selector: '.highlight_locked',
    style: {
      'background-color': '#e99708',
    }
  },
  {
    selector: '.semitransparent',
    style: { 'opacity': '0.2' }
  },
  {
    selector: 'node[temporary]',
    style: {
      'background-color': '#f5f5f5',
      'border-color': '#b46c4f',
      'border-style': 'dashed',
      content: (elem: cytoscape.SingularElementReturnValue) => elem.data("type") + ": " + elem.data("id"),
      'font-size': 16,
      'font-weight': 'bold',
      'shape': 'rectangle',
      'text-halign': 'center',
      'text-valign': 'top',
    }
  },
  {
    selector: 'edge[temporary]',
    style: {
      'line-color': '#b46c4f',
      'line-style': 'dashed',
      'target-arrow-color': '#b46c4f',
    }
  },
];

const MyCytoscapeComponent: React.FC = () => {
  const elements = [
    // Adicione seus elementos aqui
  ];

  return (
    <CytoscapeComponent
      elements={elements}
      stylesheet={stylesheet}
      style={{ width: '600px', height: '600px' }}
      layout={{ name: 'dagre' }}
    />
  );
};

export default MyCytoscapeComponent;