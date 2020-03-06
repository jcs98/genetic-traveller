const TOTAL_CITIES = 5;
const FPS = 5;

let paused = false;
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
    useStrategy("RANDOM_SWAP", order);
    // useStrategy("LEX", order);

    // update shortest distance
    const d = calcPathLength(cities, order);
    if (d < shortestDistance) {
        shortestDistance = d;
        shortestPathOrder = order.slice();
    }
    console.log(shortestDistance);
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
    cities = [];
    order = [];
    for (let i = 0; i < TOTAL_CITIES; i++) {
        cities[i] = createVector(random(width), random(height));
        order[i] = i;
    }

    shortestDistance = calcPathLength(cities, order);
    shortestPathOrder = order.slice();
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
function useStrategy(type, order) {
    if (type === "RANDOM_SWAP")
        randomSwap(order);
    else if (type === "LEX")
        nextLexicographicOrder(order);
}

// Strategies
function randomSwap(order) {
    // random swaps
    const a = floor(random(order.length));
    const b = floor(random(order.length));
    swap(order, a, b);
}

function nextLexicographicOrder(order) {

}
