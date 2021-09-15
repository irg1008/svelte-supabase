interface Product {
	id: string;
	slug: string;
	name: string;
	description: string;
	price: number;
	available: boolean;
	images: string[];
}

type PartialProduct = Omit<Product, "id" | "slug">;

interface CustomError {
	code: number;
	hint: string;
	message: string;
}
interface DataReturn<T> {
	data: T;
	error: CustomError;
}

type DataPromise<T> = Promise<DataReturn<T>>;

type Document = "products";
type StorageDocument = "images-bucket";

export type {
	Product,
	PartialProduct,
	CustomError,
	DataPromise,
	Document,
	StorageDocument,
};
