import Navbar from "../components/navbar/Navbar";
import Form from "../components/form/Form";
import Task from "../components/tasks/Task";
import "../pages/Home.css";


const Home = () => {
  return (
    <div>
      <Navbar />
      <div className="home-middle">
        <Task />
        <Form />
      </div>
    </div>
  );
};

export default Home;
