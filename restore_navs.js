const { execSync } = require('child_process');
const fs = require('fs');

['bosp-facility.html', 'bosp-argentina.html', 'bosp-tech.html'].forEach(file => {
  // Get original file from git HEAD
  const original = execSync(`git show HEAD:${file}`).toString();
  const startOriginal = original.indexOf('<nav');
  const endOriginal = original.indexOf('</nav>', startOriginal) + '</nav>'.length;
  const originalNav = original.substring(startOriginal, endOriginal);

  // Get current working file
  let current = fs.readFileSync(file, 'utf8');
  const startCurrent = current.indexOf('<nav');
  const endCurrent = current.indexOf('</nav>', startCurrent) + '</nav>'.length;
  
  if (startCurrent !== -1 && endCurrent !== -1 && startOriginal !== -1 && endOriginal !== -1) {
    current = current.substring(0, startCurrent) + originalNav + current.substring(endCurrent);
    fs.writeFileSync(file, current);
    console.log(`Restored nav in ${file}`);
  }
});
