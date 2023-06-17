const parseEnv = () => {
    const pref = 'RSS_';
    Object.keys(process.env)
      .forEach(key => {
        const value = process.env[key];
        const name = key;
        console.log(`${pref}${name}=${value}`);
      });
};

parseEnv();