import logo from './logo.svg';
import './App.css';
import NavBar from './Components/Navbar';
import "@fontsource/sen"; // Defaults to weight 400
import "@fontsource/sen/400.css"; // Specify weight
import "@fontsource/sen/400-italic.css"; // Specify weight and style

function App() {
  return (
    <div className="App">
      <NavBar/>
    </div>
  );
}

export default App;
