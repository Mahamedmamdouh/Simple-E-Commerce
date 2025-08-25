const slides = document.querySelectorAll(".slide");
const dotsContainer = document.querySelector(".dots");


slides.forEach((_, i) => {
  const dot = document.createElement("span");
  if (i === 0) dot.classList.add("active");
  dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll(".dots span");

let currentSlide = 0;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle("active", i === index);
    dots[i].classList.toggle("active", i === index);
  });
}

dots.forEach((dot, i) => {
  dot.addEventListener("click", () => {
    currentSlide = i;
    showSlide(currentSlide);
  });
});
// Auto play every 5s
setInterval(() => {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}, 5000)






// Function to show toast
function showToast(message, type = "success") {
  const container = document.getElementById("toast-container");

  const toast = document.createElement("div");
  toast.classList.add("toast");

  if (type === "success") {
    toast.innerHTML = `<i class="bi bi-check-circle-fill" style="color:green;"></i> ${message}`;
  } else if (type === "error") {
    toast.innerHTML = `<i class="bi bi-x-circle-fill" style="color:red;"></i> ${message}`;
  }

  container.appendChild(toast);

  // Remove after 3s
  setTimeout(() => {
    toast.remove();
  }, 3000);
}

// ================= Cart & Wishlist =================

// Wishlist (heart) icons
document.querySelectorAll(".product-actions .bi-heart").forEach(icon => {
  icon.addEventListener("click", (e) => {
    e.preventDefault();

    const productCard = icon.closest(".product-card");
    const product = {
      id: productCard.dataset.id, 
      name: productCard.querySelector(".product-title").textContent,
      price: productCard.querySelector(".current-price").textContent,
      image: productCard.querySelector("img").src
    };

    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    const exists = wishlist.some(item => item.id === product.id);

    if (exists) {
      showToast("Product already in wishlist", "error");
    } else {
      wishlist.push(product);
      localStorage.setItem("wishlist", JSON.stringify(wishlist));

      icon.classList.add("active");
      icon.style.color = "red";

      showToast("Product added to wishlist", "success");
    }
  });
});
