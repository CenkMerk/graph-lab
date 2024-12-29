import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { graphService } from '../services/firebase';
import { Graph } from '../types/graph';

export function MyGraphs() {
  const { user } = useAuth();
  const [graphs, setGraphs] = useState<Graph[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const loadGraphs = async () => {
      try {
        const userGraphs = await graphService.getUserGraphs(user.uid);
        setGraphs(userGraphs);
      } catch (error) {
        console.error('Graflar yüklenirken hata:', error);
      } finally {
        setLoading(false);
      }
    };

    loadGraphs();
  }, [user]);

  const handleDelete = async (graphId: string) => {
    if (!confirm('Bu grafı silmek istediğinizden emin misiniz?')) return;

    try {
      await graphService.delete(graphId);
      setGraphs(graphs.filter(g => g.id !== graphId));
    } catch (error) {
      console.error('Graf silinirken hata:', error);
      alert('Graf silinirken bir hata oluştu.');
    }
  };

  if (loading) {
    return <div className="text-center py-8">Yükleniyor...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Graflarım</h1>
      
      {graphs.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          Henüz hiç graf oluşturmadınız.
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {graphs.map((graph) => (
            <div
              key={graph.id}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {graph.name}
              </h3>
              <div className="text-sm text-gray-500 space-y-1">
                <p>Boyut: {graph.size}x{graph.size}</p>
                <p>Tip: {graph.isDirected ? 'Yönlü' : 'Yönsüz'}</p>
                <p>Ağırlıklı: {graph.isWeighted ? 'Evet' : 'Hayır'}</p>
                <p>Oluşturulma: {graph.createdAt.toLocaleDateString()}</p>
              </div>
              <div className="mt-4 flex justify-end space-x-2">
                <button
                  onClick={() => handleDelete(graph.id!)}
                  className="text-red-600 hover:text-red-800"
                >
                  Sil
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 