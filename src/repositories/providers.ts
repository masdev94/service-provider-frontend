import api from "./axios";

export const providerApi = {
  getAll: (url = "/providers") => api.get(url),
  getOne: (slug: string) => api.get(`/providers/${slug}`),
  getCategories: () => api.get(`/categories`),
};
