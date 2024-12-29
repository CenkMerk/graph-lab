import { useState, useEffect } from "react";

interface UseMatrixProps {
  initialSize: number;
}

interface UseMatrixReturn {
  size: number;
  matrix: number[][];
  isDirected: boolean;
  allowSelfLoops: boolean;
  isWeighted: boolean;
  setSize: (size: number) => void;
  handleSizeChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleMatrixChange: (row: number, col: number, value: string) => void;
  setIsDirected: (value: boolean) => void;
  setAllowSelfLoops: (value: boolean) => void;
  setIsWeighted: (value: boolean) => void;
}

export function useMatrix({ initialSize }: UseMatrixProps): UseMatrixReturn {
  const [size, setSize] = useState<number>(initialSize);
  const [matrix, setMatrix] = useState<number[][]>([]);
  const [isDirected, setIsDirected] = useState<boolean>(false);
  const [allowSelfLoops, setAllowSelfLoops] = useState<boolean>(false);
  const [isWeighted, setIsWeighted] = useState<boolean>(false);

  // Initialize matrix
  useEffect(() => {
    const initialMatrix = Array(initialSize)
      .fill(0)
      .map(() => Array(initialSize).fill(0));
    setMatrix(initialMatrix);
  }, [initialSize]);

  const handleSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSize = parseInt(event.target.value) || initialSize;
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

  return {
    size,
    matrix,
    isDirected,
    allowSelfLoops,
    isWeighted,
    setSize,
    handleSizeChange,
    handleMatrixChange,
    setIsDirected,
    setAllowSelfLoops,
    setIsWeighted,
  };
} 