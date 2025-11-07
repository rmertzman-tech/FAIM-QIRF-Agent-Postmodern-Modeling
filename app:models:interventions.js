import { update, getState } from '../store.js';

// 1) RecalibrateCred: reduce identity-coded credibility bias by normalizing gate checks
export function RecalibrateCred() {
  update(st => {
    const prev = st.world.G;
    st.world.G = {
      ...prev,
      // Normalize: always allow voice; evidence requires reasons; standing inclusive
      voice: () => true,
      evidence: (claim) => ['logical','empirical','lived_experience'].includes(claim?.type ?? 'logical'),
      standing: () => true,
    };
    st.logs.push({ t: Date.now(), kind: 'RecalibrateCred', note: 'Normalized voice/evidence/standing gates.' });
    return st;
  });
}

// 2) LexiconExtend: add a concept; increases hermeneutical coverage
export function LexiconExtend(term) {
  const safe = (term || '').trim();
  if (!safe) return;
  update(st => {
    if (!st.world.Lexicon.includes(safe)) st.world.Lexicon.push(safe);
    st.logs.push({ t: Date.now(), kind: 'LexiconExtend', note: `Added concept "${safe}".` });
    // Nudge PRS coverage for all agents (very simple model)
    st.agents = st.agents.map(a => ({ ...a, PRS: { ...a.PRS, coverage: Math.min(1, a.PRS.coverage + 0.05) } }));
    return st;
  });
}

// 3) MultiTrack: ensure tracks have equal-standing rigor flag
export function MultiTrack(setEqualStanding = true) {
  update(st => {
    st.tracks = st.tracks.map(tr => ({ ...tr, rubric: { ...tr.rubric, equalStanding: !!setEqualStanding } }));
    st.logs.push({ t: Date.now(), kind: 'MultiTrack', note: `EqualStanding=${!!setEqualStanding}` });
    return st;
  });
}

// 4) TRC_Mini: truth → recognition → remedy → review → change-log
export function TRC_Mini({ issue, remedy, owner, dueInDays = 21 }) {
  const id = Math.random().toString(36).slice(2);
  const due = Date.now() + dueInDays * 86400000;
  update(st => {
    st.world.MetaCons = Array.from(new Set([...(st.world.MetaCons||[]), 'Mini-TRC (scheduled)']));
    st.logs.push({ t: Date.now(), kind: 'TRC_Mini_open', id, issue, owner, remedy, due });
    return st;
  });
  return id;
}

// Mark remedy done (for latency calculation)
export function TRC_Resolve(id) {
  update(st => {
    const open = st.logs.find(x => x.kind === 'TRC_Mini_open' && x.id === id);
    if (open) st.logs.push({ t: Date.now(), kind: 'TRC_Mini_close', id });
    return st;
  });
}

// Utilities for demos
export function applyPhilosopher(philo) {
  update(st => {
    st.agents = [philo.agent, ...st.agents.slice(1)];
    // apply world mod gates/constructors if provided
    if (philo.worldMods?.G) st.world.G = philo.worldMods.G;
    if (philo.worldMods?.Cons) st.world.Cons = Array.from(new Set([ ...st.world.Cons, ...philo.worldMods.Cons ]));
    if (philo.worldMods?.MetaCons) st.world.MetaCons = Array.from(new Set([ ...st.world.MetaCons, ...philo.worldMods.MetaCons ]));
    st.selectedAgentIndex = 0;
    st.logs.push({ t: Date.now(), kind: 'ApplyPhilosopher', note: philo.label });
    return st;
  });
}
