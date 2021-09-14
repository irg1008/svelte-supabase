const config = {
	endpoint: import.meta.env.VITE_SUPABASE_ENDPOINT.toString(),
	public_key: import.meta.env.VITE_SUPABASE_SECRET_API_KEY.toString(),
};
export default config;
