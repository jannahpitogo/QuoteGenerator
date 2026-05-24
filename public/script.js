function generateQuote() {
  const quote = document.getElementById("quote").value;
  const author = document.getElementById("author").value;

  if (quote.trim() === "" || author.trim() === "") {
    alert("Please fill in both fields.");
    return;
  }

  document.getElementById("displayQuote").innerText = `"${quote}"`;
  document.getElementById("displayAuthor").innerText = `- ${author}`;

  document.getElementById("quoteBox").style.display = "block";
}
