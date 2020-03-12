import { writable } from 'svelte/store';

export const userAuth = writable(undefined);
export const filterArray = writable([])