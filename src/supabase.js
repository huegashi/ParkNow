import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://hbmojnzpfkwlseavyhuz.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhibW9qbnpwZmt3bHNlYXZ5aHV6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIzMDA4OTgsImV4cCI6MjA1Nzg3Njg5OH0.sTzIy7ULwi5wvdOmdxCBQjFzjEIo0CC-9uSntqqRwRE";

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
