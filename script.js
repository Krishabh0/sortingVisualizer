
let array = [];

function generateArray() {
    array = [];
    const container = document.getElementById("array-container");
    container.innerHTML = "";
    for (let i = 0; i < 20; i++) {
        let value = Math.floor(Math.random() * 100) + 10;
        array.push(value);
        let bar = document.createElement("div");
        bar.classList.add("bar");
        bar.style.height = value + "px";
        container.appendChild(bar);
    }
}

generateArray();

async function bubbleSort() {
    let bars = document.getElementsByClassName("bar");
    for (let i = 0; i < array.length - 1; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            bars[j].style.background = "red";
            bars[j + 1].style.background = "red";
            if (array[j] > array[j + 1]) {
                await swap(j, j + 1, bars);
            }
            bars[j].style.background = "blue";
            bars[j + 1].style.background = "blue";
        }
    }
}

async function quickSort(low = 0, high = array.length - 1) {
    if (low < high) {
        let pivotIndex = await partition(low, high);
        await quickSort(low, pivotIndex - 1);
        await quickSort(pivotIndex + 1, high);
    }
}

async function partition(low, high) {
    let pivot = array[high];
    let i = low - 1;
    let bars = document.getElementsByClassName("bar");
    for (let j = low; j < high; j++) {
        bars[j].style.background = "red";
        if (array[j] < pivot) {
            i++;
            await swap(i, j, bars);
        }
        bars[j].style.background = "blue";
    }
    await swap(i + 1, high, bars);
    return i + 1;
}

async function insertionSort() {
    let bars = document.getElementsByClassName("bar");
    for (let i = 1; i < array.length; i++) {
        let key = array[i];
        let j = i - 1;
        while (j >= 0 && array[j] > key) {
            bars[j + 1].style.background = "red";
            array[j + 1] = array[j];
            bars[j + 1].style.height = array[j] + "px";
            await sleep(100);
            bars[j + 1].style.background = "blue";
            j--;
        }
        array[j + 1] = key;
        bars[j + 1].style.height = key + "px";
    }
}

function swap(i, j, bars) {
    return new Promise(resolve => {
        setTimeout(() => {
            let temp = array[i];
            array[i] = array[j];
            array[j] = temp;
            bars[i].style.height = array[i] + "px";
            bars[j].style.height = array[j] + "px";
            resolve();
        }, 200);
    });
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
