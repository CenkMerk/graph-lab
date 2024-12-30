// Sonsuz değeri temsil etmek için büyük bir sayı
const INF = Number.MAX_SAFE_INTEGER;

export const graphAlgorithms = {
  /**
   * BFS algoritması ile bir tepeden diğer tüm tepelere olan en kısa mesafeleri hesaplar
   * @param matrix Komşuluk matrisi
   * @param start Başlangıç tepesi
   * @returns Mesafeler dizisi
   */
  bfs(matrix: number[][], start: number): number[] {
    const n = matrix.length;
    const distances = new Array(n).fill(INF);
    const queue: number[] = [];
    
    // Başlangıç noktasını işaretle
    distances[start] = 0;
    queue.push(start);
    
    while (queue.length > 0) {
      const current = queue.shift()!;
      
      // Komşuları kontrol et
      for (let neighbor = 0; neighbor < n; neighbor++) {
        // Eğer kenar varsa ve bu tepeye henüz ulaşılmamışsa
        if (matrix[current][neighbor] > 0 && distances[neighbor] === INF) {
          distances[neighbor] = distances[current] + 1;
          queue.push(neighbor);
        }
      }
    }
    
    return distances;
  },

  /**
   * Ağırlıksız graf için BFS ile en kısa yol matrisini hesaplar
   * @param matrix Komşuluk matrisi
   * @returns En kısa yol matrisi
   */
  unweightedShortestPaths(matrix: number[][]): number[][] {
    const n = matrix.length;
    const distances = Array(n).fill(0).map(() => Array(n).fill(INF));
    
    // Her tepeden BFS çalıştır
    for (let i = 0; i < n; i++) {
      const distancesFromI = this.bfs(matrix, i);
      distances[i] = distancesFromI;
    }
    
    return distances;
  },

  /**
   * Floyd-Warshall algoritması ile en kısa yol matrisini hesaplar
   * @param matrix Komşuluk matrisi
   * @returns En kısa yol matrisi
   */
  floydWarshall(matrix: number[][]): number[][] {
    const n = matrix.length;
    const dist = Array(n).fill(0).map(() => Array(n).fill(INF));

    // Başlangıç matrisini oluştur
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (i === j) {
          dist[i][j] = 0;
        } else if (matrix[i][j] > 0) {
          dist[i][j] = matrix[i][j];
        }
      }
    }

    // Floyd-Warshall algoritması
    for (let k = 0; k < n; k++) {
      for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
          if (dist[i][k] !== INF && dist[k][j] !== INF) {
            dist[i][j] = Math.min(dist[i][j], dist[i][k] + dist[k][j]);
          }
        }
      }
    }

    return dist;
  },

  /**
   * En kısa yol matrisini okunabilir formata dönüştürür
   * @param shortestPaths En kısa yol matrisi
   * @returns Formatlanmış matris (INF değerleri "∞" olarak gösterilir)
   */
  formatShortestPaths(shortestPaths: number[][]): string[][] {
    return shortestPaths.map(row =>
      row.map(cell =>
        cell === INF ? "∞" : cell.toString()
      )
    );
  },

  /**
   * Residual Closeness merkeziyet değerlerini hesaplar
   * @param matrix Komşuluk matrisi
   * @returns Her düğüm için residual closeness değerleri
   */
  calculateResidualCloseness(matrix: number[][]): number[] {
    const n = matrix.length;
    const shortestPaths = this.floydWarshall(matrix);
    const residualCloseness = new Array(n).fill(0);

    // Her düğüm için residual closeness değerini hesapla
    for (let i = 0; i < n; i++) {
      let sum = 0;
      for (let j = 0; j < n; j++) {
        if (i !== j && shortestPaths[i][j] !== INF) {
          // 2^(-d) formülünü uygula, d = en kısa yol uzunluğu
          sum += Math.pow(2, -shortestPaths[i][j]);
        }
      }
      residualCloseness[i] = sum;
    }

    return residualCloseness;
  },

  /**
   * Residual Closeness değerlerini normalize eder (0-1 aralığına)
   * @param values Residual Closeness değerleri
   * @returns Normalize edilmiş değerler
   */
  normalizeResidualCloseness(values: number[]): number[] {
    const max = Math.max(...values);
    return values.map(v => v / max);
  },

  /**
   * Residual Closeness değerlerini okunabilir formata dönüştürür
   * @param values Residual Closeness değerleri
   * @returns Formatlanmış değerler
   */
  formatResidualCloseness(values: number[]): string[] {
    return values.map(v => v.toFixed(4));
  }
}; 