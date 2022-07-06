import { ChildProcess } from 'child_process';

export const random = (qty?: number) => {
	const numRandoms: Array<number> = [];
	const repeatRandom: any = {};
	const quantity: number = qty || 100000000;

	for (let i = 0; i < quantity; i++) {
		const min: number = Math.ceil(1);
		const max: number = Math.floor(1000);
		numRandoms.push(Math.floor(Math.random() * (max - min + 1) + min));
	}

	numRandoms.forEach((e: number) => {
		repeatRandom[e] = (repeatRandom[e] || 0) + 1;
	});

	return repeatRandom;
};

process.on('message', (msg) => {
	if (msg === 'start') {
		const result = random(Number(process.argv[2]));
		if (process.send) {
			process.send(result);
		}
	}
});
