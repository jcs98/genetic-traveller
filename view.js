const CANVAS_WIDTH = 1800;
const CANVAS_HEIGHT = 800;
const MAIN_DISPLAY_RATIO = 1 / 2;
const NUM_GENE_COLUMNS = 3;
const MAX_GENES_TO_DISPLAY = 9;

function setup() {
    createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
    setupCities();
}

function draw() {
    background(0);
    frameRate(FPS);

    // Plot Brute Force
    drawEdges(cities, shortestPathOrder, sw = 4, r = 0, g = 255, b = 0);
    drawCities(cities);

    translate(0, CANVAS_HEIGHT / 2);
    drawEdges(cities, order);
    textSize(32);
    text(order.join(""), 20, 20);
    translate(0, -CANVAS_HEIGHT / 2);

    translate(CANVAS_WIDTH / 2, 0);

    // Plot Genetic
    // drawEdges(cities, currentShortestGeneticPathOrder);
    drawEdges(cities, shortestGeneticPathOrder, sw = 4, r = 0, g = 255, b = 0);
    drawCities(cities);

    translate(128, MAIN_DISPLAY_RATIO * CANVAS_HEIGHT + 64);
    drawGenes(population);

    nextRound();
    // console.log(steps, nf(shortestDistance, 0, 2), stepsAtLastShortest, nf(shortestGeneticDistance, 0, 2), stepsAtLastGeneticShortest);
}

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

function drawGenes(population) {
    scale(0.2);
    let i = 0;

    for (let row = 1; row < 4; row++) {
        for (; i < (row * NUM_GENE_COLUMNS) && i < POP_SIZE; i++) {
            drawEdges(cities, population[i], sw = 4, r = 255, g = 0, b = 0);
            textSize(16 * 5);
            text(population[i].join(""), 20, 20);
            translate(CANVAS_WIDTH / 2, 0);
        }
        translate(-CANVAS_WIDTH / 2 * NUM_GENE_COLUMNS, CANVAS_HEIGHT / 1.5);
    }
}