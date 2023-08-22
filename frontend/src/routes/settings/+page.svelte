<script lang="ts">
	import { rewardStore } from "../store";
	import { onMount } from "svelte";
	import { Emerald, InputChip } from "@skeletonlabs/skeleton";
	import { afterUpdate } from "svelte";
	let smallRewards: string[];
	let bigRewards: string[];
	let smallRewardInterval: number;
	let bigRewardInterval: number;
	let userEmail: string;
	onMount(() => {
		rewardStore.subscribe((value) => {
			smallRewards = value.smallRewardList;
			bigRewards = value.bigRewardList;
			smallRewardInterval = value.smallRewardInterval;
			bigRewardInterval = value.bigRewardInterval;
			userEmail = value.userEmail;
		});
	});

	const postData = async () => {
		const allData = {
			user_email: userEmail,
			small_reward_time: smallRewardInterval, 
			big_rewards_time: bigRewardInterval,
			small_rewards: smallRewards, 
			big_rewards: bigRewards,
		};
		console.log(allData);
		try {
			const response = await fetch("http://localhost:8000/clock", {
				method: "POST", //This should be update actually
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(allData),
			});
			console.log(response);
		} catch (err) {
			console.log(err);
		}
	};
	function updateStore() {
		rewardStore.update((store) => {
			store.smallRewardList = smallRewards;
			store.bigRewardList = bigRewards;
			store.bigRewardInterval = bigRewardInterval;
			store.smallRewardInterval = smallRewardInterval;
			return store;
		});

		postData();
	}
</script>
<div class="flex flex-col items-center">
	<button on:click={postData} type="button" class="btn variant-soft">Back</button>
</div>
<div class="flex flex-col mx-auto p-8 space-y-8">
	<div class="flex flex-col items-center">
		<h1 class="h1">Settings</h1>
	</div>
	<h2 class="h2 justify-left">Big Rewards</h2>
	<InputChip
		bind:value={bigRewards}
		name="chips"
		placeholder="Enter activities..."
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
