const form = document.getElementById("quote-form");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const quote = document.getElementById("quote").value;
  const author = document.getElementById("author").value;

  const res = await fetch("/newquotes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      quote,
      author,
    }),
  });

  const data = await res.text();
  form.reset();

  return data;
});

async function newQuote() {
  try {
    const response = await fetch("/quote");

    if (!response.ok) throw new Error("Server error");

    const quoteString = await response.text();

    document.getElementById("quote-container").textContent = quoteString;
  } catch (error) {
    document.getElementById("quote-container").textContent =
      "Connection error. Is it running?";
  }
}

const newQuoteButton = document.getElementById("new-quote-button");
newQuoteButton.addEventListener("click", newQuote);
newQuoteButton.style.cursor = "pointer";

window.onload = newQuote;
