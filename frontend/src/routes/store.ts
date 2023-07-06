import { onMount } from 'svelte';
import { writable } from 'svelte/store';



export const rewardStore = writable({
  smallRewardList: ['Browse Instagram', 'Watch Youtube', 'Doodle on the Guitar'],
  bigRewardList: ['Long Relax', 'Go Fishing', 'Mcdonalds order'],
  smallRewardInterval: 15,
  bigRewardInterval: 55,
});
