<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useProvider } from "../composables/providers";

const route = useRoute();
const router = useRouter();
const { provider, loading, error, fetchProvider } = useProvider();
const activeTab = ref("overview");

onMounted(async () => {
  await fetchProvider(route.params.slug);
});

const goBack = () => {
  router.push("/");
};

const tabs = [
  { id: "overview", label: "Overview" },
  { id: "description", label: "Description" },
  { id: "contact", label: "Contact" },
];
</script>

<template>
  <div class="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
    <!-- Loading and error states -->
    <div v-if="loading" class="flex justify-center items-center h-64">
      <div
        class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-500 border-r-transparent"
      ></div>
      <p class="ml-3 text-gray-600">Loading provider details...</p>
    </div>

    <div
      v-else-if="error"
      class="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded my-4"
    >
      <p class="font-bold">Error</p>
      <p>{{ error }}</p>
      <button
        @click="goBack"
        class="mt-4 cursor-pointer text-blue-600 hover:underline"
      >
        Return to providers list
      </button>
    </div>

    <!-- Provider Details -->
    <div v-else>
      <!-- Back navigation -->
      <div class="mb-6">
        <button
          @click="goBack"
          class="cursor-pointer flex items-center text-blue-600 hover:text-blue-800 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 mr-1"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
              clip-rule="evenodd"
            />
          </svg>
          Back to Providers
        </button>
      </div>

      <!-- Provider header -->
      <div class="bg-white shadow-lg rounded-lg overflow-hidden mb-8">
        <div class="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4">
          <div class="flex flex-col md:flex-row items-start md:items-center">
            <div class="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
              <div
                class="h-32 w-32 bg-white rounded-lg shadow-sm p-3 flex items-center justify-center"
              >
                <img
                  v-if="provider?.logo_url"
                  :src="provider?.logo_url"
                  :alt="provider?.name"
                  class="max-h-full max-w-full object-contain"
                />
                <div
                  v-else
                  class="h-full w-full flex items-center justify-center text-4xl font-bold text-gray-300"
                >
                  {{ provider?.name?.charAt(0) }}
                </div>
              </div>
            </div>

            <div class="flex-1">
              <div
                class="flex flex-col md:flex-row md:items-center justify-between"
              >
                <div>
                  <h1 class="text-3xl font-bold text-gray-900">
                    {{ provider?.name }}
                  </h1>
                  <p class="text-lg text-gray-600 mt-1">
                    {{ provider?.short_description }}
                  </p>
                </div>

                <div class="mt-4 md:mt-0">
                  <span
                    class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                  >
                    {{ provider?.category?.name }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Tabs -->
        <div class="border-b border-gray-200">
          <nav class="flex -mb-px">
            <button
              v-for="tab in tabs"
              :key="tab.id"
              @click="activeTab = tab.id"
              class="py-4 px-6 font-medium text-sm border-b-2 focus:outline-none transition-colors duration-200"
              :class="[
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
              ]"
            >
              {{ tab.label }}
            </button>
          </nav>
        </div>

        <!-- Tab content -->
        <div class="p-6">
          <!-- Overview Tab -->
          <div v-if="activeTab === 'overview'" class="space-y-6">
            <div>
              <h2 class="text-lg font-semibold text-gray-900 mb-2">About</h2>
              <p class="text-gray-700 whitespace-pre-line">
                {{ provider?.description }}
              </p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="bg-gray-50 p-4 rounded-lg">
                <h3 class="text-md font-medium text-gray-900 mb-2">
                  Provider Information
                </h3>
                <ul class="space-y-2">
                  <li class="flex justify-between">
                    <span class="text-gray-600">Slug</span>
                    <span class="font-medium text-gray-900">{{
                      provider?.slug
                    }}</span>
                  </li>
                  <li class="flex justify-between">
                    <span class="text-gray-600">Category</span>
                    <span class="font-medium text-gray-900">{{
                      provider?.category?.name
                    }}</span>
                  </li>
                  <li class="flex justify-between">
                    <span class="text-gray-600">Created:</span>
                    <span class="font-medium text-gray-900">{{
                      new Date(provider?.created_at).toLocaleDateString()
                    }}</span>
                  </li>
                </ul>
              </div>

              <div class="bg-gray-50 p-4 rounded-lg">
                <h3 class="text-md font-medium text-gray-900 mb-2">
                  Category Details
                </h3>
                <ul class="space-y-2">
                  <li class="flex justify-between">
                    <span class="text-gray-600">Category ID</span>
                    <span class="font-medium text-gray-900">{{
                      provider?.category?.id
                    }}</span>
                  </li>
                  <li class="flex justify-between">
                    <span class="text-gray-600">Category Name</span>
                    <span class="font-medium text-gray-900">{{
                      provider?.category?.name
                    }}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <!-- Description Tab -->
          <div v-else-if="activeTab === 'description'" class="prose max-w-none">
            <h2 class="text-lg font-semibold text-gray-900 mb-2">
              Full Description
            </h2>
            <div class="bg-white p-4 rounded-lg border border-gray-200">
              <p class="text-gray-700 whitespace-pre-line">
                {{
                  provider?.description || "No detailed description available."
                }}
              </p>
            </div>
          </div>

          <!-- Contact Tab -->
          <div v-else-if="activeTab === 'contact'" class="space-y-6">
            <div class="bg-white p-6 rounded-lg border border-gray-200">
              <h2 class="text-lg font-semibold text-gray-900 mb-4">
                Contact Information
              </h2>

              <div class="space-y-4">
                <p class="text-gray-600">
                  Contact information for this provider is not available.
                </p>

                <!-- Placeholder for contact form or information -->
                <div class="mt-6 flex space-x-4">
                  <button
                    class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    Contact Provider
                  </button>
                  <button
                    class="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-lg transition-colors"
                  >
                    Visit Website
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
