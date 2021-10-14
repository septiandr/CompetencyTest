function gbr() {

    var tampil = document.getElementById('gbr');

    var input = parseInt(document.getElementById('input').value);
    var x = "";
    if (input % 2 == 0) {
        alert("harus ganjil");
    }
    tampil.innerHTML = "";
    for (var i = 1; i <= input; i++) {
        var x = "";
        for (var j = 1; j <= input; j++) {
            var n = input + 1;
            var m = n / 2;
            if (i == 1 && j == 1) {
                x = x + '*';
            } else if (i == input && j == input) {
                x = x + '*';
            } else if (i == 1 && j == input) {
                x = x + '*';
            } else if (i == input && j == 1) {
                x = x + '*';
            } else if (i == m && j == m) {
                x = x + '#';
            } else if (i == m) {
                x = x + '*';
            } else if (j == m) {
                x = x + '*';
            } else {
                x = x + '#';
            }

        }

        console.log(x);
        tampil.innerHTML += x + "<br>";
    }

}