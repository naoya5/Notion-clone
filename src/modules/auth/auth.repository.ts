import { supabase } from "@/lib/supabase";

export const authRepository = {
  async signup(name: string, email: string, password: string) {
    const { data, error } = await supabase.auth.signUp({
      //email and password以外はオプションで設定する
      email,
      password,
      options: { data: { name } },
    });
    //errorがあった場合はエラーを投げる
    //data.userがnullの場合もエラーを投げる
    if (error != null || data.user == null) throw new Error(error?.message);
    return {
      ...data.user,
      //optionsで設定したnameはuser_metadataに入っている
      userName: data.user.user_metadata.name,
    };
  },
  async signin(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    //errorがあった場合はエラーを投げる
    if (error != null || data.user == null) throw new Error(error?.message);
    return {
      ...data.user,
      userName: data.user.user_metadata.name,
    };
  },

  async getCurrentUser() {
    const { data, error } = await supabase.auth.getSession();
    //一定期間経つとsessionが切れるので、sessionがnullの場合はnullを返す
    if (error != null) throw new Error(error.message);
    if (data.session == null) return;
    return {
      ...data.session.user,
      userName: data.session.user.user_metadata.name,
    };
  },
};
