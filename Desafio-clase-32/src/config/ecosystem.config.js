module.exports = {
	apps: [
		{
			name: 'PM2',
			script: './dist/index.ecosystem.js',
			watch: true,
			autorestart: true,
			instances: 4,
			args: '--server_port 8081',
		},
		{
			name: 'FOREVER',
			script: './dist',
			watch: true,
			autorestart: true,
			args: '--server_port 8080',
		},
	],
};
