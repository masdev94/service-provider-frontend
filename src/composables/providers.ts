// import { ref, watch } from "vue";
// import { providerApi } from "@/repositories/providers";

// export const useProvider = () => {
//   const provider = ref(null);
//   const loading = ref(false);
//   const error = ref(null);

//   const providers = ref([]);
//   const categories = ref([]);
//   const paginationLinks = ref([]);
//   const tableView = ref(false);

//   const selectedCategory = ref("");

//   const fetchProvider = async (slug) => {
//     loading.value = true;
//     error.value = null;
//     try {
//       const response = await providerApi.getOne(slug);
//       provider.value = response.data.data;
//     } catch (err) {
//       error.value = err.message || "Failed to fetch provider";
//     } finally {
//       loading.value = false;
//     }
//   };

//   const fetchProviders = async (url = "/providers") => {
//     loading.value = true;
//     error.value = null;

//     const params = new URLSearchParams();
//     if (selectedCategory.value)
//       params.append("category", selectedCategory.value.name);
//     try {
//       console.log(`${url}?${params.toString()}`);
//       const response = await providerApi.getAll(
//         `${url}${params.toString() ? "?" + params.toString() : ""}`
//       );
//       providers.value = response.data.data;
//       paginationLinks.value = response.data.meta.links || [];
//     } catch (err) {
//       error.value = err.message || "Failed to fetch providers";
//     } finally {
//       loading.value = false;
//     }
//   };

//   const fetchCategories = async () => {
//     loading.value = true;
//     error.value = null;
//     try {
//       const response = await providerApi.getCategories();
//       categories.value = response.data.data;
//     } catch (err) {
//       error.value = err.message || "Failed to fetch categories";
//     } finally {
//       loading.value = false;
//     }
//   };

//   watch(
//     () => selectedCategory.value,
//     () => {
//       fetchProviders();
//     },
//     {
//       deep: true,
//     }
//   );

//   return {
//     provider,
//     providers,
//     paginationLinks,
//     loading,
//     error,
//     fetchProvider,
//     fetchProviders,
//     fetchCategories,
//     selectedCategory,
//     tableView,
//     categories,
//   };
// };

import { ref, watch } from "vue";
import { providerApi } from "@/repositories/providers";

interface Category {
  name: string;
  [key: string]: any;
}

interface Provider {
  // define properties based on your API response structure
  [key: string]: any;
}

export const useProvider = () => {
  const provider = ref<Provider | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const providers = ref<Provider[]>([]);
  const categories = ref<Category[]>([]);
  const paginationLinks = ref<any[]>([]);
  const tableView = ref(false);

  const selectedCategory = ref<Category | null>(null);

  const fetchProvider = async (slug: string) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await providerApi.getOne(slug);
      provider.value = response.data.data;
    } catch (err: unknown) {
      if (err instanceof Error) {
        error.value = err.message;
      } else {
        error.value = "Failed to fetch provider";
      }
    } finally {
      loading.value = false;
    }
  };

  const fetchProviders = async (url = "/providers") => {
    loading.value = true;
    error.value = null;

    const params = new URLSearchParams();
    if (selectedCategory.value?.name) {
      params.append("category", selectedCategory.value.name);
    }

    try {
      console.log(`${url}?${params.toString()}`);
      const response = await providerApi.getAll(
        `${url}${params.toString() ? "?" + params.toString() : ""}`
      );
      providers.value = response.data.data;
      paginationLinks.value = response.data.meta.links || [];
    } catch (err: unknown) {
      if (err instanceof Error) {
        error.value = err.message;
      } else {
        error.value = "Failed to fetch providers";
      }
    } finally {
      loading.value = false;
    }
  };

  const fetchCategories = async () => {
    loading.value = true;
    error.value = null;
    try {
      const response = await providerApi.getCategories();
      categories.value = response.data.data;
    } catch (err: unknown) {
      if (err instanceof Error) {
        error.value = err.message;
      } else {
        error.value = "Failed to fetch categories";
      }
    } finally {
      loading.value = false;
    }
  };

  watch(
    () => selectedCategory.value,
    () => {
      fetchProviders();
    },
    {
      deep: true,
    }
  );

  return {
    provider,
    providers,
    paginationLinks,
    loading,
    error,
    fetchProvider,
    fetchProviders,
    fetchCategories,
    selectedCategory,
    tableView,
    categories,
  };
};
