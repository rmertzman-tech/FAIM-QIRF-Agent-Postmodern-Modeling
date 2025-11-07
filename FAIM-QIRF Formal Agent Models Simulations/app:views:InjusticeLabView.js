import { getState, update } from '../store.js';
import { MetricPanel } from '../components/MetricPanel.js';
import { RecalibrateCred, LexiconExtend } from '../models/interventions.js';

export function renderInjusticeLabs(app) {
  app.innerHTML = `
    <div class="grid md:grid-cols-2 gap-6">
      <section class="rounded-xl border bg-white p-4 shadow-sm">
        <h3 class="font-semibold text-gray-900">Testimonial Lab</h3>
        <p class="text-sm text-gray-700">Simulate credibility bias; then apply RecalibrateCred.</p>
        <div class="mt-2">
          <label class="text-xs text-gray-600">Bias level</label>
          <input id="bias" type="range" min="0" max="1" step="0.05" value="0.35" class="w-full" />
          <button id="apply-recal" class="mt-2 px-3 py-2 bg-indigo-600 text-white rounded">RecalibrateCred()</button>
        </div>
      </section>

      <section class="rounded-xl border bg-white p-4 shadow-sm">
        <h3 class="font-semibold text-gray-900">Hermeneutical Lab</h3>
        <p class="text-sm text-gray-700">Add a missing concept to expand PRS coverage.</p>
        <div class="mt-2 flex gap-2">
          <input id="term" placeholder="Add concept (e.g., microaggression)" class="flex-1 border rounded px-2" />
          <button id="add-term" class="px-3 py-2 bg-gray-100 rounded">LexiconExtend()</button>
        </div>
      </section>

      <section class="md:col-span-2 rounded-xl border bg-white p-4 shadow-sm">
        <h3 class="font-semibold text-gray-900 mb-2">Metrics</h3>
        <div id="metrics">${MetricPanel()}</div>
      </section>
    </div>
  `;

  // Bias slider here is illustrative; we just log it for now.
  app.querySelector('#apply-recal').addEventListener('click', () => RecalibrateCred());
  app.querySelector('#add-term').addEventListener('click', () => {
    const term = app.querySelector('#term').value;
    LexiconExtend(term);
    app.querySelector('#term').value = '';
  });

  setInterval(() => {
    app.querySelector('#metrics').innerHTML = MetricPanel();
  }, 400);
}
