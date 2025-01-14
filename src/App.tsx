
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import KanbanBoard from "./components/KanbanBoard";
import Footer from "./components/Footer";
import './App.css'

function App() {
  return (
    <Router>
      <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center p-10">
        <Navbar />
        <main className="w-full max-w-4xl mt-8">
          <Routes>
            <Route path="/" element={<KanbanBoard />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;