export const comparacionBloque = (grid, fila, columna, value) => {

  const startRow = Math.floor(fila / 3) * 3;
  const startCol = Math.floor(columna / 3) * 3;

  for (let r = startRow; r < startRow + 3; r++) {
    for (let c = startCol; c < startCol + 3; c++) {
      // ignoramos esa celda que estamos editando y comparamos todas las demás.
      if (r === fila && c === columna) continue;

      if (grid[r][c] === value) {
        // alert("El número ya existe en este bloque 3x3");
        return true;
      }
    }
  }

  return false;
};


export const validarFilaColumna = (grid, fila, columna, value) => {

  // [4][5][6] fila 1, te recorra de la fila que pongas, todas las columnas
  for (let col = 0; col < grid[fila].length; col++) {
      // && col !== columna, que no te compare con la posición(de la columna) que estás editando
      if (grid[fila][col] === value && col !== columna) {
          alert("El número ya existe en la fila");
          return true; // ya existe el número en esa fila
      }
  }


  // te recorra todas las filas, de la columna que pongas(siempre mirando la misma columna)
  for (let row = 0; row < grid.length; row++) {
      if (grid[row][columna] === value && row !== fila) {
          alert("El número ya existe en la columna");
          return true;
      }
  }

  return false;
};

export const verificarVictoria = (grid,solucionSudoku) => {
  for (let fila = 0; fila < 9; fila++) {
    for (let col = 0; col < 9; col++) {
      const valorJugador = grid[fila][col];
      const valorSolucion = solucionSudoku[fila][col];
      if (valorJugador === "" || parseInt(valorJugador) !== valorSolucion) {
        return;
      }
    }
  }
  alert("¡Has ganado, felidicades!");
};

const API_URL = import.meta.env.VITE_API_URL;

export const SudokuSolution = async (nivel) => {

    const response = await fetch(`${API_URL}?difficulty=${nivel}`);
    
    if (!response.ok) {
      throw new Error(`Error al obtener el sudoku: ${response.status}`);
    }

    const data = await response.json();

    // Inspeccionar la estructura de los datos recibidos
    // console.log('Datos recibidos:', data);

      const solution = data.newboard.grids[0].solution;
      // const nivel = data.newboard.grids[0].difficulty;
      console.log('Solución del Sudoku:', solution);
      console.log('Nivel: ', nivel);
      return solution;

};


