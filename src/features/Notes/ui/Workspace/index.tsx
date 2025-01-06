import React, { Dispatch, SetStateAction } from "react";
import { Note } from "../../../../entities/Note";

import { ViewNote } from "../ViewNote";
import { EditNote } from "../EditNote";

interface WorkspaceProps {
  note: Note;
  onSave: (updatedNote: Note) => Promise<void>;
  isEditing: string | null;
  startEditing: (id: string) => void;
  stopEditing: (content: string, id: string) => void;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
}

export const Workspace: React.FC<WorkspaceProps> = ({
  note,
  isEditing,
  startEditing,
  stopEditing,
  onSave,
  setIsModalOpen,
}) => {
  return isEditing ? (
    <EditNote
      note={note}
      onSave={onSave}
      stopEditing={stopEditing}
      setIsModalOpen={setIsModalOpen}
    />
  ) : (
    <ViewNote
      note={note}
      startEditing={startEditing}
      setIsModalOpen={setIsModalOpen}
    />
  );
};
