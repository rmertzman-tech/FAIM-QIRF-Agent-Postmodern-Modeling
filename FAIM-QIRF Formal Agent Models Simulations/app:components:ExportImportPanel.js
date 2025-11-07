import { getState, setState } from '../store.js';

export function ExportImportPanel() {
  return `
    <div class="rounded-xl border bg-white p-4 shadow-sm">
      <h3 class="font-semibold text-gray-900 mb-2">Export / Import</h3>
      <div class="flex gap-2">
        <button id="btn-export" class="px-3 py-2 bg-indigo-600 text-white rounded-lg">Export JSON</button>
        <input id="file-import" type="file" accept="application/json" class="text-xs" />
      </div>
      <textarea id="export-json" class="mt-3 w-full h-28 text-xs border rounded p-2" placeholder="JSON appears here on export…"></textarea>
    </div>
  `;
}

export function bindExportImport(root) {
  root.querySelector('#btn-export').addEventListener('click', () => {
    const json = JSON.stringify(getState(), null, 2);
    root.querySelector('#export-json').value = json;
  });
  root.querySelector('#file-import').addEventListener('change', (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const data = JSON.parse(reader.result);
        // We trust structure for demo; in production validate schema
        setState(data);
        alert('Imported configuration applied.');
      } catch (err) {
        alert('Invalid JSON.');
      }
    };
    reader.readAsText(file);
  });
}
