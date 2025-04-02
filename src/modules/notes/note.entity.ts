import { Database } from "database.types";

//型を使いやすくしている
export type Note = Database["public"]["Tables"]["notes"]["Row"];
