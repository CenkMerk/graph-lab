import { graphAlgorithms } from "../../utils/graphAlgorithms";

interface ShortestPathsViewProps {
  matrix: number[][];
  isWeighted: boolean;
}

export function ShortestPathsView({ matrix, isWeighted }: ShortestPathsViewProps) {
  // Grafa uygun algoritmayı seç
  const shortestPaths = isWeighted 
    ? graphAlgorithms.floydWarshall(matrix)
    : graphAlgorithms.unweightedShortestPaths(matrix);
    
  const formattedPaths = graphAlgorithms.formatShortestPaths(shortestPaths);

  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        En Kısa Yollar Matrisi
      </h2>
      <p className="text-sm text-gray-600 mb-4">
        {isWeighted 
          ? "Floyd-Warshall algoritması ile hesaplandı"
          : "Breadth-First Search algoritması ile hesaplandı"}
      </p>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-2 py-1 text-center border bg-gray-50"></th>
              {formattedPaths[0].map((_, index) => (
                <th key={index} className="px-2 py-1 text-center border bg-gray-50">
                  {index + 1}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {formattedPaths.map((row, i) => (
              <tr key={i}>
                <th className="px-2 py-1 text-center border bg-gray-50">{i + 1}</th>
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
  );
} 