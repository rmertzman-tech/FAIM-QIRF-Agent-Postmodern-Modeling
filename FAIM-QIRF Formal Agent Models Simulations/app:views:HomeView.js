import { ExportImportPanel, bindExportImport } from '../components/ExportImportPanel.js';

export function renderHome(app) {
  app.innerHTML = `
    <div class="grid md:grid-cols-2 gap-6">
      <section class="rounded-xl border bg-white p-6 shadow-sm">
        <h2 class="text-xl font-bold text-gray-900">Welcome</h2>
        <p class="text-gray-700 mt-2">
          This demo shows how <span class="font-semibold">FAIM-QIRF</span> models agents (IK, PRS<sub>t</sub>, AH, BROA+, ATCF, SPTS)
          and worlds (Ctx, constructors, meta-constructors, gates G), then runs interventions
          (<span class="font-semibold">RecalibrateCred</span>, <span class="font-semibold">LexiconExtend</span>,
          <span class="font-semibold">MultiTrack</span>, <span class="font-semibold">TRC_Mini</span>) with live metrics.
        </p>
        <div class="mt-4">
          <a href="#/playground" class="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg">
            Open Playground →
          </a>
        </div>
        <div class="mt-6 text-sm text-gray-600">
          No tracking. Everything is in-memory; use Export/Import to save a configuration.
        </div>
      </section>

      <section id="export-panel">${ExportImportPanel()}</section>

      <section class="md:col-span-2 rounded-xl border bg-white p-6 shadow-sm">
        <h3 class="font-semibold text-gray-900">Quick Tour</h3>
        <ol class="list-decimal ml-5 text-gray-700 mt-2 space-y-1">
          <li>Go to <span class="font-semibold">Playground</span> → inspect Agent & World.</li>
          <li>Try <span class="font-semibold">Gates</span> presets and watch metrics change.</li>
          <li>Use <span class="font-semibold">RecalibrateCred</span> and <span class="font-semibold">LexiconExtend</span>.</li>
          <li>Toggle <span class="font-semibold">MultiTrack</span> equal-standing and note outcome variance.</li>
          <li>Open a <span class="font-semibold">TRC_Mini</span> and then resolve it to see latency.</li>
          <li>Explore <span class="font-semibold">Philosophers</span> to demonstrate historical gate patterns.</li>
        </ol>
      </section>
    </div>
  `;
  bindExportImport(app.querySelector('#export-panel'));
}
