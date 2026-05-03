import { createBrowserRouter } from "react-router";
import { Root } from "./components/Root";
import { Home } from "./components/Home";
import { Courses } from "./components/Courses";
import { CourseDetail } from "./components/CourseDetail";
import { FAQ } from "./components/FAQ";
import { Register } from "./components/Register";
import { Dashboard } from "./components/Dashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "courses", Component: Courses },
      { path: "courses/:courseId", Component: CourseDetail },
      { path: "faq", Component: FAQ },
      { path: "register", Component: Register },
      { path: "dashboard", Component: Dashboard },
    ],
  },
]);