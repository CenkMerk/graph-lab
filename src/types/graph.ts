export interface Graph {
  id?: string;
  userId: string;
  name: string;
  matrix: number[][];
  size: number;
  isDirected: boolean;
  isWeighted: boolean;
  allowSelfLoops: boolean;
  createdAt: Date;
  updatedAt: Date;
} 