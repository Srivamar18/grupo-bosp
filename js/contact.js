/* ============================================
   GRUPO BOSP — Contact Form JavaScript
   Form validation, submission simulation
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  const form = document.getElementById('contactForm');
  const submitBtn = document.getElementById('submitBtn');
  const successMessage = document.getElementById('successMessage');

  if (!form) return;

  // ---------- Real-time Validation ----------
  const fields = {
    name: {
      element: document.getElementById('name'),
      validate: (value) => value.trim().length >= 2,
      errorMsg: 'Por favor ingresá tu nombre'
    },
    phone: {
      element: document.getElementById('phone'),
      validate: (value) => value.trim().length >= 8,
      errorMsg: 'Por favor ingresá tu teléfono'
    },
    email: {
      element: document.getElementById('email'),
      validate: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
      errorMsg: 'Por favor ingresá un email válido'
    },
    message: {
      element: document.getElementById('message'),
      validate: (value) => value.trim().length >= 10,
      errorMsg: 'El mensaje debe tener al menos 10 caracteres'
    }
  };

  // Add real-time validation on blur
  Object.keys(fields).forEach(key => {
    const field = fields[key];
    if (!field.element) return;

    field.element.addEventListener('blur', () => {
      validateField(key);
    });

    field.element.addEventListener('input', () => {
      // Remove error state on input
      if (field.element.classList.contains('error')) {
        field.element.classList.remove('error');
      }
      // Add success state if valid
      if (field.validate(field.element.value)) {
        field.element.classList.add('success');
      } else {
        field.element.classList.remove('success');
      }
    });
  });

  function validateField(key) {
    const field = fields[key];
    if (!field.element) return true;

    const isValid = field.validate(field.element.value);

    if (isValid) {
      field.element.classList.remove('error');
      field.element.classList.add('success');
    } else {
      field.element.classList.add('error');
      field.element.classList.remove('success');
      // Update error message
      const errorSpan = field.element.parentElement.querySelector('.form-error');
      if (errorSpan) {
        errorSpan.textContent = field.errorMsg;
      }
    }

    return isValid;
  }

  // ---------- Form Submission ----------
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Validate all fields
    let isFormValid = true;
    Object.keys(fields).forEach(key => {
      const valid = validateField(key);
      if (!valid) isFormValid = false;
    });

    if (!isFormValid) {
      // Scroll to first error
      const firstError = form.querySelector('.error');
      if (firstError) {
        firstError.focus();
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    // Simulate sending
    submitBtn.classList.add('loading');
    submitBtn.textContent = 'Enviando...';

    setTimeout(() => {
      // Show success
      form.style.display = 'none';
      successMessage.classList.add('show');
      submitBtn.classList.remove('loading');

      // Scroll to success message
      successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 1500);
  });

});

// ---------- Reset Form (global function) ----------
function resetForm() {
  const form = document.getElementById('contactForm');
  const submitBtn = document.getElementById('submitBtn');
  const successMessage = document.getElementById('successMessage');

  if (form) {
    form.reset();
    form.style.display = '';
    form.querySelectorAll('.success, .error').forEach(el => {
      el.classList.remove('success', 'error');
    });
  }

  if (submitBtn) {
    submitBtn.innerHTML = `
      Enviar Mensaje
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
    `;
  }

  if (successMessage) {
    successMessage.classList.remove('show');
  }
}
