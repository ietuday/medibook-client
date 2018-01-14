import { Injectable, Optional, SkipSelf } from '@angular/core';


interface StorageItem {
  key: string,
  value: string;
}

@Injectable()
export class AppStorage {

  private items: Array<StorageItem> = Array<StorageItem>();
  private isInitalized = false;
  private appStorageKey = 'app_storage_items';

  constructor(
    @Optional() @SkipSelf() prior: AppStorage, ) {
    if (prior) { return prior };
    this.loadItemsFromLocalStroge();
    this.isInitalized = true;
  }

  get<T>(key: string): T {
    const item = this.items.find(requiredItem => requiredItem.key === key);
    if (!item) {
      return null;
    }

    return <T>JSON.parse(item.value);
  }

  save<T>(key: string, value: T): void {

    const itemValue = JSON.stringify(value);
    this.items.push({ key: key, value: itemValue });
    this.saveItemsToLocalStorage();
  }

  clear(): void {
    localStorage.removeItem(this.appStorageKey);
    this.items = Array<StorageItem>();
  }

  private loadItemsFromLocalStroge(): void {
    const items = localStorage.getItem(this.appStorageKey);
    this.items = JSON.parse(items) || [];
  }

  private saveItemsToLocalStorage(): void {
    const items = JSON.stringify(this.items);
    localStorage.setItem(this.appStorageKey, items);
  }
}
