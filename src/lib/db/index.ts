import client from "./client";
import api from "./api";
import config from "./config";
import errors from "./errors";
import type {
	Product,
	PartialProduct,
	Document,
	StorageDocument,
	DataPromise,
	CustomError,
} from "./db.types";
export type {
	Product,
	PartialProduct,
	Document,
	StorageDocument,
	DataPromise,
	CustomError,
};
export { api, config, errors };
export default client;
