import client from "./client";
import type { Product } from "./db.types";
import type {
	PostgrestError,
	PostgrestFilterBuilder,
} from "@supabase/postgrest-js";
import type { SupabaseQueryBuilder } from "@supabase/supabase-js/dist/main/lib/SupabaseQueryBuilder";

interface DataReturn<T> {
	data: T[];
	error: PostgrestError;
}

type Document = "products";

type DataPromise<T> = Promise<DataReturn<T>>;

const getData = <T>(document: Document): SupabaseQueryBuilder<T> =>
	client.from<T>(document);

const postData = <T>(
	document: Document,
	data: T[],
): PostgrestFilterBuilder<T> => client.from<T>(document).insert(data);

const addProducts = async (products: Product[]): DataPromise<Product> => {
	const { data, error } = await postData<Product>(
		"products",
		products,
	).select();
	return { data, error };
};

const getProducts = async (slug?: string): DataPromise<Product> => {
	const res = getData<Product>("products").select();

	if (slug) {
		res.filter("slug", "eq", slug);
	}

	const { data, error } = await res;
	return { data, error };
};

const api = { getProducts, addProducts };
export default api;
