'use srtict';
window.addEventListener('load', function () {

    let btn_cart = document.querySelectorAll('.product-card__img > button');
    btn_cart.forEach(btn => {
        btn.addEventListener('click', (event) => {
            if (event.target.innerText == 'Add to Cart') {
                event.target.innerHTML = 'Added';
            } else {
                event.target.innerHTML = '<img src="image/head/cart_logo.svg" alt="cart_logo__btn">' + 'Add to Cart';
            }
        });
    });

    let menu = this.document.querySelector('.menu-shell');
    let gamburger = this.document.querySelector('.gamburger');
    function disnone() {
        menu.style.display = 'none';
    }
    function disblock() {
        menu.style.display = 'block';
    }

    gamburger.addEventListener('click', event => {
        if (menu.classList.contains('hidden')) {
            menu.classList.remove('hidden');
        } else {
            this.setTimeout(function () {
                menu.classList.add('hidden');
            }, 450);

        }

    });


}, false);
