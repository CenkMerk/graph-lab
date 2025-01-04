import { useMemo } from "react";
import { GraphVisualization } from "./GraphVisualization";
import { MatrixView } from "./MatrixView";
import { graphAlgorithms } from "../../utils/graphAlgorithms";

interface ComplementGraphViewProps {
  matrix: number[][];
  isDirected: boolean;
  isWeighted: boolean;
}

export function ComplementGraphView({
  matrix,
  isDirected,
  isWeighted,
}: ComplementGraphViewProps) {
  const complementMatrix = useMemo(() => {
    const size = matrix.length;
    const complement = Array(size)
      .fill(0)
      .map(() => Array(size).fill(0));

    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        if (i !== j) {
          // Eğer orijinal grafta kenar yoksa (0), tümleyende kenar olacak (1)
          complement[i][j] = matrix[i][j] === 0 ? 1 : 0;
        }
      }
    }

    return complement;
  }, [matrix]);

  const shortestPaths = useMemo(() => {
    return graphAlgorithms.unweightedShortestPaths(complementMatrix); // tümleyen graf ağırlıksız olduğu için unweightedShortestPaths kullanıyoruz
  }, [complementMatrix]);

  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        Tümleyen Graf
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Komşuluk Matrisi
          </h3>
          <MatrixView
            matrix={complementMatrix}
            isEditing={false}
            isWeighted={false}
            allowSelfLoops={false}
            onCellChange={() => {}}
          />
        </div>
        
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            En Kısa Yollar Matrisi
          </h3>
          <MatrixView
            matrix={shortestPaths}
            isEditing={false}
            isWeighted={true}
            allowSelfLoops={false}
            onCellChange={() => {}}
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Graf Görünümü
        </h3>
        <GraphVisualization
          matrix={complementMatrix}
          isDirected={isDirected}
          isWeighted={false}
        />
      </div>
    </div>
  );
} 