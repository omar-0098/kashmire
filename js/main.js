let categoru_nav_list=document.querySelector(".categoru_nav_list")


function Open_Categ_list(){
    categoru_nav_list.classList.toggle("active")
}

let nav_links=document.querySelector(".nav_links")
function open_Menu(){
    nav_links.classList.toggle("active")
}

let cart=document.querySelector(".cart")
console.log(cart);

function open_close_cart(){
    cart.classList.toggle("active")
    
}


///////////////////////////////


const jsonFiles = [
    "products-shop.json",
    "../feyat/products-feyat.json",
    "products-shop-3.json",
    "products-shop-4.json",
    "products-shop-5.json"
  ];
  
  // دالة تحاول تحمل أول ملف شغال
  function fetchFirstAvailableJSON(files) {
    if (files.length === 0) {
      throw new Error("مافي ولا ملف JSON متوفر 😓");
    }
  
    const currentFile = files[0];
  
    return fetch(currentFile).then(response => {
      if (!response.ok) {
        // لو فيه مشكلة ننتقل للملف اللي بعده
        return fetchFirstAvailableJSON(files.slice(1));
      }
      return response.json();
    });
  }
  
  // الآن نستخدم الدالة
  fetchFirstAvailableJSON(jsonFiles)
    .then(data => {
      console.log("تم تحميل البيانات:", data);
  
      const addToCartBottons = document.querySelectorAll(".btn_add_cart");
  
      addToCartBottons.forEach(button => {
        button.addEventListener("click", (event) => {
          const productId = event.target.getAttribute("data-id");
  
          // 🔍 نحاول نلقى المنتج بناءً على الـ ID
          const selectedProduct = data.find(product => product.id == productId);
  
          // ⚠️ لو ما لقيناه نوقف وننبه المستخدم
          if (!selectedProduct) {
            alert("⚠️ هذا المنتج غير موجود حالياً في البيانات!");
            return;
          }
  
          // ✅ لو لقيناه نضيفه للسلة
          addToCart(selectedProduct);
  
          // 🛒 نحدث كل الأزرار اللي لها نفس الـ ID
          const allMatchingBotton = document.querySelectorAll(`.btn_add_cart[data-id="${productId}"]`);
  
          allMatchingBotton.forEach(btn => {
            btn.classList.add("active");
            btn.innerHTML = `<i class="fa-solid fa-cart-plus"></i> تم اضافة الي السلة`;
          });
        });
      });
    })
    .catch(error => {
      console.error("🚫 مشكلة في تحميل الملفات:", error);
    });
  
  



//////////////////////

function addToCart(product) {

    let cart = JSON.parse(localStorage.getItem('cart')) || []

    cart.push({... product , quantity: 1})
    localStorage.setItem('cart' , JSON.stringify(cart))
    updateCart()
}



function updateCart() {
    const cartItemsContainar=document.getElementById("cart_items")

    const cart = JSON.parse(localStorage.getItem('cart')) || []

    const checkout_items=document.getElementById("checkout_items")


    let items_input=document.getElementById("items")
    let total_price_input=document.getElementById("total_price")
    let count_items_input=document.getElementById("count_items")



    if(checkout_items){
        checkout_items.innerHTML=""



        items_input.value="";
        total_price_input.value="";
        count_items_input.value="";

    }

    var total_price = 0
    var total_count = 0


    cartItemsContainar.innerHTML = "" ;
    cart.forEach((item , index) =>{
    let total_price_item = item.price * item.quantity


        total_price +=total_price_item
        total_count +=item.quantity

        // checkout input

        if(checkout_items){
        items_input.value += item.name + "   ----    " + "price :  " + total_price_item + "  ------  " + "count : " + item.quantity + "\n";
       
        total_price_input.value = total_price + 20;
        count_items_input.value = total_count;
        }





       
        cartItemsContainar.innerHTML +=`
        
        
          <div class="item_cart">
                <img src="${item.img}" alt="">
                <div class="content">
                    <h4>${item.name}</h4>
                    <p class="price_cart"> ${total_price_item} ج</p>
                    <div class="quantity_control">
                        <button class="decrease_quantity" data-index=${index}>-</button>
                        <span class="quantity">${item.quantity}</span>
                        <button class="increase_quantity" data-index=${index}>+</button>
                    </div>
                </div>



                <button class="delet_item" data-index="${index}"><i class="fa-solid fa-trash"></i></button>
            </div>


        
        `

        if(checkout_items){
            checkout_items.innerHTML +=`
            
                 <div class="item_cart">


                            <div class="image_name">
                                <img src="${item.img}" alt="">
                                <div class="content">
                                    <h4>${item.name}</h4>
                                    <p class="price_cart">$${total_price_item}</p>
                                    <div class="quantity_control">
                                        <button class="decrease_quantity" data-index=${index}>-</button>
                                            <span class="quantity">${item.quantity}</span>
                                        <button class="increase_quantity" data-index=${index}>+</button>
                                    </div>
                                </div>
                            </div>

                 <button class="delet_item" data-index="${index}"><i class="fa-solid fa-trash"></i></button>


                        </div>
            
            `
        }

    })




    const price_cart_total = document.querySelector(".price_cart_total")

    const count_item_cart = document.querySelector(".Count_item_cart")

    const count_item_header = document.querySelector(".count_item_header")

    price_cart_total.innerHTML = `${total_price} ج`
   
    count_item_cart.innerHTML = total_count

    count_item_header.innerHTML = total_count


    if(checkout_items){
        const subtotal_checkout=document.querySelector(".subtotal_checkout")
        const total_checkout=document.querySelector(".total_checkout")

        subtotal_checkout.innerHTML=`${total_price} ج`
        total_checkout.innerHTML=`${total_price + 20} ج`

    }



    const increaseButtons = document.querySelectorAll(".increase_quantity")
    const decreaseButtons = document.querySelectorAll(".decrease_quantity")

    increaseButtons.forEach(button => {
        button.addEventListener("click" , (event) => {
            const itemIndex = event.target.getAttribute("data-index")
            increaseQuantity(itemIndex)
        })
    })



    decreaseButtons.forEach(button => {
        button.addEventListener("click" , (event) => {
            const itemIndex = event.target.getAttribute("data-index")
            decreaseQuantity(itemIndex)
        })
    })




    const deletButtons=document.querySelectorAll(".delet_item")

    deletButtons.forEach(button => {
        button.addEventListener("click" , (event) =>{
            const itemIndex = event.target.closest("button").getAttribute("data-index")
            removForCart(itemIndex)
        })
    })



}



function increaseQuantity(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || []
    cart[index].quantity += 1
    localStorage.setItem("cart" , JSON.stringify(cart))
    updateCart()
}



function decreaseQuantity(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || []
    if(cart[index].quantity > 1){
        cart[index].quantity -= 1
    }
    
    localStorage.setItem("cart" , JSON.stringify(cart))
    updateCart()
}





function removForCart(index) {
    const cart = JSON.parse(localStorage.getItem('cart')) || []

    const removeProduct = cart.splice(index , 1)[0]
    localStorage.setItem("cart" , JSON.stringify(cart))
    updateCart()
    updateButtonsState(removeProduct.id)
}


function updateButtonsState(productId){
    const allMatchingBotton=document.querySelectorAll(`.btn_add_cart[data-id="${productId}"]`)
    allMatchingBotton.forEach(button => {
        button.classList.remove('active')
        button.innerHTML=` <i class="fa-solid fa-cart-plus"></i> اضف الي السلة`

    })
}



// هذا الكود يخزن ولا يمسح المنتجات
updateCart()


let bigImags = document.getElementById("bidImg")

function changeItemImage(img){
    bigImags.src = img
}










