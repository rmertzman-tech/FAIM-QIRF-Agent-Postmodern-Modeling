import { TRC_Mini, TRC_Resolve } from '../models/interventions.js';
import { MetricPanel } from '../components/MetricPanel.js';
import { getState } from '../store.js';

export function renderRepairLab(app) {
  app.innerHTML = `
    <div class="grid md:grid-cols-2 gap-6">
      <section class="rounded-xl border bg-white p-4 shadow-sm">
        <h3 class="font-semibold text-gray-900">Mini-TRC</h3>
        <div class="grid gap-2">
          <input id="issue" class="border rounded px-2 py-1" placeholder="Issue (e.g., attribution gap in meetings)" />
          <input id="remedy" class="border rounded px-2 py-1" placeholder="Remedy (e.g., attribution log + minutes)" />
          <input id="owner" class="border rounded px-2 py-1" placeholder="Owner (e.g., Dept Chair)" />
          <input id="due" type="number" class="border rounded px-2 py-1" placeholder="Due in days (e.g., 21)" />
          <div class="flex gap-2">
            <button id="open" class="flex-1 px-3 py-2 bg-gray-100 rounded">Open</button>
            <button id="resolve-last" class="flex-1 px-3 py-2 bg-gray-100 rounded">Resolve Last</button>
          </div>
        </div>
      </section>

      <section class="rounded-xl border bg-white p-4 shadow-sm">
        <h3 class="font-semibold text-gray-900 mb-2">Metrics</h3>
        <div id="metrics">${MetricPanel()}</div>
      </section>

      <section class="md:col-span-2 rounded-xl border bg-white p-4 shadow-sm">
        <h3 class="font-semibold text-gray-900 mb-2">Change-Log</h3>
        <div id="logs" class="text-xs text-gray-600 space-y-1 h-64 overflow-auto border rounded p-2 bg-gray-50"></div>
      </section>
    </div>
  `;

  app.querySelector('#open').addEventListener('click', () => {
    const issue = app.querySelector('#issue').value || 'Issue (demo)';
    const remedy = app.querySelector('#remedy').value || 'Remedy (demo)';
    const owner = app.querySelector('#owner').value || 'Owner';
    const dueInDays = Number(app.querySelector('#due').value || 21);
    TRC_Mini({ issue, remedy, owner, dueInDays });
  });
  app.querySelector('#resolve-last').addEventListener('click', () => {
    const open = [...getState().logs].reverse().find(x => x.kind === 'TRC_Mini_open');
    if (open) TRC_Resolve(open.id);
  });

  const refresh = () => {
    const s = getState();
    const logs = s.logs.slice().reverse();
    app.querySelector('#logs').innerHTML = logs.map(l => {
      if (l.kind === 'TRC_Mini_open') {
        return `• OPEN: "${l.issue}" → remedy: ${l.remedy} (owner: ${l.owner}, due: ${new Date(l.due).toLocaleDateString()})`;
      }
      if (l.kind === 'TRC_Mini_close') {
        return `• CLOSE: id=${l.id}`;
      }
      return `• ${l.kind}: ${l.note || ''}`;
    }).join('') || '<div class="text-gray-400">No entries.</div>';

    app.querySelector('#metrics').innerHTML = MetricPanel();
  };

  setInterval(refresh, 400);
}
