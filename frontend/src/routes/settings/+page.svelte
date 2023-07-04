<script lang="ts">
	import { rewardStore } from '../store';
	import { onMount } from 'svelte';
	import { InputChip } from '@skeletonlabs/skeleton';
	import { afterUpdate } from 'svelte';
	let smallRewards: string[];
	let bigRewards: string[];
	onMount(() => {
		rewardStore.subscribe((value) => {
			smallRewards = value.SmallRewardList;
			bigRewards = value.BigRewardList;
		});
	});
	function updateStore() {
		rewardStore.update((store) => {
			store.SmallRewardList = smallRewards;
			return store;
		});
	}
	afterUpdate(updateStore);
</script>

<div class="flex flex-col mx-auto p-8 space-y-8">
	<div class="flex flex-col items-center">
		<h1 class="h1">Settings</h1>
	</div>
	<h2 class="h2 justify-left">Big Rewards</h2>
	<InputChip
		bind:value={bigRewards}
		name="chips"
		placeholder="Enter activities..."
		on:change={updateStore}
	/>
	<h2 class="h2 justify-left">When should the big rewards happen?</h2>
	<div class="flex flex-row">
		<p>Every</p>
		<input class="input" />
		<p>Minutes</p>
		<button class="btn variant-filled">Set</button>
	</div>
	<h2 class="h2 justify-left">Small Rewards</h2>
	<InputChip
		bind:value={smallRewards}
		name="chips"
		placeholder="Enter activities..."
		on:change={updateStore}
	/>
	<h2 class="h2 justify-left">When should the small rewards happen?</h2>
	<div class="flex flex-row">
		<p>Every</p>
		<input class="input" />
		<p>Minutes</p>
		<button class="btn variant-filled">Set</button>
	</div>
</div>