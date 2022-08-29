import { checkLoggedInUser, logoutUser } from "../../services/utils/utils.js";
checkLoggedInUser();

const bestMonthField = document.querySelector("#bestMonth");
const tableBody = document.querySelector("#tableBody");
const startDate = document.querySelector("#startDate");
const endDate = document.querySelector("#endDate");
const searchTable = document.querySelector("#shiftsTable");
const searchInput = document.querySelector("#searchInput");
const logoutButton = document.querySelector("#logoutButton");
logoutButton.addEventListener("click", logoutUser);

const loadShifts = () => {
	const localStorageShifts = JSON.parse(localStorage.getItem("shifts")) || [];

	localStorageShifts.forEach((shift) => {
		const shiftProfit =
			shift.hourlyWage *
			(shift.endTime.split(":")[0] - shift.startTime.split(":")[0]);

		const shiftRow = document.createElement("tr");
		shiftRow.classList.add(
			"border-b",
			"border-gray-200",
			"hover:bg-gray-100"
		);

		shiftRow.innerHTML = `
			<td class="px-6 py-3">${shift.date}</td>
			<td class="px-6 py-3">${shift.startTime}</td>
			<td class="px-6 py-3">${shift.endTime}</td>
			<td class="px-6 py-3">${shift.hourlyWage} RON</td>
			<td class="px-6 py-3">${shift.workPlace}</td>
			<td class="px-6 py-3">${shiftProfit} RON</td>
		`;

		tableBody.appendChild(shiftRow);
	});
};

loadShifts();

const calculateBestMonth = () => {
	const localStorageShifts = JSON.parse(localStorage.getItem("shifts")) || [];
	const shiftsByMonth = {};
	localStorageShifts.forEach((shift) => {
		const shiftDate = shift.date.split("-");
		const shiftMonth = shiftDate[1];
		const shiftYear = shiftDate[0];
		const shiftKey = `${shiftMonth}-${shiftYear}`;
		if (shiftsByMonth[shiftKey]) {
			shiftsByMonth[shiftKey] += 1;
		} else {
			shiftsByMonth[shiftKey] = 1;
		}
	});
	const bestMonth = Object.keys(shiftsByMonth).reduce(
		(a, b) => (shiftsByMonth[a] > shiftsByMonth[b] ? a : b),
		"none"
	);
	bestMonthField.innerText = `Best month (highest earnings): ${bestMonth}`;
};

calculateBestMonth();

const tableSearch = () => {
	const searchFilter = searchInput.value.toUpperCase();
	const searchTr = searchTable.getElementsByTagName("tr");
	const searchTh = searchTable.getElementsByTagName("th");
	for (i = 1; i < searchTr.length; i++) {
		searchTr[i].style.display = "none";

		for (let j = 0; j < searchTh.length; j++) {
			const searchTd = searchTr[i].getElementsByTagName("td")[j];

			if (searchTd) {
				if (
					searchTd.innerHTML.toUpperCase().indexOf(searchFilter) > -1
				) {
					searchTr[i].removeAttribute("style");
					break;
				}
			}
		}
	}
};

searchInput.addEventListener("keyup", tableSearch);

const filterTableByDates = () => {
	const searchTr = searchTable.getElementsByTagName("tr");
	const startDateValue = startDate.value;
	const endDateValue = endDate.value;
	for (i = 1; i < searchTr.length; i++) {
		const searchTd = searchTr[i].getElementsByTagName("td")[0];
		if (searchTd) {
			if (
				searchTd.innerHTML < startDateValue ||
				searchTd.innerHTML > endDateValue
			) {
				searchTr[i].style.display = "none";
			} else {
				searchTr[i].removeAttribute("style");
			}
		}
	}
};

endDate.addEventListener("change", filterTableByDates);
