const parseEnv = () => {
    const pref = 'RSS_';
    Object.keys(process.env)
      .forEach(key => {
        if(key.startsWith(pref)){
          const value = process.env[key];
          const name = key;
          console.log(`${name}=${value}`);
        }
      });
};

parseEnv();