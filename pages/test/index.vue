<template>
  <div>
    <p>Count: {{ counterStore.count }}</p>
    <p>Double Count: {{ counterStore.doubleCount }}</p>
    <button @click="incrementCount">Increment</button>
  </div>
</template>

<script lang="ts" setup>
import { useCounterStore } from "@/stores/counter";
const counterStore = useCounterStore();
function incrementCount() {
  counterStore.increment();
}
</script>

<style></style>
