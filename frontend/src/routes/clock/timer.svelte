<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	let sec = 5;
	export let min: number;
	// let hr = 0; //unused but still available
	let timer: any;
	let isPaused = false;

	const dispatch = createEventDispatcher();

	const decrementTime = () => {
		if (!isPaused) {
			sec--;

			if (sec === 0) {
				sec = 60;
				min--;
			}

			if (min <= -1) {
				min = 0;
				sec = 0;
				clearInterval(timer);
				dispatch('timerComplete');
			}
		}
	};
	const startTimer = () => {
		if (min !== undefined) {
			timer = setInterval(decrementTime, 1000);
		}
	};
	$: {
		if (min !== undefined) {
			startTimer();
		}
	}
</script>

{#if min !== undefined}
	<h1 class="h1">{min} Minutes and {sec} Seconds Left</h1>
{/if}
