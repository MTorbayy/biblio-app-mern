import {useState, useEffect} from 'react'


function App() {

  const [books, setBooks] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch('/books/')
      const json = await data.json()
      console.log(json)
    }

    fetchData()
  }, [])
  
  return (
    <div>
      <h1>HomePage</h1>
    </div>
  );
}

export default App;
