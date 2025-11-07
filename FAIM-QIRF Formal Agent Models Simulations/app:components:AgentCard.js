export function AgentCard(agent, idx=0) {
  const broa = agent.BROA || {};
  return `
    <div class="rounded-xl border bg-white p-4 shadow-sm">
      <div class="flex items-center justify-between">
        <h3 class="font-semibold text-gray-900">${agent.name}</h3>
        <span class="chip">ATCF: ${agent.ATCF?.coherence?.toFixed?.(2) ?? '—'}</span>
      </div>
      <div class="text-xs text-gray-600 mt-1">IK: ${agent.IK.join(', ') || '—'}</div>
      <div class="grid grid-cols-2 gap-2 mt-3 text-sm">
        <div>
          <div class="font-semibold text-gray-700 mb-1">SPTS</div>
          <div class="flex gap-1 flex-wrap">${agent.SPTS.map(s=>`<span class="chip">${s}</span>`).join('') || '—'}</div>
        </div>
        <div>
          <div class="font-semibold text-gray-700 mb-1">BROA+</div>
          <div class="text-xs text-gray-600">
            <div><span class="font-semibold">B:</span> ${broa.Beliefs?.join(', ') || '—'}</div>
            <div><span class="font-semibold">R:</span> ${broa.Rules?.join(', ') || '—'}</div>
            <div><span class="font-semibold">O:</span> ${broa.Ontology?.join(', ') || '—'}</div>
            <div><span class="font-semibold">A:</span> ${broa.Authenticity?.join(', ') || '—'}</div>
          </div>
        </div>
      </div>
      <div class="mt-3 text-xs text-gray-600">
        PRS (salience/coverage): ${(agent.PRS?.salience ?? 0.5).toFixed(2)} / ${(agent.PRS?.coverage ?? 0.5).toFixed(2)}
      </div>
    </div>
  `;
}
