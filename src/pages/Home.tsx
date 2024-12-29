import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { graphService } from '../services/firebase';
import { Graph } from '../types/graph';

function Home() {
  const { user } = useAuth();
  const [graphs, setGraphs] = useState<Graph[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadGraphs = async () => {
      try {
        if (!user) return;
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

  return (
    <div className="space-y-8">
      {/* Üst Bölüm - Matris Oluşturucu Butonu */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Yeni Graf Oluştur</h2>
        <p className="text-gray-600 mb-4">
          Komşuluk matrisi kullanarak yeni bir graf oluşturun.
        </p>
        <Link
          to="/matrix-creator"
          className="inline-block px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Komşuluk Matrisinden Graf Oluşturma
        </Link>
      </div>

      {/* Alt Bölüm - Graf Listesi */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Graflarım</h2>
        
        {loading ? (
          <div className="text-center py-8">Yükleniyor...</div>
        ) : graphs.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            Henüz hiç graf oluşturmadınız.
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {graphs.map((graph) => (
              <div
                key={graph.id}
                className="bg-gray-50 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {graph.name}
                </h3>
                <div className="text-sm text-gray-500 space-y-1">
                  <p>Boyut: {graph.size}x{graph.size}</p>
                  <p>Tip: {graph.isDirected ? 'Yönlü' : 'Yönsüz'}</p>
                  <p>Ağırlıklı: {graph.isWeighted ? 'Evet' : 'Hayır'}</p>
                  <p>Oluşturulma: {new Date(graph.createdAt).toLocaleDateString()}</p>
                </div>
                <div className="mt-4 flex justify-end">
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
    </div>
  );
}

export default Home;
