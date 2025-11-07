// Minimal agent structure for demo purposes
export function makeAgent({
  name = 'Agent',
  IK = [],
  AH = [],
  SPTS = [],
  BROA = { Beliefs:[], Rules:[], Ontology:[], Authenticity:[] },
  PRS = { salience: 0.5, coverage: 0.5 },
  ATCF = { coherence: 0.5 },
  Cap = [],
  Capab = [],
  FP = [],
} = {}) {
  return { name, IK, AH, SPTS, BROA, PRS, ATCF, Cap, Capab, FP };
}
