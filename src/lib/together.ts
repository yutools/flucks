import { env } from '$env/dynamic/private';
import Together from 'together-ai';

export const together = new Together({ apiKey: env.TOGETHER_API_KEY });
