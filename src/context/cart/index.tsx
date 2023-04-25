import { ProductFragment } from "lush/schema";
import { createContext, FC, PropsWithChildren, useReducer } from "react";

enum CartActionType {
	ADD = "ADD",
	REMOVE = "REMOVE",
}

interface CartAction {
	type: CartActionType;
	payload: ProductFragment;
}

type CartItem = {
	quantity: number;
	product: ProductFragment;
};

const cartReducer = (state: CartItem[], action: CartAction) => {
	switch (action.type) {
		case CartActionType.ADD:
			const existingItem = state.find(
				(cartItem) => cartItem.product.id === action.payload.id
			);

			if (existingItem) {
				return state.map((cartItem) =>
					cartItem.product.id === action.payload.id
						? {
								...cartItem,
								quantity: cartItem.quantity + 1,
						  }
						: cartItem
				);
			}

			return [
				...state,
				{
					quantity: 1,
					product: action.payload,
				},
			];
		case CartActionType.REMOVE:
			return state.filter(
				(cartItem) => cartItem.product.id !== action.payload.id
			);
		default:
			return state;
	}
};

export interface CartContextState {
	addToCart: (product: ProductFragment) => void;
	cart: CartItem[];
	removeFromCart: (product: ProductFragment) => void;
}

const CartContext = createContext<CartContextState>({
	addToCart: () => {},
	cart: [],
	removeFromCart: () => {},
});

const CartProvider: FC<PropsWithChildren> = ({ children }) => {
	const [cart, dispatch] = useReducer(cartReducer, []);

	const addToCart = (product: ProductFragment) => {
		dispatch({
			type: CartActionType.ADD,
			payload: product,
		});
	};

	const removeFromCart = (product: ProductFragment) => {
		dispatch({
			type: CartActionType.REMOVE,
			payload: product,
		});
	};

	return (
		<CartContext.Provider
			value={{
				addToCart,
				cart,
				removeFromCart,
			}}
		>
			{children}
		</CartContext.Provider>
	);
};

export { CartContext, CartProvider };
