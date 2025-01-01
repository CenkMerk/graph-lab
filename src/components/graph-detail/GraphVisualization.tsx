import { useMemo } from "react";
import ForceGraph2D from "react-force-graph-2d";

interface GraphVisualizationProps {
  matrix: number[][];
  isDirected: boolean;
  isWeighted: boolean;
  nodeLabels?: string[];
}

interface Node {
  id: string;
  label: string;
}

interface Link {
  source: string;
  target: string;
  weight: number;
  directed: boolean;
  isSelfLoop?: boolean;
}

export function GraphVisualization({ 
  matrix, 
  isDirected, 
  isWeighted,
  nodeLabels 
}: GraphVisualizationProps) {
  const graphData = useMemo(() => {
    const nodes: Node[] = matrix.map((_, index) => ({
      id: index.toString(),
      label: nodeLabels ? nodeLabels[index] : (index + 1).toString(),
    }));

    const links: Link[] = [];
    
    matrix.forEach((row, source) => {
      row.forEach((weight, target) => {
        if (weight > 0) {
          // Kendi kendine bağlantı veya normal bağlantı kontrolü
          if (source === target) {
            // Self-loop
            links.push({
              source: source.toString(),
              target: target.toString(),
              weight,
              directed: isDirected,
              isSelfLoop: true
            });
          } else if (isDirected || source <= target) {
            // Normal bağlantı
            links.push({
              source: source.toString(),
              target: target.toString(),
              weight,
              directed: isDirected
            });
          }
        }
      });
    });

    return { nodes, links };
  }, [matrix, isDirected, nodeLabels]);

  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Graf Görünümü</h2>
      <div className="w-full aspect-square max-w-[600px] mx-auto border rounded-lg overflow-hidden">
        <ForceGraph2D
          graphData={graphData}
          nodeLabel="label"
          nodeRelSize={6}
          linkDirectionalArrowLength={isDirected ? 6 : 0}
          linkDirectionalArrowRelPos={1}
          linkLabel={isWeighted ? (link: Link) => link.weight.toString() : undefined}
          linkCurvature={(link: Link) => link.isSelfLoop ? 0.5 : 0}
          linkWidth={2}
          nodeCanvasObject={(node, ctx, globalScale) => {
            // Düğüm çizimi
            const label = node.label as string;
            const fontSize = 12/globalScale;
            ctx.font = `${fontSize}px Sans-Serif`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            
            // Arka plan dairesi
            ctx.beginPath();
            ctx.arc(node.x!, node.y!, 4, 0, 2 * Math.PI);
            ctx.fillStyle = '#fff';
            ctx.fill();
            ctx.strokeStyle = '#666';
            ctx.stroke();
            
            // Düğüm numarası
            ctx.fillStyle = '#000';
            ctx.fillText(label, node.x!, node.y!);
          }}
          linkColor={() => '#666'}
          backgroundColor="#f9fafb"
          width={600}
          height={600}
        />
      </div>
    </div>
  );
} 