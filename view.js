function setup() {
    createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
    setupCities();
}

function draw() {
    background(0);
    frameRate(FPS);

    // Plot Brute Force
    drawEdges(cities, order);
    drawEdges(cities, shortestPathOrder, sw = 4, r = 0, g = 255, b = 0);
    drawCities(cities);

    translate(CANVAS_WIDTH / 2, 0);

    // Plot Genetic
    drawEdges(cities, currentShortestGeneticPathOrder);
    drawEdges(cities, shortestGeneticPathOrder, sw = 4, r = 0, g = 255, b = 0);
    drawCities(cities);

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
