import {
	checkEmptyFields,
	checkLoggedInUser,
	logoutUser,
} from "../../services/utils/utils.js";

checkLoggedInUser();

const shiftSlugField = document.querySelector("#shiftSlug");
const shiftDateField = document.querySelector("#shiftDate");
const startTimeField = document.querySelector("#startTime");
const endTimeField = document.querySelector("#endTime");
const hourlyWageField = document.querySelector("#hourlyWage");
const workPlaceField = document.querySelector("#workPlace");
const shiftCommentsField = document.querySelector("#shiftComments");
const addShiftForm = document.querySelector("#addShift");
const errorElement = document.querySelector("#errorElement");
const successElement = document.querySelector("#successElement");
const errorMsg = document.querySelector("#errorMsg");

const logoutButton = document.querySelector("#logoutButton");
logoutButton.addEventListener("click", logoutUser);

addShiftForm.onsubmit = (event) => addShift(event);

const addShift = (event) => {
	// Prevent the form from reloading the page.
	event.preventDefault();

	// Check if any of the fields is empty.
	if (
		checkEmptyFields(
			shiftSlugField,
			shiftDateField,
			startTimeField,
			endTimeField,
			hourlyWageField,
			workPlaceField
		)
	) {
		errorElement.style.display = "block";
		errorMsg.innerHTML = "Please fill in all the fields.";
		return;
	}

	// Check if there is already a shift with the same slug.
	const localStorageShifts = JSON.parse(localStorage.getItem("shifts")) || [];
	const shiftWithSameSlug = localStorageShifts.find(
		(shift) => shift.slug === shiftSlugField.value
	);

	if (shiftWithSameSlug) {
		errorElement.style.display = "block";
		errorMsg.innerHTML = "There is already a shift with this slug.";
		return;
	}

	// Check if the start time is before the end time.
	const startTime = new Date(
		`${shiftDateField.value} ${startTimeField.value}`
	);
	const endTime = new Date(`${shiftDateField.value} ${endTimeField.value}`);
	if (startTime > endTime) {
		errorElement.style.display = "block";
		errorMsg.innerHTML = "The start time cannot be after the end time.";
		return;
	}

	// Add the shift to localStorage.
	const newShift = {
		slug: shiftSlugField.value,
		date: shiftDateField.value,
		startTime: startTimeField.value,
		endTime: endTimeField.value,
		hourlyWage: hourlyWageField.value,
		workPlace: workPlaceField.value,
		comments: shiftCommentsField.value,
	};

	localStorageShifts.push(newShift);
	localStorage.setItem("shifts", JSON.stringify(localStorageShifts));

	successElement.style.display = "block";
	errorElement.style.display = "none";
};
