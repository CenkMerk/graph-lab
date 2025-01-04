import { graphAlgorithms } from "../../utils/graphAlgorithms";
import { GraphVisualization } from "./GraphVisualization";

interface ComplementGraphsViewProps {
  matrix: number[][];
  isDirected: boolean;
  isWeighted: boolean;
  allowSelfLoops: boolean;
}

export function ComplementGraphsView({
  matrix,
  isDirected,
  isWeighted,
  allowSelfLoops,
}: ComplementGraphsViewProps) {
  // Orijinal grafın tümleyenini hesapla
  const complementMatrix = graphAlgorithms.calculateComplement(matrix, allowSelfLoops);

  // Line grafı ve onun tümleyenini hesapla
  const { matrix: lineMatrix } = graphAlgorithms.calculateLineGraph(matrix, isDirected);
  const lineComplementMatrix = graphAlgorithms.calculateComplement(lineMatrix, false);

  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        Tümleyen Graflar
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Orijinal grafın tümleyeni */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            G̅ (G'nin Tümleyeni)
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            Orijinal grafta olmayan tüm olası kenarları içeren graf.
          </p>
          <div className="aspect-square border rounded-lg overflow-hidden">
            <GraphVisualization
              matrix={complementMatrix}
              isDirected={isDirected}
              isWeighted={false}
            />
          </div>
        </div>

        {/* Line grafın tümleyeni */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            L(G)̅ (Line Grafın Tümleyeni)
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            Line grafta olmayan tüm olası kenarları içeren graf.
          </p>
          <div className="aspect-square border rounded-lg overflow-hidden">
            <GraphVisualization
              matrix={lineComplementMatrix}
              isDirected={false}
              isWeighted={false}
            />
          </div>
        </div>

        {/* Matrisler */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            G̅'nin Komşuluk Matrisi
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-2 py-1 text-center border bg-gray-50"></th>
                  {complementMatrix[0].map((_, index) => (
                    <th key={index} className="px-2 py-1 text-center border bg-gray-50">
                      {index + 1}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {complementMatrix.map((row, i) => (
                  <tr key={i}>
                    <th className="px-2 py-1 text-center border bg-gray-50">
                      {i + 1}
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

        {/* Line grafın tümleyen matrisi */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            L(G)̅'nin Komşuluk Matrisi
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-2 py-1 text-center border bg-gray-50"></th>
                  {lineComplementMatrix[0].map((_, index) => (
                    <th key={index} className="px-2 py-1 text-center border bg-gray-50">
                      {index + 1}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {lineComplementMatrix.map((row, i) => (
                  <tr key={i}>
                    <th className="px-2 py-1 text-center border bg-gray-50">
                      {i + 1}
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
      </div>
    </div>
  );
} 