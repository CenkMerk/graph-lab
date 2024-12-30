import { graphAlgorithms } from "../../utils/graphAlgorithms";

interface ResidualClosenessViewProps {
  matrix: number[][];
}

export function ResidualClosenessView({ matrix }: ResidualClosenessViewProps) {
  const residualCloseness = graphAlgorithms.calculateResidualCloseness(matrix);
  const formattedValues = graphAlgorithms.formatResidualCloseness(residualCloseness);

  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        Residual Closeness Merkeziyet Değerleri
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
          </tbody>
        </table>
      </div>
    </div>
  );
} 