<script lang="ts">
	import { rewardStore } from "../store";
	import { onMount } from "svelte";
	import { InputChip } from "@skeletonlabs/skeleton";
	import { afterUpdate } from "svelte";
	let smallRewards: string[];
	let bigRewards: string[];
	let smallRewardInterval: number;
	let bigRewardInterval: number;
	onMount(() => {
		rewardStore.subscribe((value) => {
			smallRewards = value.smallRewardList;
			bigRewards = value.bigRewardList;
			smallRewardInterval = value.smallRewardInterval;
			bigRewardInterval = value.bigRewardInterval;
		});
	});
	function updateStore() {
		rewardStore.update((store) => {
			store.smallRewardList = smallRewards;
			store.bigRewardList = bigRewards;
			store.bigRewardInterval = bigRewardInterval;
			store.smallRewardInterval = smallRewardInterval;
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
	<hr />
	<h2 class="h2 justify-left">When should the big rewards happen?</h2>
	<div class="flex flex-row space-x-2 items-center">
		<p>Every</p>
		<input class="input w-auto" bind:value={bigRewardInterval} />
		<p>Minutes</p>
		<button class="btn variant-filled" on:click={updateStore}>Set</button>
	</div>
	<hr />
	<h2 class="h2 justify-left">Small Rewards</h2>
	<InputChip
		bind:value={smallRewards}
		name="chips"
		placeholder="Enter activities..."
		on:change={updateStore}
	/>
	<hr />
	<h2 class="h2 justify-left">When should the small rewards happen?</h2>
	<div class="flex flex-row space-x-2 items-center">
		<p>Every</p>
		<input class="input w-auto" bind:value={smallRewardInterval} />
		<p>Minutes</p>
		<button class="btn variant-filled" on:click={updateStore}>Set</button>
	</div>
</div>
