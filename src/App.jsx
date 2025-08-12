import { useState } from 'react'
import { Kanban } from './KanbanBoard/Kanban'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Kanban />
    </>
  )
}

export default App
