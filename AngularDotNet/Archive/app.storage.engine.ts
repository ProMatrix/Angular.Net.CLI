import { NgxsStoragePluginModule, StorageEngine, STORAGE_ENGINE } from '@ngxs/storage-plugin';

export class AppStorageEngine implements StorageEngine {

  length: number;

  getItem(key: string): any {
    // Your logic here
  }

  setItem(key: string, val: any): void {
    // Your logic here
  }

  removeItem(key: string): void {
    // Your logic here
  }

  clear(): void {
    // Your logic here
  }

  key(val: number): string {
    // Your logic here
    return '';
  }
}
