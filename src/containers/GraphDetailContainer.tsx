import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { graphService } from "../services/firebase";
import { GraphDetail } from "../pages/GraphDetail";
import { Graph } from "../types/graph";

export function GraphDetailContainer() {
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

        if (!graphData || graphData.userId !== user.uid) {
          navigate("/app");
          return;
        }

        setGraph(graphData);
      } catch (error) {
        console.error("Graf yüklenirken hata:", error);
        navigate("/app");
      } finally {
        setLoading(false);
      }
    };

    loadGraph();
  }, [graphId, user, navigate]);

  const handleSave = async (updatedGraph: Graph) => {
    if (!graphId) return;

    await graphService.update(graphId, {
      name: updatedGraph.name,
      matrix: updatedGraph.matrix,
      isDirected: updatedGraph.isDirected,
      isWeighted: updatedGraph.isWeighted,
      allowSelfLoops: updatedGraph.allowSelfLoops,
    });

    setGraph(updatedGraph);
  };

  if (loading) {
    return <div className="text-center py-8">Yükleniyor...</div>;
  }

  if (!graph) {
    return null;
  }

  return <GraphDetail graph={graph} onSave={handleSave} editable={true} />;
} 