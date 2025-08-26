function showMessage(id, msg, color = "green") {
  const box = document.getElementById(id);
  if (box) {
    box.textContent = msg;
    box.style.color = color;
  }
}

// Regex Patterns
const nameRegex = /^[a-zA-Z\s]{3,20}$/; 
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/; 
const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;


// Sign Up
const signupForm = document.getElementById("signupForm");
if (signupForm) {
  signupForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const first = (document.getElementById("firstName")?.value || "").trim();
    const last  = (document.getElementById("lastName")?.value || "").trim();
    const name  = `${first} ${last}`.trim().replace(/\s+/g, " ");
    const email = document.getElementById("signupEmail").value.trim();
    const password = document.getElementById("signupPassword").value;

    // Validation
    if (!nameRegex.test(name)) {
      showMessage("signupMessage", "❌ Name must be 3–20 letters only.", "red");
      return;
    }
    if (!emailRegex.test(email)) {
      showMessage("signupMessage", "❌ Invalid email format.", "red");
      return;
    }
    if (!passwordRegex.test(password)) {
      showMessage(
        "signupMessage",
        "❌ Password must be at least 6 chars, include 1 uppercase, 1 number, 1 special char.",
        "red"
      );
      return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    // check if email already exists
    const exists = users.some((user) => user.email === email);
    if (exists) {
      showMessage("signupMessage", "❌ Email already registered!", "red");
      return;
    }

    users.push({ name, email, password });
    localStorage.setItem("users", JSON.stringify(users));

    showMessage("signupMessage", "✅ Account created successfully!");
    signupForm.reset();
  });
}

// Sign In
const signinForm = document.getElementById("signinForm");
if (signinForm) {
  signinForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("signinEmail").value.trim();
    const password = document.getElementById("signinPassword").value;

    // Validation
    if (!emailRegex.test(email)) {
      showMessage("signinMessage", "❌ Invalid email format.", "red");
      return;
    }
    if (password.length < 6) {
      showMessage("signinMessage", "❌ Password must be at least 6 characters.", "red");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find((u) => u.email === email && u.password === password);

    if (user) {
      showMessage("signinMessage", `🎉 Welcome back, ${user.name}!`);
      localStorage.setItem("loggedInUser", JSON.stringify(user));

      // redirect to home page after login
      setTimeout(() => {
        window.location.href = "index.html";
      }, 1000);
    } else {
      showMessage("signinMessage", "❌ Invalid email or password", "red");
    }
  });
}
