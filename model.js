const TOTAL_CITIES = 10;
const FPS = 60;

let paused = false;
let currentStrategy = "LEX";
let steps;
let stepsAtLastShortest;

let cities;
let order;
let shortestDistance;
let shortestPathOrder;

function setupCities() {
    steps = 0;
    stepsAtLastShortest = 0;
    cities = [];
    order = [];
    for (let i = 0; i < TOTAL_CITIES; i++) {
        cities[i] = createVector(random(width), random(height));
        order[i] = i;
    }

    shortestDistance = calcPathLength(cities, order);
    shortestPathOrder = order.slice();

    // Start with pause
    if (!paused)
        togglePause();
}

function nextRound() {
    order = getNextOrder(currentStrategy, order);

    // update shortest distance
    const d = calcPathLength(cities, order);
    if (d < shortestDistance) {
        shortestDistance = d;
        shortestPathOrder = order.slice();
        stepsAtLastShortest = steps;
    }
}

// Strategy Switch
function getNextOrder(strategyType, order) {
    steps++;
    if (strategyType === "RANDOM_SWAP")
        return randomSwap(order);
    else if (strategyType === "LEX")
        return nextLexOrder(order);
}

// Strategies
function randomSwap(currentOrder) {
    const a = floor(random(currentOrder.length));
    const b = floor(random(currentOrder.length));
    swap(currentOrder, a, b);
    return currentOrder;
}

function nextLexOrder(currentOrder) {
    let x = -1;
    for (let i = currentOrder.length - 2; i >= 0; i--) {
        if (currentOrder[i] < currentOrder[i + 1]) {
            x = i;
            break;
        }
    }
    if (x == -1) {
        togglePause();
        return currentOrder;
    }

    let y;
    for (let i = currentOrder.length - 1; i >= 0; i--) {
        if (currentOrder[x] < currentOrder[i]) {
            y = i;
            break;
        }
    }

    swap(currentOrder, x, y);
    let newOrder = [].concat(currentOrder.slice(0, x + 1), currentOrder.slice(x + 1).reverse());
    return newOrder;
}