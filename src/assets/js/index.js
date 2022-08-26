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
checkLoggedInUser();
