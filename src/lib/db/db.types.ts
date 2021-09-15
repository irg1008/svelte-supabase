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

export type { Product, PartialProduct };
