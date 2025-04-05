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
          parent_document: params.parentId,
        },
      ])
      .select() //配列で取得
      .single(); //単一のレコードを取得
    if (error != null) throw new Error(error.message);
    return data; //notesテーブルのレコードを返す
  },
  //ノートを取得
  async find(userId: string, parentDocumentId?: number) {
    const query = supabase
      .from("notes")
      .select()
      .eq("user_id", userId)
      .order("created_at", { ascending: false });
    const { data } =
      parentDocumentId != null
        ? await query.eq("parent_document", parentDocumentId)
        : await query.is("parent_document", null);
    return data;
  },
};
