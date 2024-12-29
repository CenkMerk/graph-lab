interface MatrixNode {
  from: number;
  to: number;
  weight: number;
}

export const matrixHelpers = {
  // İç içe diziyi nesne dizisine çevirir
  matrixToObjects(matrix: number[][]): MatrixNode[] {
    const nodes: MatrixNode[] = [];

    matrix.forEach((row, fromIndex) => {
      row.forEach((weight, toIndex) => {
        // Sadece bağlantı olan (weight > 0) düğümleri ekle
        if (weight > 0) {
          nodes.push({
            from: fromIndex,
            to: toIndex,
            weight,
          });
        }
      });
    });

    return nodes;
  },

  // Nesne dizisini iç içe diziye çevirir
  objectsToMatrix(nodes: MatrixNode[], size: number): number[][] {
    // Boş matris oluştur
    const matrix = Array(size)
      .fill(0)
      .map(() => Array(size).fill(0));

    // Her bağlantıyı matrise ekle
    nodes.forEach(({ from, to, weight }) => {
      if (from < size && to < size) {
        matrix[from][to] = weight;
      }
    });

    return matrix;
  },

  // Matrisi sıkıştırılmış formatta saklamak için
  compressMatrix(matrix: number[][]): string {
    return JSON.stringify(this.matrixToObjects(matrix));
  },

  // Sıkıştırılmış formatı matrise dönüştürmek için
  decompressMatrix(compressed: string, size: number): number[][] {
    const nodes = JSON.parse(compressed) as MatrixNode[];
    return this.objectsToMatrix(nodes, size);
  },
};
