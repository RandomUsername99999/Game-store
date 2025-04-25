function createProduct(product, category){
    if (!cart[product.Name]) {
        cart[product.Name] = 0
    }
    var template = document.createElement("div")
    document.getElementById(category).appendChild(template)
    template.id = product.Name
    template.setAttribute("class", "Product")


    //Title
    var title = document.createElement("h1")
    title.setAttribute("class", "Title")
    title.innerText = product.Name
    template.appendChild(title)

    //Image
    var Image = document.createElement("img")
    Image.setAttribute("class", "Image")
    Image.src = product.Image
    template.appendChild(Image)
    
    //Description Div
    var Description = document.createElement("p")
    Description.setAttribute("class", "Description")
    Description.innerText = product.Description
    template.appendChild(Description)
    
    //Cart Tag
    var CartTag = document.createElement("div")
    var CartLabel = document.createElement("p")
    CartTag.setAttribute("class", "CartTag")
    CartTag.append(CartLabel)
    template.append(CartTag)

    //Remove Button
    var RemoveButton = document.createElement("Div")
    var RemoveLabel = document.createElement("p")
    RemoveLabel.innerText = "X"
    RemoveButton.setAttribute("class", "Remove")
    RemoveButton.appendChild(RemoveLabel)
    template.append(RemoveButton)
    RemoveButton.addEventListener("click", function(){removeFromCart(product)})

    //Price Tag
    var PriceTag = document.createElement("Div")
    var qtyLabel = document.createElement("label")
    var PriceLabel = document.createElement("label")
    var itemQuantity = document.createElement("input")
    var price = document.createElement("p")
    qtyLabel.innerText = "Amount: "
    PriceLabel.innerText = "Price: "
    itemQuantity.type = Number
    itemQuantity.value = 1
    price.innerText = product.Price + "$"
    PriceTag.setAttribute("class", "PriceTag")
    PriceTag.appendChild(qtyLabel)
    PriceTag.appendChild(itemQuantity)
    PriceTag.appendChild(PriceLabel)
    PriceTag.appendChild(price)
    template.append(PriceTag)

    itemQuantity.addEventListener("change", function() {updatePrice(product)})

    //Button Div
    var Button = document.createElement("button")
    Button.textContent = "Add To Cart"
    Button.setAttribute("class", "Button")
    template.appendChild(Button)
    //Listener events
    Button.addEventListener("click", function() {addToCart(product)})
    UpdateGui(product)
}

function updatePrice(product){
    var Amount = document.getElementById(product.Name).getElementsByTagName("input")[0].value
    var priceLabel = document.getElementById(product.Name).getElementsByTagName("p")[2]
    priceLabel.innerText = product.Price * Amount
}

function addToCart(product) {
    var amount = document.getElementById(product.Name).getElementsByTagName("input")[0].value
    if (isNaN(amount) || amount <= 0){
        alert("Please enter a valid number")
        return
    }
    console.log(`Add ${product.Name} ${amount} times`)
    cart[product.Name] +=  Number(amount)
    UpdateGui(product)    

    localStorage.setItem("Cart", JSON.stringify(cart))
}

function UpdateGui(product){
    if (cart[product.Name] <= 0){
        document.getElementById(product.Name).getElementsByTagName("p")[1].innerText = ""}
    else{
        document.getElementById(product.Name).getElementsByTagName("p")[1].innerText = "Cart: " + cart[product.Name]
    }

    var total = 0
    for (const [key, value] of Object.entries(cart)) {
        total += value
      }
    if (total > 99) {
        document.getElementById("Label").innerText = "99+"
    } else {
        document.getElementById("Label").innerText = total
    }
}

function displayCart(){
    document.getElementById("DisplayCart").style.visibility = "visible";
    for (const [key, value] of Object.entries(cart)) {
        if (value == 0){continue}
        var tr = document.createElement("tr")
        var name = document.createElement("td")
        var qty = document.createElement("td")
        var price = document.createElement("td")
        tr.setAttribute("class", "tableData")

        name.innerText = key
        qty.innerText = value
        price.innerText = 100

        tr.appendChild(name)
        tr.appendChild(qty)
        tr.appendChild(price)

        document.getElementById("DisplayCart").getElementsByTagName("table")[0].appendChild(tr)
      }
      
}

function closeCart() {
    var table = document.getElementById("DisplayCart").getElementsByClassName("tableData")
    for (const [key, value] of Object.entries(table)) {
        value.remove()
      }
    
    document.getElementById("DisplayCart").style.visibility = "hidden";
}

function removeFromCart(product){
    cart[product.Name] = 0
    UpdateGui(product)
    localStorage.setItem("Cart", JSON.stringify(cart))
}

function addToFavourites(){
    var total = 0
    for (const [key, value] of Object.entries(cart)) {
        total += value
    }

    if (total <= 0){alert("Cart is empty!"); return}
    localStorage.setItem("Favourites", JSON.stringify(cart))
    alert("Saved to favourites")
}

function applyFavourites(){
    if(!localStorage.getItem("Favourites")){alert("Nothing in Favourites"); return}
    cart = JSON.parse(localStorage.getItem("Favourites"))
    localStorage.setItem("Cart", JSON.stringify(cart))
    closeCart()
    displayCart()
    alert("Favourites added to cart")
}

function buy(){
    var total = 0
    for (const [key, value] of Object.entries(cart)) {
        total += value
    }
    if (total <= 0){alert("There's nothing in your cart!"); return}
    location.href = "./Pay.html"
}

async function fetchJSONData() {
    const response = await fetch("./Products.json");
    const data = await response.json();
    for (const key in data) {
        var title = document.createElement("h2")
        title.innerText = key
        document.body.appendChild(title)
        var template = document.createElement("div")
        document.body.appendChild(template)
        template.setAttribute("class", "ProductsFrame")
        template.id = key
        Object.entries(data[key]).forEach(([k,v]) => {createProduct(v, key)})
    }
    
}
var store = JSON.parse(localStorage.getItem("Cart"))
var cart = store || {}
fetchJSONData(); 
document.getElementById("Cart").addEventListener("click", function(){displayCart()})
document.getElementById("CloseCart").addEventListener("click", function(){closeCart()})

document.getElementById("Buy").addEventListener("click", function(){buy()})
document.getElementById("ApplyFavourites").addEventListener("click", function(){applyFavourites()})
document.getElementById("AddFavourites").addEventListener("click", function(){addToFavourites()})