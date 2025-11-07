export function makeWorld({
  Ctx = { term: 'Generic context', constraints: [] },
  G = {
    voice: (agent) => true,
    evidence: (claim) => ['logical','empirical'].includes(claim?.type ?? 'logical'),
    standing: () => true,
  },
  Cons = [],
  MetaCons = [],
  Lexicon = [],
} = {}) {
  return { Ctx, G, Cons, MetaCons, Lexicon };
}
