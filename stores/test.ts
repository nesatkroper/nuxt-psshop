import { defineStore } from "pinia";

export const useMyNameStore = defineStore({
  id: "myNameStore",
  state: () => ({}),
  actions: {},
});

export let test = "myNameStore";
