// Hämta knappen och fältet
const input = document.getElementById('bookInput');
const button = document.getElementById('searchBtn');
const resultDiv = document.getElementById('result');

// När man klickar på "Sök"
button.addEventListener('click', async () => {
  const searchTerm = input.value.trim();

  if (!searchTerm) {
    resultDiv.innerHTML = "<p>Skriv något först!</p>";
    return;
  }

  resultDiv.innerHTML = "<p>Laddar böcker...</p>";

  try {
    // Hämta data från Open Library API
    const response = await fetch(`https://openlibrary.org/search.json?q=${searchTerm}`);
    const data = await response.json();

    // Om inga böcker hittades
    if (data.docs.length === 0) {
      resultDiv.innerHTML = "<p>Inga böcker hittades 😢</p>";
      return;
    }

    // Visa max 5 böcker
    resultDiv.innerHTML = "";
    data.docs.slice(0, 5).forEach(book => {
      const cover = book.cover_i
        ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
        : "https://via.placeholder.com/100x150?text=Ingen+bild";

      resultDiv.innerHTML += `
        <div class="book-card">
          <img src="${cover}" alt="bokomslag">
          <h3>${book.title}</h3>
          <p><strong>Författare:</strong> ${book.author_name ? book.author_name[0] : "Okänd"}</p>
        </div>
      `;
    });
  } catch (error) {
    resultDiv.innerHTML = "<p>Något gick fel, försök igen.</p>";
    console.error(error);
  }
});
