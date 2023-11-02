// import logo from './logo.svg';
import './App.css';
import { ConsoleWindow, Personal, Projects, Backlogger, RedditFetcher, AboutMe, Picture, Root } from './components/Exports';
import {
  createHashRouter,
  RouterProvider,
  createRoutesFromElements,
  Route
} from 'react-router-dom';

// TODO: Convert this back to .tsx (requires some custom event class jank)

const router = createHashRouter(
  createRoutesFromElements(
    <Route element={<ConsoleWindow />}>
      <Route path="/" element={<Root />} />
      <Route path="projects" element={<Projects />} />
      <Route path="projects/backlogger" element={<Backlogger />} />
      <Route path="personal" element={<Personal />} />
      <Route path="personal/about-me" element={<AboutMe />} />
      <Route path="personal/picture" element={<Picture />} />
    </Route>
  )
);

export function App() {
   
  return (
    <RouterProvider router={router} />
  );
}