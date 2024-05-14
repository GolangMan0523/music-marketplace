import {createCountableStore} from '@app/web-player/library/state/create-countable-store';

export const useRepostsStore = createCountableStore('reposts');

export const userReposts = useRepostsStore.getState;
