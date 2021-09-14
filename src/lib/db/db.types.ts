interface Product {
	id: string;
	slug: string;
	name: string;
	description: string;
	price: number;
	available: boolean;
	images: string[];
}

export type { Product };
