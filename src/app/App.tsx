import { RouterProvider } from "react-router";
import { router } from "./routes";
import { CartProvider } from "./contexts/CartContext";
import { UserProvider } from "./contexts/UserContext";

export default function App() {
  return (
    <UserProvider>
      <CartProvider>
        <RouterProvider router={router} />
      </CartProvider>
    </UserProvider>
  );
}