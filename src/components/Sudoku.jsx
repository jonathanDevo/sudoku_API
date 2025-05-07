import { useEffect, useState } from "react";
import { verificarVictoria, comparacionBloque, validarFilaColumna } from "../functions/funciones.js";
import { useSudoku } from "../hooks/useSudoku.js";
import "../styles/sudoku.css";
import { appSettings } from "../config/appSettings";

export function JuegoSudoku() {
  const [nivel, setNivel] = useState(appSettings.dificultad);
  const [recargar, setRecargar] = useState(false);
  const { solucion, isLoading } = useSudoku(nivel, recargar);


  const [grid, setGrid] = useState(
    Array(9).fill(null).map(() => Array(9).fill(""))
  );
  const [fixedCells, setFixedCells] = useState(
    Array(9).fill(null).map(() => Array(9).fill(false))
  );

  let [ayuda, setAyuda] = useState(false);
  const [mostrarAyuda, setMostrarAyuda] = useState(false);

  const rellenarTablero = () => {
    if (!solucion) return;

    const initialGrid = Array(9).fill(null).map(() => Array(9).fill(""));
    const initialFixed = Array(9).fill(null).map(() => Array(9).fill(false));

    let celdasMostradas = 0;
    while (celdasMostradas < 30) {
      const row = Math.floor(Math.random() * 9);
      const col = Math.floor(Math.random() * 9);

      if (initialGrid[row][col] === "") {
        initialGrid[row][col] = solucion[row][col];
        initialFixed[row][col] = true;
        celdasMostradas++;
      }
    }

    setGrid(initialGrid);
    setFixedCells(initialFixed);
    setAyuda(false);
    setMostrarAyuda(false);
  };

  useEffect(() => {
      rellenarTablero();

  }, [solucion, nivel]);

  const updateValue = (row, col, { target }) => {
    if (fixedCells[row][col]) return;

    const newGrid = grid.map(r => [...r]);
    let value = target.value;

    if (value === "") {
      newGrid[row][col] = "";
      setGrid(newGrid);
      return;
    }

    const valueParseado = parseInt(value);

    if (!valueParseado || valueParseado < 1 || valueParseado > 9) {
      alert("Debe introducir un número del 1 al 9");
      return;
    }

    if (ayuda) {
      const bloqueInvalido = comparacionBloque(newGrid, row, col, valueParseado);
      const filaColInvalido = validarFilaColumna(newGrid, row, col, valueParseado);

      if (bloqueInvalido) alert("El número ya existe en este bloque 3x3");
      if (bloqueInvalido || filaColInvalido) return;
    }

    newGrid[row][col] = valueParseado;
    setGrid(newGrid);
    verificarVictoria(newGrid, solucion);
  };

  const activarAyuda = () => {
    setAyuda(prev => !prev);
    setMostrarAyuda(true);
  };

  const cambiarNivel = ({target}) => {
    setNivel(target.value);
  };
  const cambiarNivelActual = () => {
    setRecargar(prev => !prev);

  };

  return (
    <div className="sudoku-wrapper">
      {import.meta.env.MODE === "dev" && (
      <div style={{ background: "#eee", padding: "10px", marginBottom: "10px" }}>
        <p><strong>Modo desarrollo:</strong> Puedes editar el código y ver los cambios aquí.</p>
      </div>
      )}
      <h1 className="titulo">Juego de Sudoku</h1>
      <p className="subtitulo">¡El juego que estimula la mente!</p>

      <div className="selector-dificultad">
        <label>Selecciona dificultad:</label>
        <select value={nivel} onChange={cambiarNivel}>
          <option value="easy">Fácil</option>
          <option value="medium">Medio</option>
          <option value="hard">Difícil</option>
        </select>
      </div>


      {isLoading && ( <h2>Cargando...</h2>)}
      <div className="sudoku-container">
        {grid.map((row, rowIndex) => (
          <div key={rowIndex} className="sudoku-row">
            {row.map((cell, colIndex) => (
              <input
                key={colIndex}
                type="text"
                value={cell}
                onChange={(event) => updateValue(rowIndex, colIndex, event)}
                className="sudoku-cell"
                disabled={fixedCells[rowIndex][colIndex]}
              />
            ))}
          </div>
        ))}
      </div>

      <button className="btn-ayuda" onClick={activarAyuda}>Activar Ayuda</button>

      {mostrarAyuda && (
        <p className="estado-ayuda">
          {ayuda ? "Ayuda activada" : "Ayuda desactivada"}
        </p>
      )}

      <button className="btn-ayuda" onClick={cambiarNivelActual}>Volver a jugar</button> 
      <div className="container-btn-salir">
      <button className="btn-salir" onClick={() => window.location.href = "https://www.google.com"}>Salir</button>   
      </div>  
    </div>
  );
}
