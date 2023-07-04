<script lang="ts">
	import Timer from './timer.svelte';
	import { createEventDispatcher } from 'svelte';
	import { rewardStore } from '../store';

	export let rewardType: string;
	let timeDuration: number;
	let rewardName: string;
	let SmallRewardList = [''];
	let BigRewardList = [''];

	rewardStore.subscribe((value) => {
		SmallRewardList = value.SmallRewardList;
		BigRewardList = value.BigRewardList;
	})

	if (rewardType == 'big') {
		rewardName = 'Big';
	} else {
		rewardName = 'Small';
	}


	

	let output = '';

	const dispatch = createEventDispatcher();

	const randomizer = () => {
		if (rewardType === 'small') {
			const rand = Math.floor(Math.random() * SmallRewardList.length);
			output = SmallRewardList[rand];
			timeDuration = 5;
		} else if (rewardType === 'big') {
			const rand = Math.floor(Math.random() * BigRewardList.length);
			output = BigRewardList[rand];
			timeDuration = 0;
		}
	};

	const rewardStop = () => {
		dispatch('rewardComplete');
	};
</script>

<div class="flex flex-col justify-center h-screen items-center mx-auto p-8 space-y-8">
	<h1 class="h1">{rewardName} Reward Time!</h1>
	<div>
		<Timer min={timeDuration} on:timerComplete={rewardStop} />
	</div>

	<button type="button" class="btn variant-filled" disabled={(output != '')} on:click={randomizer}>Start</button>

	{#if output !== ''}
		<h3 class="h3">Your {rewardName} Reward is</h3>
		<h1 class="flex flex-col items-center p-2">{output}</h1>
	{/if}
</div>
