import { renderHome } from './views/HomeView.js';
import { renderPlayground } from './views/PlaygroundView.js';
import { renderPhilosophers } from './views/PhilosophersView.js';
import { renderInjusticeLabs } from './views/InjusticeLabView.js';
import { renderRepairLab } from './views/RepairLabView.js';
import { renderAbout } from './views/AboutView.js';

const routes = {
  '#/home': renderHome,
  '#/playground': renderPlayground,
  '#/philosophers': renderPhilosophers,
  '#/labs': renderInjusticeLabs,
  '#/repair': renderRepairLab,
  '#/about': renderAbout,
};

export function initRouter() {
  const app = document.getElementById('app');

  function render() {
    const hash = window.location.hash || '#/home';
    const view = routes[hash] || renderHome;
    app.innerHTML = ''; // clear
    view(app);
  }

  window.addEventListener('hashchange', render);
  render();
}
