import { CartContext } from "lush/context";
import { useContext } from "react";

export const useCart = () => useContext(CartContext);
