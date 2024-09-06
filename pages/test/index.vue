<template>
  <div>
    <h1>Name is {{ userStore.user.name }}</h1>
    <Input v-model="inputName" placeholder="Enter your name" />
    <Button @click="handleSubmit">Submit</Button>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useUserStore } from "~/stores/user";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { test } from "~/stores/test";
const inputName = ref("");
const userStore = useUserStore();
const handleSubmit = () => {
  userStore.changeName(inputName.value);
  inputName.value = "";
};
</script>

<style></style>
