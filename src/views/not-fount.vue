<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="text-center">
      <h1 class="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <h2 class="text-2xl text-gray-600 mb-6">Page Not Found</h2>
      <p class="text-gray-500 mb-8">
        The page you are looking for might have been removed, had its name changed, or is
        temporarily unavailable.
      </p>
      <router-link
        to="/"
        class="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition duration-300"
      >
        Go to Home
      </router-link>
    </div>
  </div>
</template>
