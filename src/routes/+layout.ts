import posthog from 'posthog-js';
import { browser } from '$app/environment';

export const load = async () => {
	if (browser) {
		posthog.init('phc_j1sPADK2Iw8VHpEo6EDpnwn3hxVms9BSUDljNrYdlZt', {
			api_host: 'https://pineapple-flucks.yutools.com', // this thing is in cloudflare :D
			ui_host: 'https://us.posthog.com',
			person_profiles: 'always'
		});
	}
	return;
};
