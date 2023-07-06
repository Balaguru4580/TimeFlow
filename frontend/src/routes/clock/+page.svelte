<script lang="ts">
	import { onMount } from "svelte";
	import Clock from "./clock.svelte";
	import { rewardStore } from "../store";
	const getUserData = async () => {
		const user_email = "user1@gmail.com";
		try {
			const res = await fetch(
				`http://localhost:8000/clock/${user_email}`
			);
			const jsonObj = await res.json();
			if (jsonObj) {
				console.log(jsonObj[0].big_rewards_time);

				rewardStore.update((storeData) => {
					return {
						...storeData,
						bigRewardInterval: jsonObj[0].big_rewards_time,
						smallRewardInterval: jsonObj[0].small_reward_time, //SvelteKit Preload Might be a better option
					};
				});
			}
		} catch (err) {
			console.error(err);
		}
	};

	onMount(() => {
		getUserData();
	});
</script>

<div class="flex flex-col">
	<div class="ml-auto justify-end">
		<a href="/settings" class="btn variant-filled">Settings</a>
	</div>
	<div>
		<Clock />
	</div>
</div>
