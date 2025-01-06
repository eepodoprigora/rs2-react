import { useState } from "react";
import {
  Sidebar,
  NoNotes,
  Topbar,
  Workspace,
  DeleteNoteConfirmModal,
} from "../../features/Notes/ui";
import { useNotes } from "../../features/Notes/model";
import { useSearch } from "../../features/Search/model";

const NotesPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Работа с заметками
  const {
    notes,
    selectedNote,
    error,
    isEditing,
    startEditing,
    stopEditing,
    saveNote,
    addNewNote,
    removeNote,
    selectNote,
  } = useNotes();

  const { query, setQuery, filteredItems } = useSearch({
    items: notes,
    searchField: "content",
  });

  const onClose = () => {
    setIsModalOpen(false);
  };

  if (error) {
    return <div style={{ color: "red" }}>{error}</div>;
  }

  return notes.length > 0 ? (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <Topbar onAddNote={addNewNote} query={query} setQuery={setQuery} />
      <div style={{ display: "flex", flex: 1 }}>
        <Sidebar
          notes={filteredItems}
          onSelect={(id: string) => selectNote(id)}
          selectedNoteId={selectedNote?.id ?? null}
        />
        {selectedNote && (
          <>
            <div style={{ flex: 1, padding: "0 8px" }}>
              <Workspace
                note={selectedNote}
                onSave={saveNote}
                stopEditing={stopEditing}
                isEditing={isEditing}
                startEditing={startEditing}
                setIsModalOpen={setIsModalOpen}
              />
            </div>
            <DeleteNoteConfirmModal
              isOpen={isModalOpen}
              removeNote={removeNote}
              onClose={onClose}
              selectedNoteId={selectedNote?.id ?? null}
            />
          </>
        )}
      </div>
    </div>
  ) : (
    <NoNotes onAddNote={addNewNote} />
  );
};

export default NotesPage;
