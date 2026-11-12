import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://dtvshtzryjfpelxibmfp.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR0dnNodHpyeWpmcGVseGlibWZwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkwMzAzNDMsImV4cCI6MjA5NDYwNjM0M30.mAKawoGW6gQeBA-FwSqzAFPrOE3rH-xTmZuwADlK49s";

export const supabase = createClient(supabaseUrl, supabaseKey);