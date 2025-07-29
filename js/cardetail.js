document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const carId = urlParams.get('id');

  const loadingMessage = document.getElementById('loadingMessage');
  const errorMessage = document.getElementById('errorMessage');
  const carDetailContent = document.getElementById('carDetailContent');

  if (!carId) {
    loadingMessage.style.display = 'none';
    errorMessage.style.display = 'block';
    errorMessage.textContent = 'Error: No car ID provided in the URL.';
    return;
  }

  async function fetchCarDetails(id) {
    try {
      const response = await fetch('data/cars.json');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const allCars = await response.json();
      const car = allCars.find(c => c.id === id);

      if (car) {
        populateCarDetails(car);
        loadingMessage.style.display = 'none';
        carDetailContent.style.display = 'block';
      } else {
        loadingMessage.style.display = 'none';
        errorMessage.style.display = 'block';
        errorMessage.textContent = `Car with ID "${id}" not found.`
      }
    } catch (error) {
      console.error("Could not fetch car details:", error);
      loadingMessage.style.display = 'none';
      errorMessage.style.display = 'block';
      errorMessage.textContent = 'Error loading car details. Please try again later.';
    }
  }

  function populateCarDetails(car) {
    document.title = `Big Cars - ${car.title}`;

    document.getElementById('carTitle').textContent = car.title;
    document.getElementById('carBrand').textContent = car.brand;
    document.getElementById('carDescription').textContent = car.desc;
    document.getElementById('carEngine').textContent = car.details.engine;
    document.getElementById('carTransmission').textContent = car.details.transmission;
    document.getElementById('carHorsepower').textContent = car.details.horsepower;
    document.getElementById('carZeroToSixty').textContent = car.details.zeroToSixty;
    document.getElementById('carYear').textContent = car.year;
    document.getElementById('carModel').textContent = car.details.model;
    document.getElementById('carTopSpeed').textContent = car.details.topSpeed;
    document.getElementById('carPrice').textContent = car.details.price;

    const carouselIndicators = document.getElementById('carouselIndicators');
    const carouselInner = document.getElementById('carouselInner');
    carouselIndicators.innerHTML = '';
    carouselInner.innerHTML = '';

    car.details.images.forEach((imgSrc, index) => {
      const indicator = document.createElement('li');
      indicator.setAttribute('data-target', '#myCarousel');
      indicator.setAttribute('data-slide-to', index);
      if (index === 0) {
        indicator.classList.add('active');
      }
      carouselIndicators.appendChild(indicator);

      const item = document.createElement('div');
      item.classList.add('item');
      if (index === 0) {
        item.classList.add('active');
      }
      const img = document.createElement('img');
      img.src = imgSrc;
      img.alt = `${car.title} - Image ${index + 1}`;
      img.setAttribute('loading', 'lazy');
      item.appendChild(img);
      carouselInner.appendChild(item);
    });

    if (typeof jQuery !== 'undefined' && $.fn.carousel) {
      $('#myCarousel').carousel({
        interval: 5000
      });
    } else {
      console.warn('Bootstrap carousel requires jQuery. Make sure jQuery is loaded before cardetail.js');
    }
  }

  fetchCarDetails(carId);
});