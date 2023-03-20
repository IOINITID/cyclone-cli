import { homedir } from 'node:os';
import { join } from 'node:path';
import { promises } from 'node:fs';
import { appController } from 'src/controllers/app.controller';

export enum Storage {
  Token = 'token',
  City = 'city',
}

class StorageService {
  public folderPath = join(homedir(), '.cyclone');
  public filePath = join(homedir(), '.cyclone/config.json');

  public async set(key: string, value: string): Promise<void> {
    const version = await appController.getAppVersion();

    let data: Record<string, any> = {
      [version]: {},
    };

    if (await this.isExist(this.filePath)) {
      const file = (await promises.readFile(this.filePath)).toString();
      data = JSON.parse(file);
    }

    if (!(await this.isExist(this.folderPath))) {
      await promises.mkdir(this.folderPath);
    }

    data[version][key] = value;
    await promises.writeFile(this.filePath, JSON.stringify(data));
  }

  public async get(key: string): Promise<string | undefined> {
    if (await this.isExist(this.filePath)) {
      const version = await appController.getAppVersion();
      const file = (await promises.readFile(this.filePath)).toString();
      const data = JSON.parse(file);
      const value = data[version][key];

      return value;
    }
  }

  private async isExist(path: string): Promise<boolean> {
    try {
      await promises.stat(path);
      return true;
    } catch (error) {
      return false;
    }
  }
}

export const storageService = new StorageService();
