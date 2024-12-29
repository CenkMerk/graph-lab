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
    <div className="flex gap-4">
      <label className="inline-flex items-center">
        <input
          type="checkbox"
          className="form-checkbox h-5 w-5 text-blue-600"
          checked={isDirected}
          onChange={(e) => onDirectedChange(e.target.checked)}
        />
        <span className="ml-2 text-gray-700">Yönlü Graf</span>
      </label>
      
      <label className="inline-flex items-center">
        <input
          type="checkbox"
          className="form-checkbox h-5 w-5 text-blue-600"
          checked={allowSelfLoops}
          onChange={(e) => onSelfLoopsChange(e.target.checked)}
        />
        <span className="ml-2 text-gray-700">Döngülere İzin Ver</span>
      </label>

      <label className="inline-flex items-center">
        <input
          type="checkbox"
          className="form-checkbox h-5 w-5 text-blue-600"
          checked={isWeighted}
          onChange={(e) => onWeightedChange(e.target.checked)}
        />
        <span className="ml-2 text-gray-700">Ağırlıklı Graf</span>
      </label>
    </div>
  );
} 