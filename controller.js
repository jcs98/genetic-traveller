function keyTyped() {
    if (key == 'r') {
        setItUp();
    }
    else if (key == ' ') {
        togglePause();
    }
}

function setItUp() {
    setupCities();
    redraw();
}

function togglePause() {
    if (paused) {
        paused = false;
        $('#playpause').prop('checked', false);
        loop();
    }
    else {
        paused = true;
        $('#playpause').prop('checked', true);
        noLoop();
    }
}

$('#playpause').on('click', togglePause);
$('#set-it-up').on('click', setItUp);

const speedSlider = document.querySelector('#speed-slider');
const speedValue = document.querySelector('#speed-value');
speedSlider.addEventListener('input', e => {
    speedValue.textContent = speedSlider.value;
    FPS += (speedSlider.value - FPS)
});

const citiesSlider = document.querySelector('#cities-slider');
const citiesValue = document.querySelector('#cities-value');
citiesSlider.addEventListener('input', e => {
    citiesValue.textContent = citiesSlider.value;
    TOTAL_CITIES += (citiesSlider.value - TOTAL_CITIES)
});

const popSlider = document.querySelector('#pop-slider');
const popValue = document.querySelector('#pop-value');
popSlider.addEventListener('input', e => {
    popValue.textContent = popSlider.value;
    POP_SIZE += (popSlider.value - POP_SIZE)
});

const mutationSlider = document.querySelector('#mutation-slider');
const mutationValue = document.querySelector('#mutation-value');
mutationSlider.addEventListener('input', e => {
    mutationValue.textContent = mutationSlider.value;
    MUTATION_RATE += ((mutationSlider.value / 100) - MUTATION_RATE)
});