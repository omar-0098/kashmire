const scriptURL = "https://script.google.com/macros/s/AKfycby2NA_ysjrMtpA5cJFaXDeXG55-FvuO46ajiG7L9lNDgSmxalCLfRJpS5Vh8KHlqH7kgA/exec"


let form =document.getElementById("form_contact")
form.addEventListener("submit", (e) => {
    
    e.preventDefault();

  
      fetch(scriptURL, {
        method: "POST",
        body: new FormData(form),
      })
      .then((response) =>{
        setTimeout(() =>{
          localStorage.removeItem("cart")
          window.location.reload()
          
        },100)
      })
        // alert("سوف يتواصل احد معك من المسئولين")


      .catch((error) => console.error("Error!", error.message));
        
  
  });

