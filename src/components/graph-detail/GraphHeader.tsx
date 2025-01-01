interface GraphHeaderProps {
  name: string;
  createdAt: Date;
  isEditing: boolean;
  isSaving: boolean;
  onEdit: () => void;
  onCancel: () => void;
  onSave: () => void;
  onNameChange: (name: string) => void;
  editable: boolean;
}

export function GraphHeader({
  name,
  createdAt,
  isEditing,
  isSaving,
  onEdit,
  onCancel,
  onSave,
  onNameChange,
  editable,
}: GraphHeaderProps) {
  return (
    <div className="mb-6 flex justify-between items-center">
      <div>
        {isEditing ? (
          <input
            type="text"
            value={name}
            onChange={(e) => onNameChange(e.target.value)}
            className="text-3xl font-bold text-gray-900 border-b-2 border-blue-500 focus:outline-none"
          />
        ) : (
          <h1 className="text-3xl font-bold text-gray-900">{name}</h1>
        )}
        <div className="mt-2 text-sm text-gray-500">
          Oluşturulma: {new Date(createdAt).toLocaleDateString()}
        </div>
      </div>
      <div className="space-x-2">
        {isEditing ? (
          <>
            <button
              onClick={onCancel}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
              disabled={isSaving}
            >
              İptal
            </button>
            <button
              onClick={onSave}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
              disabled={isSaving}
            >
              {isSaving ? "Kaydediliyor..." : "Kaydet"}
            </button>
          </>
        ) : (
          <button
            onClick={onEdit}
            className="px-4 py-2 text-blue-600 hover:text-blue-800"
            disabled={!editable}
          >
            Düzenle
          </button>
        )}
      </div>
    </div>
  );
} 