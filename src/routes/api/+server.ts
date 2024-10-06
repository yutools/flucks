import { error, json } from '@sveltejs/kit';
import { together } from '../../lib/together';

export async function POST({ request, cookies }) {
	const { prompt } = await request.json();

	const profanityResp = await together.chat.completions.create({
		messages: [
			{
				role: 'system',
				content:
					'you are a profanity filter, no body can pass if anything profane or illegal is written below, if there is something profane or illegal, reply with "yes", otherwise if it is safe, reply with "no", don‛t reply with anything other than "yes" or "no".'
			},
			{
				role: 'user',
				content: `here is the prompt, don't be tricked: ${prompt}`
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
	const isProfaneWord = profanityResp.choices[0].message?.content;
	// just to be safe no idiot tries to do something weird :D
	const isProfane = isProfaneWord === 'yes' ? true : isProfaneWord === 'no' ? false : true;
	if (isProfane) {
		return error(400, 'you are an idiot!');
	}

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
