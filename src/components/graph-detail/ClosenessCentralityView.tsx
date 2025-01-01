import { graphAlgorithms } from "../../utils/graphAlgorithms";

interface ClosenessCentralityViewProps {
  matrix: number[][];
  name?: string;
}

export function ClosenessCentralityView({ matrix, name = "G" }: ClosenessCentralityViewProps) {
  const closenessCentrality = graphAlgorithms.calculateClosenessCentrality(matrix);
  const formattedValues = graphAlgorithms.formatClosenessCentrality(closenessCentrality);
  
  const totalCentrality = closenessCentrality.reduce((sum, value) => sum + value, 0);
  const formattedTotal = totalCentrality.toFixed(4);

  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        Closeness Centrality Değerleri
      </h2>
      <p className="text-sm text-gray-600 mb-4">
        Chavdar Dangalchev (2006) tarafından önerilen merkeziyet ölçüsü
      </p>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-2 text-center border">Düğüm</th>
              <th className="px-4 py-2 text-center border">Merkeziyet Değeri</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {formattedValues.map((value, i) => (
              <tr key={i}>
                <td className="px-4 py-2 text-center border">{i + 1}</td>
                <td className="px-4 py-2 text-center border">{value}</td>
              </tr>
            ))}
            <tr className="bg-gray-50 font-medium">
              <td className="px-4 py-2 text-center border">
                C({name})
              </td>
              <td className="px-4 py-2 text-center border">
                {formattedTotal}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
} 