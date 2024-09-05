<template>
  <button
    @click="toggleTheme"
    class="p-2 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 transition-colors duration-300 ease-in-out"
    aria-label="Toggle Dark Mode"
  >
    <div v-if="isDarkMode" class="flex items-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6 text-yellow-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M12 3v1m0 16v1m-7.071-7.071H4m16 0h-1m-3.536 3.536l-.707-.707M7.05 7.05l-.707-.707m10.607 10.607l-.707-.707M7.05 16.95l-.707-.707M12 5a7 7 0 100 14 7 7 0 000-14z"
        />
      </svg>
      <span class="ml-2 text-sm text-gray-700 dark:text-gray-300"
        >Light Mode</span
      >
    </div>
    <div v-else class="flex items-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6 text-blue-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z"
        />
      </svg>
      <span class="ml-2 text-sm text-gray-700 dark:text-gray-300"
        >Dark Mode</span
      >
    </div>
  </button>
</template>

<script setup>
import { ref, onMounted } from "vue";

// Reactive variable to track the current theme
const isDarkMode = ref(false);

// Function to toggle the theme
const toggleTheme = () => {
  isDarkMode.value = !isDarkMode.value;
  document.documentElement.classList.toggle("dark", isDarkMode.value);
  localStorage.setItem("theme", isDarkMode.value ? "dark" : "light");
};

// Check localStorage for saved theme preference on mount
onMounted(() => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    isDarkMode.value = savedTheme === "dark";
    document.documentElement.classList.toggle("dark", isDarkMode.value);
  }
});
</script>

<style scoped>
/* You can add specific styles if needed */
</style>
