import { InjectionToken } from '@angular/core';

export const BROWSER_STORAGE = new 
InjectionToken<Storage>('Browser Storage', {
providedIn: 'root',
factory: () => localStorage
});

export class Storage {
    // This is just a placeholder class to satisfy the test import.
  }