import { initRouter } from './router.js';
import { initStore } from './store.js';

window.addEventListener('DOMContentLoaded', () => {
  initStore();     // sets up in-memory demo state
  initRouter();    // mounts initial view + hash routing
});
