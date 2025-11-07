import { getState } from '../store.js';

// Very lightweight “metrics” for demo visuals.
// In production we’d plug in your formal definitions.

export function atcfCoherence(agent) {
  // Pretend coherence correlates with PRS coverage and number of BROA items
  const cover = agent.PRS.coverage ?? 0.5;
  const broaCount = ['Beliefs','Rules','Ontology','Authenticity']
    .map(k => agent.BROA[k]?.length || 0)
    .reduce((a,b)=>a+b,0);
  const base = Math.min(1, 0.4 + 0.5*cover + 0.02*broaCount);
  return round2(base);
}

export function lexiconCoverage() {
  const { world } = getState();
  // naive: more terms → better coverage, saturating at 1
  const L = world.Lexicon?.length ?? 0;
  return round2(Math.min(1, 0.3 + 0.1 * L));
}

export function equalStandingOK() {
  const { tracks } = getState();
  return tracks.every(t => t.rubric?.equalStanding === true);
}

export function outcomeVariance() {
  // placeholder: lower when equal-standing is on and lexicon improves
  const eq = equalStandingOK() ? 0.2 : 0.5;
  const cov = lexiconCoverage();
  const v = Math.max(0, 0.7 - 0.4*cov - (eq ? 0.2 : 0));
  return round2(v);
}

export function challengeToChangeLatencyDays() {
  // find TRC open/close pairs
  const { logs } = getState();
  const pairs = logs.filter(x => x.kind === 'TRC_Mini_open').map(open => {
    const close = logs.find(y => y.kind === 'TRC_Mini_close' && y.id === open.id);
    if (!close) return null;
    return (close.t - open.t) / 86400000;
  }).filter(Boolean);
  if (!pairs.length) return null;
  const avg = pairs.reduce((a,b)=>a+b,0)/pairs.length;
  return Math.max(0, Math.round(avg));
}

function round2(x) { return Math.round(x * 100) / 100; }
