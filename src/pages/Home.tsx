import { useState, useEffect } from "react";
import { GraphControls } from "../components/controls/GraphControls";
import { MatrixInput } from "../components/matrix/MatrixInput";
import { SizeInput } from "../components/matrix/SizeInput";
import { MatrixInfo } from "../components/matrix/MatrixInfo";

function Home() {
  const [size, setSize] = useState<number>(3);
  const [matrix, setMatrix] = useState<number[][]>([]);
  const [isDirected, setIsDirected] = useState<boolean>(false);
  const [allowSelfLoops, setAllowSelfLoops] = useState<boolean>(false);
  const [isWeighted, setIsWeighted] = useState<boolean>(false);

  useEffect(() => {
    const initialMatrix = Array(3)
      .fill(0)
      .map(() => Array(3).fill(0));
    setMatrix(initialMatrix);
  }, []);

  const handleSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSize = parseInt(event.target.value) || 3;
    setSize(newSize);

    const newMatrix = Array(newSize)
      .fill(0)
      .map(() => Array(newSize).fill(0));
    setMatrix(newMatrix);
  };

  const handleMatrixChange = (row: number, col: number, value: string) => {
    if (row === col && !allowSelfLoops) {
      return;
    }

    const newValue = parseInt(value);
    if (isNaN(newValue) || newValue < 0) {
      return;
    }

    if (!isWeighted && value !== "0" && value !== "1") {
      return;
    }

    const newMatrix = [...matrix];
    newMatrix[row][col] = newValue;
    
    if (!isDirected && row !== col) {
      newMatrix[col][row] = newValue;
    }

    setMatrix(newMatrix);
  };

  const handleSave = () => {
    console.log('Komşuluk Matrisi:');
    console.table(matrix);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">
        Komşuluk Matrisi Oluşturucu
      </h1>

      <GraphControls
        isDirected={isDirected}
        allowSelfLoops={allowSelfLoops}
        isWeighted={isWeighted}
        onDirectedChange={setIsDirected}
        onSelfLoopsChange={setAllowSelfLoops}
        onWeightedChange={setIsWeighted}
      />

      <SizeInput size={size} onSizeChange={handleSizeChange} />

      {size > 0 && (
        <div className="space-y-2">
          <h2 className="text-lg font-medium text-gray-900">
            Matris Değerleri
          </h2>
          
          <MatrixInput
            matrix={matrix}
            isWeighted={isWeighted}
            allowSelfLoops={allowSelfLoops}
            onCellChange={handleMatrixChange}
          />
          
          <MatrixInfo
            allowSelfLoops={allowSelfLoops}
            isDirected={isDirected}
            isWeighted={isWeighted}
          />

          <button
            onClick={handleSave}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Kaydet
          </button>
        </div>
      )}
    </div>
  );
}

export default Home;
