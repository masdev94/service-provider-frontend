<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";

const route = useRoute();
const provider = ref(null);
const loading = ref(false);
const error = ref(null);

const fetchProvider = async (slug) => {
  loading.value = true;
  error.value = null;
  try {
    const response = await axios.get(
      `http://localhost:8000/api/providers/${slug}`
    );
    provider.value = response.data;
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchProvider(route.params.slug);
});
</script>
<template>
  <div class="container mx-auto py-6">
    <div v-if="loading" class="text-center">Loading...</div>
    <div v-else-if="error" class="text-red-500">{{ error }}</div>
    <div v-else class="bg-white shadow-md rounded-lg p-6">
      <img
        v-lazy="provider?.logo_url"
        :alt="provider?.name"
        class="w-32 h-32 object-contain mb-4"
      />
      <h1 class="text-black text-3xl font-bold mb-4">{{ provider?.name }}</h1>
      <p class="text-black text-lg mb-4">{{ provider?.short_description }}</p>
      <p class="text-gray-600">Category ID: {{ provider?.category_id }}</p>
      <router-link
        to="/providers"
        class="mt-4 inline-block text-blue-600 hover:underline"
      >
        Back to Providers
      </router-link>
    </div>
  </div>
</template>
