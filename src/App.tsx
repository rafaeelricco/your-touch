import { useState } from 'react'
import { ClickProps } from '../typings'
import './App.css'

function App() {
  const [click, setClick] = useState<ClickProps | null>(null)
  const [points, setPoints] = useState<ClickProps[]>([])
  const [prev, setPrevPoints] = useState<ClickProps[]>([])

  // get a coordinates when click on the screen
  const getCordinates = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const { clientX, clientY } = e
    setClick({ clientX, clientY })
    setPoints((prev) => [...prev, { clientX, clientY }])
    setPrevPoints((prev) => [...prev, { clientX, clientY }])
  }

  // undo a last point
  const handleUndo = () => {
    if (points.length > 0) {
      const last = points.pop()
      setPoints([...points])
      setPrevPoints((prev) => [...prev, last!])
    } else {
      alert('Não há pontos para desfazer.')
    }
  }

  // redo a last point
  const handleRedo = () => {
    if (prev.length > 0) {
      const last = prev.pop()
      setPoints((prev) => [...prev, last!])
      setPrevPoints([...prev])
    } else {
      alert('Não há pontos para refazer.')
    }
  }

  // clear all points
  const ClearAll = () => {
    setClick(null)
    setPoints([])
    setPrevPoints([])
  }

  return (
    <>
      <nav className="nav-container">
        <strong>Toque em qualquer lugar</strong> para adicionar um ponto.
      </nav>
      <div className="buttons-container">
        <button onClick={handleUndo}>
          <svg
            id="undo"
            height="16"
            viewBox="0 0 512 512"
            width="16"
            xmlns="http://www.w3.org/2000/svg">
            <g id="ARROW_48" data-name="ARROW 48">
              <path d="m77.78 312.78a24 24 0 0 0 33.5 5.47l101.41-72.94a24 24 0 1 0 -28-39l-56.27 40.47c4.79-88.25 78.09-158.58 167.51-158.58 92.51 0 167.77 75.26 167.77 167.77s-75.29 167.79-167.8 167.79a168.23 168.23 0 0 1 -123.77-54.51 24 24 0 0 0 -35.41 32.41 215.75 215.75 0 1 0 -55.59-166.44l-37.31-51.88a24 24 0 1 0 -39 28z" />
            </g>
          </svg>
          Undo
        </button>
        <button onClick={handleRedo}>
          <svg
            id="redo"
            enable-background="new 0 0 32 32"
            height="16"
            viewBox="0 0 32 32"
            width="16"
            xmlns="http://www.w3.org/2000/svg">
            <path d="m30 14c-1.104 0-2 .896-2 2 0 6.617-5.383 12-12 12s-12-5.383-12-12 5.383-12 12-12c2.943 0 5.736 1.085 7.913 3h-2.697c-1.104 0-2 .896-2 2s.896 2 2 2h6.957c1.104 0 2-.896 2-2v-6.956c0-1.104-.896-2-2-2s-2 .896-2 2v1.633c-2.844-2.351-6.417-3.677-10.173-3.677-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16c0-1.104-.896-2-2-2z" />
          </svg>
          Redo
        </button>
        <button onClick={ClearAll}>
          <svg
            id="trash"
            enable-background="new 0 0 512 512"
            height="16"
            viewBox="0 0 512 512"
            width="16"
            xmlns="http://www.w3.org/2000/svg">
            <g>
              <path d="m424 64h-88v-16c0-26.467-21.533-48-48-48h-64c-26.467 0-48 21.533-48 48v16h-88c-22.056 0-40 17.944-40 40v56c0 8.836 7.164 16 16 16h8.744l13.823 290.283c1.221 25.636 22.281 45.717 47.945 45.717h242.976c25.665 0 46.725-20.081 47.945-45.717l13.823-290.283h8.744c8.836 0 16-7.164 16-16v-56c0-22.056-17.944-40-40-40zm-216-16c0-8.822 7.178-16 16-16h64c8.822 0 16 7.178 16 16v16h-96zm-128 56c0-4.411 3.589-8 8-8h336c4.411 0 8 3.589 8 8v40c-4.931 0-331.567 0-352 0zm313.469 360.761c-.407 8.545-7.427 15.239-15.981 15.239h-242.976c-8.555 0-15.575-6.694-15.981-15.239l-13.751-288.761h302.44z" />
              <path d="m256 448c8.836 0 16-7.164 16-16v-208c0-8.836-7.164-16-16-16s-16 7.164-16 16v208c0 8.836 7.163 16 16 16z" />
              <path d="m336 448c8.836 0 16-7.164 16-16v-208c0-8.836-7.164-16-16-16s-16 7.164-16 16v208c0 8.836 7.163 16 16 16z" />
              <path d="m176 448c8.836 0 16-7.164 16-16v-208c0-8.836-7.164-16-16-16s-16 7.164-16 16v208c0 8.836 7.163 16 16 16z" />
            </g>
          </svg>
          Clear
        </button>
      </div>
      <div
        className="app-container"
        onClick={(e) => {
          getCordinates(e)
        }}>
        {points.map((point, index) => (
          <div
            key={index}
            className="point"
            style={{ left: point.clientX, top: point.clientY }}></div>
        ))}
      </div>
    </>
  )
}

export default App
