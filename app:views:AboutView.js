export function renderAbout(app) {
  app.innerHTML = `
    <div class="rounded-xl border bg-white p-6 shadow-sm">
      <h2 class="text-xl font-bold text-gray-900">About this Demo</h2>
      <p class="text-gray-700 mt-2">
        This app demonstrates a <span class="font-semibold">FAIM-QIRF</span> flavored formalization for ethics & epistemic justice:
        agents as ⟨IK, PRS<sub>t</sub>, AH, BROA+, Cap, Capab, ATCF, FP, SPTS⟩; world as ⟨Ctx<sub>t</sub>, Cons, MetaCons, G⟩.
      </p>
      <ul class="list-disc ml-5 mt-3 text-gray-700">
        <li><span class="font-semibold">RecalibrateCred</span> — normalize credibility gates</li>
        <li><span class="font-semibold">LexiconExtend</span> — reduce hermeneutical gaps</li>
        <li><span class="font-semibold">MultiTrack</span> — plural evidence with equal-standing checks</li>
        <li><span class="font-semibold">TRC_Mini</span> — repair loop with measurable latency</li>
      </ul>
      <p class="mt-3 text-gray-700">
        All computations here are light-weight surrogates for classroom demos. We can progressively replace each with your
        formal definitions, proof-checked operators, and richer simulators (e.g., agent-based runs).
      </p>
    </div>
  `;
}
