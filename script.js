const userName = prompt("Как вас зовут?");
alert(`Привет, ${userName}! Добро пожаловать на страницу путешественника.`);

const distances = [45, 120, 25, 180, 30, 95, 150];

// Функция поиска максимального расстояния (самый длинный перегон)
function findMaxDistance(arr) {
    let max = arr[0];
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
            max = arr[i];
        }
    }
    return max;
}

// Функция фильтрации длинных перегонов (> 100 км)
function filterLongRoutes(arr) {
    const longRoutes = [];
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] > 100) {
            longRoutes.push(arr[i]);
        }
    }
    return longRoutes;
}

// Функция подсчёта общей длины маршрута (сумма всех расстояний)
function calculateTotalDistance(arr) {
    let total = 0;
    for (let i = 0; i < arr.length; i++) {
        total += arr[i];
    }
    return total;
}

let shortRoutesCount = 0;
let shortRoutesTotal = 0;

for (let i = 0; i < distances.length; i++) {
    if (distances[i] <= 30) {
        shortRoutesCount++;
        shortRoutesTotal += distances[i];
    }
}

const maxDistance = findMaxDistance(distances);
const longRoutes = filterLongRoutes(distances);
const totalLongDistance = calculateTotalDistance(longRoutes);
const totalDistance = calculateTotalDistance(distances);

console.log("Количество коротких перегонов (≤ 30 км):", shortRoutesCount);
console.log("Суммарная длина коротких перегонов:", shortRoutesTotal, "км");

alert(`${userName}, ваш маршрут длиной ${totalDistance} км, из них ${totalLongDistance} км – длинные перегоны.`);

if (totalDistance > 500) {
    console.log("️Рекомендуется разбить маршрут на 2–3 дня.");
}
