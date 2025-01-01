import { graphAlgorithms } from "../../utils/graphAlgorithms";
import { GraphVisualization } from "./GraphVisualization";

interface LineGraphViewProps {
  matrix: number[][];
  isDirected: boolean;
}

export function LineGraphView({ matrix, isDirected }: LineGraphViewProps) {
  const { matrix: lineMatrix, edgeLabels } = graphAlgorithms.calculateLineGraph(matrix, isDirected);

  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        Line Graf (L(G))
      </h2>
      <p className="text-sm text-gray-600 mb-4">
        Orijinal grafın kenarları düğüm olarak temsil edilir ve ortak düğüm paylaşan kenarlar arasında bağlantı kurulur.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Line Graf Matrisi */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Komşuluk Matrisi</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-2 py-1 text-center border bg-gray-50">L(G)</th>
                  {edgeLabels.map((label, i) => (
                    <th key={i} className="px-2 py-1 text-center border bg-gray-50">
                      {label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {lineMatrix.map((row, i) => (
                  <tr key={i}>
                    <th className="px-2 py-1 text-center border bg-gray-50">
                      {edgeLabels[i]}
                    </th>
                    {row.map((cell, j) => (
                      <td key={j} className="px-2 py-1 text-center border">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Line Graf Görselleştirmesi */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Graf Görünümü</h3>
          <GraphVisualization
            matrix={lineMatrix}
            isDirected={false}
            isWeighted={false}
            nodeLabels={edgeLabels}
          />
        </div>
      </div>
    </div>
  );
} 