const fs = require('fs');
const file = 'bosp-argentina.html';
let content = fs.readFileSync(file, 'utf8');

const regex = /<!-- Hero Section -->[\s\S]*?<!-- Nuestra Empresa & Quiénes Somos -->/;
const replacementStr = `<!-- Hero Section -->
                <section class="relative w-full h-[85vh] min-h-[600px] flex items-center justify-center overflow-hidden bg-surface-dim">
                        <div class="absolute inset-0 z-0">
                                <video class="w-full h-full object-cover" autoplay muted loop playsinline>
                                        <source src="videos/videoargentina.mp4" type="video/mp4">
                                </video>
                                <div class="absolute inset-0 bg-gradient-to-r from-on-surface/80 via-on-surface/40 to-transparent"></div>
                        </div>
                        <div class="relative z-10 text-center px-6 max-w-4xl mx-auto">
                                <h1 class="text-white text-headline-xl md:text-5xl lg:text-6xl font-bold mb-4 drop-shadow-md">
                                        Seguridad Privada con Respaldo Operativo</h1>
                                <p class="text-white/90 text-body-lg mb-8 max-w-2xl mx-auto drop-shadow">Brindamos
                                        soluciones integrales de seguridad con personal altamente capacitado y
                                        tecnología de vanguardia.</p>
                                <a class="inline-flex items-center justify-center bg-primary text-on-primary px-8 py-3 rounded-full font-label-md hover:bg-primary-container hover:text-on-primary-container transition-colors shadow-lg"
                                        href="#contacto">
                                        Contáctenos
                                </a>
                        </div>
                </section>
                <!-- Nuestra Empresa & Quiénes Somos -->`;

if (regex.test(content)) {
  content = content.replace(regex, replacementStr);
  fs.writeFileSync(file, content);
  console.log('Replaced successfully');
} else {
  console.log('Regex not matched');
}
