export function WorldCard(world) {
  return `
    <div class="rounded-xl border bg-white p-4 shadow-sm">
      <h3 class="font-semibold text-gray-900">World Context</h3>
      <div class="text-xs text-gray-600 mt-1">
        <div><span class="font-semibold">Ctx:</span> ${world.Ctx.term}</div>
        <div><span class="font-semibold">Constraints:</span> ${(world.Ctx.constraints || []).join(', ') || '—'}</div>
      </div>
      <div class="text-sm text-gray-700 mt-3">
        <div class="font-semibold mb-1">Constructors</div>
        <div class="flex gap-1 flex-wrap">${world.Cons.map(c=>`<span class="chip">${c}</span>`).join('') || '—'}</div>
      </div>
      <div class="text-sm text-gray-700 mt-3">
        <div class="font-semibold mb-1">Meta-Constructors</div>
        <div class="flex gap-1 flex-wrap">${(world.MetaCons||[]).map(c=>`<span class="chip">${c}</span>`).join('') || '—'}</div>
      </div>
      <div class="text-sm text-gray-700 mt-3">
        <div class="font-semibold mb-1">Lexicon</div>
        <div class="flex gap-1 flex-wrap">${(world.Lexicon||[]).map(c=>`<span class="chip">${c}</span>`).join('') || '—'}</div>
      </div>
    </div>
  `;
}
