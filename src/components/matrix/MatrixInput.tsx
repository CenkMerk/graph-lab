interface MatrixInputProps {
  matrix: number[][];
  isWeighted: boolean;
  allowSelfLoops: boolean;
  onCellChange: (row: number, col: number, value: string) => void;
}

export function MatrixInput({ matrix, isWeighted, allowSelfLoops, onCellChange }: MatrixInputProps) {
  return (
    <div className="inline-block bg-white rounded-xl shadow-lg p-8">
      <div className="grid gap-2">
        {matrix.map((row, i) => (
          <div key={i} className="flex gap-2">
            {row.map((cell, j) => (
              <div key={`${i}-${j}`} className="relative">
                <input
                  type="number"
                  min="0"
                  max={isWeighted ? undefined : 1}
                  value={cell}
                  onChange={(e) => onCellChange(i, j, e.target.value)}
                  className={`
                    w-14 h-14 text-center text-lg font-medium 
                    border-2 rounded-lg transition-all duration-200
                    focus:outline-none focus:ring-2 focus:ring-offset-2
                    ${i === j && !allowSelfLoops 
                      ? "bg-gray-50 border-gray-200 text-gray-400 cursor-not-allowed" 
                      : "border-gray-200 hover:border-blue-400 focus:border-blue-500 focus:ring-blue-500"
                    }
                  `}
                  disabled={i === j && !allowSelfLoops}
                  onKeyPress={(e) => {
                    if (!isWeighted && e.key !== "0" && e.key !== "1") {
                      e.preventDefault();
                    }
                  }}
                />
                <div className="absolute -top-3 -left-3 text-xs text-gray-500 bg-gray-100 px-1 rounded">
                  {`${i+1},${j+1}`}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
} 