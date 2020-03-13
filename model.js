const CANVAS_WIDTH = 1300;
const CANVAS_HEIGHT = 700;

// Params to modify
const TOTAL_CITIES = 10;
const FPS = 60;
const POP_SIZE = 10;
const MUTATION_RATE = 0.01;

let paused = false;
let currentStrategy = "LEX";
let steps;
let stepsAtLastShortest;

let cities;
let order;
let shortestDistance;
let shortestPathOrder;

let population;
let fitness;
let currentShortestGeneticDistance;
let currentShortestGeneticPathOrder;
let shortestGeneticDistance;
let shortestGeneticPathOrder;
let stepsAtLastGeneticShortest;

function setupCities() {
    steps = 0;
    stepsAtLastShortest = 0;
    cities = [];
    order = [];
    for (let i = 0; i < TOTAL_CITIES; i++) {
        cities[i] = createVector(random(width / 2), random(height));
        order[i] = i;
    }

    population = setupPopulation(order);
    fitness = calculateFitness(cities, population);

    shortestDistance = calcPathLength(cities, order);
    shortestPathOrder = order.slice();

    shortestGeneticDistance = shortestDistance;
    shortestGeneticPathOrder = order.slice();

    // Start with pause
    if (!paused)
        togglePause();
}

function setupPopulation(order) {
    let pop = [];
    for (let i = 0; i < POP_SIZE; i++) {
        pop[i] = shuffle(order);
    }
    return pop;
}

function nextRound() {
    steps++;
    // Brute force
    order = getNextOrder(currentStrategy, order);
    const d = calcPathLength(cities, order);
    if (d < shortestDistance) {
        shortestDistance = d;
        shortestPathOrder = order.slice();
        stepsAtLastShortest = steps;
    }
    // Genetic
    population = nextGeneration(population, fitness);
}

// Strategy Switch
function getNextOrder(strategyType, order) {
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

// Genetic Functions
function nextGeneration(population, fitness) {
    fitness = calculateFitness(cities, population);

    let newPopulation = [];
    for (let i = 0; i < population.length; i++) {
        let parentA = pickOne(population, fitness);
        let parentB = pickOne(population, fitness);
        let child = crossOver(parentA, parentB);
        child = mutate(child, MUTATION_RATE);
        newPopulation[i] = child;
    }
    return newPopulation;
}

function calculateFitness(cities, pop) {
    let fit = [];
    let currentRecordDistance = Infinity;
    let currentRecordOrder = Infinity;

    for (let i = 0; i < pop.length; i++) {
        let d = calcPathLength(cities, pop[i]);
        if (d < shortestGeneticDistance) {
            shortestGeneticDistance = d;
            shortestGeneticPathOrder = pop[i].slice();
            stepsAtLastGeneticShortest = steps;
        }
        if (d < currentRecordDistance) {
            currentRecordDistance = d;
            currentRecordOrder = pop[i].slice();
        }

        currentShortestGeneticDistance = currentRecordDistance;
        currentShortestGeneticPathOrder = currentRecordOrder;
        fit[i] = 1 / (pow(d, 8) + 1);
    }
    return normalize(fit);
}

function normalize(values) {
    let normalizedValues = [];
    let sum = 0;
    for (let i = 0; i < values.length; i++) {
        sum += values[i];
    }
    for (let i = 0; i < values.length; i++) {
        normalizedValues[i] = values[i] / sum;
    }
    return normalizedValues;
}

function pickOne(list, prob) {
    let index = 0;
    let r = random(1);

    while (r > 0) {
        r = r - prob[index];
        index++;
    }
    index--;
    return list[index].slice();
}

function crossOver(parentA, parentB) {
    let start = floor(random(parentA.length));
    let end = floor(random(start + 1, parentA.length));
    let child = parentA.slice(start, end);

    for (let i = 0; i < parentB.length; i++) {
        let city = parentB[i];
        if (!child.includes(city)) {
            child.push(city);
        }
    }
    return child;
}

function mutate(ord, mutationRate) {
    for (let i = 0; i < ord.length; i++) {
        if (random(1) < mutationRate) {
            let indexA = floor(random(ord.length));
            let indexB = (indexA + 1) % ord.length;
            swap(ord, indexA, indexB);
        }
    }
    return ord;
}