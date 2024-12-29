interface MatrixInputProps {
  matrix: number[][];
  isWeighted: boolean;
  allowSelfLoops: boolean;
  onCellChange: (row: number, col: number, value: string) => void;
}

export function MatrixInput({ matrix, isWeighted, allowSelfLoops, onCellChange }: MatrixInputProps) {
  const handleIncrement = (row: number, col: number) => {
    const currentValue = matrix[row][col];
    if (!isWeighted && currentValue >= 1) return;
    onCellChange(row, col, (currentValue + 1).toString());
  };

  const handleDecrement = (row: number, col: number) => {
    const currentValue = matrix[row][col];
    if (currentValue <= 0) return;
    onCellChange(row, col, (currentValue - 1).toString());
  };

  return (
    <div className="inline-block bg-white rounded-xl shadow-lg p-8">
      <div className="grid gap-3">
        {matrix.map((row, i) => (
          <div key={i} className="flex gap-3">
            {row.map((cell, j) => (
              <div key={`${i}-${j}`} className="relative group">
                {/* Kontrol Butonları */}
                {!(i === j && !allowSelfLoops) && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 hidden group-hover:flex gap-1 bg-white shadow-lg rounded-full border border-gray-200 p-1 z-10">
                    <button
                      onClick={() => handleIncrement(i, j)}
                      className={`
                        w-5 h-5 flex items-center justify-center
                        text-white text-xs font-bold rounded-full
                        ${!isWeighted && cell >= 1 
                          ? "bg-gray-300 cursor-not-allowed" 
                          : "bg-blue-500 hover:bg-blue-600 active:bg-blue-700"
                        }
                        transition-colors duration-150
                      `}
                      disabled={!isWeighted && cell >= 1}
                      title="Artır"
                    >
                      +
                    </button>
                    <button
                      onClick={() => handleDecrement(i, j)}
                      className={`
                        w-5 h-5 flex items-center justify-center
                        text-white text-xs font-bold rounded-full
                        ${cell <= 0 
                          ? "bg-gray-300 cursor-not-allowed" 
                          : "bg-blue-500 hover:bg-blue-600 active:bg-blue-700"
                        }
                        transition-colors duration-150
                      `}
                      disabled={cell <= 0}
                      title="Azalt"
                    >
                      -
                    </button>
                  </div>
                )}

                {/* Hücre */}
                <div
                  className={`
                    w-16 h-16 flex items-center justify-center
                    border-2 rounded-lg transition-all duration-200
                    ${i === j && !allowSelfLoops 
                      ? "bg-gray-50 border-gray-200 text-gray-400" 
                      : "border-gray-200 hover:border-blue-400"
                    }
                  `}
                >
                  <span className="text-xl font-medium">{cell}</span>
                </div>

                {/* Koordinat Etiketi */}
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