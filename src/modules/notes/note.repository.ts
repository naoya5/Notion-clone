import { supabase } from "@/lib/supabase";

export const noteRepository = {
  async create(userId: string, params: { title?: string; parentId?: number }) {
    const { data, error } = await supabase
      .from("notes")
      .insert([
        {
          //notesテーブルにレコードを追加
          user_id: userId,
          title: params.title,
          parent_id: params.parentId,
        },
      ])
      .select() //配列で取得
      .single(); //単一のレコードを取得
    if (error != null) throw new Error(error.message);
    return data; //notesテーブルのレコードを返す
  },
};
