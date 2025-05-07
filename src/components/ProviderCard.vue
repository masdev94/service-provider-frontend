<script setup>
defineProps({
  provider: {
    type: Object,
    required: true,
  },
});
</script>
<template>
  <router-link :to="`/provider/${provider.slug}`" class="block">
    <div class="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition">
      <img
        v-lazy="provider.logo_url"
        :alt="provider.name"
        class="w-24 h-24 object-contain mb-4 mx-auto"
      />
      <h2 class="text-black text-xl font-semibold mb-2">{{ provider.name }}</h2>
      <p class="text-gray-600">{{ provider.short_description }}</p>
    </div>
  </router-link>
</template>
