import { useMatrix } from "../hooks/useMatrix";
import { GraphControls } from "../components/controls/GraphControls";
import { MatrixInput } from "../components/matrix/MatrixInput";
import { SizeInput } from "../components/matrix/SizeInput";
import { MatrixInfo } from "../components/matrix/MatrixInfo";

function Home() {
  const {
    size,
    matrix,
    isDirected,
    allowSelfLoops,
    isWeighted,
    handleSizeChange,
    handleMatrixChange,
    setIsDirected,
    setAllowSelfLoops,
    setIsWeighted,
  } = useMatrix({ initialSize: 3 });

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
