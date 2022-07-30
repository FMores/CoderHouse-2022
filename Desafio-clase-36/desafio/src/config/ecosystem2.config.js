module.exports = {
	apps: [
		{
			name: 'FORK',
			script: './dist',
			watch: true,
			autorestart: true,
			args: '--server_port 8081',
		},
		{
			name: 'cluster_1',
			script: './dist/index.ecosystem.js',
			watch: true,
			autorestart: true,
			instances: 2,
			args: '--server_port 8082',
		},
		{
			name: 'cluster_2',
			script: './dist/index.ecosystem.js',
			watch: true,
			autorestart: true,
			instances: 2,
			args: '--server_port 8083',
		},
		{
			name: 'cluster_3',
			script: './dist/index.ecosystem.js',
			watch: true,
			autorestart: true,
			instances: 2,
			args: '--server_port 8084',
		},
		{
			name: 'cluster_4',
			script: './dist/index.ecosystem.js',
			watch: true,
			autorestart: true,
			instances: 2,
			args: '--server_port 8085',
		},
	],
};
