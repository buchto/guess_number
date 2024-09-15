const express = require('express');
const app = express();
const PORT = 3001;

app.use(express.json());

let attempts = 0;
let randomNumber = Math.floor(Math.random() * 100) + 1; 

app.get('/', (req, res) => {
  res.send('Zgadnij liczbę od 1 do 100')
});

app.post('/guess', (req, res) => {
  const guessesNumber = req.body.number;

  if (!guessesNumber || typeof guessesNumber !== 'number') {
    return res.status(400).send({message: "Podałeś liczbę z innego zakresu niż 1-100, bądź typ danych niebędących liczbą. Podaj poprawne dane"});
  }

  attempts++;

  if (guessesNumber > randomNumber) {
    res.send({message: "Liczba jest za duża", attempts});
  } else if (guessesNumber < randomNumber) {
    res.send({message: "Liczba jest za mała", attempts});
  } else {
    res.send({message: "Gratulacje! Zgadłeś liczbę w ${attempts} próbach", number: randomNumber})
    //reset
    randomNumber = Math.floor(Math.random() * 100) + 1;
    attempts = 0;
  }
});


app.listen(PORT, function () {
  console.log("start serwera na porcie " + PORT );
})