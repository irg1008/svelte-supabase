import client from "./client";
import type {
	Product,
	PartialProduct,
	Document,
	StorageDocument,
	DataPromise,
	CustomError,
	BucketImg,
} from "./db.types";
import type { PostgrestFilterBuilder } from "@supabase/postgrest-js";
import type { SupabaseQueryBuilder } from "@supabase/supabase-js/dist/main/lib/SupabaseQueryBuilder";
import errors from "./errors";

// GENERAL FUNCTIONS.

/**
 * Get data from the database given a document id.
 *
 * @template T
 * @param {Document} document The id of the document. P.e. kittys or products.
 * @return {*}  {SupabaseQueryBuilder<T>} Returns a query that allows for filtering and selecting.
 */
const getData = <T>(document: Document): SupabaseQueryBuilder<T> =>
	client.from<T>(document);

/**
 * Adds data to the database on given document id.
 *
 * @template T
 * @param {Document} document Document id to add data to. P.e. products.
 * @param {Partial<T>} data Data to add to the database table/document.
 * @return {*}  {PostgrestFilterBuilder<T>} Returns a query that allows for selecting.
 */
const addData = <T>(
	document: Document,
	data: Partial<T>,
): PostgrestFilterBuilder<T> => client.from<T>(document).insert(data);

// STORAGE.

/**
 * Upload a single file to the supabase storage.
 *
 * @param {StorageDocument} storageDocument Storage bucket to upload the file to.
 * @param {string} name Name of the file to upload. TODO: Generate for multiple of the same file.
 * @param {File} file File to upload.
 * @return {*}  {DataPromise<BucketImg>} Returns the generated url and bucket-path on the database.
 */
const uploadToStorage = async (
	storageDocument: StorageDocument,
	name: string,
	file: File,
): DataPromise<BucketImg> => {
	// Upload file.
	const { error: uploadError } = await client.storage
		.from(storageDocument)
		.upload(name, file);

	if (uploadError) return { data: null, error: errors["already-exists"] };

	// Get file path.
	const path = file.name;

	// Get public URL.
	const { publicURL, error: URLError } = client.storage
		.from(storageDocument)
		.getPublicUrl(file.name);

	if (URLError) return { data: null, error: errors["public-url-error"] };

	// Return URL if no errors.
	return { data: { publicURL, path }, error: null };
};

/**
 * Upload several files to a database bucket.
 *
 * @param {StorageDocument} storageDocument The bucket id to upload the files to.
 * @param {FileList} files Files to upload to bucket.
 * @return {*}  {DataPromise<string[]>} An array of generated URLs for the uploaded files.
 */
const uploadFiles = async (
	storageDocument: StorageDocument,
	files: FileList,
): DataPromise<BucketImg[]> => {
	const bucketImgs: BucketImg[] = [];
	let error: CustomError;

	// For every file.
	for (let i = 0; i < files.length; i++) {
		const file = files.item(i);
		// Try to upload and retrive generated URL.
		const { data: bucketImg, error: uploadError } = await uploadToStorage(
			storageDocument,
			file.name,
			file,
		);

		if (uploadError) {
			error = errors["error-uploading-files"];
			break;
		}

		// If no error, add URL to the new product images.
		bucketImgs.push(bucketImg);
	}

	return { data: bucketImgs.length === 0 ? null : bucketImgs, error };
};

/**
 * Delete files on the database.
 *
 * @param {StorageDocument} storageDocument Database bucket that contains the files.
 * @param {string[]} paths Path of the file in the bucket.
 * @return {*}  {DataPromise<string[]>}
 */
const deleteFiles = async (
	storageDocument: StorageDocument,
	paths: string[],
): DataPromise<string[]> => {
	const { data, error } = await client.storage
		.from(storageDocument)
		.remove(paths);

	console.log(paths);

	if (error) return { data: null, error: errors["error-deleting-files"] };

	// Get file names.
	const fileNames = data.map((file) => file.name);

	return { data: fileNames, error: null };
};

// EXPORTED FUNCTIONS.

/**
 * Add product to the database. Uploads and links images.
 *
 * @param {PartialProduct} product Product to upload to db.
 * @param {FileList} files Files to be linked with the product.
 * @return {*}  {DataPromise<Product[]>} List of products that results after the addition.
 */
const addProduct = async (
	product: PartialProduct,
	files: FileList,
): DataPromise<Product[]> => {
	// Upload files.
	const { data: bucketImgs, error: uploadError } = await uploadFiles(
		"images-bucket",
		files,
	);

	if (uploadError) return { data: null, error: uploadError };

	// Link uploaded images with product.
	product.images = bucketImgs.map((bucketImg) => bucketImg.publicURL);

	const { data, error } = await addData<Product>("products", product).select();

	// If error adding product => Delete images from storage.
	if (error) {
		await deleteFiles(
			"images-bucket",
			bucketImgs.map((bucketImg) => bucketImg.path),
		);
		return { data: null, error: errors["already-exists"] };
	}

	return { data, error: null };
};

/**
 * Get product from the database with optional slug parameter.
 *
 * @param {string} [slug] Slug of the product. Used for filtering results.
 * @return {*}  {DataPromise<Product[]>} List of fetched products.
 */
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
