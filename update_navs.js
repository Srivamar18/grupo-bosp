const fs = require('fs');

const indexHtml = fs.readFileSync('index.html', 'utf8');
const navStartStr = '<nav class="navbar" id="navbar">';
const navEndStr = '</nav>';
const navStart = indexHtml.indexOf(navStartStr);
const navEnd = indexHtml.indexOf(navEndStr, navStart) + navEndStr.length;
const newNav = indexHtml.substring(navStart, navEnd);

['bosp-facility.html', 'bosp-argentina.html', 'bosp-tech.html'].forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  // Find first <nav> to </nav>
  const start = content.indexOf('<nav');
  const end = content.indexOf('</nav>', start) + '</nav>'.length;
  if (start !== -1 && end !== -1) {
    content = content.substring(0, start) + newNav + content.substring(end);
    fs.writeFileSync(file, content);
    console.log(`Updated ${file}`);
  }
});
