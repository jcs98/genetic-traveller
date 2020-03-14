const CANVAS_WIDTH = 1400;
const CANVAS_HEIGHT = 600;
const MAIN_DISPLAY_RATIO = 1 / 2;
const NUM_GENE_COLUMNS = 3;
const MAX_GENES_TO_DISPLAY = 9;

function setup() {
    let canvas = createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
    canvas.parent('canvas-container');
    setupCities();
}

function draw() {
    background(255);
    frameRate(FPS);

    // Plot Brute Force
    drawEdges(cities, shortestPathOrder, sw = 4);
    drawCities(cities);
    translate(0, CANVAS_HEIGHT / 2);
    drawEdges(cities, order);

    // Plot Genetic
    translate(CANVAS_WIDTH / 2, -CANVAS_HEIGHT / 2);
    drawEdges(cities, shortestGeneticPathOrder, sw = 4);
    drawCities(cities);

    // Plot stats
    translate(-CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
    drawStats();
    translate(CANVAS_WIDTH / 2, -CANVAS_HEIGHT / 2);

    // Plot genes
    translate(128, MAIN_DISPLAY_RATIO * CANVAS_HEIGHT + 64);
    drawGenes(population);

    nextRound();
}

function drawEdges(cities, order, sw = 1, r = 0, g = 123, b = 255) {
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
    fill(0, 123, 255);

    for (let i = 0; i < cities.length; i++) {
        ellipse(cities[i].x, cities[i].y, r, r);
    }
}

function drawGenes(population, sw = 4, r = 0, g = 123, b = 255) {
    scale(0.2);
    textSize(16 * 5);
    let i = 0;

    for (let row = 1; row < 4; row++) {
        for (; i < (row * NUM_GENE_COLUMNS) && i < POP_SIZE; i++) {
            drawEdges(cities, population[i], sw = sw, r = r, g = g, b = b);

            fill(r, g, b);
            strokeWeight(0);
            text(population[i].join(""), 20, 20);

            translate(CANVAS_WIDTH / 1.5, 0);
        }
        translate(-CANVAS_WIDTH / 1.5 * NUM_GENE_COLUMNS, CANVAS_HEIGHT / 1.5);
    }
}

function drawStats() {
    const offsetX = CANVAS_WIDTH / 2;
    fill(32, 32, 32);
    strokeWeight(0);

    textSize(36);
    text(nf(shortestDistance, 0, 2) + " km", 104, 0);
    text(nf(shortestGeneticDistance, 0, 2) + " km", 104 + offsetX, 0);

    textSize(16);
    text("Shortest path distance so far found" + " in " + stepsAtLastShortest + " iterations", 16, 32);
    text("Shortest path distance so far found" + " in " + stepsAtLastGeneticShortest + " generations", 16 + offsetX, 32);

    textSize(24);
    text(nf(steps / totalPossible * 100, 0, 7) + "% completed...", 64, CANVAS_WIDTH / 5);
}