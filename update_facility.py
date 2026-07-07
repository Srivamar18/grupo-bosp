import re

def update():
    # 1. Get universal navbar from current bosp-facility.html
    current_html = open('bosp-facility.html', 'r', encoding='utf-8').read()
    nav_match = re.search(r'(<!-- Universal Navbar -->.*?<div class="h-\[80px\] w-full bg-background"></div>)', current_html, re.DOTALL)
    if not nav_match:
        print("Could not find Universal Navbar in bosp-facility.html")
        return
    universal_navbar = nav_match.group(1)

    # 2. Get new HTML from new_facility.html
    new_html = open('new_facility.html', 'r', encoding='utf-8').read()

    # 3. Replace navbar
    new_html = re.sub(r'<!-- TopNavBar -->.*?<!-- Hero Section -->', universal_navbar + '\n<!-- Hero Section -->', new_html, flags=re.DOTALL)

    # 4. Map images
    replacements = {
        r'src="[^"]+"(?=[^>]*alt="Maintenance Professional")|(?<=alt="Maintenance Professional")[^>]*src="[^"]+"': 'src="images/facility/facility3.jpg"',
        r'src="[^"]+"(?=[^>]*alt="Limpieza Profesional")|(?<=alt="Limpieza Profesional")[^>]*src="[^"]+"': 'src="images/facility/facility5.jpg"',
        r'src="[^"]+"(?=[^>]*alt="Mantenimiento Preventivo")|(?<=alt="Mantenimiento Preventivo")[^>]*src="[^"]+"': 'src="images/facility/facility7.jpg"',
        r'src="[^"]+"(?=[^>]*alt="Gestión de Instalaciones")|(?<=alt="Gestión de Instalaciones")[^>]*src="[^"]+"': 'src="images/facility/facility4.jpg"',
        r'src="[^"]+"(?=[^>]*alt="Servicio de Calidad")|(?<=alt="Servicio de Calidad")[^>]*src="[^"]+"': 'src="images/facility/facility2.jpg"' # Changed facility11 to facility2 since quality usually maps to a generic image, and 2 is unused.
    }
    
    # Actually, simpler to just replace all base64/http images using regex matching the alt tag
    # Let's find all alt/src pairs first
    
    # Function to replace src in an img tag based on its alt attribute
    def replace_src(match):
        img_tag = match.group(0)
        
        if 'alt="Maintenance Professional"' in img_tag:
            return re.sub(r'src="[^"]+"', 'src="images/facility/facility3.jpg"', img_tag)
        elif 'alt="Limpieza Profesional"' in img_tag:
            return re.sub(r'src="[^"]+"', 'src="images/facility/facility5.jpg"', img_tag)
        elif 'alt="Mantenimiento Preventivo"' in img_tag:
            return re.sub(r'src="[^"]+"', 'src="images/facility/facility7.jpg"', img_tag)
        elif 'alt="Gestión de Instalaciones"' in img_tag:
            return re.sub(r'src="[^"]+"', 'src="images/facility/facility4.jpg"', img_tag)
        elif 'alt="Servicio de Calidad"' in img_tag:
            return re.sub(r'src="[^"]+"', 'src="images/facility/facility2.jpg"', img_tag)
        return img_tag

    new_html = re.sub(r'<img[^>]+>', replace_src, new_html)

    # Write the updated HTML back to bosp-facility.html
    open('bosp-facility.html', 'w', encoding='utf-8').write(new_html)
    print("bosp-facility.html has been updated successfully.")

if __name__ == "__main__":
    update()
