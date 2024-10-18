export const SyncFunction = Object.getPrototypeOf(function () {
	// nothing, since this purpose is get the constructor, body is not concerned
}).constructor;
export const AsyncFunction = Object.getPrototypeOf(async function () {
	// nothing, since this purpose is get the constructor, body is not concerned
}).constructor;
