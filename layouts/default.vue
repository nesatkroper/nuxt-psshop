<template>
  <div>
    <AppHeader />
    <div class="flex flex-col">
      <AppSidebar />
      <div class="my-16 lg:ms-64 ms-0">
        <slot />
      </div>
    </div>
    <AppFooter />
  </div>
</template>

<script lang="ts" setup></script>

<style></style>
