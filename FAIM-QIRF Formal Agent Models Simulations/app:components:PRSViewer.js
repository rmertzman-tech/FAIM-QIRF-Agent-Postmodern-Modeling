export function PRSViewer(agent) {
  const s = agent.PRS?.salience ?? 0.5;
  const c = agent.PRS?.coverage ?? 0.5;
  return `
    <div class="rounded-xl border bg-white p-4 shadow-sm">
      <h3 class="font-semibold text-gray-900">PRS (Phenomenal Reference Space)</h3>
      <div class="mt-2 text-sm text-gray-700">
        <div class="mb-2">Salience: ${(s*100).toFixed(0)}%</div>
        <div class="w-full bg-gray-100 h-2 rounded"><div style="width:${s*100}%" class="h-2 rounded bg-purple-600"></div></div>
        <div class="mt-3 mb-2">Coverage: ${(c*100).toFixed(0)}%</div>
        <div class="w-full bg-gray-100 h-2 rounded"><div style="width:${c*100}%" class="h-2 rounded bg-indigo-600"></div></div>
      </div>
    </div>
  `;
}
