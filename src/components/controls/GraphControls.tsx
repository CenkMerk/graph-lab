interface GraphControlsProps {
  isDirected: boolean;
  allowSelfLoops: boolean;
  isWeighted: boolean;
  onDirectedChange: (checked: boolean) => void;
  onSelfLoopsChange: (checked: boolean) => void;
  onWeightedChange: (checked: boolean) => void;
}

export function GraphControls({
  isDirected,
  allowSelfLoops,
  isWeighted,
  onDirectedChange,
  onSelfLoopsChange,
  onWeightedChange,
}: GraphControlsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <label className="relative flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:border-blue-500 cursor-pointer transition-colors">
        <div className="mr-3">
          <span className="text-sm font-medium text-gray-900">Yönlü Graf</span>
          <p className="text-xs text-gray-500">Kenarların yönü vardır</p>
        </div>
        <input
          type="checkbox"
          className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
          checked={isDirected}
          onChange={(e) => onDirectedChange(e.target.checked)}
        />
      </label>
      
      <label className="relative flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:border-blue-500 cursor-pointer transition-colors">
        <div className="mr-3">
          <span className="text-sm font-medium text-gray-900">Döngülere İzin Ver</span>
          <p className="text-xs text-gray-500">Düğüm kendine bağlanabilir</p>
        </div>
        <input
          type="checkbox"
          className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
          checked={allowSelfLoops}
          onChange={(e) => onSelfLoopsChange(e.target.checked)}
        />
      </label>

      <label className="relative flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:border-blue-500 cursor-pointer transition-colors">
        <div className="mr-3">
          <span className="text-sm font-medium text-gray-900">Ağırlıklı Graf</span>
          <p className="text-xs text-gray-500">Kenarların ağırlığı vardır</p>
        </div>
        <input
          type="checkbox"
          className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
          checked={isWeighted}
          onChange={(e) => onWeightedChange(e.target.checked)}
        />
      </label>
    </div>
  );
} 