import { createClient } from "@supabase/supabase-js";
import { Database } from "../database/fieldTypes";

export const supabase = createClient<Database>(
  process.env.SUPABASE_SUPABASE_URL as string,
  process.env.SUPABASE_SUPABASE_ANON_KEY as string
);
