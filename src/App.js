import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Posts } from "./features/posts/Posts";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/posts" element={<Posts />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
