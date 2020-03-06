const TOTAL_CITIES = 5;
const FPS = 60;

let paused = false;
let currentStrategy = "LEX";
let steps;
let stepsAtLastShortest;

let cities;
let order;
let shortestDistance;
let shortestPathOrder;

function setup() {
    createCanvas(900, 700);
    setupCities();
}

function draw() {
    background(0);
    frameRate(FPS);

    // draw cities and paths
    drawEdges(cities, order);
    drawEdges(cities, shortestPathOrder, sw = 4, r = 0, g = 255, b = 0);
    drawCities(cities);

    // update cities
    order = getNextOrder(currentStrategy, order);

    // update shortest distance
    const d = calcPathLength(cities, order);
    if (d < shortestDistance) {
        shortestDistance = d;
        shortestPathOrder = order.slice();
        stepsAtLastShortest = steps;
    }
    // console.log("Current Step:", steps);
    // console.log("Current Order:", order);
    // console.log("Current Distance:", nf(d, 0, 2));

    // console.log("Steps at shortest:", stepsAtLastShortest);
    // console.log("Shortest Path Order:", shortestPathOrder);
    // console.log("Shortest distance:", nf(shortestDistance, 0, 2));
}

// Draw functions
function drawEdges(cities, order, sw = 1, r = 255, g = 255, b = 255) {
    noFill();
    stroke(r, g, b);
    strokeWeight(sw);

    beginShape();
    for (let i = 0; i < order.length + 1; i++) {
        const o = order[i % order.length];
        vertex(cities[o].x, cities[o].y);
    }
    endShape();
}

function drawCities(cities, r = 10) {
    fill(0, 255, 0);

    for (let i = 0; i < cities.length; i++) {
        ellipse(cities[i].x, cities[i].y, r, r);
    }
}

// Action handlers
function keyTyped() {
    if (key == 'r') {
        setupCities();
        redraw();
    }
}

function mouseClicked() {
    togglePause();
}

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
    if(!paused)
        togglePause();
}

function togglePause() {
    if (paused) {
        paused = false;
        loop();
    }
    else {
        paused = true;
        noLoop();
    }
}


// Utils
function swap(arr, i, j) {
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

function calcPathLength(points, order) {
    let sum = 0;

    for (let i = 0; i < order.length; i++) {
        const a = order[i];
        const b = order[(i + 1) % order.length]; // for last -> first city
        sum += dist(points[a].x, points[a].y, points[b].x, points[b].y);
    }

    return sum;
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
