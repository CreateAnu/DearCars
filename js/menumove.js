
  // Get all dropdown links
  const dropdownLinks = document.querySelectorAll('.dropdown-link');

  dropdownLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault(); // prevent "#" jump

      // Close all open dropdowns first
      document.querySelectorAll('.dropdown-menu').forEach(menu => {
        if (menu !== link.nextElementSibling) {
          menu.style.display = 'none';
        }
      });

      // Toggle this dropdown
      const dropdown = link.nextElementSibling;
      if (dropdown.style.display === 'block') {
        dropdown.style.display = 'none';
      } else {
        dropdown.style.display = 'block';
      }
    });
  });

  // Close dropdown if clicked outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.dropdown')) {
      document.querySelectorAll('.dropdown-menu').forEach(menu => {
        menu.style.display = 'none';
      });
    }
  });
