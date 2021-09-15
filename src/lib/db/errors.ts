import type { CustomError } from "./db.types";

type ErrorKey =
	| "already-exists"
	| "error-uploading-files"
	| "public-url-error"
	| "error-deleting-files"
	| "no-such-item-exists";

const errors: Record<ErrorKey, CustomError> = {
	"already-exists": {
		code: 1001,
		hint: "PRODUCT-ALREADY-EXISTS",
		message: "The product already exists on the database.",
	},
	"no-such-item-exists": {
		code: 1002,
		hint: "PRODUCT-DOES-NOT-EXIST",
		message: "The product you are looking for is not here",
	},
	"error-uploading-files": {
		code: 2001,
		hint: "ERROR-WHILE-UPLOADING-FILE",
		message: "Some error ocurred while trying to upload a file.",
	},
	"public-url-error": {
		code: 2002,
		hint: "ERROR-WHILE-RETRIVING-PUBLIC-URL",
		message: "Some error ocurred while retrivinf a file public URl.",
	},
	"error-deleting-files": {
		code: 2003,
		hint: "ERROR-WHILE-DELETING-FILE",
		message: "Some error ocurred while deleting a storage file.",
	},
};

export default errors;
