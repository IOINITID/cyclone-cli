import { homedir } from 'os';
import { join } from 'path';
import { promises } from 'fs';

const folderPath = join(homedir(), '.cyclone');
const filePath = join(homedir(), '.cyclone/config.json');

const TokenDictionary = {
  Token: 'token',
  City: 'city',
};

const saveKeyValue = async (key, value) => {
  let data = {};

  if (await isExist(filePath)) {
    const file = await promises.readFile(filePath);
    data = JSON.parse(file);
  }

  if (!(await isExist(folderPath))) {
    await promises.mkdir(folderPath);
  }

  data[key] = value;
  await promises.writeFile(filePath, JSON.stringify(data));
};

const getKeyValue = async (key) => {
  if (await isExist(filePath)) {
    const file = await promises.readFile(filePath);
    const data = JSON.parse(file);
    const value = data[key];
    return value;
  }

  return undefined;
};

const isExist = async (path) => {
  try {
    await promises.stat(path);
    return true;
  } catch (error) {
    return false;
  }
};

export { saveKeyValue, getKeyValue, TokenDictionary };
