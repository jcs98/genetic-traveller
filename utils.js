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