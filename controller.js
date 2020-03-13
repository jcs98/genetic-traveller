function keyTyped() {
    if (key == 'r') {
        setupCities();
        redraw();
    }
    else if (key == ' ') {
        togglePause();
    }
}

function mouseClicked() {
    // togglePause();
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