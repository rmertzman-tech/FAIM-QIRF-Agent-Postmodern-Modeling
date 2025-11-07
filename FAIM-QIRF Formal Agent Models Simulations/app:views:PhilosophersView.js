import { getState } from '../store.js';
import { AgentCard } from '../components/AgentCard.js';
import { WorldCard } from '../components/WorldCard.js';
import { MetricPanel } from '../components/MetricPanel.js';
import { applyPhilosopher } from '../models/interventions.js';

export function renderPhilosophers(app) {
  const s = getState();
  app.innerHTML = `
    <div class="rounded-xl border bg-white p-4 shadow-sm">
      <h2 class="text-xl font-bold text-gray-900">Philosophers as Models</h2>
      <p class="text-gray-700 mt-1 text-sm">
        Select a thinker to load their agent and world gate assumptions (G) and examine what becomes legible in the PRS.
      </p>

      <div class="mt-3">
        <select id="sel-philo" class="border rounded px-2 py-1">
          ${s.philosophers.map(p=>`<option value="${p.id}">${p.label}</option>`).join('')}
        </select>
        <button id="btn-apply" class="ml-2 px-3 py-1 bg-indigo-600 text-white rounded">Apply</button>
      </div>
    </div>

    <div class="grid md:grid-cols-3 gap-6 mt-6">
      <div id="agent-col"></div>
      <div id="world-col"></div>
      <div id="metrics-col"></div>
    </div>
  `;

  const renderCols = () => {
    const st = getState();
    const a = st.agents[0];
    app.querySelector('#agent-col').innerHTML = AgentCard(a);
    app.querySelector('#world-col').innerHTML = WorldCard(st.world);
    app.querySelector('#metrics-col').innerHTML = MetricPanel();
  };

  renderCols();

  app.querySelector('#btn-apply').addEventListener('click', () => {
    const id = app.querySelector('#sel-philo').value;
    const philo = getState().philosophers.find(p => p.id === id);
    if (philo) {
      applyPhilosopher(philo);
      setTimeout(renderCols, 50);
    }
  });
}
