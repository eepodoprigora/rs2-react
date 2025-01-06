import { db } from "../../../shared/api/db";
import { Note } from "./Note";

// Добавление заметки
export const addNote = async (note: Omit<Note, "id">) => {
  const id = await db.notes.add({
    id: new Date().toString(),
    ...note,
    updatedAt: new Date(),
  });
  return id;
};

// Получение всех заметок
export const getAllNotes = async () => {
  return await db.notes.toArray();
};

// Получение заметки по ID
// export const getNoteById = async (id: string) => {
//   return await db.notes.get(id);
// };

// Обновление заметки
export const updateNote = async (note: Note) => {
  return await db.notes.put({ ...note, updatedAt: new Date() });
};

// Удаление заметки
export const deleteNote = async (id: string) => {
  return await db.notes.delete(id);
};
