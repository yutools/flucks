<script lang="ts">
	let isLoading = false;
	let lastPrompt = '';
	let data: any = null;
</script>

<h1>Flucks</h1>
<input
	type="text"
	autocomplete="off"
	on:keydown={async (e) => {
		if (e.key !== 'Enter') return;

		if (isLoading) return;
		isLoading = true;

		const input = e.currentTarget;
		lastPrompt = input.value;

		const response = await fetch('/', {
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

{#if data !== null}
	<img src={data.url} alt={lastPrompt} />
{/if}
