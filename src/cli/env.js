const parseEnv = () => {
    const rssVars = Object.entries(process.env).reduce((acc, [key, value]) => {
        if (key.startsWith('RSS_')) {
          acc.push(`${key}=${value}`);
        }
        return acc;
      }, []);
      console.log(rssVars.join('; '));
};

// RSS_NAME1=value1 RSS_NAME2=value2 node src/cli/env.js
parseEnv();