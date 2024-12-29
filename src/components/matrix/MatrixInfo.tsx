interface MatrixInfoProps {
  allowSelfLoops: boolean;
  isDirected: boolean;
  isWeighted: boolean;
}

export function MatrixInfo({ allowSelfLoops, isDirected, isWeighted }: MatrixInfoProps) {
  return (
    <p className="text-sm text-gray-500 mt-2">
      {!allowSelfLoops && "Not: Köşegen elemanları (i=j olan hücreler) otomatik olarak 0 değerini alır ve değiştirilemez."}
      {!isDirected && " Matris simetriktir (A[i][j] = A[j][i])."}
      {isWeighted && " Hücrelere 0'dan büyük herhangi bir tam sayı değeri girilebilir."}
    </p>
  );
} 