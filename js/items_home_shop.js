fetch("products-shop.json")
.then(response => response.json())
.then(date => {
    console.log(date);

// هذا الكود يخزن ولا يمسح المنتجات
    const cart=JSON.parse(localStorage.getItem("cart")) || []

    const swiper_items_sale=document.getElementById("swiper_items_sale")

    const swiper_Bestseller=document.getElementById("swiper_Bestseller")

    const swiper_appliances=document.getElementById("swiper_Ourproduct")







// product-1
    date.forEach(product => {
        if(product.old_price){
            
            const isInCart=cart.some(cartItem => cartItem.id === product.id)

            const parcent_disc=Math.floor((product.old_price - product.price) / product.old_price * 100)


            swiper_items_sale.innerHTML +=`
            
             <div class="swiper-slide product">
                        <span class="sale_present">%${parcent_disc}</span>

                        <div class="img_product">
                            <a href=""><img src="${product.img}" alt=""></a>
                        </div>

                        <div class="stars">
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                        </div>

                        <p class="name_product"><a href="">${product.name}</a></p>

                             <div class="price">
                              <p class="old_price">جنيه  ${product.old_price}</p>
                                <p><span> <span>${product.price} </span> جنيه</span></p>
                               
                             </div>

                             <div class="icons">
                           <span class="btn_add_cart ${isInCart ? 'active' : ''}" data-id="${product.id}">
                                    <i class="fa-solid fa-cart-plus"></i> ${isInCart ? 'تم اضافة الي السلة' : 'اضف الي السلة'}
                                </span>
                             </div>
                    </div>
            
            
            `

        }
})



////////////////////////////////////////
// product-2
date.forEach(product => {
    if (product.catetory == "Bestseller") {

        const isInCart = cart.some(cartItem => cartItem.id === product.id);

        // التأكد من أن السعر القديم ليس undefined، وإذا كان كذلك جعله 0
        let oldPrice = product.old_price;
        if (oldPrice === undefined || oldPrice === null) {
            oldPrice = 0;
        }

        // التحقق إذا كان هناك سعر قديم، وإظهاره بشكل صحيح
        const old_price_pragrahp = oldPrice ? `<p class="old_price">جنيه ${oldPrice}</p>` : "";

        // حساب نسبة الخصم فقط إذا كان هناك سعر قديم أكبر من 0
        const parcent_disc_div = oldPrice > 0 
            ? `<span class="sale_present">%${Math.floor((oldPrice - product.price) / oldPrice * 100)}</span>` 
            : "";


            swiper_Bestseller.innerHTML += `
        
        <div class="swiper-slide product">
               
                    ${parcent_disc_div}
                   <div class="img_product">
                       <a href=""><img src="${product.img}" alt=""></a>
                   </div>

                   <div class="stars">  
                       <i class="fa-solid fa-star"></i>
                       <i class="fa-solid fa-star"></i>
                       <i class="fa-solid fa-star"></i>
                       <i class="fa-solid fa-star"></i>
                       <i class="fa-solid fa-star"></i>
                   </div>

                   <p class="name_product"><a href="">${product.name}</a></p>

                        <div class="price">
                        ${old_price_pragrahp} <!-- استخدام السعر القديم المعدل -->
                        <p><span> <span>${product.price} </span> جنيه</span></p>
                                
                        </div>

                        <div class="icons">
                            <span class="btn_add_cart ${isInCart ? 'active' : ''}" data-id="${product.id}">
                                    <i class="fa-solid fa-cart-plus"></i> ${isInCart ? 'تم اضافة الي السلة' : 'اضف الي السلة'}
                                </span>
                        </div>
               </div>
       
       `;
    }
});




////////////////////////////////////////
// product-3

date.forEach(product => {
    if (product.catetory == "Ourproduct") {

        const isInCart = cart.some(cartItem => cartItem.id === product.id);

        // التأكد من أن السعر القديم ليس undefined، وإذا كان كذلك جعله 0
        let oldPrice = product.old_price;
        if (oldPrice === undefined || oldPrice === null) {
            oldPrice = 0;
        }

        // التحقق إذا كان هناك سعر قديم، وإظهاره بشكل صحيح
        const old_price_pragrahp = oldPrice ? `<p class="old_price">جنيه ${oldPrice}</p>` : "";

        // حساب نسبة الخصم فقط إذا كان هناك سعر قديم أكبر من 0
        const parcent_disc_div = oldPrice > 0 
            ? `<span class="sale_present">%${Math.floor((oldPrice - product.price) / oldPrice * 100)}</span>` 
            : "";


        swiper_Ourproduct.innerHTML += `
        
        <div class="swiper-slide product">
               
                    ${parcent_disc_div}
                   <div class="img_product">
                       <a href=""><img src="${product.img}" alt=""></a>
                   </div>

                   <div class="stars">  
                       <i class="fa-solid fa-star"></i>
                       <i class="fa-solid fa-star"></i>
                       <i class="fa-solid fa-star"></i>
                       <i class="fa-solid fa-star"></i>
                       <i class="fa-solid fa-star"></i>
                   </div>

                   <p class="name_product"><a href="">${product.name}</a></p>

                        <div class="price">
                        ${old_price_pragrahp} <!-- استخدام السعر القديم المعدل -->
                        <p><span> <span>${product.price} </span> جنيه</span></p>
                                
                        </div>

                        <div class="icons">
                            <span class="btn_add_cart ${isInCart ? 'active' : ''}" data-id="${product.id}">
                                    <i class="fa-solid fa-cart-plus"></i> ${isInCart ? 'تم اضافة الي السلة' : 'اضف الي السلة'}
                                </span>
                        </div>
               </div>
       
       `;
    }
});




///////////////////////////////////////////













})