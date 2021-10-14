function harga() {
    var hargabarangA = 4550;
    var hargabarangB = 5330;
    var hargabarangC = 8653;
    //barang A
    var harga = document.getElementById("totalHarga")
    var potongan = document.getElementById("potongan")
    var bayar = document.getElementById("totalBayar")

    var jumlahbarangA = document.getElementById("barangA").value;
    var jumlahbarangB = document.getElementById("barangB").value;
    var jumlahbarangC = document.getElementById("barangC").value;

    var potonganA = 0;
    var hargaakhirA = 0;
    var totalhargaA = hargabarangA * jumlahbarangA;
    if (jumlahbarangA > 13) {
        potonganA = 231 * jumlahbarangA; //potong harga
        hargaakhirA = totalhargaA - potonganA;
        console.log(hargaakhirA);
    }


    var potonganB = 0;
    var hargaakhirB = 0;
    var totalhargaB = hargabarangB * jumlahbarangB;
    if (jumlahbarangB > 7) {
        potonganB = 23 / 100 * totalhargaB
        hargaakhirB = totalhargaB - potonganB;
    }

    var totalhargaC = hargabarangC * jumlahbarangC;
    var hargaakhirC = totalhargaC
    if (jumlahbarangA + jumlahbarangB == 0) {
        potongan.innerHTML = "tidak ada potongan harga";
    }
    var totalHarga = totalhargaA + totalhargaB + totalhargaC;
    var totalPotongan = potonganA + potonganB;
    var totalBayar = hargaakhirA + hargaakhirB + hargaakhirC;
    if (totalBayar < 0) {
        alert("error");
    }


    harga.innerHTML = "Rp." + totalHarga;
    potongan.innerHTML = "Rp." + totalPotongan;
    bayar.innerHTML = "Rp." + totalBayar;



}