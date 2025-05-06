// src/hooks/useSudoku.js
import { useEffect, useState } from "react";
import { SudokuSolution } from "../functions/funciones.js";

export const useSudoku = (nivel, recargar = false) => {
  const [solucion, setSolucion] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const obtenerSolucion = async () => {
    try {
      // console.log("Nivel:", nivel);
      const data = await SudokuSolution(nivel);

      setSolucion(data);
      setIsLoading(false);

    } catch (err) {
        console.error("Error al obtener la solución del Sudoku:", err);
    }
  };

  useEffect(() => {
    obtenerSolucion();
  }, [nivel, recargar]);

  return {
    solucion,
    isLoading
    };
};
