import { homedir } from 'node:os';
import { join } from 'node:path';
import { promises } from 'node:fs';

export enum Storage {
  Token = 'token',
  City = 'city',
}

class StorageService {
  public folderPath = join(homedir(), '.cyclone');
  public filePath = join(homedir(), '.cyclone/config.json');

  public async set(key: string, value: string) {
    const appPackage = JSON.parse(String(await promises.readFile('./package.json')));
    const version = appPackage.version;

    let data: Record<string, any> = {
      [version]: {},
    };

    if (await this.isExist(this.filePath)) {
      const file = await promises.readFile(this.filePath);
      data = JSON.parse(String(file));
    }

    if (!(await this.isExist(this.folderPath))) {
      await promises.mkdir(this.folderPath);
    }

    data[version][key] = value;
    await promises.writeFile(this.filePath, JSON.stringify(data));
  }

  public async get(key: string) {
    const appPackage = JSON.parse(String(await promises.readFile('./package.json')));
    const version = appPackage.version;

    if (await this.isExist(this.filePath)) {
      const file = await promises.readFile(this.filePath);
      const data = JSON.parse(String(file));
      const value = data[version][key];

      return value;
    }

    return undefined;
  }

  private async isExist(path: string) {
    try {
      await promises.stat(path);
      return true;
    } catch (error) {
      return false;
    }
  }
}

export const storageService = new StorageService();
