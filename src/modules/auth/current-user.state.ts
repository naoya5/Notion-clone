import { atom, useAtom } from "jotai";
import { User } from "@supabase/supabase-js";

//supabaseのユーザー型
const currentUserAtom = atom<User>();

export const useCurrentUserStore = () => {
  const [currentUser, setCurrentUser] = useAtom(currentUserAtom);
  return { currentUser, set: setCurrentUser };
};
