import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Blogs from "./pages/Blogs";
import Creators from "./pages/Creators";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Footer from "./components/Footer";
import UpdateBlog from "./dashboard/UpdateBlog";
import BlogDetail from "./pages/BlogDetail";
import { useAuth } from "./context/AuthProvider";
import NotFound from "./pages/NotFound";

function App() {
  const { blogs, isAuthenticated } = useAuth();
  console.log(blogs);
  const location = useLocation();
  const hideNavbarFooter = ["/dashboard", "/login", "/signup"].includes(
    location.pathname
  );

  const token = localStorage.getItem("jwt");
  console.log(token);

  return (
    <div>
      {!hideNavbarFooter && <Navbar />}

      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated === true ? <Home /> : <Navigate to={"/login"} />
          }
        />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/creators" element={<Creators />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />

        {/* update each blog  */}
        <Route path="/blog/:id" element={<BlogDetail />} />
        <Route path="/blog/update/:id" element={<UpdateBlog />} />

        <Route path="*" element={<NotFound />} />
      </Routes>

      {/* footer  */}
      {!hideNavbarFooter && <Footer />}
    </div>
  );
}

export default App;
