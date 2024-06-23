export const fetcher = (...args) => fetch(...args).then(res => res.json());
// const fetcher = (...args: [RequestInfo, RequestInit?]) => fetch(...args).then(res => res.json());