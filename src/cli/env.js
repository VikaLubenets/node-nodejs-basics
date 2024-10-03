import { env } from 'node:process'

const parseEnv = () => {
    const pref = 'RSS_';
    Object.keys(env)
      .forEach(key => {
        if(key.startsWith(pref)){
          const value = env[key];
          const name = key;
          console.log(`${name}=${value}`);
        }
      });
};

parseEnv();