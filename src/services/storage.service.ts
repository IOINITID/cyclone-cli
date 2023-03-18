import { homedir } from 'node:os';
import { join } from 'node:path';
import { promises } from 'node:fs';

const folderPath = join(homedir(), '.cyclone');
const filePath = join(homedir(), '.cyclone/config.json');

const TokenDictionary = {
  Token: 'token',
  City: 'city',
};

const saveKeyValue = async (key: string, value: string) => {
  let data: Record<string, any> = {};

  if (await isExist(filePath)) {
    const file = await promises.readFile(filePath);
    data = JSON.parse(String(file));
  }

  if (!(await isExist(folderPath))) {
    await promises.mkdir(folderPath);
  }

  data[key] = value;
  await promises.writeFile(filePath, JSON.stringify(data));
};

const getKeyValue = async (key: string) => {
  if (await isExist(filePath)) {
    const file = await promises.readFile(filePath);
    const data = JSON.parse(String(file));
    const value = data[key];
    return value;
  }

  return undefined;
};

const isExist = async (path: string) => {
  try {
    await promises.stat(path);
    return true;
  } catch (error) {
    return false;
  }
};

export { saveKeyValue, getKeyValue, TokenDictionary };
