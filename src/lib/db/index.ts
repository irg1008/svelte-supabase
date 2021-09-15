import client from "./client";
import api from "./api";
import config from "./config";
import type { Product, PartialProduct } from "./db.types";
export type { Product, PartialProduct };
export { api, config };
export default client;
