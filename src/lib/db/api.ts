import client from "./client";
import type {
	Product,
	PartialProduct,
	Document,
	StorageDocument,
	DataPromise,
	CustomError,
} from "./db.types";
import type { PostgrestFilterBuilder } from "@supabase/postgrest-js";
import type { SupabaseQueryBuilder } from "@supabase/supabase-js/dist/main/lib/SupabaseQueryBuilder";
import errors from "./errors";

// GENERAL FUNCTIONS.

const getData = <T>(document: Document): SupabaseQueryBuilder<T> =>
	client.from<T>(document);

const addData = <T>(
	document: Document,
	data: Partial<T>,
): PostgrestFilterBuilder<T> => client.from<T>(document).insert(data);

// STORAGE.

const uploadToStorage = async (
	storageDocument: StorageDocument,
	name: string,
	file: File,
): DataPromise<{ publicURL: string; filePath: string }> => {
	// Upload file.
	const { data, error: uploadError } = await client.storage
		.from(storageDocument)
		.upload(name, file);

	if (uploadError) return { data: null, error: errors["already-exists"] };

	// Get file path.
	const filePath = data.Key;

	// Get public URL.
	const { publicURL, error: URLError } = client.storage
		.from(storageDocument)
		.getPublicUrl(file.name);

	if (URLError) return { data: null, error: errors["public-url-error"] };

	// Return URL if no errors.
	return { data: { publicURL, filePath }, error: null };
};

const uploadFiles = async (
	storageDocument: StorageDocument,
	files: FileList,
): DataPromise<string[]> => {
	const URLs: string[] = [];
	let error: CustomError;

	// For every file.
	for (let i = 0; i < files.length; i++) {
		const file = files.item(i);
		// Try to upload and retrive generated URL.
		const { data, error: uploadError } = await uploadToStorage(
			storageDocument,
			file.name,
			file,
		);

		if (uploadError) {
			error = errors["error-uploading-files"];
			break;
		}

		// Get url from data.
		const { publicURL } = data;

		// If no error, add URL to the new product images.
		URLs.push(publicURL);
	}

	return { data: URLs.length === 0 ? null : URLs, error };
};

const deleteFiles = async (
	storageDocument: StorageDocument,
	files: FileList,
): DataPromise<string[]> => {
	const paths = Array.from(files).map((file) => file.name);
	const { data, error } = await client.storage
		.from(storageDocument)
		.remove(paths);

	if (error) return { data: null, error: errors["error-deleting-files"] };

	// Get file names.
	const fileNames = data.map((file) => file.name);

	return { data: fileNames, error: null };
};

// EXPORTED FUNCTIONS.

const addProduct = async (
	product: PartialProduct,
	files: FileList,
): DataPromise<Product[]> => {
	// Upload files.
	const { data: images, error: uploadError } = await uploadFiles(
		"images-bucket",
		files,
	);

	if (uploadError) return { data: null, error: uploadError };

	// Link uploaded images with product.
	product.images = images;

	const { data, error } = await addData<Product>("products", product).select();

	// If error adding product => Delete images from storage.
	if (error) {
		await deleteFiles("images-bucket", files);
		return { data: null, error: errors["already-exists"] };
	}

	return { data, error: null };
};

const getProducts = async (slug?: string): DataPromise<Product[]> => {
	const res = getData<Product>("products").select();

	// If slug is passed, filter the query.
	if (slug) res.filter("slug", "eq", slug);

	const { data, error } = await res;

	if (error) {
		return { data: null, error: errors["no-such-item-exists"] };
	}

	return { data, error: null };
};

const api = { getProducts, addProduct };
export default api;
