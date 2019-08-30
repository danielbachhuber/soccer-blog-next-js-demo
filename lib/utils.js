
export const removeDomainFromUrl = (url) => {
	return url.replace(/https?:\/\/[^\/]+/i, '');
};
