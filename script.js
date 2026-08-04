let shipments = [];
let currentIndex = 0;

const input = document.getElementById("input");

const barcode = document.getElementById("barcode");

const shipmentId = document.getElementById("shipmentId");

const progress = document.getElementById("progress");


function displayShipments() {

    const container = document.getElementById("barcodeContainer");

    container.innerHTML = "";

    shipments.forEach((id, index) => {

        const card = document.createElement("div");

        card.className = "barcodeCard";

        card.innerHTML = `
            <h2>Shipment ${index + 1} of ${shipments.length}</h2>

            <svg id="barcode${index}"></svg>

            <h2>${id}</h2>
        `;

        container.appendChild(card);

        JsBarcode(`#barcode${index}`, id, {
            format: "CODE128",
            width: 4,
            height: 180,
            displayValue: false,
            margin: 20
        });

    });
    
    updateCurrentShipment();
}

function updateCurrentShipment(){

    const cards = document.querySelectorAll(".barcodeCard");

    let closestCard = null;

    let closestDistance = Infinity;

    cards.forEach(card =>{

        const rect = card.getBoundingClientRect();

        const center = rect.top + rect.height/2;

        const distance = Math.abs(window.innerHeight/2 - center);

        if(distance < closestDistance){

            closestDistance = distance;

            closestCard = card;

        }

    });

    cards.forEach(card=>card.classList.remove("currentShipment"));

    if(closestCard){

        closestCard.classList.add("currentShipment");

    }

}

function loadShipments(text){

    shipments = extractShipmentIds(text);

    currentIndex = 0;

    if(shipments.length > 0){
        displayShipments();
    }else{
        alert("No shipment IDs found.");
    }

}

document.getElementById("nextBtn").addEventListener("click",()=>{

    if(currentIndex < shipments.length-1){

        currentIndex++;

        displayShipment();

    }

});

document.getElementById("prevBtn").addEventListener("click",()=>{

    if(currentIndex>0){

        currentIndex--;

        displayShipment();

    }

});

document.addEventListener("keydown", (event) => {

    if (shipments.length === 0) return;

    if (event.key === "ArrowRight" || event.key === " ") {

        if (currentIndex < shipments.length - 1) {
            currentIndex++;
            displayShipment();
        }

    }

    if (event.key === "ArrowLeft") {

        if (currentIndex > 0) {
            currentIndex--;
            displayShipment();
        }

    }

});

window.addEventListener("paste", (event)=>{

    const text = event.clipboardData.getData("text");

    input.value = text;

    loadShipments(text);

});

document.getElementById("fullscreenBtn").addEventListener("click", () => {

    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
        document.exitFullscreen();
    }

});

window.addEventListener("scroll", updateCurrentShipment);