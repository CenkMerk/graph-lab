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
            <tbody className="bg-white divide-y divide-gray-200">
              {matrix.map((row, i) => (
                <tr key={i}>
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