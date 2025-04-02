import { atom, useAtom } from "jotai";
import { Note } from "./note.entity";

const noteAtom = atom<Note[]>([]);

export const useNoteStore = () => {
  const [notes, setNotes] = useAtom(noteAtom);

  /**
   * const a = [note1, note2, note3]
   * const b = [note3,note4, note5]
   * [note1,note2, note3, note4, note5]
   * このように、重複を除いて結合する、同じものは後のもので更新する
   */

  const set = (newNotes: Note[]) => {
    setNotes((oldNotes) => {
      const combineNotes = [...oldNotes, ...newNotes];
      //[note1, note2, note3,note3, note4, note5]

      //重複を消すためにobjectに変換する
      const uniqueNotes: { [Key: number]: Note } = {};

      for (const note of combineNotes) {
        uniqueNotes[note.id] = note;
      }
      //ループ後{1: note1, 2: note2, 3: note3, 4: note4, 5: note5}
      return Object.values(uniqueNotes); //配列に変換
    });
  };

  return {
    getAll: () => notes,
    set,
  };
};
