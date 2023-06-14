




/// StatefulGreeting///

// import logo from './logo.svg';
// import './App.css';
// import StatefulGreeting from './components/StatefulGreeting';

// function App() {
//   return (
//     <div className="App">
//       <StatefulGreeting greeting="I'm a stateful class component!" name="Mike"/>
//     </div>
//   );
// }

// export default App;



///  StatefulGreetingWithCallback ///

// import logo from "./logo.svg";
// import "./App.css";
// import StatefulGreetingWithCallback from "./components/StatefulGreetingWithCallback";

// function App() {
//   return (
//     <div className="App">
//       <StatefulGreetingWithCallback />
//     </div>
//   );
// }

// export default App;



//// StatefulGreetingWithPrevState ///

// import "./App.css";
// import StatefulGreetingWithPrevState from "./components/StatefulGreetingWithPrevState";

// function App() {
//   return (
//     <div className="App">
//       <StatefulGreetingWithPrevState />
//     </div>
//   );
// }

// export default App;





// import "./App.css";
// import EventsClass from "./components/EventsClass";
// import EventsFunctional from "./components/EventsFunctional";

// function App() {
//   return <div className="App">
//       <EventsFunctional />
//       <EventsClass />
//   </div>;
// }

// export default App;



// import "./App.css";
// import ConditionalRenderingClass from "./components/ConditionalRenderingClass";
// import ConditionalRenderingFunctional from "./components/ConditionalRenderingFunctional";

// function App() {
//   return (
//     <div className="App">
//       <ConditionalRenderingClass />
//       <ConditionalRenderingFunctional connected={true} />
//     </div>
//   );
// }

// export default App;



// import "./App.css";
// import NestingComponents from "./components/NestingComponents";

// function App() {
//   return <div className="App">
//       < NestingComponents />
//   </div>;
// }

// export default App;



// import "./App.css";
// import MethodsAsPropsParent from "./components/MethodsAsPropsParent";

// function App() {
//   return <div className="App">
//       <MethodsAsPropsParent />
//   </div>;
// }

// export default App;


// import "./App.css";
// import RenderingLists from "./components/RenderingLists";

// function App() {
//   return <div className="App">
//       <RenderingLists />
//   </div>;
// }

// export default App;



// import "./App.css";
// import Clock from "./components/Clock";

// function App() {
//   return <div className="App">
//       <Clock />
//     </div>;
// }

// export default App;


// import "./App.css";
// import LifeCyclesCDM from "./components/LifeCyclesCDM";

// function App() {
//   return <div className="App">
//       <LifeCyclesCDM />
//   </div>;
// }

// export default App;




// import "./App.css";
// import LifeCyclesCDU from "./components/LifeCyclesCDU";

// function App() {
//   return <div className="App">
//       <LifeCyclesCDU />
//   </div>;
// }

// export default App;



// import "./App.css";
// import LifeCyclesCWU from "./components/LifeCyclesCWU";

// function App() {
//   return <div className="App">
//       <LifeCyclesCWU />
//     </div>;
// }

// export default App;


// import "./App.css";
// import ControlledForm from "./components/ControlledForm";

// function App() {
//   return <div className="App">
//       <ControlledForm />
//   </div>;
// }

// export default App;


// import "./App.css";
// import UncontrolledForm from "./components/UncontrolledForm";

// function App() {
//   return <div className="App">
//       <UncontrolledForm />
//   </div>;
// }

// export default App;


// import "./App.css";
// import { SearchBar3 } from "./components/SearchBar3";

// function App() {
//   return <div className="App">
//       <SearchBar3 />
//   </div>;
// }

// export default App;


// import "./App.css";
// import HooksCounter from "./components/HooksCounter";
// import ClassCounter from "./components/ClassCounter";

// function App() {
//   return <div className="App">
//       <HooksCounter />
//       <ClassCounter />
//     </div>;
// }

// export default App;



// import "./App.css";
// import ControlledFormHooks from "./components/ControlledFormHooks";

// function App() {
//   return <div className="App">
//       <ControlledFormHooks />
//   </div>;
// }

// export default App;


// import "./App.css";
// import UseStateWithArrays from "./components/UseStateWithArrays";

// function App() {
//   return <div className="App">
//      <UseStateWithArrays /> 
//   </div>;
// }

// export default App;



// import "./App.css";
// import ClassCounter1 from "./components/ClassCounter1";
// import UseEffectCounter from "./components/UseEffectCounter";

// function App() {
//   return <div className="App">
//       {/* <ClassCounter /> */}
//       <UseEffectCounter />
//   </div>;
// }

// export default App;

// import React from 'react';
// import "./App.css";



// import "./App.css";
// import HTTPRequests from "./components/HTTPRequests";

// function App() {
//   return <div className="App">
//       <HTTPRequests />
//   </div>;
// }

// export default App;




import React from "react";
import styles from "./App.module.css";
import NavBar from "./components/NavBar";
import Container from "react-bootstrap/Container";
import { Routes, Route } from "react-router-dom";
import "./api/axiosDefaults";
import SignUpForm from "./pages/auth/SignUpForm";
import LoginForm from "./pages/auth/LoginForm";
import Footer from "./Footer";
import PostCreateForm from "./pages/post/PostCreateForm";
import Page404 from "./components/Page404";
import DetailPostPage from "./pages/post/DetailPostPage";
import PostList from "./pages/post/PostList";
import { useCurrentUser } from "./contexts/CurrentUserContext";
import EditPostForm from "./pages/post/EditPostForm";
import About from "./pages/about/About";
import IgfilePage from "./pages/igfile/IgfilePage";
import Page500 from "./components/Page500";
import UsernameForm from "./pages/igfile/UsernameForm";
import UserPasswordForm from "./pages/igfile/UserPasswordForm";
import IgfileEditForm from "./pages/igfile/IgfileEditForm";

function App() {
  const currentUser = useCurrentUser();
  const igfile_id = currentUser?.igfile_id || "";

  return (
    <div className={styles.App}>
      <NavBar />
      <Container className={styles.Main}>
        <Routes>
          <Route
            exact
            path="/"
            element={
              <PostList message="No results found. Try using other search keywords?" />
            }
          />
          <Route exact path="/about" element={<About />} />
          <Route
            exact
            path="/feed"
            element={
              <PostList
                message="No results found. Try using other search keywords or follow a user."
                filter={`author__followed_user__author__igfile=${igfile_id}&`}
              />
            }
          />
          <Route
            exact
            path="/reyakked"
            element={
              <PostList
                message="No results found. Try using other search keywords or like a post."
                filter={`post_reyakker__post_reyakker__igfile=${igfile_id}&ordering=-post_reyakker__created_at&`}
              />
            }
          />
          <Route exact path="/login" element={<LoginForm />} />
          <Route exact path="/signup" element={<SignUpForm />} />
          <Route exact path="/post/create" element={<PostCreateForm />} />
          <Route exact path="post/:id" element={<DetailPostPage />} />
          <Route exact path="post/:id/edit" element={<EditPostForm />} />
          <Route exact path="/igfile/:id" element={<IgfilePage />} />
          <Route
            exact
            path="/igfile/:id/edit/username"
            element={<UsernameForm />}
          />
          <Route
            exact
            path="/igfile/:id/edit/password"
            element={<UserPasswordForm />}
          />
          <Route exact path="/igfile/:id/edit" element={<IgfileEditForm />} />
          <Route path="*" element={<Page404 />} />
          <Route path="/500" element={<Page500 />} />
        </Routes>
      </Container>
      <Footer />
    </div>
  );
}

export default App;
