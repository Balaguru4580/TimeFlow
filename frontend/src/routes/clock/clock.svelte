<script lang="ts">
	import Reward from './reward.svelte';

	let sec = 0;
	let min: number = 0;
	let hr = 0;
	let timer: any;
	let isRunning = false;
	let isPaused = false;
	let rewardFlag: string = '';

	const incrementTime = () => {
		if (!isPaused) {
			sec++;

			if (sec === 60) {
				sec = 0;
				min++;

				if (min === 60) {
					min = 0;
					hr++;
				}
			}
		}
	};

	const startTimer = () => {
		if (!isRunning) {
			timer = setInterval(incrementTime, 1000);
			isRunning = true;
		}
	};

	const stopTimer = () => {
		if (isRunning) {
			clearInterval(timer);
			isRunning = false;
			isPaused = false;
			[hr, min, sec] = [0, 0, 0];
		}
	};

	const pauseResumeTimer = () => {
		if (isRunning) {
			if (isPaused) {
				//Resume behaviour by setting new setInterval
				timer = setInterval(incrementTime, 1000);
				isPaused = false;
			} else {
				clearInterval(timer); // Pause Behaviour
				isPaused = true;
			}
		}
	};

	const smallReward = () => {
		pauseResumeTimer();
		rewardFlag = 'small';
	};

	const bigReward = () => {
		pauseResumeTimer();
		rewardFlag = 'big';
	};

	const debug = () => {
		sec = 59;
		min = 59;
		hr = 1;
	};

	const rewardComplete = () => {
		rewardFlag = '';
		pauseResumeTimer();
	}

	$: {
		if (min === 30 && min > 0) {
			smallReward();
		}
		if (hr > 0 && sec == 0 && min == 0) {
			bigReward();
		}
	}
</script>
{#if rewardFlag == ''}
	<div class="flex flex-col justify-center h-screen">
		<div class="items-center mx-auto space-y-8">
			<h1 class="h1">{hr} Hours, {min} Minutes, {sec} Seconds</h1>
			<section>
				<button type="button" class="btn variant-filled" on:click={startTimer} disabled={isRunning}
					>Start</button
				>
				<button type="button" class="btn variant-filled" on:click={pauseResumeTimer} disabled={!isRunning}
					>Pause</button
				>
				<button type="button" class="btn variant-filled" on:click={stopTimer} disabled={!isRunning}
					>Stop</button
				>
				<button on:click={debug}>Perform Debug Action</button>
			</section>
		</div>
	</div>
{:else}
	<Reward rewardType={rewardFlag} on:rewardComplete={rewardComplete} />
{/if}