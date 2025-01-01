import { graphAlgorithms } from "../../utils/graphAlgorithms";

interface ResidualClosenessViewProps {
  matrix: number[][];
  name?: string;
}

export function ResidualClosenessView({ matrix, name = "G" }: ResidualClosenessViewProps) {
  const ckValues = graphAlgorithms.calculateAllCkValues(matrix);
  const residualCloseness = graphAlgorithms.calculateResidualCloseness(matrix);
  
  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        Residual Closeness Değerleri (R(G))
      </h2>
      <p className="text-sm text-gray-600 mb-4">
        Her düğümün çıkarılması durumunda kalan grafın merkeziyet değerleri hesaplanır. R(G) değeri, minimum C<sub>k</sub> değerini temsil eder.
      </p>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-2 text-center border">k</th>
              <th className="px-4 py-2 text-center border">C<sub>k</sub> Değeri</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {ckValues.map((ck, k) => {
              const ckSum = ck.reduce((sum, value) => sum + value, 0);
              return (
                <tr key={k}>
                  <td className="px-4 py-2 text-center border">{k + 1}</td>
                  <td className="px-4 py-2 text-center border">{ckSum.toFixed(4)}</td>
                </tr>
              );
            })}
            <tr className="bg-gray-50 font-medium">
              <td className="px-4 py-2 text-center border">
                R({name})
              </td>
              <td className="px-4 py-2 text-center border">
                {residualCloseness.toFixed(4)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
} 