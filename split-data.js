const fs = require('fs');
const path = require('path');

const dataRaw = fs.readFileSync('dummy-data.json', 'utf-8');
let data;
try {
  data = JSON.parse(dataRaw);
} catch (e) {
  console.error("Failed to parse JSON");
  process.exit(1);
}

const rootKeys = data.fcc_dummy_data || data;

fs.mkdirSync('data', { recursive: true });

const mappings = {
  users: 'users',
  trademarks: 'trademarks',
  applications: 'applications',
  maintenance_applications: 'maintenance',
  agents: 'agents',
  inspections: 'inspections',
  enforcement_cases: 'enforcement',
  certificates: 'certificates',
  payments: 'payments',
  notifications: 'notifications',
  brela_mock_responses: 'brela',
  tanoga_shipments: 'tanoga',
  cso_rotation_schedule: 'rotations',
  kpi_dashboard_data: 'kpi',
  tro_register: 'tro',
  public_register_search_results: 'register'
};

for (const key of Object.keys(rootKeys)) {
  const fileNameSuffix = mappings[key] || key;
  const filePath = path.join('data', `mock-${fileNameSuffix}.ts`);
  
  const fileContent = `export const mock${fileNameSuffix.charAt(0).toUpperCase() + fileNameSuffix.slice(1)} = ${JSON.stringify(rootKeys[key], null, 2)};\n`;
  
  fs.writeFileSync(filePath, fileContent);
  console.log(`Generated ${filePath}`);
}

// Ensure mock-gepg exists as per prompt design requirement
if (!rootKeys.gepg) {
  const gepgContent = `export const mockGepg = {
    behavior: "Wait 2s, return SUCCESS."
  };\n`;
  fs.writeFileSync(path.join('data', 'mock-gepg.ts'), gepgContent);
}

console.log("Done.");
