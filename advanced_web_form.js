// filename: advanced_web_form.js

// This code creates a sophisticated and complex web form with multiple input fields, validation, and data handling.

(function() {
  // Define form fields
  const formFields = [
    { id: 'name', label: 'Name', type: 'text', required: true },
    { id: 'email', label: 'Email', type: 'email', required: true },
    { id: 'phone', label: 'Phone', type: 'tel', required: false },
    { id: 'age', label: 'Age', type: 'number', required: true },
    { id: 'city', label: 'City', type: 'text', required: true },
    { id: 'country', label: 'Country', type: 'text', required: true },
  ];

  // Validate form fields
  function validateForm() {
    const errors = [];

    formFields.forEach(field => {
      const value = document.getElementById(field.id).value.trim();

      if (field.required && value === '') {
        errors.push(`${field.label} is required.`);
      }

      if (field.type === 'email' && !validateEmail(value)) {
        errors.push(`Invalid email address for ${field.label}.`);
      }

      if (field.type === 'number' && !validateNumber(value)) {
        errors.push(`Invalid number for ${field.label}.`);
      }
    });

    return errors;
  }

  // Email validation regex
  function validateEmail(email) {
    const re = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(String(email).toLowerCase());
  }

  // Number validation
  function validateNumber(number) {
    return !isNaN(number) && Number.isInteger(Number(number));
  }

  // Handle form submission
  function submitForm(event) {
    event.preventDefault();

    const errors = validateForm();

    if (errors.length === 0) {
      const formData = {};

      formFields.forEach(field => {
        formData[field.id] = document.getElementById(field.id).value.trim();
      });

      // Send formData to server or perform desired actions
      console.log('Form data submitted:', formData);
    } else {
      console.error('Form validation failed:', errors);
    }
  }

  // Create and append form elements
  const form = document.createElement('form');
  form.addEventListener('submit', submitForm);

  formFields.forEach(field => {
    const label = document.createElement('label');
    label.textContent = field.label;

    const input = document.createElement('input');
    input.id = field.id;
    input.name = field.id;
    input.type = field.type;
    if (field.required) {
      input.required = true;
    }

    form.appendChild(label);
    form.appendChild(input);
  });

  document.body.appendChild(form);
})();