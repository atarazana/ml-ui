// import { useState } from 'react'
import Form from './components/Form'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <div className="max-w-xl mx-auto w-full">
    <div className="flex justify-center my-12">
      <div className="w-full lg:w-11/12 bg-white p-5 rounded-lg shadow-xl">
        <h3 className="pt-4 text-2xl text-center font-bold">
          Run Housing Prediction
        </h3>
        <Form />
      </div>
    </div>
  </div>
  )
}

export default App
