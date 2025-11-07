import { getState, subscribe } from '../store.js';
import { atcfCoherence, lexiconCoverage, equalStandingOK, outcomeVariance, challengeToChangeLatencyDays } from '../models/metrics.js';

export function MetricPanel() {
  const s = getState();
  const a = s.agents[s.selectedAgentIndex] || s.agents[0];
  return `
    <div class="rounded-xl border bg-white p-4 shadow-sm">
      <h3 class="font-semibold text-gray-900">Metrics</h3>
      <div class="mt-2 text-sm">
        <div class="flex justify-between"><span>ATCF Coherence (agent)</span><span class="font-semibold">${atcfCoherence(a)}</span></div>
        <div class="flex justify-between"><span>Lexicon Coverage</span><span class="font-semibold">${lexiconCoverage()}</span></div>
        <div class="flex justify-between"><span>Equal-Standing Tracks</span><span class="font-semibold">${equalStandingOK() ? 'Yes' : 'No'}</span></div>
        <div class="flex justify-between"><span>Outcome Variance (lower=better)</span><span class="font-semibold">${outcomeVariance()}</span></div>
        <div class="flex justify-between"><span>Challenge→Change Latency</span><span class="font-semibold">${challengeToChangeLatencyDays() ?? '—'} ${challengeToChangeLatencyDays() ? 'days' : ''}</span></div>
      </div>
    </div>
  `;
}

// small helper for live refresh (optional future use)
export function liveMetrics(el) {
  const unsub = subscribe(() => {
    el.innerHTML = MetricPanel();
  });
  return unsub;
}
