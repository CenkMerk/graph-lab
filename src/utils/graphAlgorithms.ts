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
   * Closeness Centrality değerlerini hesaplar
   * @param matrix Komşuluk matrisi
   * @returns Her düğüm için Closeness Centrality değerleri
   */
  calculateClosenessCentrality(matrix: number[][]): number[] {
    const n = matrix.length;
    const shortestPaths = this.floydWarshall(matrix);
    const closenessCentrality = new Array(n).fill(0);

    // Her düğüm için Closeness Centrality değerini hesapla
    for (let i = 0; i < n; i++) {
      let sum = 0;
      for (let j = 0; j < n; j++) {
        if (i !== j && shortestPaths[i][j] !== INF) {
          // 2^(-d) formülünü uygula, d = en kısa yol uzunluğu
          sum += Math.pow(2, -shortestPaths[i][j]);
        }
      }
      closenessCentrality[i] = sum;
    }

    return closenessCentrality;
  },

  /**
   * Closeness Centrality değerlerini normalize eder (0-1 aralığına)
   * @param values Closeness Centrality değerleri
   * @returns Normalize edilmiş değerler
   */
  normalizeClosenessCentrality(values: number[]): number[] {
    const max = Math.max(...values);
    return values.map(v => v / max);
  },

  /**
   * Closeness Centrality değerlerini okunabilir formata dönüştürür
   * @param values Closeness Centrality değerleri
   * @returns Formatlanmış değerler
   */
  formatClosenessCentrality(values: number[]): string[] {
    return values.map(v => v.toFixed(4));
  },

  /**
   * Verilen düğüm çıkarıldığında kalan grafın Closeness Centrality değerlerini hesaplar
   * @param matrix Komşuluk matrisi
   * @param removedVertex Çıkarılacak düğüm indeksi
   * @returns Kalan grafın Closeness Centrality değerleri
   */
  calculateResidualClosenessCentrality(matrix: number[][], removedVertex: number): number[] {
    const n = matrix.length;
    
    // Yeni matris oluştur (k düğümü çıkarılmış hali)
    const residualMatrix = matrix.map(row => [...row]);
    // k. satır ve sütunu sıfırla
    for (let i = 0; i < n; i++) {
      residualMatrix[removedVertex][i] = 0;
      residualMatrix[i][removedVertex] = 0;
    }

    // Kalan graf için closeness centrality hesapla
    return this.calculateClosenessCentrality(residualMatrix);
  },

  /**
   * Tüm Ck değerlerini hesaplar
   * @param matrix Komşuluk matrisi
   * @returns Her düğüm için Ck değerleri dizisi
   */
  calculateAllCkValues(matrix: number[][]): number[][] {
    const n = matrix.length;
    const ckValues: number[][] = [];

    // Her düğüm için Ck değerlerini hesapla
    for (let k = 0; k < n; k++) {
      const ckValue = this.calculateResidualClosenessCentrality(matrix, k);
      ckValues.push(ckValue);
    }

    return ckValues;
  },

  /**
   * Residual Closeness değerini hesaplar (minimum Ck değeri)
   * @param matrix Komşuluk matrisi
   * @returns Residual Closeness değeri
   */
  calculateResidualCloseness(matrix: number[][]): number {
    const ckValues = this.calculateAllCkValues(matrix);
    
    // Her Ck değeri için toplam hesapla
    const ckSums = ckValues.map(ck => 
      ck.reduce((sum, value) => sum + value, 0)
    );
    
    // Minimum Ck toplamını bul
    return Math.min(...ckSums);
  },

  /**
   * Grafın kenarlarını listeler
   * @param matrix Komşuluk matrisi
   * @param isDirected Grafın yönlü olup olmadığı
   * @returns Kenar listesi
   */
  getEdges(matrix: number[][], isDirected: boolean): { source: number; target: number }[] {
    const edges: { source: number; target: number }[] = [];
    const n = matrix.length;

    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (matrix[i][j] > 0) {
          // Yönsüz grafta her kenarı sadece bir kez ekle
          if (!isDirected && i > j) continue;
          edges.push({ source: i, target: j });
        }
      }
    }

    return edges;
  },

  /**
   * Line grafın komşuluk matrisini hesaplar
   * @param matrix Orijinal grafın komşuluk matrisi
   * @param isDirected Grafın yönlü olup olmadığı
   * @returns Line grafın komşuluk matrisi ve kenar etiketleri
   */
  calculateLineGraph(matrix: number[][], isDirected: boolean): {
    matrix: number[][];
    edgeLabels: string[];
  } {
    // Orijinal graftaki kenarları bul
    const edges = this.getEdges(matrix, isDirected);
    const n = edges.length;

    // Line graf için boş matris oluştur
    const lineMatrix = Array(n).fill(0).map(() => Array(n).fill(0));
    
    // Kenar etiketlerini oluştur
    const edgeLabels = edges.map(e => `${e.source + 1}-${e.target + 1}`);

    // Her kenar çifti için bağlantı kontrolü
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (i === j) continue;

        const edge1 = edges[i];
        const edge2 = edges[j];

        // İki kenar ortak bir düğüm paylaşıyorsa bağlantı kur
        if (edge1.source === edge2.source || 
            edge1.source === edge2.target || 
            edge1.target === edge2.source || 
            edge1.target === edge2.target) {
          lineMatrix[i][j] = 1;
        }
      }
    }

    return { matrix: lineMatrix, edgeLabels };
  }
}; 