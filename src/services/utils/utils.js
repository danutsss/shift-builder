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

export { checkEmptyFields, validateEmail, checkLoggedInUser, logoutUser };
