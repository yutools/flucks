import { error, json } from '@sveltejs/kit';
import { together } from '$lib/together';

export async function POST({ request, cookies }) {
	const { prompt } = await request.json();

	const translatedResp = await together.chat.completions.create({
		messages: [
			{
				role: 'system',
				content:
					"You are a translator and profanity filter. Follow these rules:\n1. If the input is not in English, translate it to English.\n2. If the input is already in English, return it as is.\n3. If the input (original or translated) contains profanity or illegal content, return '{NO}'.\n4. Do not add any explanations or extra text. Only return the translation, the original English text, or '{NO}'."
			},
			{
				role: 'user',
				content: `${prompt}`
			}
		],
		model: 'meta-llama/Llama-Vision-Free',
		max_tokens: 512,
		temperature: 0,
		top_p: 0.7,
		top_k: 50,
		repetition_penalty: 1,
		stop: ['<|eot_id|>', '<|eom_id|>']
	});
	const result = translatedResp.choices[0].message?.content;
	if (result === '{NO}') {
		return error(400, 'Content not allowed.');
	}

	const response = await together.images.create({
		model: 'black-forest-labs/FLUX.1-schnell-Free',
		prompt: result ?? prompt,
		width: 1440,
		height: 1440,
		steps: 4,
		n: 1
	});

	return json(response.data[0]);
}
