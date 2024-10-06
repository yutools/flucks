<script lang="ts">
	import { fade } from 'svelte/transition';

	let isLoading = false;
	let data: any = null;
	let inputValue = '';

	async function generateImage() {
		if (isLoading || !inputValue.trim()) return;
		isLoading = true;

		try {
			const response = await fetch('/api', {
				method: 'POST',
				body: JSON.stringify({ prompt: inputValue }),
				headers: {
					'Content-Type': 'application/json'
				}
			});

			data = await response.json();
			data.url = data.url || '';
		} catch (error) {
			console.error('Error generating image:', error);
		} finally {
			isLoading = false;
		}
	}

	function handleKeyDown(e: KeyboardEvent & { currentTarget: HTMLInputElement }) {
		if (e.key === 'Enter') {
			e.currentTarget.blur();
			generateImage();
		}
	}
</script>

<div class="flex min-h-screen flex-col bg-gray-900 p-6 text-orange-200">
	<div class="mx-auto w-full max-w-7xl flex-grow">
		<header class="mb-6 text-center">
			<h1 class="mb-1 text-4xl font-bold text-orange-300">Flucks 🕊️</h1>
			<p class="text-sm">AI-Powered Image Generation Tool</p>
		</header>

		<main class="flex flex-col items-center gap-6 lg:flex-row lg:items-start">
			<div class="w-full space-y-6 lg:w-1/2">
				<div class="rounded-lg bg-gray-800/50 p-4 text-sm">
					<h2 class="mb-2 font-semibold">How to use:</h2>
					<ol class="list-inside list-decimal space-y-1 text-xs">
						<li>Describe the image you want to generate</li>
						<li>Click 'Generate' or press Enter</li>
						<li>Wait for the AI to work its magic!</li>
					</ol>
				</div>

				<div class="flex w-full gap-2">
					<input
						type="text"
						bind:value={inputValue}
						on:keydown={handleKeyDown}
						class="flex-grow rounded-lg border-2 border-orange-400 bg-gray-800 p-3 text-orange-100 placeholder-orange-300/50 transition duration-200 ease-in-out focus:border-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-300/50"
						placeholder="Describe your image here..."
					/>
					<button
						on:click={generateImage}
						disabled={isLoading}
						class="rounded-lg bg-orange-400 px-4 py-2 text-gray-900 transition duration-200 ease-in-out hover:bg-orange-300 disabled:opacity-50"
					>
						Generate
					</button>
				</div>
			</div>

			<div class="w-full lg:w-1/2">
				<div
					class="relative mx-auto aspect-square w-full max-w-md overflow-hidden rounded-lg border-2 border-orange-400/30 bg-gray-800 shadow-lg transition duration-300 ease-in-out hover:shadow-orange-400/30"
				>
					{#if isLoading}
						<div class="absolute inset-0 flex items-center justify-center bg-gray-800">
							<svg
								class="h-8 w-8 animate-spin text-orange-400"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
							>
								<circle
									class="opacity-25"
									cx="12"
									cy="12"
									r="10"
									stroke="currentColor"
									stroke-width="4"
								/>
								<path
									class="opacity-75"
									fill="currentColor"
									d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
								/>
							</svg>
						</div>
					{:else if data && data.url}
						<img
							class="absolute inset-0 h-full w-full object-cover"
							src={data.url}
							alt={inputValue}
							transition:fade
						/>
					{:else}
						<div
							class="absolute inset-0 flex items-center justify-center text-sm text-orange-300/70"
						>
							Your generated image will appear here
						</div>
					{/if}
				</div>

				<div class="mt-4 h-10 text-center">
					{#if data && data.url}
						<a
							href={data.url}
							target="_blank"
							download={inputValue}
							rel="noopener noreferrer"
							class="inline-block rounded-lg bg-orange-400 px-4 py-2 text-gray-900 transition duration-200 ease-in-out hover:bg-orange-300"
							transition:fade
						>
							Download Image
						</a>
					{/if}
				</div>
			</div>
		</main>
	</div>

	<footer class="mt-8 text-center text-xs text-orange-300/50">
		<div class="flex items-center justify-center space-x-2">
			<span>© 2024 YU Tools</span>
			<span>|</span>
			<a
				href="https://github.com/yutools/flucks"
				target="_blank"
				rel="noopener noreferrer"
				class="flex items-center transition-colors hover:text-orange-300"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="16"
					height="16"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					class="mr-1"
				>
					<path
						d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"
					></path>
				</svg>
				Star on GitHub
			</a>
		</div>
		<div class="mt-1">Created with ❤️ by YU Tools Team</div>
	</footer>
</div>
