import { GraphControls } from "../controls/GraphControls";
import { SizeInput } from "../matrix/SizeInput";
import { Graph } from "../../types/graph";

interface GraphPropertiesProps {
  graph: Graph;
  isEditing: boolean;
  onGraphChange: (updates: Partial<Graph>) => void;
  onSizeChange: (size: number) => void;
}

export function GraphProperties({
  graph,
  isEditing,
  onGraphChange,
  onSizeChange,
}: GraphPropertiesProps) {
  if (isEditing) {
    return (
      <div className="flex gap-4">
        <div className="bg-gray-50 p-4 rounded-lg flex-1">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Graf Özellikleri
          </h2>
          <GraphControls
            isDirected={graph.isDirected}
            allowSelfLoops={graph.allowSelfLoops}
            isWeighted={graph.isWeighted}
            onDirectedChange={(value) => onGraphChange({ isDirected: value })}
            onSelfLoopsChange={(value) => onGraphChange({ allowSelfLoops: value })}
            onWeightedChange={(value) => onGraphChange({ isWeighted: value })}
          />
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Matris Boyutu
          </h2>
          <SizeInput size={graph.size} onSizeChange={onSizeChange} />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        Graf Özellikleri
      </h2>
      <div className="space-y-2">
        <p>
          Boyut: {graph.size}x{graph.size}
        </p>
        <p>Tip: {graph.isDirected ? "Yönlü" : "Yönsüz"}</p>
        <p>Ağırlıklı: {graph.isWeighted ? "Evet" : "Hayır"}</p>
        <p>
          Kendi Kendine Bağlantı:{" "}
          {graph.allowSelfLoops ? "İzin Veriliyor" : "İzin Verilmiyor"}
        </p>
      </div>
    </div>
  );
} 