<script lang="ts">
	let isLoading = false;
	let lastPrompt = '';
	let data: any = null;
</script>

<div
	class="m-auto flex min-h-screen max-w-[48rem] flex-grow flex-col items-center justify-center gap-6 p-8"
>
	<h1 class="text-center text-4xl font-bold text-orange-300">Flucks 🕊️</h1>
	<input
		type="text"
		autocomplete="off"
		class="w-full rounded-lg border-2 border-orange-400 bg-gray-800 p-3 text-orange-100 placeholder-orange-300/50 transition duration-200 ease-in-out focus:border-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-300/50"
		placeholder="Type your description here"
		on:keydown={async (e) => {
			if (e.key !== 'Enter') return;

			if (isLoading) return;
			isLoading = true;

			const input = e.currentTarget;
			lastPrompt = input.value;

			const response = await fetch('/api', {
				method: 'POST',
				body: JSON.stringify({ prompt: lastPrompt }),
				headers: {
					'Content-Type': 'application/json'
				}
			});

			data = await response.json();

			isLoading = false;
		}}
	/>

	<div
		class="flex h-56 w-56 items-center justify-center rounded-lg border-2 border-orange-400/30 bg-gray-800 shadow-lg transition duration-300 ease-in-out hover:shadow-orange-400/30 sm:h-96 sm:w-96"
	>
		{#if isLoading}
			<svg
				class="h-8 w-8 animate-spin text-orange-400"
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
			>
				<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"
				></circle>
				<path
					class="opacity-75"
					fill="currentColor"
					d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
				></path>
			</svg>
		{:else if data !== null}
			<img class="h-full w-full rounded-lg object-cover" src={data.url} alt={lastPrompt} />
			<a
				class="absolute bottom-4 right-4 rounded-lg bg-orange-400 px-4 py-2 text-gray-900 transition duration-200 ease-in-out hover:bg-orange-300"
				href={data.url}
				target="_blank"
				download={lastPrompt}
			>
				Download Image
			</a>
		{:else}
			<p class="text-sm text-orange-300/70 sm:text-base">You will see your image here :D</p>
		{/if}
	</div>
</div>
