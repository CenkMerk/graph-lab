import { useState } from "react";
import { Graph } from "../types/graph";
import { GraphHeader } from "../components/graph-detail/GraphHeader";
import { GraphProperties } from "../components/graph-detail/GraphProperties";
import { MatrixView } from "../components/graph-detail/MatrixView";
import { GraphVisualization } from "../components/graph-detail/GraphVisualization";
import { ShortestPathsView } from "../components/graph-detail/ShortestPathsView";
import { ClosenessCentralityView } from "../components/graph-detail/ClosenessCentralityView";
import { ResidualClosenessView } from "../components/graph-detail/ResidualClosenessView";
import { LineGraphView } from "../components/graph-detail/LineGraphView";
import { TotalGraphVariations } from "../components/graph-detail/TotalGraphVariations";
import { ComplementGraphView } from "../components/graph-detail/ComplementGraphView";

interface GraphDetailProps {
  graph: Graph;
  onSave?: (updatedGraph: Graph) => Promise<void>;
  editable?: boolean;
}

export function GraphDetail({ graph: initialGraph, onSave, editable = false }: GraphDetailProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedGraph, setEditedGraph] = useState<Graph | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const handleEdit = () => {
    setEditedGraph(initialGraph);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setEditedGraph(null);
    setIsEditing(false);
  };

  const handleSave = async () => {
    if (!editedGraph || !onSave) return;

    try {
      setIsSaving(true);
      await onSave(editedGraph);
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

  const displayGraph = isEditing ? editedGraph : initialGraph;
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
        editable={editable}
      />

      <div
        className={`${
          isEditing
            ? "flex flex-col gap-4"
            : "grid grid-cols-1 md:grid-cols-2 gap-4"
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

        {!isEditing && (
          <>
            <div className="md:col-span-2">
              <ShortestPathsView
                matrix={displayGraph.matrix}
                isWeighted={displayGraph.isWeighted}
              />
            </div>
            <div className="md:col-span-2">
              <ClosenessCentralityView
                matrix={displayGraph.matrix}
                name={displayGraph.name}
              />
            </div>
            <div className="md:col-span-2">
              <ResidualClosenessView
                matrix={displayGraph.matrix}
                name={displayGraph.name}
              />
            </div>
            <div className="md:col-span-2">
              <LineGraphView
                matrix={displayGraph.matrix}
                isDirected={displayGraph.isDirected}
              />
            </div>
            <div className="md:col-span-2">
              <TotalGraphVariations
                matrix={displayGraph.matrix}
                isDirected={displayGraph.isDirected}
                isWeighted={displayGraph.isWeighted}
              />
            </div>
            <div className="md:col-span-2">
              <ComplementGraphView
                matrix={displayGraph.matrix}
                isDirected={displayGraph.isDirected}
                isWeighted={displayGraph.isWeighted}
              />
            </div>
          </>
        )}

        <div className={isEditing ? "" : "md:col-span-2"}>
          <div className="bg-gray-50 rounded-lg p-4">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Graf Görünümü
            </h2>
            <GraphVisualization
              matrix={displayGraph.matrix}
              isDirected={displayGraph.isDirected}
              isWeighted={displayGraph.isWeighted}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
