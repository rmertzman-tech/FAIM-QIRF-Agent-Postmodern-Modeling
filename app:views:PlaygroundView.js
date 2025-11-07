import { getState, update } from '../store.js';
import { AgentCard } from '../components/AgentCard.js';
import { WorldCard } from '../components/WorldCard.js';
import { GateEditor, bindGateEditor } from '../components/GateEditor.js';
import { MetricPanel } from '../components/MetricPanel.js';
import { PRSViewer } from '../components/PRSViewer.js';
import { ATCFGraph } from '../components/ATCFGraph.js';
import { RecalibrateCred, LexiconExtend, MultiTrack, TRC_Mini, TRC_Resolve } from '../models/interventions.js';

export function renderPlayground(app) {
  const s = getState();
  const agent = s.agents[s.selectedAgentIndex] || s.agents[0];

  app.innerHTML = `
    <div class="grid lg:grid-cols-3 gap-6">
      <div class="space-y-4">
        ${AgentCard(agent)}
        ${PRSViewer(agent)}
        ${ATCFGraph(agent)}
      </div>

      <div class="space-y-4">
        ${WorldCard(s.world)}
        <div class="rounded-xl border bg-white p-4 shadow-sm">
          <h3 class="font-semibold text-gray-900 mb-2">Interventions</h3>
          <div class="grid gap-2">
            <button id="btn-recal" class="w-full py-2 bg-indigo-600 text-white rounded-lg">RecalibrateCred()</button>
            <div class="flex gap-2">
              <input id="lex-term" placeholder="Add concept (e.g., gaslighting)" class="flex-1 border rounded px-2" />
              <button id="btn-lex" class="px-3 py-2 bg-gray-100 rounded-lg">LexiconExtend()</button>
            </div>
            <div class="flex gap-2">
              <button id="btn-eq-on" class="flex-1 py-2 bg-gray-100 rounded-lg">MultiTrack(EqualStanding=ON)</button>
              <button id="btn-eq-off" class="flex-1 py-2 bg-gray-100 rounded-lg">MultiTrack(EqualStanding=OFF)</button>
            </div>
            <div class="flex gap-2">
              <button id="btn-trc-open" class="flex-1 py-2 bg-gray-100 rounded-lg">TRC_Mini(open)</button>
              <button id="btn-trc-close" class="flex-1 py-2 bg-gray-100 rounded-lg">TRC_Mini(resolve last)</button>
            </div>
          </div>
        </div>
      </div>

      <div class="space-y-4">
        ${GateEditor()}
        <div id="metrics">${MetricPanel()}</div>
        <div class="rounded-xl border bg-white p-4 shadow-sm">
          <h3 class="font-semibold text-gray-900 mb-2">Logs</h3>
          <div id="logs" class="text-xs text-gray-600 space-y-1 h-48 overflow-auto border rounded p-2 bg-gray-50"></div>
        </div>
      </div>
    </div>
  `;

  // Bind Gates UI
  bindGateEditor(app);

  // Bind interventions
  app.querySelector('#btn-recal').addEventListener('click', () => RecalibrateCred());
  app.querySelector('#btn-lex').addEventListener('click', () => {
    const term = app.querySelector('#lex-term').value;
    LexiconExtend(term);
    app.querySelector('#lex-term').value = '';
  });
  app.querySelector('#btn-eq-on').addEventListener('click', () => MultiTrack(true));
  app.querySelector('#btn-eq-off').addEventListener('click', () => MultiTrack(false));
  app.querySelector('#btn-trc-open').addEventListener('click', () => {
    TRC_Mini({ issue: 'Bias incident (demo)', remedy: 'Rubric revision', owner: 'Instructor', dueInDays: 14 });
  });
  app.querySelector('#btn-trc-close').addEventListener('click', () => {
    // resolve the most recent open
    const open = [...getState().logs].reverse().find(x => x.kind === 'TRC_Mini_open');
    if (open) TRC_Resolve(open.id);
  });

  // Live refresh logs + metrics
  const renderLogs = () => {
    const logs = getState().logs.slice().reverse();
    app.querySelector('#logs').innerHTML = logs.map(l =>
      `<div>• <span class="font-semibold">${l.kind}</span> — <span class="text-gray-500">${l.note || ''}</span></div>`
    ).join('') || '<div class="text-gray-400">No logs yet.</div>';

    app.querySelector('#metrics').innerHTML = MetricPanel();
  };

  // naive polling for demo; (could subscribe for finer-grained updates)
  setInterval(renderLogs, 400);
}
