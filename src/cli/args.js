const parseArgs = () => {
    const strArr = process.argv;
    const obj = {};
  
    for (let i = 0; i < strArr.length; i += 2) {
      const name = strArr[i].slice(2);
      const value = strArr[i + 1];
      obj[name] = value;
    }
  
    for (const prop in obj) {
      console.log(`${prop} is ${obj[prop]}`);
    }
};

parseArgs();