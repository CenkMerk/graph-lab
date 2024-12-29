interface MatrixInputProps {
  matrix: number[][];
  isWeighted: boolean;
  allowSelfLoops: boolean;
  onCellChange: (row: number, col: number, value: string) => void;
}

export function MatrixInput({ matrix, isWeighted, allowSelfLoops, onCellChange }: MatrixInputProps) {
  return (
    <div className="inline-block border border-gray-200 rounded-lg p-4">
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
              className={`w-12 h-12 text-center border border-gray-300 m-1 
                ${i === j && !allowSelfLoops ? "bg-gray-100 cursor-not-allowed" : ""}`}
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