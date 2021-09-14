import { createClient } from "@supabase/supabase-js";
import config from "./config";

const client = createClient(config.endpoint, config.public_key);

export default client;
