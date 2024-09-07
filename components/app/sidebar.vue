<template>
  <div
    class="fixed mt-16 flex flex-col h-screen w-64 bg-white text-black shadow-xl hidden lg:flex space-x-4"
  >
    <!-- Logo Section -->
    <div
      class="flex items-center justify-center h-16 bg-white text-xl font-bold"
    >
      MyApp
    </div>

    <!-- Navigation Links -->
    <nav class="flex-1 px-4 py-2 space-y-2">
      <AppSidebarLink href="/" label="Dashboard" icon="mdi-view-dashboard" />
      <AppSidebarLink href="#" label="Settings" icon="mdi-cog" />
      <AppSidebarLink href="/video" label="Videos" icon="mdi-video" />
      <AppSidebarLink href="/profile" label="Profile" icon="mdi-account" />
      <AppSidebarLink href="#" label="Logout" icon="mdi-logout" />
      <AppSidebarLink href="#" label="Hello" />
    </nav>
  </div>
</template>

<script>
import SidebarLink from "~/components/app/SidebarLink.vue";

export default {
  components: {
    SidebarLink,
  },
};
</script>
