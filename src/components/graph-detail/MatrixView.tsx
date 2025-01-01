import { MatrixInput } from "../matrix/MatrixInput";

interface MatrixViewProps {
  matrix: number[][];
  isEditing: boolean;
  isWeighted: boolean;
  allowSelfLoops: boolean;
  onCellChange: (row: number, col: number, value: string) => void;
}

export function MatrixView({
  matrix,
  isEditing,
  isWeighted,
  allowSelfLoops,
  onCellChange,
}: MatrixViewProps) {
  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        Komşuluk Matrisi
      </h2>
      <div className="flex justify-center">
        {isEditing ? (
          <MatrixInput
            matrix={matrix}
            isWeighted={isWeighted}
            allowSelfLoops={allowSelfLoops}
            onCellChange={onCellChange}
          />
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-2 py-1 text-center border bg-gray-50"></th>
                {matrix[0].map((_, index) => (
                  <th key={index} className="px-2 py-1 text-center border bg-gray-50">
                    {index + 1}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {matrix.map((row, i) => (
                <tr key={i}>
                  <th className="px-2 py-1 text-center border bg-gray-50">{i + 1}</th>
                  {row.map((cell, j) => (
                    <td key={j} className="px-4 py-2 text-center border">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
} 