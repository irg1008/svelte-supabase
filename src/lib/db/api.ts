import client from "./client";
import type { Product, PartialProduct } from "./db.types";
import type {
	PostgrestError,
	PostgrestFilterBuilder,
} from "@supabase/postgrest-js";
import type { SupabaseQueryBuilder } from "@supabase/supabase-js/dist/main/lib/SupabaseQueryBuilder";

// TYPES.

interface DataReturn<T> {
	data: T[];
	error: PostgrestError;
}

type Document = "products";
type StorageDocument = "images-bucket";

type DataPromise<T> = Promise<DataReturn<T>>;

// GENERAL FUNCTIONS.

const getData = <T>(document: Document): SupabaseQueryBuilder<T> =>
	client.from<T>(document);

const addData = <T>(
	document: Document,
	data: Partial<T>,
): PostgrestFilterBuilder<T> => client.from<T>(document).insert(data);

// STORAGE.

const getStorageUrl = (storageDocument: StorageDocument, name: string) =>
	client.storage.from(storageDocument).getPublicUrl(name);

const uploadToStorage = async (
	storageDocument: StorageDocument,
	name: string,
	file: File,
) => {
	await client.storage.from(storageDocument).upload(name, file);
	const { publicURL } = getStorageUrl("images-bucket", file.name);
	return publicURL;
};

// PRODUCTS.

const addProduct = async (
	product: PartialProduct,
	files: FileList,
): DataPromise<Product> => {
	// Upload files.
	await (async () => {
		for (let i = 0; i < files.length; i++) {
			const file = files.item(i);
			const URL = await uploadToStorage("images-bucket", file.name, file);
			product.images.push(URL);
		}
	})();

	const { data, error } = await addData<Product>("products", product).select();
	return { data, error };
};

const getProducts = async (slug?: string): DataPromise<Product> => {
	const res = getData<Product>("products").select();
	if (slug) res.filter("slug", "eq", slug);
	const { data, error } = await res;
	return { data, error };
};

const api = { getProducts, addProduct };
export default api;
