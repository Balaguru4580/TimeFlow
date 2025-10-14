<script lang="ts">
	import { rewardStore } from "../store";
	import { onMount } from "svelte";
	import { TagsInput, Toaster, createToaster } from "@skeletonlabs/skeleton-svelte";
	import { goto } from '$app/navigation';

    const apiURL = import.meta.env.VITE_API_URL;

    // console.log("Vite API URL ", apiURL);

	const toaster = createToaster();

	let smallRewards = $state<string[]>([]);
	let bigRewards = $state<string[]>([]);
	let smallRewardInterval = $state(0);
	let bigRewardInterval = $state(0);
	let userEmail = $state('');

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
		console.log("postData triggered!", allData);
		try {
			const response = await fetch(apiURL+"/clock", {
				method: "POST", //This should be update actually
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(allData),
			});
			console.log("postData response", response);
			toaster.success({
				title: 'Settings saved successfully'
			});
		} catch (err) {
			console.log("postData error", err);
			toaster.error({
				title: 'Failed to save settings'
			});
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

	const goBack = () => {
        goto('/'); 
    };

</script>

<Toaster {toaster}></Toaster>
<div class="min-h-screen bg-gradient-to-b from-indigo-950 to-slate-900 text-white p-6">
    <div class="max-w-3xl mx-auto">

        <header class="flex justify-between items-center mb-10">
            <button onclick={goBack} 
                    class="btn btn-sm bg-indigo-800 hover:bg-indigo-700 text-white transition-all duration-200 rounded-lg px-4 py-2">
                ← Back
            </button>
            <h1 class="text-4xl font-bold text-center text-white">Settings</h1>
            <div class="w-16"></div>
        </header>
        
        <section class="mb-10 rounded-xl bg-indigo-900/30 p-6 backdrop-blur-sm shadow-lg">
            <h2 class="text-2xl font-semibold mb-4 text-indigo-200">Big Rewards</h2>
            
            <TagsInput
                value={bigRewards}
                onValueChange={(e) => (bigRewards = e.value)}
                placeholder="Enter activities..."
                tagClasses="bg-indigo-700 text-white rounded-md py-1 px-3 m-1 shadow-sm"
                inputClasses="bg-transparent text-white p-3 w-full focus:outline-none placeholder:text-indigo-300/70"
            />
            
            <div class="mt-8">
                <h3 class="text-xl font-medium mb-4 text-indigo-200">When should the big rewards happen?</h3>
                <div class="flex items-center gap-3">
                    <span class="text-indigo-300">Every</span>
                    <input 
                        type="number" 
                        value={bigRewardInterval} 
                        oninput={(e) => (bigRewardInterval = Number(e.currentTarget.value))}
                        class="w-20 bg-indigo-950/70 text-white text-center rounded-lg p-2 border border-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    />
                    <span class="text-indigo-300">Minutes</span>
                    <button 
                        class="btn ml-auto bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2 rounded-lg transition-all duration-200 font-medium shadow-md hover:shadow-lg"
                        onclick={updateStore}>
                        Save
                    </button>
                </div>
            </div>
        </section>
        
        <section class="mb-10 rounded-xl bg-indigo-900/30 p-6 backdrop-blur-sm shadow-lg">
            <h2 class="text-2xl font-semibold mb-4 text-indigo-200">Small Rewards</h2>
            
            <TagsInput
                value={smallRewards}
                onValueChange={(e) => (smallRewards = e.value)}
                placeholder="Enter activities..."
                tagClasses="bg-indigo-700 text-white rounded-md py-1 px-3 m-1 shadow-sm"
                inputClasses="bg-transparent text-white p-3 w-full focus:outline-none placeholder:text-indigo-300/70"
            />
            
            <div class="mt-8">
                <h3 class="text-xl font-medium mb-4 text-indigo-200">When should the small rewards happen?</h3>
                <div class="flex items-center gap-3">
                    <span class="text-indigo-300">Every</span>
                    <input 
                        type="number" 
                        value={smallRewardInterval} 
                        oninput={(e) => (smallRewardInterval = Number(e.currentTarget.value))}
                        class="w-20 bg-indigo-950/70 text-white text-center rounded-lg p-2 border border-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    />
                    <span class="text-indigo-300">Minutes</span>
                    <button 
                        class="btn ml-auto bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2 rounded-lg transition-all duration-200 font-medium shadow-md hover:shadow-lg"
                        onclick={updateStore}>
                        Save
                    </button>
                </div>
            </div>
        </section>
        
        <footer class="text-center text-indigo-300/60 text-sm">
            Timeflow • Stay productive with rewarding breaks
        </footer>
    </div>
</div>
