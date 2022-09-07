const checkEmptyFields = (...fields) => {
	for (let field of fields) {
		if (field.value === "") {
			return true;
		}
	}
	return false;
};

const validateEmail = (email) => {
	const emailRegex =
		/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return emailRegex.test(String(email).toLowerCase());
};

const userNamePlaceholder = document.querySelector("#userName");

const checkLoggedInUser = () => {
	const loggedInUser = localStorage.getItem("loggedIn");
	if (loggedInUser) {
		const user = JSON.parse(loggedInUser);
		userNamePlaceholder.innerText = user.userName;
	} else {
		setTimeout(() => {
			window.location.href = "./login.html";
		}, 1500);
	}
};

const logoutUser = () => {
	localStorage.removeItem("loggedIn");
	window.location.href = "./login.html";
};

const calculateShiftTotalWage = (startTime, endTime, hourlyWage) => {
	const startTimeHours = parseInt(startTime.substring(0, 2)),
		startTimeMinutes = parseInt(startTime.substring(3, 5)),
		endTimeHours = parseInt(endTime.substring(0, 2)),
		endTimeMinutes = parseInt(endTime.substring(3, 5));

	let shiftTotalWage = (endTimeHours - startTimeHours) * hourlyWage;

	// If the end time is before the start time add the minutes.
	if (endTimeHours < startTimeHours) {
		shiftTotalWage = (24 - startTimeHours + endTimeHours) * hourlyWage;
	}

	if (endTimeMinutes > startTimeMinutes) {
		shiftTotalWage +=
			((endTimeMinutes - startTimeMinutes) / 60) * hourlyWage;
	} else if (endTimeMinutes < startTimeMinutes) {
		shiftTotalWage -=
			((startTimeMinutes - endTimeMinutes) / 60) * hourlyWage;
	}

	return shiftTotalWage.toFixed(2);
};
export {
	checkEmptyFields,
	validateEmail,
	checkLoggedInUser,
	logoutUser,
	calculateShiftTotalWage,
};
