interface MatrixInfoProps {
  allowSelfLoops: boolean;
  isDirected: boolean;
  isWeighted: boolean;
}

export function MatrixInfo({ allowSelfLoops, isDirected, isWeighted }: MatrixInfoProps) {
  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
      <h3 className="text-sm font-medium text-blue-800 mb-2">Matris Özellikleri</h3>
      <ul className="space-y-1 text-sm text-blue-700">
        {!allowSelfLoops && (
          <li className="flex items-center">
            <span className="mr-2">•</span>
            Köşegen elemanları (i=j olan hücreler) otomatik olarak 0 değerini alır ve değiştirilemez
          </li>
        )}
        {!isDirected && (
          <li className="flex items-center">
            <span className="mr-2">•</span>
            Matris simetriktir (A[i][j] = A[j][i])
          </li>
        )}
        {isWeighted && (
          <li className="flex items-center">
            <span className="mr-2">•</span>
            Hücrelere 0'dan büyük herhangi bir tam sayı değeri girilebilir
          </li>
        )}
      </ul>
    </div>
  );
} 