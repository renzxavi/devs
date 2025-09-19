const form = document.getElementById('contactForm');
const formMessage = document.getElementById('form-message');

form.addEventListener('submit', async function(e) {
    // 1. Evita que la página se recargue al enviar
    e.preventDefault();

    // 2. Muestra un mensaje temporal mientras se envía
    formMessage.textContent = 'Enviando...';
    formMessage.classList.remove('success', 'error');
    formMessage.style.opacity = '1';

    // 3. Captura la URL de Formspree desde el atributo 'action'
    const actionUrl = e.target.action;

    // 4. Envía los datos del formulario de forma asíncrona
    try {
        const response = await fetch(actionUrl, {
            method: 'POST',
            body: new FormData(e.target),
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            formMessage.textContent = '¡Mensaje enviado con éxito!';
            formMessage.classList.add('success');
            form.reset(); // Limpia los campos del formulario
        } else {
            formMessage.textContent = '¡Ups! Hubo un problema al enviar el mensaje.';
            formMessage.classList.add('error');
        }
    } catch (error) {
        formMessage.textContent = 'Error de red. Por favor, inténtalo de nuevo.';
        formMessage.classList.add('error');
        console.error('Error al enviar el formulario:', error);
    }

    // 5. Oculta el mensaje después de unos segundos
    setTimeout(() => {
        formMessage.style.opacity = '0';
    }, 5000);
});