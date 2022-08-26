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

const checkUsername = (username) => {
	const userNameRegex = /^[\w&.\-]+$/;
	return userNameRegex.test(String(username).toLocaleLowerCase());
};

export { checkEmptyFields, validateEmail, checkUsername };
