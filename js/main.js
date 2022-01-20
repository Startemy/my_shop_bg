'use srtict';
window.addEventListener('load', function () {

        /**@param Product - Конструктор товаров в корзине*/
    class Product {
            constructor(id, picture, name, description, price,){
                this.id = Number(id),
                this.picture = picture,
                this.name = name,
                this.description = description,
                this.price = Number(price)
            }
    }
    const products = [
        new Product(1, 'image/orders/for_man/blue_jaket.png', "ELLERY X M'O CAPSULE", 'Known for her sculptural takes on traditional tailoring, Australian arbiter of cool Kym Ellery teams up with Moda Operandi.', 10000.00),
        new Product(2, 'image/orders/for_women/black_suit.png', "ELLERY X M'O CAPSULE", 'Known for her sculptural takes on traditional tailoring, Australian arbiter of cool Kym Ellery teams up with Moda Operandi.', 9000.00),
        new Product(3, 'image/orders/for_man/man_panama.png', "ELLERY X M'O CAPSULE", 'Known for her sculptural takes on traditional tailoring, Australian arbiter of cool Kym Ellery teams up with Moda Operandi.', 8000.00),
        new Product(4, 'image/orders/for_man/man_shirt.png', "ELLERY X M'O CAPSULE", 'Known for her sculptural takes on traditional tailoring, Australian arbiter of cool Kym Ellery teams up with Moda Operandi.', 7000.00),
        new Product(5, 'image/orders/for_women/blue_jaket.png', "ELLERY X M'O CAPSULE", 'Known for her sculptural takes on traditional tailoring, Australian arbiter of cool Kym Ellery teams up with Moda Operandi.', 6000.00),
        new Product(6, 'image/orders/for_women/grey_shirt.png', "ELLERY X M'O CAPSULE", 'Known for her sculptural takes on traditional tailoring, Australian arbiter of cool Kym Ellery teams up with Moda Operandi.', 5000.00)
    ]
    /**Добаление карточек товара */
    products.forEach(product =>{
        document.querySelector('.products').insertAdjacentHTML('beforeend',
        `<div>
            <div class="product-card__img">
                <a href="views/prоduct.html">
                    <img class="product-card__imgstr" src=" ${product.picture}" alt="product_${product.id}">
                </a>
                <button data-id="${product.id}" type="submit">
                    <img src="image/head/cart_logo.svg" alt="cart_logo__btn">
                        Add to Cart
                    </img>
                </button>
            </div>
            <article>
                <h2><a href="views/prоduct.html">${product.name}</a></h2>
                <p>${product.description}</p>
                <strong>$${product.price}</strong>
            </article>
        </div>`);
    });
    document.querySelector('.ttl_price').innerHTML = 0;

        /**ПОЯВЛЯЮЩЕЕСЯ МЕНЮ */
        let menu = this.document.querySelector('.menu-shell');
        menu.classList.add('hidden');
        let gamburger = this.document.querySelector('.gamburger');
        gamburger.addEventListener('click', event => {
            if (menu.classList.contains('hidden')) {
                menu.classList.remove('hidden');
            } else {
                this.setTimeout(function () {
                    menu.classList.add('hidden');
                }, 450);
            }
        });

    /**@param order - Массив товаров для добавления в корзину */
    let order=[];
    let btn_cart = document.querySelectorAll('.product-card__img > button');
    btn_cart.forEach(function (button){
        /**слушаем нажатие на кнопку add to cart */
        button.addEventListener('click', clickOnBtn);
    });

    /** @param - функция нажатия на кннопку */
    function clickOnBtn(event){
            /**Меняем текст на добавленно */
        if (!event.target.hasAttribute('data-count')) {
            event.target.innerHTML = 'Added';
            setTimeout(function(){
                event.target.innerHTML = 'Delete from cart';
            },2000);

            // /**Добавить колиесктво в data-count - надо подумать? Думаю лучше менять количество в корзине */
            let i = 1;
            event.target.setAttribute('data-count', `${i}`);
            let quantyti = Number(event.target.getAttribute('data-count'))

            /**@param prodId получаем id из кнопки*/
            prodId(event.target.dataset.id, quantyti);
        }else {
            /**Повторное нажатие на кнопку Add to cart - удаляет из массива order и менят надпись */
            event.target.innerHTML = '<img src="image/head/cart_logo.svg" alt="cart_logo__btn">' + 'Add to Cart';
            let id = event.target.dataset.id;
            event.target.removeAttribute('data-count');

            /**@param  order.findIndex - Получение индекса элемента в массиве и удаление */
            const index = order.findIndex(function(item){
                item.order_id === +id
            });
            order.splice(index, 1);

            /**Ищем товар в OrderPreview и удаляем всего родителя */
            let fndId = document.querySelectorAll('.dispnone')
            fndId.forEach((event) => {
                let text = event.innerText;
                if(text == id){
                    event.parentElement.remove();
                }
            })
            totalPrice();

            /**Количество товара в корзине считается по длине массива */
            document.querySelector('.quant').innerText = `${order.length}`;
        }
    }

    /**@param prodId Получаем даннаые продукта по id из кнопки, записсываем в массив order */
    function prodId(id, quantyti){
        products.forEach(function(product){
            if(product.id === +id){

                /**Отправляем в массив для корзины */
                const prod = {
                    order_id: product.id,
                    order_picture: product.picture,
                    order_name: product.name,
                    order_price: product.price
                }
                order[order.length] = prod;

                /**@param preview.insertAdjacentHTML - добавляем товар в лист превью */
                let preview = document.querySelector('.cart_preview > ul')
                preview.insertAdjacentHTML('afterend', `
                <ul>
                    <li class='dispnone'>${product.id}</li>
                    <li>${product.name}</li>
                    <li>${quantyti} шт.</li>
                    <li>$${product.price}</li>
                    <li class='total_price'>$${product.price * quantyti}</li>
                </ul>
                `)
                document.querySelector('.quant').innerText = `${order.length}`;
            }
        });
        totalPrice();
    };

    /**Получаем общую сумму товаров */
    function totalPrice(){
    let li = document.querySelectorAll('.cart_preview > ul > li')
    li.forEach(function(totpr){
        if(totpr.classList.contains('total_price')){
            let total = 0;
            let ttlPrc = document.querySelectorAll('.total_price')
                for(let i = 0; i < ttlPrc.length; i++){
                    total += Number(ttlPrc[i].textContent.match(/\d+/));
                }
            document.querySelector('.ttl_price').innerHTML = total;
        }else if(!totpr.classList.contains('total_price')){
            total = 0;
            document.querySelector('.ttl_price').innerHTML = total;
        }
    });
    }

    /**Показ и скрытие Превью корзины */
    let orderPrvw = document.querySelector('.cart_preview')
    orderPrvw.style.display = 'none';

    document.querySelector('.quant').addEventListener('mouseover', function(){
        orderPrvw.style.display = 'block';
    });
    setTimeout(function(){
        document.querySelector('.quant').addEventListener('mouseout', function(){
            orderPrvw.style.display = 'none';
        });
    }, 1000)


}, false);
