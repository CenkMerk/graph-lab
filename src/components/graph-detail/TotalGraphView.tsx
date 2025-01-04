import { graphAlgorithms } from "../../utils/graphAlgorithms";
import ForceGraph2D from "react-force-graph-2d";

interface TotalGraphViewProps {
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

export function TotalGraphView({ matrix, isDirected, isWeighted }: TotalGraphViewProps) {
  // Line grafı hesapla
  const { matrix: lineMatrix, edgeLabels } = graphAlgorithms.calculateLineGraph(matrix, isDirected);

  // Birleşik graf için düğümleri oluştur
  const nodes: Node[] = [
    // Orijinal graf düğümleri
    ...matrix.map((_, index) => ({
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

  // Birleşik graf için bağlantıları oluştur
  const links: Link[] = [];

  // Orijinal graf bağlantıları
  matrix.forEach((row, source) => {
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
  const edges = graphAlgorithms.getEdges(matrix, isDirected);
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

  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        Total Graf (G + L(G))
      </h2>
      <p className="text-sm text-gray-600 mb-4">
        Orijinal graf (G) ve onun line grafı (L(G)) birleştirilmiş görünüm. 
        Mavi düğümler orijinal grafı, yeşil düğümler line grafı temsil eder.
      </p>
      <div className="w-full aspect-square max-w-[800px] mx-auto border rounded-lg overflow-hidden">
        <ForceGraph2D
          graphData={{ nodes, links }}
          nodeLabel="label"
          nodeRelSize={6}
          linkDirectionalArrowLength={(link: Link) =>
            link.directed ? 6 : 0
          }
          linkDirectionalArrowRelPos={1}
          linkLabel={
            isWeighted
              ? (link: any) =>
                  link.type === 'original' ? link.weight.toString() : ''
              : undefined
          }
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
    </div>
  );
} 