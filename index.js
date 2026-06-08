const express = require("express");
const axios = require("axios");
const path = require("path");

const app = express();
const PORT = 3000;
const DOG_API = "https://dog.ceo/api";

app.use(express.static(__dirname));
app.use(express.json());

app.get("/api/animals", async (req, res) => {
    try {
        const {data} = await axios.get(`${DOG_API}/breeds/list/all`);
        const breeds = Object.keys(data.message).slice(0,10);
        
        const breedsWithImages = await Promise.all(
            breeds.map(async breed => {
                const {data} = await axios.get(
                    `${DOG_API}/breed/${breed}/images/random`
                );

                return {
                    name: breed,
                    image: data.message
                };
            })
        );

        res.json(breedsWithImages);
    } catch (error) {
        res.status(500).json({ message: "Greška pri dohvaćanju podataka" });
    }
});

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "pocetna.html"));
});

app.listen(PORT, () => {
    console.log(`Server radi na portu ${PORT}`);
});