import { useEffect, useState } from "react";
import {
  addNote,
  deleteNote,
  getAllNotes,
  updateNote,
  Note,
} from "../../../entities/Note";

export const useNotes = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNotes = async () => {
      setLoading(true);
      try {
        const allNotes = await getAllNotes();
        setNotes(allNotes);
        if (allNotes.length > 0) {
          setSelectedNote(allNotes[0]);
        }
      } catch (err) {
        setError("Ошибка загрузки заметок");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  const saveNote = async (updatedNote: Note) => {
    setLoading(true);
    try {
      await updateNote(updatedNote);
      setNotes((prevNotes) =>
        prevNotes.map((note) =>
          note.id === updatedNote.id ? updatedNote : note
        )
      );
      setSelectedNote(updatedNote);
    } catch (err) {
      setError("Ошибка сохранения заметки");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const addNewNote = async () => {
    const id = Date.now().toString();
    const newNote: Note = {
      id,
      content: "",
      updatedAt: new Date(),
      cursorPosition: 0,
    };

    setLoading(true);
    try {
      await addNote(newNote);
      setNotes((prevNotes) => [newNote, ...prevNotes]);
      setSelectedNote(newNote);
      setIsEditing(id);
    } catch (err) {
      setError("Ошибка добавления новой заметки");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const removeNote = async (id: string) => {
    setLoading(true);
    try {
      await deleteNote(id);
      setNotes((prevNotes) => {
        const updatedNotes = prevNotes.filter((note) => note.id !== id);
        setSelectedNote(updatedNotes.length > 0 ? updatedNotes[0] : null);
        return updatedNotes;
      });
    } catch (err) {
      setError("Ошибка удаления заметки");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const selectNote = (id: string) => {
    const note = notes.find((note) => note.id === id);
    const empty = notes.find((note) => !note.content.length);

    if (empty) {
      removeNote(empty.id);
    }

    if (note) {
      setSelectedNote(note);
      setIsEditing(null);
    }
  };

  const startEditing = (id: string) => setIsEditing(id);

  const stopEditing = (content: string, id: string) => {
    if (content.length === 0) {
      removeNote(id);
    }
    setIsEditing(null);
  };

  // Возвращаем состояние и функции
  return {
    notes,
    selectedNote,
    isEditing,
    loading,
    error,
    startEditing,
    stopEditing,
    saveNote,
    addNewNote,
    removeNote,
    selectNote,
  };
};
