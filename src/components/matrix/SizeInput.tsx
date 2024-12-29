interface SizeInputProps {
  size: number;
  onSizeChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function SizeInput({ size, onSizeChange }: SizeInputProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label
          htmlFor="size"
          className="block text-sm font-medium text-gray-700"
        >
          Matris Boyutu (n)
        </label>
        <span className="text-sm text-gray-500">
          Mevcut boyut: {size}x{size}
        </span>
      </div>
      <div className="relative mt-2 rounded-md shadow-sm">
        <input
          type="number"
          id="size"
          min="1"
          value={size || ""}
          onChange={onSizeChange}
          className="
            block w-full rounded-lg border-2 border-gray-200 px-4 py-3
            text-gray-900 placeholder:text-gray-400 text-lg
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
            transition-all duration-200
          "
          placeholder="Matris boyutunu girin"
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
          <span className="text-gray-500 sm:text-sm">n</span>
        </div>
      </div>
      <div className="flex justify-between mt-1">
        <span className="text-xs text-gray-500">Min: 1</span>
        <span className="text-xs text-gray-500">Önerilen: 3-10 arası</span>
      </div>
    </div>
  );
} 