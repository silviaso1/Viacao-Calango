document.addEventListener("DOMContentLoaded", () => {
    const selectedSeats = new Set(); 
    const seats = document.querySelectorAll(".seat:not(.occupied)"); 
    const btnReservar = document.getElementById("btnReservar");

    seats.forEach(seat => {
        seat.addEventListener("click", () => {
            const seatId = seat.getAttribute("data-seat");
            if (selectedSeats.has(seatId)) {
                selectedSeats.delete(seatId); 
                seat.classList.remove("selected");
            } else {
                selectedSeats.add(seatId); 
                seat.classList.add("selected");
            }
        });
    });


    btnReservar.addEventListener("click", () => {
        const tipoPassagem = document.getElementById("tipoPassagem").value;
        const preco = document.getElementById("preco").value;

       
        const data = {
            poltronas: Array.from(selectedSeats), 
            tipoPassagem,
            preco
        };

      
        fetch("processar_reserva.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(data => {
                alert(data.mensagem); 
            })
            .catch(error => {
                console.error("Erro ao enviar dados:", error);
            });
    });
});