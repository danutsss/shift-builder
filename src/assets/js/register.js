import {
	validateEmail,
	checkEmptyFields,
	checkUsername,
} from "../../services/utils/utils.js";

const firstNameField = document.querySelector("#firstName");
const lastNameField = document.querySelector("#lastName");
const emailField = document.querySelector("#emailAddress");
const userNameField = document.querySelector("#userName");
const ageField = document.querySelector("#age");
const passField = document.querySelector("#password");
const registerForm = document.querySelector("#registerForm");
const errorMsg = document.querySelector("#errorMsg");
const errorElement = document.querySelector("#errorElement");
const successElement = document.querySelector("#successElement");

registerForm.onsubmit = (event) => registerUser(event);

const registerUser = (event) => {
	// Prevent the form from reloading the page on submit.
	event.preventDefault();

	if (
		checkEmptyFields(
			firstNameField,
			lastNameField,
			emailField,
			userNameField,
			ageField,
			passField
		)
	) {
		errorElement.classList.remove("hidden");
		errorMsg.innerText = "Please fill in all fields.";
		return;
	}

	if (!checkUsername(userNameField.value)) {
		errorElement.classList.remove("hidden");
		errorMsg.innerText =
			"The username must contain a letter, a number and a special character.";
		return;
	}

	if (!validateEmail(emailField.value)) {
		errorElement.classList.remove("hidden");
		errorMsg.innerText = "Please enter a valid email address.";
		return;
	}

	if (passField.value.length < 8) {
		errorElement.classList.remove("hidden");
		errorMsg.innerText = "Password must be at least 8 characters long.";
		return;
	}

	if (userNameField.value.length < 6) {
		errorElement.classList.remove("hidden");
		errorMsg.innerText = "Username must be at least 6 characters long.";
		return;
	}

	if (firstNameField.value.length < 2) {
		errorElement.classList.remove("hidden");
		errorMsg.innerText = "First name must be at least 2 characters long.";
		return;
	}

	if (lastNameField.value.length < 2) {
		errorElement.classList.remove("hidden");
		errorMsg.innerText = "Last name must be at least 2 characters long.";
		return;
	}

	// Check if the user already exists.
	const userAlreadyCreated = JSON.parse(
		localStorage.getItem(emailField.value)
	);
	if (userAlreadyCreated) {
		errorElement.classList.remove("hidden");
		errorMsg.innerText = "User already exists.";
		return;
	}

	const user = {
		firstName: firstNameField.value,
		lastName: lastNameField.value,
		email: emailField.value,
		userName: userNameField.value,
		age: ageField.value,
		password: passField.value,
	};

	// Saving the user information to localStorage.
	localStorage.setItem(emailField.value, JSON.stringify(user));
	errorElement.classList.add("hidden");
	successElement.classList.remove("hidden");

	setTimeout(() => {
		window.location.href = "./login.html";
	}, 1500);
};
