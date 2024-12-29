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
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-6 space-y-8">
          {/* Header */}
          <div className="border-b pb-4">
            <h1 className="text-3xl font-bold text-gray-900">
              Komşuluk Matrisi Oluşturucu
            </h1>
            <p className="mt-2 text-gray-600">
              Graf özelliklerini seçin ve matris değerlerini girin
            </p>
          </div>

          {/* Controls Section */}
          <div className="space-y-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h2 className="text-lg font-semibold text-gray-700 mb-4">
                Graf Özellikleri
              </h2>
              <GraphControls
                isDirected={isDirected}
                allowSelfLoops={allowSelfLoops}
                isWeighted={isWeighted}
                onDirectedChange={setIsDirected}
                onSelfLoopsChange={setAllowSelfLoops}
                onWeightedChange={setIsWeighted}
              />
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h2 className="text-lg font-semibold text-gray-700 mb-4">
                Matris Boyutu
              </h2>
              <SizeInput size={size} onSizeChange={handleSizeChange} />
            </div>
          </div>

          {/* Matrix Section */}
          {size > 0 && (
            <div className="space-y-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h2 className="text-lg font-semibold text-gray-700 mb-4">
                  Matris Değerleri
                </h2>
                <div className="flex justify-center">
                  <MatrixInput
                    matrix={matrix}
                    isWeighted={isWeighted}
                    allowSelfLoops={allowSelfLoops}
                    onCellChange={handleMatrixChange}
                  />
                </div>
                <div className="mt-4">
                  <MatrixInfo
                    allowSelfLoops={allowSelfLoops}
                    isDirected={isDirected}
                    isWeighted={isWeighted}
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => window.location.reload()}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                >
                  Sıfırla
                </button>
                <button
                  onClick={handleSave}
                  className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Kaydet
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
