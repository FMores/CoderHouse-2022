import { DenonConfig } from 'https://deno.land/x/denon@2.5.0/mod.ts';

const config: DenonConfig = {
	scripts: {
		start: {
			cmd: 'deno run --allow-read --allow-net index.ts',
			desc: 'run my index.ts file',
		},
	},
};

export default config;
