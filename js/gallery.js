const gallery = document.getElementById("carGallery");
const brandSelect = document.getElementById("brandSelect");
const yearSelect = document.getElementById("yearSelect");

let allCars = [];

async function fetchCars() {
  try {
    const response = await fetch('data/cars.json');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    allCars = await response.json();
    allCars.sort((a, b) => a.brand.localeCompare(b.brand));
    populateFilters();
    renderGallery();
  } catch (error) {
    console.error("Could not fetch cars:", error);
    gallery.innerHTML = "<p>Error loading cars. Please try again later.</p>";
  }
}

function populateFilters() {
  brandSelect.innerHTML = '<option value="All">All</option>';
  yearSelect.innerHTML = '<option value="All">All</option>';

  const brands = ["All", ...new Set(allCars.map(car => car.brand))].sort();
  const years = ["All", ...new Set(allCars.map(car => car.year))].sort((a, b) => a - b);

  brands.forEach(brand => {
    const option = document.createElement("option");
    option.value = brand;
    option.textContent = brand;
    brandSelect.appendChild(option);
  });

  years.forEach(year => {
    const option = document.createElement("option");
    option.value = year;
    option.textContent = year;
    yearSelect.appendChild(option);
  });
}

function renderGallery() {
  const brandFilter = brandSelect.value;
  const yearFilter = yearSelect.value;

  const filteredCars = allCars.filter(car => {
    const brandMatch = brandFilter === "All" || car.brand === brandFilter;
    const yearMatch = yearFilter === "All" || car.year == yearFilter;
    return brandMatch && yearMatch;
  });

  gallery.innerHTML = "";

  if (filteredCars.length === 0) {
    gallery.innerHTML = "<p>No cars found matching your filters.</p>";
    return;
  }

  filteredCars.forEach(car => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <a href="cardetail.html?id=${car.id}" class="card-link">
        <img src="${car.thumbnail}" alt="${car.title}" loading="lazy" />
        <div class="card-content">
          <h3>${car.title}</h3>
          <p>${car.desc}</p>
          <p><strong>${car.year}</strong> • ${car.brand}</p>
        </div>
      </a>
    `;
    gallery.appendChild(card);
  });
}

brandSelect.addEventListener("change", renderGallery);
yearSelect.addEventListener("change", renderGallery);

fetchCars();