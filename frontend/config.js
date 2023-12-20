const config = {
    local: {
        backend: {
            host: 'http://localhost:8000/'
        }
    }
};

// Set the environment variable REACT_APP_ENV while running the app to control the config
module.exports = (process.env.REACT_APP_ENV ? config[process.env.REACT_APP_ENV] : config.local);
