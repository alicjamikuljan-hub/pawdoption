document.addEventListener("DOMContentLoaded", async () =>{
    try{
        const response = await fetch("/api/animals");
        const dogs = await response.json();

        const container = document.getElementById("animals");
        if (!container) return;
        container.innerHTML= "";

        dogs.forEach(dog => {
            const card = document.createElement("div");
            card.className = "card";
            card.innerHTML = `
              <img src="${dog.image}" alt="${dog.name}">
              <h3>${dog.name}</h3>
              <p>Pasmina za udomljavanje</p>  
            `;
            container.appendChild(card);
        });
    } catch (error) {
        console.error("Greška", error)
    }
});