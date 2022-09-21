/**
 * ESTE PROYECTO FUE INICIADO CON "denon --init typescript"
 * Para instalar denon = deno install -qAf --unstable https://deno.land/x/denon/denon.ts
 * Te crea un objeto similar a este:
 * {
  "$schema": "https://deno.land/x/denon@2.4.7/schema.json",
  "scripts": {
    "start": {
      "cmd": "deno run --unstable --allow-net app.ts",
      "desc": "run my app.ts file"
    }
  }
}
 */

//RUN WITH DENON START
import { serve } from 'https://deno.land/std@0.100.0/http/server.ts';

const PORT = 3000;

/** Create Server */
const server = serve({
	port: PORT,
});

console.log('http://localhost:' + PORT);
for await (const req of server) {
	req.respond({
		status: 200,
		headers: new Headers({
			'content-type': 'text/html',
		}),
		body: '<h2>Hola seguidores de Coder!!!</h2>',
	});
}
