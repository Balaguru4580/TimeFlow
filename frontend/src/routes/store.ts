import { writable } from 'svelte/store';
export const rewardStore = writable({
  SmallRewardList: ['Browse Instagram', 'Watch Youtube', 'Doodle on the Guitar'],
  BigRewardList: ['Long Relax', 'Go Fishing', 'Mcdonalds order']
});
