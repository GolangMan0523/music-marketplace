import {createCountableStore} from '@app/web-player/library/state/create-countable-store';

export const useLibraryStore = createCountableStore('likes');

export const userLibrary = useLibraryStore.getState;
