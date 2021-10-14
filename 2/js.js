var arr = [20, 12, 35, 11, 17, 9, 58, 23, 69, 21];


for (let i = 1; i < 10; i++) {
    for (let j = 9; j >= i; j--) {
        if (arr[j] < arr[j - 1]) {
            let wadah = arr[j];
            arr[j] = arr[j - 1];
            arr[j - 1] = wadah;
        }
    }
    console.log(arr);
    document.getElementById('array').innerHTML = arr;
}