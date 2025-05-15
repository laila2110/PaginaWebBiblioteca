document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.add-to-cart');

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const title = button.dataset.title;
            const price = parseFloat(button.dataset.price);

            let cart = JSON.parse(localStorage.getItem('cart')) || [];

            const existingItem = cart.find(item => item.title === title);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({ title, price, quantity: 1 });
            }

            localStorage.setItem('cart', JSON.stringify(cart));
            alert(`"${title}" añadido al carrito.`);
        });
    });
});
