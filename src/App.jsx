import { BrowserRouter as Router} from 'react-router-dom';
import './App.css'
import Routers from './root/Routers'

function App() {

  return (
    <Router>
      <div className="App">
        {/* <Suspense fallback={<SkeletonLoader />}> */}
          {/* <Header /> */}
          <Routers /> 
        {/* </Suspense> */}
      </div>
    </Router>
  )
}

export default App
