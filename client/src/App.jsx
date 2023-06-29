import { EthProvider } from "./contexts/EthContext";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import RegisterUser from "./components/RegisterUser.jsx";
import TodoList from "./components/TodoList.jsx";

function App() {
  return (
    <EthProvider>
    <Router>
    <Routes>
      <Route path="/" element={<RegisterUser/>}/>
      <Route path="/home" element={<TodoList/>}/>
    </Routes>
    </Router>
    </EthProvider>
  );
}

export default App;
