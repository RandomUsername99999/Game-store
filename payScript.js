
function validate() {
    if (document.getElementById("name").value == ""){alert("Enter name"); return}
    if (document.getElementById("cardNum").value == ""){alert("Enter card Num"); return}
    var currentYear = new Date().getFullYear()
    if (document.getElementById("exp").value < currentYear){alert("Card is expired"); return}
    if (document.getElementById("address").value == ""){alert("Enter address"); return}
    if (document.getElementById("email").value == ""){alert("Enter email"); return}
    var month = new Date().getMonth() + 2
    var day = new Date().getDate()
    alert(`Thank you for your purchase you will recieve your order on Month: ${month}, Day: ${day}`)
}

function summarizeOrder(){
    var cart =  JSON.parse(localStorage.getItem("Cart"))
    
    for (const [key, value] of Object.entries(cart)) {
        if(value <= 0){continue}
        document.getElementById("Summary").innerHTML += key + ":" + value + "&emsp;"
      }
}

summarizeOrder()
document.getElementById("Button").addEventListener("click", validate)