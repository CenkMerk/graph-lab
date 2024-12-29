interface MatrixInputProps {
  matrix: number[][];
  isWeighted: boolean;
  allowSelfLoops: boolean;
  onCellChange: (row: number, col: number, value: string) => void;
}

export function MatrixInput({ matrix, isWeighted, allowSelfLoops, onCellChange }: MatrixInputProps) {
  return (
    <div className="inline-block bg-white rounded-lg shadow p-6">
      {matrix.map((row, i) => (
        <div key={i} className="flex">
          {row.map((cell, j) => (
            <input
              key={`${i}-${j}`}
              type="number"
              min="0"
              max={isWeighted ? undefined : 1}
              value={cell}
              onChange={(e) => onCellChange(i, j, e.target.value)}
              className={`w-12 h-12 text-center border m-1 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                ${i === j && !allowSelfLoops 
                  ? "bg-gray-100 cursor-not-allowed border-gray-200" 
                  : "border-gray-300 hover:border-blue-500"}`}
              disabled={i === j && !allowSelfLoops}
              onKeyPress={(e) => {
                if (!isWeighted && e.key !== "0" && e.key !== "1") {
                  e.preventDefault();
                }
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
} 