import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://islzlwfysskryryincex.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlzbHpsd2Z5c3NrcnlyeWluY2V4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjk1ODIyNTksImV4cCI6MjA0NTE1ODI1OX0.uwx2pcUBL1OWiZqFMkc7n5XoEUcJyrzSxNnl4Lk9e9s'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)