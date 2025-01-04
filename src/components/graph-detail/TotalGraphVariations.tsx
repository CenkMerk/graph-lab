import { graphAlgorithms } from "../../utils/graphAlgorithms";
import ForceGraph2D from "react-force-graph-2d";

interface TotalGraphVariationsProps {
  matrix: number[][];
  isDirected: boolean;
  isWeighted: boolean;
}

interface Node {
  id: string;
  label: string;
  type: 'original' | 'line';
}

interface Link {
  source: string;
  target: string;
  weight: number;
  directed: boolean;
  type: 'original' | 'line' | 'connection';
}

interface GraphData {
  nodes: Node[];
  links: Link[];
  adjacencyMatrix: number[][];
  shortestPathMatrix: string[][];
  closenessCentrality: string[];
  residualCloseness: number[][];
}

function createAdjacencyMatrix(nodes: Node[], links: Link[]): number[][] {
  const matrix = Array(nodes.length).fill(0).map(() => Array(nodes.length).fill(0));
  
  links.forEach(link => {
    const sourceIndex = nodes.findIndex(n => n.id === link.source);
    const targetIndex = nodes.findIndex(n => n.id === link.target);
    if (sourceIndex !== -1 && targetIndex !== -1) {
      matrix[sourceIndex][targetIndex] = link.weight;
      if (!link.directed && sourceIndex !== targetIndex) {
        matrix[targetIndex][sourceIndex] = link.weight;
      }
    }
  });

  return matrix;
}

function createGraphData(
  originalMatrix: number[][],
  lineMatrix: number[][],
  edgeLabels: string[],
  isDirected: boolean,
  isOriginalComplement: boolean,
  isLineComplement: boolean
): GraphData {
  // Birleşik graf için düğümleri oluştur
  const nodes: Node[] = [
    // Orijinal graf düğümleri
    ...originalMatrix.map((_, index) => ({
      id: `original-${index}`,
      label: (index + 1).toString(),
      type: 'original' as const,
    })),
    // Line graf düğümleri
    ...edgeLabels.map((label, index) => ({
      id: `line-${index}`,
      label,
      type: 'line' as const,
    })),
  ];

  const links: Link[] = [];

  // Orijinal graf bağlantıları
  originalMatrix.forEach((row, source) => {
    row.forEach((weight, target) => {
      if (weight > 0) {
        if (source === target) {
          // Self-loop
          links.push({
            source: `original-${source}`,
            target: `original-${target}`,
            weight,
            directed: isDirected,
            type: 'original',
          });
        } else if (isDirected || source <= target) {
          // Normal bağlantı
          links.push({
            source: `original-${source}`,
            target: `original-${target}`,
            weight,
            directed: isDirected,
            type: 'original',
          });
        }
      }
    });
  });

  // Line graf bağlantıları
  lineMatrix.forEach((row, source) => {
    row.forEach((weight, target) => {
      if (weight > 0 && source < target) {
        links.push({
          source: `line-${source}`,
          target: `line-${target}`,
          weight: 1,
          directed: false,
          type: 'line',
        });
      }
    });
  });

  // Orijinal düğümler ile line graf düğümleri arasındaki bağlantılar
  const edges = graphAlgorithms.getEdges(originalMatrix, isDirected);
  edges.forEach((edge, index) => {
    links.push({
      source: `original-${edge.source}`,
      target: `line-${index}`,
      weight: 1,
      directed: false,
      type: 'connection',
    });
    links.push({
      source: `original-${edge.target}`,
      target: `line-${index}`,
      weight: 1,
      directed: false,
      type: 'connection',
    });
  });

  // Komşuluk matrisini oluştur
  const adjacencyMatrix = createAdjacencyMatrix(nodes, links);
  
  // En kısa yol matrisini hesapla
  const shortestPathMatrix = graphAlgorithms.formatShortestPaths(
    graphAlgorithms.floydWarshall(adjacencyMatrix)
  );

  // Closeness Centrality değerlerini hesapla
  const closenessCentrality = graphAlgorithms.formatClosenessCentrality(
    graphAlgorithms.normalizeClosenessCentrality(
      graphAlgorithms.calculateClosenessCentrality(adjacencyMatrix)
    )
  );

  // Residual Closeness değerlerini hesapla
  const residualCloseness = graphAlgorithms.calculateAllCkValues(adjacencyMatrix);

  return { 
    nodes, 
    links, 
    adjacencyMatrix, 
    shortestPathMatrix, 
    closenessCentrality,
    residualCloseness 
  };
}

function MatrixDisplay({ matrix, title }: { matrix: (number | string)[][]; title: string }) {
  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200">
          <thead>
            <tr>
              <th className="border border-gray-200 p-2 bg-gray-50"></th>
              {matrix[0].map((_, i) => (
                <th key={i} className="border border-gray-200 p-2 bg-gray-50">
                  {i + 1}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {matrix.map((row, i) => (
              <tr key={i}>
                <th className="border border-gray-200 p-2 bg-gray-50">{i + 1}</th>
                {row.map((cell, j) => (
                  <td key={j} className="border border-gray-200 p-2 text-center">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ClosenessCentralityDisplay({ values, nodes }: { values: string[]; nodes: Node[] }) {
  // Toplam değeri hesapla
  const totalSum = values.reduce((acc, val) => acc + parseFloat(val), 0);

  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold text-gray-800 mb-2">Closeness Centrality Değerleri</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200">
          <thead>
            <tr>
              <th className="border border-gray-200 p-2 bg-gray-50">Düğüm</th>
              <th className="border border-gray-200 p-2 bg-gray-50">Tip</th>
              <th className="border border-gray-200 p-2 bg-gray-50">Değer</th>
            </tr>
          </thead>
          <tbody>
            {values.map((value, i) => (
              <tr key={i}>
                <td className="border border-gray-200 p-2 text-center">{nodes[i].label}</td>
                <td className="border border-gray-200 p-2 text-center">
                  <span
                    className={`inline-block px-2 py-1 rounded-full text-xs ${
                      nodes[i].type === 'original'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-green-100 text-green-800'
                    }`}
                  >
                    {nodes[i].type === 'original' ? 'Orijinal' : 'Line'}
                  </span>
                </td>
                <td className="border border-gray-200 p-2 text-center">{value}</td>
              </tr>
            ))}
            <tr className="bg-gray-50 font-semibold">
              <td className="border border-gray-200 p-2 text-center" colSpan={2}>
                Toplam
              </td>
              <td className="border border-gray-200 p-2 text-center">
                {totalSum.toFixed(4)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ResidualClosenessDisplay({ values, nodes }: { values: number[][]; nodes: Node[] }) {
  // Her düğüm için toplam CC değerlerini hesapla
  const rowSums = values.map(row => row.reduce((acc, val) => acc + val, 0));
  
  // En küçük değeri hesapla
  const minValue = Math.min(...rowSums);

  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold text-gray-800 mb-2">Residual Closeness Değerleri</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200">
          <thead>
            <tr>
              <th className="border border-gray-200 p-2 bg-gray-50">Çıkarılan Düğüm</th>
              <th className="border border-gray-200 p-2 bg-gray-50">Tip</th>
              <th className="border border-gray-200 p-2 bg-gray-50">Kalan Düğümlerin Toplam CC Değeri</th>
            </tr>
          </thead>
          <tbody>
            {values.map((row, i) => (
              <tr key={i}>
                <td className="border border-gray-200 p-2 text-center">{nodes[i].label}</td>
                <td className="border border-gray-200 p-2 text-center">
                  <span
                    className={`inline-block px-2 py-1 rounded-full text-xs ${
                      nodes[i].type === 'original'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-green-100 text-green-800'
                    }`}
                  >
                    {nodes[i].type === 'original' ? 'Orijinal' : 'Line'}
                  </span>
                </td>
                <td className="border border-gray-200 p-2 text-center">
                  {rowSums[i].toFixed(4)}
                </td>
              </tr>
            ))}
            <tr className="bg-gray-50 font-semibold">
              <td className="border border-gray-200 p-2 text-center" colSpan={2}>
                R(G)
              </td>
              <td className="border border-gray-200 p-2 text-center">
                {minValue.toFixed(4)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

function GraphView({ data, title, description }: { data: GraphData; title: string; description: string }) {
  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">{title}</h2>
      <p className="text-sm text-gray-600 mb-4">{description}</p>
      <div className="w-full aspect-square max-w-[800px] mx-auto border rounded-lg overflow-hidden">
        <ForceGraph2D
          graphData={{ nodes: data.nodes, links: data.links }}
          nodeLabel="label"
          nodeRelSize={6}
          linkDirectionalArrowLength={(link: Link) => link.directed ? 6 : 0}
          linkDirectionalArrowRelPos={1}
          nodeCanvasObject={(node: Node, ctx, globalScale) => {
            const { x, y } = node as any;
            const label = node.label;
            const fontSize = 12 / globalScale;
            ctx.font = `${fontSize}px Sans-Serif`;
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";

            // Düğüm rengi ve boyutu
            const radius = node.type === 'original' ? 5 : 4;
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, 2 * Math.PI);
            ctx.fillStyle = node.type === 'original' ? '#3b82f6' : '#10b981';
            ctx.fill();
            ctx.strokeStyle = '#fff';
            ctx.stroke();

            // Etiket
            ctx.fillStyle = '#000';
            ctx.fillText(label, x, y + radius + fontSize);
          }}
          linkColor={(link: Link) => {
            switch (link.type) {
              case 'original':
                return '#3b82f6';
              case 'line':
                return '#10b981';
              case 'connection':
                return '#94a3b8';
              default:
                return '#666';
            }
          }}
          linkWidth={(link: Link) => {
            switch (link.type) {
              case 'original':
                return 2;
              case 'line':
                return 1.5;
              case 'connection':
                return 1;
              default:
                return 1;
            }
          }}
          backgroundColor="#f9fafb"
          width={800}
          height={800}
        />
      </div>
      <MatrixDisplay matrix={data.adjacencyMatrix} title="Komşuluk Matrisi" />
      <MatrixDisplay matrix={data.shortestPathMatrix} title="En Kısa Yol Matrisi" />
      <ClosenessCentralityDisplay values={data.closenessCentrality} nodes={data.nodes} />
      <ResidualClosenessDisplay values={data.residualCloseness} nodes={data.nodes} />
    </div>
  );
}

export function TotalGraphVariations({ matrix, isDirected, isWeighted }: TotalGraphVariationsProps) {
  // Line grafı hesapla
  const { matrix: lineMatrix, edgeLabels } = graphAlgorithms.calculateLineGraph(matrix, isDirected);
  
  // Tümleyen grafları hesapla
  const complementMatrix = graphAlgorithms.calculateComplement(matrix, false);
  const complementLineMatrix = graphAlgorithms.calculateComplement(lineMatrix, false);

  // Dört farklı total graf varyasyonunu oluştur
  const normalTotalGraph = createGraphData(matrix, lineMatrix, edgeLabels, isDirected, false, false);
  const complementLineTotalGraph = createGraphData(matrix, complementLineMatrix, edgeLabels, isDirected, false, true);
  const complementOriginalTotalGraph = createGraphData(complementMatrix, lineMatrix, edgeLabels, isDirected, true, false);
  const bothComplementTotalGraph = createGraphData(complementMatrix, complementLineMatrix, edgeLabels, isDirected, true, true);

  return (
    <div className="space-y-8">
      <GraphView
        data={normalTotalGraph}
        title="Total Graf (G + L(G))"
        description="Orijinal graf (G) ve onun line grafı (L(G)) birleştirilmiş görünüm."
      />
      <GraphView
        data={complementLineTotalGraph}
        title="Total Graf (G + L(G)nin tümleyeni)"
        description="Orijinal graf (G) ve line grafının tümleyeni (L(G)') birleştirilmiş görünüm."
      />
      <GraphView
        data={complementOriginalTotalGraph}
        title="Total Graf (G'nin tümleyeni + L(G))"
        description="Orijinal grafın tümleyeni (G') ve line grafı (L(G)) birleştirilmiş görünüm."
      />
      <GraphView
        data={bothComplementTotalGraph}
        title="Total Graf (G'nin tümleyeni + L(G)'nin tümleyeni)"
        description="Orijinal grafın tümleyeni (G') ve line grafının tümleyeni (L(G)') birleştirilmiş görünüm."
      />
    </div>
  );
} 