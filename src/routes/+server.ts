import { together } from '$lib/together';
import { json } from '@sveltejs/kit';

export async function POST({ request, cookies }) {
	const { prompt } = await request.json();

	const response = await together.images.create({
		model: 'black-forest-labs/FLUX.1-schnell-Free',
		prompt: prompt,
		width: 1440,
		height: 1440,
		steps: 4,
		n: 1
	});

	return json(response.data[0]);
}
