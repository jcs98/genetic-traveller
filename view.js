function setup() {
    createCanvas(900, 700);
    setupCities();
}

function draw() {
    background(0);
    frameRate(FPS);

    drawEdges(cities, order);
    drawEdges(cities, shortestPathOrder, sw = 4, r = 0, g = 255, b = 0);
    drawCities(cities);

    nextRound();
    // console.log("Current Step:", steps);
    // console.log("Current Order:", order);
    // console.log("Current Distance:", nf(d, 0, 2));

    // console.log("Steps at shortest:", stepsAtLastShortest);
    // console.log("Shortest Path Order:", shortestPathOrder);
    // console.log("Shortest distance:", nf(shortestDistance, 0, 2));
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
