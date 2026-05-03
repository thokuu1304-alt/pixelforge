import { createContext, useContext, useState, ReactNode } from "react";
import { Course } from "../data/courses";

export interface User {
  name: string;
  email: string;
  avatar?: string;
  joinedAt: Date;
  enrolledCourses: { course: Course; progress: number; completedLessons: number }[];
  certificates: string[];
}

interface UserContextValue {
  user: User | null;
  register: (name: string, email: string) => void;
  logout: () => void;
  enrollCourse: (course: Course) => void;
  isEnrolled: (courseId: string) => boolean;
}

const UserContext = createContext<UserContextValue | null>(null);

const DEMO_ENROLLED_COURSES_IDS = ["1", "3"];

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const register = (name: string, email: string) => {
    // In a real app, this would call an API
    setUser({
      name,
      email,
      joinedAt: new Date(),
      enrolledCourses: [],
      certificates: [],
    });
  };

  const logout = () => setUser(null);

  const enrollCourse = (course: Course) => {
    if (!user) return;
    if (user.enrolledCourses.find((ec) => ec.course.id === course.id)) return;
    setUser((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        enrolledCourses: [
          ...prev.enrolledCourses,
          { course, progress: 0, completedLessons: 0 },
        ],
      };
    });
  };

  const isEnrolled = (courseId: string) =>
    user?.enrolledCourses.some((ec) => ec.course.id === courseId) ?? false;

  return (
    <UserContext.Provider value={{ user, register, logout, enrollCourse, isEnrolled }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser must be used within UserProvider");
  return ctx;
}
