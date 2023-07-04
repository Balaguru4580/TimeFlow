<script lang="ts">
	import { Stepper, Step } from '@skeletonlabs/skeleton';
	function onCompleteHandler(e: Event): void {
		window.location.href = '/clock';
	}
</script>

<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	</head>

	<body>
		<div class="flex flex-col p-8 space-y-10">
			<div class="flex flex-col space-y-8 items-center">
				<h1 class="h1">TimeFlow</h1>
                <h3 class="h3">Reward Based Pomodoro</h3>
			</div>
			<p>
				Doing something for a long time like Studying? Improve your efficiency and make it fun with
				TimeFlow
			</p>
			<div class="space-y-8">
				<h3 class="h3">Here's how it works!</h3>
				<Stepper on:complete={onCompleteHandler}>
					<Step>
						<svelte:fragment slot="header">Start Timer</svelte:fragment>
						Start the timer and begin your study session.
					</Step>
					<Step>
						<svelte:fragment slot="header">Small Reward!</svelte:fragment>
						After a small interval passes, you can take a small break and enjoy a small activity!
					</Step>
					<Step>
						<svelte:fragment slot="header">Continue Time</svelte:fragment>
						At the end of each interval, the timer continues and you can continue to work.
					</Step>
					<Step>
						<svelte:fragment slot="header">Big Reward!</svelte:fragment>
						Once a big interval passes, you can take a big break with a big activity!
					</Step>
					<Step>
						<svelte:fragment slot="header">Rinse and Repeat</svelte:fragment>
						This process can be done for as long as you want! If everything's clear, let's get started!
					</Step>
				</Stepper>
			</div>
		</div>
		<div class="fixed bottom-0 right-0 mb-4 mr-4">
			<a href="https://github.com/Balaguru4580/SkinnerFlow" target="_blank">
				Check this project out on Github!
			</a>
		</div>
	</body>
</html>
