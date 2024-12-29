interface SizeInputProps {
  size: number;
  onSizeChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function SizeInput({ size, onSizeChange }: SizeInputProps) {
  return (
    <div className="space-y-2">
      <label
        htmlFor="size"
        className="block text-sm font-medium text-gray-700"
      >
        Matris Boyutu (n)
      </label>
      <input
        type="number"
        id="size"
        min="1"
        value={size || ""}
        onChange={onSizeChange}
        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
      />
    </div>
  );
} 