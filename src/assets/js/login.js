import { validateEmail, checkEmptyFields } from "../../services/utils/utils.js";

const emailField = document.querySelector("#emailAddress");
const passField = document.querySelector("#password");
const loginForm = document.querySelector("#loginForm");
const errorElement = document.querySelector("#errorElement");
const errorMsg = document.querySelector("#errorMsg");
const successElement = document.querySelector("#successElement");

loginForm.onsubmit = (event) => loginUser(event);

const loginUser = (event) => {
	// Prevent the form from reloading the page.
	event.preventDefault();

	// Check if the email and password fields are empty.
	if (checkEmptyFields(emailField, passField)) {
		errorElement.classList.remove("hidden");
		errorMsg.innerText = "Please fill in all fields.";
		return;
	}

	// Check if the email is valid.
	if (!validateEmail(emailField.value)) {
		errorElement.classList.remove("hidden");
		errorMsg.innerText = "Please enter a valid email address.";
		return;
	}

	// Get from localStorage the user with the email entered.
	const userInLocalStorage = localStorage.getItem(emailField.value);

	if (userInLocalStorage) {
		const user = JSON.parse(userInLocalStorage);

		// Check if there is already a user logged in.
		if (localStorage.getItem("loggedIn")) {
			errorElement.classList.remove("hidden");
			errorMsg.innerText = "You are already logged in.";
			return;
		}

		if (user.password === passField.value) {
			successElement.classList.remove("hidden");
			errorElement.classList.add("hidden");

			const updatedUser = {
				...user,
				isLoggedIn: true,
			};

			localStorage.setItem("loggedIn", JSON.stringify(updatedUser));

			setTimeout(() => {
				window.location.href = "./index.html";
			}, 1500);
		} else {
			errorElement.classList.remove("hidden");
			errorMsg.innerText = "Incorrect password.";
		}
	} else {
		errorElement.classList.remove("hidden");
		errorMsg.innerText = "User does not exist.";
	}
};
