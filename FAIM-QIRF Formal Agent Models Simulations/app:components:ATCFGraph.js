import { atcfCoherence } from '../models/metrics.js';

export function ATCFGraph(agent) {
  const v = atcfCoherence(agent);
  const pct = Math.round(v * 100);
  return `
    <div class="rounded-xl border bg-white p-4 shadow-sm">
      <h3 class="font-semibold text-gray-900">ATCF Coherence</h3>
      <div class="mt-2">
        <div class="w-full bg-gray-100 h-3 rounded">
          <div class="h-3 rounded bg-green-600" style="width:${pct}%"></div>
        </div>
        <div class="mt-2 text-sm text-gray-700">${pct}%</div>
      </div>
    </div>
  `;
}
