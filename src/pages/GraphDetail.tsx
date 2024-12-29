import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { graphService } from '../services/firebase';
import { Graph } from '../types/graph';

export function GraphDetail() {
  const { graphId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [graph, setGraph] = useState<Graph | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadGraph = async () => {
      try {
        if (!graphId || !user) return;
        const graphData = await graphService.getGraph(graphId);
        
        // Eğer graf bulunamadıysa veya başka bir kullanıcıya aitse ana sayfaya yönlendir
        if (!graphData || graphData.userId !== user.uid) {
          navigate('/app');
          return;
        }
        
        setGraph(graphData);
      } catch (error) {
        console.error('Graf yüklenirken hata:', error);
        navigate('/app');
      } finally {
        setLoading(false);
      }
    };

    loadGraph();
  }, [graphId, user, navigate]);

  if (loading) {
    return <div className="text-center py-8">Yükleniyor...</div>;
  }

  if (!graph) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">{graph.name}</h1>
        <div className="mt-2 text-sm text-gray-500">
          Oluşturulma: {new Date(graph.createdAt).toLocaleDateString()}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Graf Özellikleri */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Graf Özellikleri</h2>
          <div className="space-y-2">
            <p>Boyut: {graph.size}x{graph.size}</p>
            <p>Tip: {graph.isDirected ? 'Yönlü' : 'Yönsüz'}</p>
            <p>Ağırlıklı: {graph.isWeighted ? 'Evet' : 'Hayır'}</p>
            <p>Kendi Kendine Bağlantı: {graph.allowSelfLoops ? 'İzin Veriliyor' : 'İzin Verilmiyor'}</p>
          </div>
        </div>

        {/* Matris Görünümü */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Komşuluk Matrisi</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <tbody className="bg-white divide-y divide-gray-200">
                {graph.matrix.map((row, i) => (
                  <tr key={i}>
                    {row.map((cell, j) => (
                      <td key={j} className="px-4 py-2 text-center border">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
} 