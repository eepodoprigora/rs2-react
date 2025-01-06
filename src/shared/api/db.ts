import Dexie, { Table } from "dexie";
import { Note } from "../../entities/Note/model/Note";

export class NotesDatabase extends Dexie {
  notes!: Table<Note>;

  constructor() {
    super("NotesDatabase");
    this.version(1).stores({
      notes: "++id, content, updatedAt",
    });
  }
}

export const db = new NotesDatabase();
