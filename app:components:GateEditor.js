// UI abstraction: we can’t serialize functions easily; we provide toggles
// that set standard presets for G (gates).

import { update, getState } from '../store.js';

export function GateEditor() {
  return `
    <div class="rounded-xl border bg-white p-4 shadow-sm">
      <h3 class="font-semibold text-gray-900 mb-2">Gates (G)</h3>
      <div class="grid gap-2">
        <button data-g="open" class="w-full py-2 bg-indigo-600 text-white rounded-lg">Open Gates (inclusive voice/evidence)</button>
        <button data-g="textOnly" class="w-full py-2 bg-gray-100 rounded-lg">Text-Only Evidence (restrict lived experience)</button>
        <button data-g="empiricalLogic" class="w-full py-2 bg-gray-100 rounded-lg">Empirical + Logical Evidence</button>
        <button data-g="feminist" class="w-full py-2 bg-gray-100 rounded-lg">Feminist Gate (includes lived experience, universal voice)</button>
      </div>
    </div>
  `;
}

export function bindGateEditor(root) {
  root.querySelectorAll('[data-g]').forEach(btn => {
    btn.addEventListener('click', () => {
      const mode = btn.getAttribute('data-g');
      update(st => {
        if (mode === 'open') {
          st.world.G = { voice: () => true, evidence: () => true, standing: () => true };
        } else if (mode === 'textOnly') {
          st.world.G = {
            voice: (agent) => agent.SPTS.includes('student'),
            evidence: (claim) => ['logical','empirical'].includes(claim?.type ?? 'logical'),
            standing: () => true
          };
        } else if (mode === 'empiricalLogic') {
          st.world.G = { voice: () => true, evidence: (c)=>['empirical','logical'].includes(c?.type ?? 'logical'), standing: () => true };
        } else if (mode === 'feminist') {
          st.world.G = { voice: () => true, evidence: (c)=>['empirical','logical','lived_experience'].includes(c?.type ?? 'lived_experience'), standing: () => true };
        }
        return st;
      });
    });
  });
}
