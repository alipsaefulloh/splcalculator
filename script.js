// Generate input grid 3x4 (3 baris, 3 kolom + 1 kolom hasil)
const matrixInputs = document.getElementById("matrix-inputs");
for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 4; j++) {
    const input = document.createElement("input");
    input.type = "number";
    input.id = `cell-${i}-${j}`;
    input.value = 0;
    matrixInputs.appendChild(input);
}
}

function getMatrix() {
const A = [], b = [];
    for (let i = 0; i < 3; i++) {
    A[i] = [];
    for (let j = 0; j < 3; j++) {
    A[i][j] = parseFloat(document.getElementById(`cell-${i}-${j}`).value);
    }
    b[i] = parseFloat(document.getElementById(`cell-${i}-3`).value);
}
return { A, b };
}

function solve() {
const { A, b } = getMatrix();
const resultDiv = document.getElementById("results");

try {
    const inverse = math.inv(A);
    const x_inverse = math.multiply(inverse, b);

    // Gauss-Jordan Elimination
    let M = A.map((row, i) => row.concat(b[i]));
    const n = 3;

    for (let i = 0; i < n; i++) {
    let pivot = M[i][i];
    for (let j = 0; j < n + 1; j++) M[i][j] /= pivot;

    for (let k = 0; k < n; k++) {
        if (k !== i) {
        let factor = M[k][i];
        for (let j = 0; j < n + 1; j++) {
            M[k][j] -= factor * M[i][j];
        }
        }
    }
    }

    const x_gauss = M.map(row => row[3]);

    resultDiv.innerHTML = `
    <h2>Hasil:</h2>
    <p><strong>Metode Matriks Balikan:</strong><br>
    x = ${x_inverse[0].toFixed(4)}, 
    y = ${x_inverse[1].toFixed(4)}, 
    z = ${x_inverse[2].toFixed(4)}</p>

    <p><strong>Metode Gauss - Jordan:</strong><br>
    x = ${x_gauss[0].toFixed(4)}, 
    y = ${x_gauss[1].toFixed(4)}, 
    z = ${x_gauss[2].toFixed(4)}</p>
    `;
} catch (error) {
    resultDiv.innerHTML = "<p style='color:red'>Terjadi kesalahan: Pastikan input valid dan matriks tidak singular.</p>";
}
}