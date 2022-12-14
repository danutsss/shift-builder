import {
	checkLoggedInUser,
	logoutUser,
	calculateShiftTotalWage,
} from "../../services/utils/utils.js";

window.onload = () => checkLoggedInUser();

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

	if (localStorageShifts.length === 0) {
		tableBody.innerHTML = `<td colspan="6" class="px-6 py-3">No shifts found</td>`;
		return;
	}

	localStorageShifts.forEach((shift) => {
		const shiftProfit = calculateShiftTotalWage(
			shift.startTime,
			shift.endTime,
			shift.hourlyWage
		);

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
			<td class="px-6 py-3">${shift.hourlyWage}$</td>
			<td class="px-6 py-3">${shift.workPlace}</td>
			<td class="px-6 py-3">${shiftProfit}$</td>
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
	for (let i = 1; i < searchTr.length; i++) {
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
	for (let i = 1; i < searchTr.length; i++) {
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

startDate.addEventListener("change", filterTableByDates);
endDate.addEventListener("change", filterTableByDates);
