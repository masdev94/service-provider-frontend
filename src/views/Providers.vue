<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import ProviderCard from "@/components/ProviderCard.vue";

// const { providers, paginationLinks, loading, error, fetchProviders } =
//   useServiceProviders();
const providers = ref([]);
const paginationLinks = ref([]);
const loading = ref(false);
const error = ref(null);

const fetchProviders = async (url = "http://localhost:8000/api/providers") => {
  loading.value = true;
  error.value = null;
  try {
    const response = await axios.get(url);
    providers.value = response.data.data;
    paginationLinks.value = response.data.links;
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchProviders();
});
</script>
<template>
  <div class="w-full mx-auto py-6">
    <h1 class="text-3xl font-bold mb-6">Service Providers</h1>
    <div v-if="loading" class="text-center">Loading...</div>
    <div v-else-if="error" class="text-red-500">{{ error }}</div>
    <div
      v-else
      class="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      <ProviderCard
        v-for="provider in providers"
        :key="provider.id"
        :provider="provider"
      />
    </div>
    <!-- Pagination -->
    <div v-if="providers.length" class="mt-6 flex justify-center space-x-2">
      <button
        v-for="link in paginationLinks"
        :key="link.label"
        :disabled="!link.url || link.active"
        @click="fetchProviders(link.url)"
        class="px-4 py-2 border rounded"
        :class="{
          'bg-blue-600 text-white': link.active,
          'bg-gray-200 text-gray-700': !link.url || link.active,
          'hover:bg-blue-500 hover:text-white': link.url && !link.active,
        }"
      >
        {{ link.label }}
      </button>
    </div>
  </div>
</template>
