import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { graphService } from "../services/firebase";
import { Graph } from "../types/graph";
import { GraphHeader } from "../components/graph-detail/GraphHeader";
import { GraphProperties } from "../components/graph-detail/GraphProperties";
import { MatrixView } from "../components/graph-detail/MatrixView";
import { GraphVisualization } from "../components/graph-detail/GraphVisualization";

export function GraphDetail() {
  const { graphId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [graph, setGraph] = useState<Graph | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editedGraph, setEditedGraph] = useState<Graph | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const loadGraph = async () => {
      try {
        if (!graphId || !user) return;
        const graphData = await graphService.getGraph(graphId);

        // Eğer graf bulunamadıysa veya başka bir kullanıcıya aitse ana sayfaya yönlendir
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

  const handleEdit = () => {
    setEditedGraph(graph);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setEditedGraph(null);
    setIsEditing(false);
  };

  const handleSave = async () => {
    if (!editedGraph || !graphId) return;

    try {
      setIsSaving(true);
      await graphService.update(graphId, {
        name: editedGraph.name,
        matrix: editedGraph.matrix,
        isDirected: editedGraph.isDirected,
        isWeighted: editedGraph.isWeighted,
        allowSelfLoops: editedGraph.allowSelfLoops,
      });

      setGraph(editedGraph);
      setIsEditing(false);
    } catch (error) {
      console.error("Graf güncellenirken hata:", error);
      alert("Graf güncellenirken bir hata oluştu.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleMatrixChange = (row: number, col: number, value: string) => {
    if (!editedGraph) return;

    const newMatrix = [...editedGraph.matrix];
    const newValue = parseInt(value);

    if (isNaN(newValue) || newValue < 0) return;
    if (!editedGraph.isWeighted && newValue > 1) return;

    newMatrix[row][col] = newValue;
    if (!editedGraph.isDirected && row !== col) {
      newMatrix[col][row] = newValue;
    }

    setEditedGraph({
      ...editedGraph,
      matrix: newMatrix,
    });
  };

  const handleSizeChange = (newSize: number) => {
    if (!editedGraph) return;

    // Yeni boyutta boş matris oluştur
    const newMatrix = Array(newSize)
      .fill(0)
      .map(() => Array(newSize).fill(0));

    // Mevcut matristen değerleri kopyala
    const minSize = Math.min(editedGraph.size, newSize);
    for (let i = 0; i < minSize; i++) {
      for (let j = 0; j < minSize; j++) {
        newMatrix[i][j] = editedGraph.matrix[i][j];
      }
    }

    setEditedGraph({
      ...editedGraph,
      size: newSize,
      matrix: newMatrix,
    });
  };

  const handleGraphChange = (updates: Partial<Graph>) => {
    if (!editedGraph) return;
    setEditedGraph({ ...editedGraph, ...updates });
  };

  if (loading) {
    return <div className="text-center py-8">Yükleniyor...</div>;
  }

  if (!graph) {
    return null;
  }

  const displayGraph = isEditing ? editedGraph : graph;
  if (!displayGraph) return null;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <GraphHeader
        name={displayGraph.name}
        createdAt={displayGraph.createdAt}
        isEditing={isEditing}
        isSaving={isSaving}
        onEdit={handleEdit}
        onCancel={handleCancel}
        onSave={handleSave}
        onNameChange={(name) => handleGraphChange({ name })}
      />

      <div
        className={`${
          isEditing ? "flex flex-col gap-4" : "grid grid-cols-1 md:grid-cols-2 gap-4"
        }`}
      >
        <GraphProperties
          graph={displayGraph}
          isEditing={isEditing}
          onGraphChange={handleGraphChange}
          onSizeChange={handleSizeChange}
        />

        <MatrixView
          matrix={displayGraph.matrix}
          isEditing={isEditing}
          isWeighted={displayGraph.isWeighted}
          allowSelfLoops={displayGraph.allowSelfLoops}
          onCellChange={handleMatrixChange}
        />

        <div className={isEditing ? "" : "md:col-span-2"}>
          <GraphVisualization
            matrix={displayGraph.matrix}
            isDirected={displayGraph.isDirected}
            isWeighted={displayGraph.isWeighted}
          />
        </div>
      </div>
    </div>
  );
}
