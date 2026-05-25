import express from "express";

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static("public"));

const quotes = [
  {
    quote:
      "Either write something worth reading or do something worth writing.",
    author: "Benjamin Franklin",
  },
  {
    quote: "I should have been more kind.",
    author: "Clive James",
  },
];

function randomQuote() {
  const index = Math.floor(Math.random() * quotes.length);
  return quotes[index];
}

app.get("/quote", (req, res) => {
  const quote = randomQuote();
  res.send(`"${quote.quote}" -${quote.author}`);
});

app.post("/newquotes", (req, res) => {
  const body = req.body;

  if (typeof body != "object" || !("quote" in body) || !("author" in body)) {
    res
      .status(400)
      .send(
        "Expected body to be a JSON object containing keys quote and author.",
      );
    return res;
  }

  quotes.push({
    quote: body.quote,
    author: body.author,
  });
  res.send("ok");
});

app.listen(port, () => {
  console.error(`Quote server listening on port ${port}`);
});
