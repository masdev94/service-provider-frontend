<script setup>
import { ref, onMounted, computed } from "vue";
import { useProvider } from "../composables/providers";

const {
  providers,
  paginationLinks,
  loading,
  error,
  fetchProviders,
  selectedCategory,
  fetchCategories,
  categories,
} = useProvider();

onMounted(async () => {
  fetchProviders();
  await fetchCategories();
});
</script>

<template>
  <div class="w-full py-6 px-4 mx-auto max-w-7xl">
    <div class="flex justify-between mb-6 min-w-full w-full">
      <h1 class="text-3xl font-bold text-gray-800">Service Providers</h1>

      <div class="relative inline-block">
        <div class="group">
          <button
            class="flex items-center justify-between w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-w-[200px]"
          >
            <span>{{ selectedCategory.name || "All Categories" }}</span>
            <svg
              class="w-5 h-5 ml-2 -mr-1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
          <div
            class="absolute right-0 z-10 hidden w-full mt-1 origin-top-right bg-white border border-gray-200 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none group-hover:block"
          >
            <div class="py-1 max-h-60 overflow-auto">
              <a
                href="#"
                @click.prevent="selectedCategory = ''"
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                :class="{
                  'bg-blue-100 text-blue-900': selectedCategory === '',
                }"
              >
                All Categories
              </a>
              <a
                v-for="category in categories"
                :key="category"
                href="#"
                @click.prevent="selectedCategory = category"
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                :class="{
                  'bg-blue-100 text-blue-900': selectedCategory === category,
                }"
              >
                {{ category.name }}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="selectedCategory" class="mb-4 flex items-center">
      <span class="text-sm text-gray-600 mr-2">Active filters:</span>
      <div class="flex flex-wrap gap-2">
        <span
          v-if="selectedCategory"
          class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm flex items-center"
        >
          Category: {{ selectedCategory.name }}
          <button
            @click="selectedCategory = ''"
            class="cursor-pointer ml-2 text-blue-800 hover:text-blue-600"
          >
            ✕
          </button>
        </span>
      </div>
    </div>

    <div v-if="loading" class="text-center py-12">
      <div
        class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-500 border-r-transparent"
      ></div>
      <p class="mt-2 text-gray-600">Loading providers...</p>
    </div>

    <div
      v-else-if="error"
      class="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded my-4"
    >
      <p class="font-bold">Error</p>
      <p>{{ error }}</p>
    </div>

    <div
      v-else-if="providers.length === 0"
      class="text-center py-12 text-gray-600"
    >
      <p class="text-lg">No providers found matching your criteria.</p>
      <button @click="clearFilters" class="mt-2 text-blue-500 hover:underline">
        Clear filters
      </button>
    </div>

    <div v-else>
      <div class="overflow-x-auto bg-white rounded-lg shadow">
        <table class="w-full text-left border-collapse">
          <thead class="bg-gray-50">
            <tr>
              <th
                class="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Logo
              </th>
              <th
                class="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Name
              </th>
              <th
                class="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Category
              </th>
              <th
                class="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Description
              </th>
              <th
                class="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
            <tr
              v-for="provider in providers"
              :key="provider?.id"
              class="hover:bg-gray-50"
            >
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="h-10 w-10 flex-shrink-0">
                  <img
                    v-if="provider.logo_url"
                    :src="provider.logo_url"
                    :alt="`${provider.name} logo`"
                    class="h-10 w-10 object-contain"
                  />
                  <div
                    v-else
                    class="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500"
                  >
                    {{ provider.name.charAt(0) }}
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                {{ provider.name }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  v-if="provider.category?.name"
                  class="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800"
                >
                  {{ provider.category.name }}
                </span>
              </td>
              <td class="px-6 py-4 max-w-xs">
                <p class="text-sm text-gray-500 truncate">
                  {{ provider.short_description || "-" }}
                </p>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm">
                <router-link
                  :to="`/provider/${provider.slug}`"
                  class="text-blue-600 hover:text-blue-900 font-medium"
                >
                  View Details
                </router-link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div
        v-if="paginationLinks && paginationLinks.length > 3"
        class="mt-6 flex justify-center"
      >
        <nav class="flex items-center space-x-1">
          <button
            v-for="link in paginationLinks"
            :key="link.label"
            :disabled="!link.url || link.active"
            @click="fetchProviders(link.url)"
            class="px-3 py-2 rounded text-sm font-medium"
            :class="{
              'bg-blue-600 text-white': link.active,
              'text-gray-500 bg-gray-100': !link.url,
              'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300':
                link.url && !link.active,
            }"
            v-html="link.label"
          ></button>
        </nav>
      </div>
    </div>
  </div>
</template>
