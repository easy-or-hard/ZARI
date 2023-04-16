module.exports = {
    apps: [
        {
            name: 'zari',
            script: 'bing/www.js',
            exec_mode: 'fork',
            instances: 2,
            autorestart: true,
            watch: true,
            max_memory_restart: '1G',
            pre_start: 'npm ci'
        }
    ]
};