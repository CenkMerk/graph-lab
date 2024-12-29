interface SizeInputProps {
  size: number;
  onSizeChange: (newSize: number) => void;
}

export function SizeInput({ size, onSizeChange }: SizeInputProps) {
  const handleIncrement = () => {
    onSizeChange(size + 1);
  };

  const handleDecrement = () => {
    if (size > 1) {
      onSizeChange(size - 1);
    }
  };

  return (
    <div className="space-y-2">
      {/* <span className="text-sm text-gray-500">
        Mevcut boyut: {size}x{size}
      </span> */}

      <div className="relative flex items-center justify-center gap-4">
        <button
          onClick={handleDecrement}
          disabled={size <= 1}
          className={`
            w-10 h-10 flex items-center justify-center
            text-white text-lg font-bold rounded-full
            ${
              size <= 1
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600 active:bg-blue-700"
            }
            transition-colors duration-150
          `}
          title="Boyutu azalt"
        >
          -
        </button>

        <div
          className="w-[74px] h-[74px] flex items-center justify-center
                    border-2 border-gray-200 rounded-lg
                    text-2xl font-medium"
        >
          {size}
        </div>

        <button
          onClick={handleIncrement}
          className={`
            w-10 h-10 flex items-center justify-center
            text-white text-lg font-bold rounded-full
            bg-blue-500 hover:bg-blue-600 active:bg-blue-700
            transition-colors duration-150
          `}
          title="Boyutu artır"
        >
          +
        </button>
      </div>

      {/* <div className="flex justify-between mt-1">
        <span className="text-xs text-gray-500">Min: 1</span>
        <span className="text-xs text-gray-500">Önerilen: 3-10 arası</span>
      </div> */}
    </div>
  );
}
