import { EthProvider } from "./contexts/EthContext";
import RegisterUser from "./components/RegisterUser";

function App() {
  return (
    <EthProvider>
      <div id="App">
        <RegisterUser/>
      </div>
    </EthProvider>
  );
}

export default App;
