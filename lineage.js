import React, { useEffect, useState } from 'react';
import CytoscapeComponent from 'react-cytoscapejs';
import axios from 'axios';

interface Element {
  data: {
    id: string;
    source?: string;
    target?: string;
    [key: string]: any;
  };
  classes?: string;
}

interface LineageData {
  verbose: string;
  dag: Element[];
  column: Element[];
}

const LineageGraph: React.FC = () => {
  const [lineageData, setLineageData] = useState<LineageData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLineageData = async () => {
      try {
        const response = await axios.post('/lineage', {
          // Adicione aqui os parâmetros necessários para a requisição
        });
        setLineageData(response.data);
      } catch (err) {
        setError('Erro ao buscar dados de lineage');
        console.error(err);
      }
    };

    fetchLineageData();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  if (!lineageData) {
    return <div>Carregando...</div>;
  }

  const layout = {
    name: 'dagre',
    rankDir: 'LR',
    rankSep: 200,
    nodeSep: 50,
  };

  const stylesheet = [
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
  ];

  return (
    <CytoscapeComponent
      elements={lineageData.dag}
      stylesheet={stylesheet}
      style={{ width: '600px', height: '600px' }}
      layout={layout}
      zoom={1}
      minZoom={0.5}
      maxZoom={2}
      wheelSensitivity={0.2}
    />
  );
};

export default LineageGraph;