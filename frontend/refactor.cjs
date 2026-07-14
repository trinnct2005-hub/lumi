const fs = require('fs');
const path = require('path');

const componentsDir = path.join(__dirname, 'src', 'components');
const files = fs.readdirSync(componentsDir);

files.forEach(file => {
  if (file.endsWith('.jsx')) {
    const filePath = path.join(componentsDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace window.Name = function Name with export default function Name
    content = content.replace(/window\.(\w+)\s*=\s*function\s+\1/g, 'export default function $1');
    content = content.replace(/window\.(\w+)\s*=\s*function/g, 'export default function');
    
    // Replace React.useState with useState and add import
    const hookMatches = [...content.matchAll(/React\.(useState|useEffect|useRef)/g)].map(m => m[1]);
    const uniqueHooks = [...new Set(hookMatches)];
    if (uniqueHooks.length > 0) {
      content = `import { ${uniqueHooks.join(', ')} } from 'react';\n` + content.replace(/React\./g, '');
    }

    fs.writeFileSync(filePath, content);
  }
});

// Update App.jsx
const appPath = path.join(__dirname, 'src', 'App.jsx');
let appContent = fs.readFileSync(appPath, 'utf8');
appContent = appContent.replace(/^const \{[^}]+\} = window;/, '');
appContent = appContent.replace(/window\.App\s*=\s*function\s+App/, 'export default function App');
appContent = appContent.replace(/const root = ReactDOM\.createRoot[\s\S]+$/, '');

// Inject imports for components
const imports = [
  "import Hero from './components/Hero.jsx';",
  "import LightSimulator from './components/LightSimulator.jsx';",
  "import Personalization from './components/Personalization.jsx';",
  "import SmartBase from './components/SmartBase.jsx';",
  "import ComparisonTable from './components/ComparisonTable.jsx';",
  "import TeamMembers from './components/TeamMembers.jsx';"
].join('\n');

appContent = imports + '\n\n' + appContent.trim();
fs.writeFileSync(appPath, appContent);

console.log('Refactoring complete.');
