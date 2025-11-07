import { makeAgent } from './models/agent.js';
import { makeWorld } from './models/world.js';

let state = {
  agents: [],
  world: null,
  tracks: [],         // for MultiTrack() equal-standing demo
  logs: [],           // Mini-TRC change-log style entries
  philosophers: [],   // prebuilt gallery
  scenarios: [],      // testimonial/hermeneutical labs
  selectedAgentIndex: 0,
};

const subs = new Set();

export function initStore() {
  // Seed demo data (self-contained; no fetch required)
  state.agents = [
    makeAgent({
      name: 'Demo Student',
      IK: ['Respect for persons', 'Truth-seeking'],
      AH: ['First-gen college', 'STEM → ethics minor'],
      SPTS: ['student', 'worker', 'caregiver'],
      BROA: { Beliefs: ['fallibilism'], Rules: ['calibrate evidence'], Ontology: ['naturalist'], Authenticity: ['community-accountability'] },
      PRS: { salience: 0.45, coverage: 0.42 },    // what’s legible now
      ATCF: { coherence: 0.52 },                  // simple scalar for demo
      Cap: ['close-reading', 'interviewing'],
      Capab: ['podcast-analysis'],
      FP: ['become community-embedded researcher'],
    }),
  ];

  state.world = makeWorld({
    Ctx: { term: 'University seminar', constraints: ['written-dominant', 'scholarly-citations-only'] },
    G: { // Gates: who has voice/evidence/standing
      voice: (agent) => agent.SPTS.includes('student'),
      evidence: (claim) => ['logical', 'empirical'].includes(claim?.type ?? 'logical'),
      standing: (agent) => true,
    },
    Cons: ['Elenchus-like discussions', 'Text-only assessment rubric'],
    MetaCons: ['end-of-term review (irregular)'],
    Lexicon: ['microaggression', 'intersectionality'], // hermeneutical coverage
  });

  state.tracks = [
    { id: 'text', name: 'Textual Analysis', rubric: { rigor: 1, equalStanding: false } },
    { id: 'rel', name: 'Relational Inquiry', rubric: { rigor: 1, equalStanding: false } },
  ];

  state.philosophers = [
    {
      id: 'socrates',
      label: 'Socrates',
      agent: makeAgent({
        name: 'Socrates',
        IK: ['Examined life'],
        AH: ['Athenian public discourse'],
        SPTS: ['citizen', 'gadfly'],
        BROA: { Beliefs: ['virtue can be known'], Rules: ['dialectic'], Ontology: ['ethical realism'], Authenticity: ['public accountability'] },
        PRS: { salience: 0.6, coverage: 0.5 },
        ATCF: { coherence: 0.7 },
        Cap: ['questioning'],
        Capab: ['elenchus'],
        FP: ['care of the soul'],
      }),
      worldMods: {
        G: { voice: (agent) => agent.SPTS.includes('citizen'), evidence: (claim) => true, standing: () => true },
        Cons: ['Elenchus', 'Agora debates'],
      },
    },
    {
      id: 'plato',
      label: 'Plato',
      agent: makeAgent({
        name: 'Plato',
        IK: ['Forms as ultimate reality'],
        AH: ['Academy founder'],
        SPTS: ['elite philosopher'],
        BROA: { Beliefs: ['rationalism'], Rules: ['dialectic + abstraction'], Ontology: ['dualism (Forms/particulars)'], Authenticity: ['philosopher-king ideal'] },
        PRS: { salience: 0.55, coverage: 0.45 },
        ATCF: { coherence: 0.65 },
        Cap: ['abstraction'],
        Capab: ['dialogue composition'],
        FP: ['align polis with the Good'],
      }),
      worldMods: {
        G: { voice: () => true, evidence: (claim) => ['logical', 'ideal'].includes(claim?.type ?? 'logical'), standing: () => true },
        Cons: ['Academy', 'Dialogues'],
      },
    },
    {
      id: 'aristotle',
      label: 'Aristotle',
      agent: makeAgent({
        name: 'Aristotle',
        IK: ['Eudaimonia (flourishing)'],
        AH: ['Lyceum empiricism'],
        SPTS: ['free_male_greek', 'natural_philosopher'],
        BROA: { Beliefs: ['teleology'], Rules: ['empiricism + logic'], Ontology: ['hylomorphism'], Authenticity: ['scholarly life'] },
        PRS: { salience: 0.6, coverage: 0.55 },
        ATCF: { coherence: 0.68 },
        Cap: ['classification', 'observation'],
        Capab: ['systematization'],
        FP: ['human flourishing'],
      }),
      worldMods: {
        G: {
          voice: (agent) => agent.SPTS.includes('free_male_greek'),
          evidence: (claim) => ['empirical', 'logical'].includes(claim?.type ?? 'empirical'),
          standing: () => true
        },
        Cons: ['Lyceum', 'Systematic classification'],
      },
    },
    {
      id: 'collins',
      label: 'Patricia Hill Collins',
      agent: makeAgent({
        name: 'Patricia Hill Collins',
        IK: ['Lived experience counts'],
        AH: ['Black feminist scholarship'],
        SPTS: ['Black woman', 'scholar', 'community'],
        BROA: { Beliefs: ['standpoint'], Rules: ['dialogue + accountability'], Ontology: ['social construction + materiality'], Authenticity: ['community responsibility'] },
        PRS: { salience: 0.7, coverage: 0.7 },
        ATCF: { coherence: 0.75 },
        Cap: ['community dialogue', 'theorizing'],
        Capab: ['standpoint methodology'],
        FP: ['strong objectivity'],
      }),
      worldMods: {
        G: { voice: () => true, evidence: (claim) => ['empirical','logical','lived_experience'].includes(claim?.type ?? 'lived_experience'), standing: () => true },
        Cons: ['Black feminist standpoint methodology'],
        MetaCons: ['review whose knowledge counts'],
      },
    },
    {
      id: 'foucault',
      label: 'Foucault',
      agent: makeAgent({
        name: 'Michel Foucault',
        IK: ['Power/knowledge entwined'],
        AH: ['Archives, institutions'],
        SPTS: ['genealogist', 'marginal'],
        BROA: { Beliefs: ['anti-essentialism'], Rules: ['archaeology + genealogy'], Ontology: ['discursive formations'], Authenticity: ['expose exclusions'] },
        PRS: { salience: 0.65, coverage: 0.6 },
        ATCF: { coherence: 0.62 },
        Cap: ['archive-reading'],
        Capab: ['discursive analysis'],
        FP: ['reveal gate construction'],
      }),
      worldMods: {
        G: { voice: () => true, evidence: () => true, standing: () => true },
        Cons: ['Archaeology of knowledge', 'Genealogy'],
        MetaCons: ['expose discipline gates'],
      },
    }
  ];

  state.scenarios = [
    { id: 'testimonial_1', type: 'testimonial', credBias: 0.35, description: 'Working-class student discounted' },
    { id: 'hermeneutical_1', type: 'hermeneutical', lexiconGap: 0.4, description: 'Missing term for lived pattern' },
  ];
}

export function getState() { return state; }
export function setState(next) { state = next; subs.forEach(fn => fn(state)); }
export function update(mutatorFn) { setState( mutatorFn({ ...state }) ); }
export function subscribe(fn) { subs.add(fn); return () => subs.delete(fn); }
