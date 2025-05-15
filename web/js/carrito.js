document.addEventListener('DOMContentLoaded', () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const tbody = document.getElementById('cart-body');
    const totalDisplay = document.querySelector('.cart-total p');
    const vaciarBtn = document.getElementById('vaciar-carrito');

    function renderCart() {
        tbody.innerHTML = '';
        let total = 0;

        cart.forEach((item, index) => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;

            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.title}</td>
                <td>${item.price.toFixed(2)}€</td>
                <td>
                    <input type="number" value="${item.quantity}" min="1" max="10" data-index="${index}" class="cantidad-input" />
                </td>
                <td>${itemTotal.toFixed(2)}€</td>
                <td>
                    <button class="eliminar-btn" data-index="${index}">Eliminar</button>
                </td>
            `;
            tbody.appendChild(row);
        });

        totalDisplay.innerHTML = `<strong>Total:</strong> ${total.toFixed(2)}€`;
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    // Evento para cambiar cantidades
    tbody.addEventListener('input', e => {
        if (e.target.classList.contains('cantidad-input')) {
            const index = parseInt(e.target.dataset.index);
            const nuevaCantidad = parseInt(e.target.value);

            if (nuevaCantidad >= 1 && nuevaCantidad <= 10) {
                cart[index].quantity = nuevaCantidad;
                renderCart();
            }
        }
    });

    // Evento para eliminar un solo libro
    tbody.addEventListener('click', e => {
        if (e.target.classList.contains('eliminar-btn')) {
            const index = parseInt(e.target.dataset.index);
            cart.splice(index, 1);
            renderCart();
        }
    });

    // Vaciar todo el carrito
    vaciarBtn.addEventListener('click', () => {
        if (confirm('¿Estás seguro de que quieres vaciar el carrito?')) {
            localStorage.removeItem('cart');
            location.reload(); // Recarga para borrar la tabla
        }
    });

    renderCart();
});
