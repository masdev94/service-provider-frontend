<template>
  <div class="flex flex-col min-h-screen">
    <!-- Header -->
    <header class="text-white bg-blue-600 shadow">
      <div class="container px-4 py-4 mx-auto">
        <div class="flex items-center justify-between">
          <h1 class="text-xl font-bold">Service Provider Directory</h1>
          <nav>
            <router-link to="/" class="mr-4 hover:underline">Home</router-link>
            <router-link to="/providers" class="hover:underline"
              >Providers</router-link
            >
          </nav>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="container flex-1 px-4 py-6 mx-auto">
      <slot></slot>
    </main>

    <!-- Footer -->
    <footer class="bg-gray-100 border-t">
      <div class="container px-4 py-4 mx-auto text-center text-gray-600">
        Service Provider Directory &copy; 2025
      </div>
    </footer>
  </div>
</template>
