import express from "express";

const app = express();
const port = 3000;

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

app.get("/", (req, res) => {
  const quote = randomQuote();
  res.send(`"${quote.quote}" -${quote.author}`);
});

//a way for the client to send a request and add a quote (json file)
app.post("/", (req, res) => {
  const bodyBytes = []; // storage of the incoming data
  req.on("data", (chunk) => bodyBytes.push(...chunk)); //you listen for incoming data that arrives as a streams
  req.on("end", () => {  //waiting for the app to finish fetching the data and inside you can process the data where you can do whatever you want with it. 
    const bodyString = String.fromCharCode(...bodyBytes); //jut converting the bodyBytes into a string. 
    let body; // storage of the new data
    try {
      body = JSON.parse(bodyString); //converting the string into a JSON object and storing it in body.
    } catch (error) { //if the data is not the correct format the error will be caught
      console.error(`Failed to parse body ${bodyString} as JSON: ${error}`); //the response to the error
      res.status(400).send("Expected body to be JSON.");
      return;
    }
    if (typeof body != "object" || !("quote" in body) || !("author" in body)) {
      console.error(
        `Failed to extract quote and author from post body: ${bodyString}`,
      );
      res
        .status(400)
        .send(
          "Expected body to be a JSON object containing keys quote and author.",
        );
      return;
    }
    quotes.push({
      quote: body.quote,
      author: body.author,
    });
    res.send("ok");
  });
});

app.listen(port, () => {
  console.error(`Quote server listening on port ${port}`);
});
