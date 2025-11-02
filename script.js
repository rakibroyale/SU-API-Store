const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const cardSection = document.getElementById("cardSection");
const loadingSection = document.getElementById("loadingSection");

searchButton.addEventListener("click", handleSearch);

searchInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    handleSearch();
  }
});

function toggleLoading(show) {
  if (!loadingSection) return;
  loadingSection.style.display = show ? "flex" : "none";
}

async function handleSearch() {
  const searchText = searchInput.value.trim();
  if (!searchText) {
    alert("Please enter a phone name to search!");
    return;
  }

  toggleLoading(true);

  cardSection.innerHTML = "";

  try {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    const res = await fetch(url);
    const data = await res.json();

    if (data.status && data.data.length > 0) {
      displayPhones(data.data);
    } else {
      cardSection.innerHTML = `<p style="text-align:center;font-size:1.2rem;color:#333;">No phones found. Try another name.</p>`;
    }
  } catch (error) {
    console.error("Error fetching phones:", error);
    cardSection.innerHTML = `<p style="text-align:center;color:red;">Something went wrong while fetching data.</p>`;
  } finally {
    toggleLoading(false);
  }
}

function displayPhones(phones) {
  cardSection.innerHTML = "";

  phones.forEach((phone) => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <div class="card-image">
        <img src="${phone.image}" alt="${phone.phone_name}" />
      </div>
      <h3 class="card-title">${phone.phone_name}</h3>
      <p class="card-description">Brand: ${phone.brand}</p>
      <div class="btn-card">
        <button class="btn">Details</button>
      </div>
    `;

    cardSection.appendChild(card);
  });
}
