import { ProductFragment } from "lush/schema";
import {
	createContext,
	FC,
	PropsWithChildren,
	useReducer,
	useState,
} from "react";

enum CartActionType {
	PRODUCT_ADD = "PRODUCT_ADD",
	PRODUCT_REMOVE = "PRODUCT_REMOVE",
	PRODUCT_QUANTITY_SET = "PRODUCT_QUANTITY_SET",
}

type CartAction =
	| {
			type: CartActionType.PRODUCT_ADD;
			payload: {
				product: ProductFragment;
				quantity?: number;
			};
	  }
	| {
			type: CartActionType.PRODUCT_REMOVE;
			payload: ProductFragment["id"];
	  }
	| {
			type: CartActionType.PRODUCT_QUANTITY_SET;
			payload: {
				productId: ProductFragment["id"];
				quantity: number;
			};
	  };

export interface CartItem {
	quantity: number;
	product: ProductFragment;
}

const cartReducer = (state: CartItem[], action: CartAction) => {
	switch (action.type) {
		case CartActionType.PRODUCT_ADD: {
			const { product, quantity } = action.payload;
			const newQuantity = quantity ?? 1;

			const existingItem = state.find(
				(cartItem) => cartItem.product.id === product.id
			);

			if (existingItem) {
				return state.map((cartItem) =>
					cartItem.product.id === product.id
						? {
								...cartItem,
								quantity: cartItem.quantity + newQuantity,
						  }
						: cartItem
				);
			}

			return [
				...state,
				{
					quantity: newQuantity,
					product,
				},
			];
		}
		case CartActionType.PRODUCT_REMOVE: {
			return state.filter((cartItem) => cartItem.product.id !== action.payload);
		}
		case CartActionType.PRODUCT_QUANTITY_SET: {
			return state
				.map((cartItem) =>
					cartItem.product.id === action.payload.productId
						? {
								...cartItem,
								quantity: action.payload.quantity,
						  }
						: cartItem
				)
				.filter((cartItem) => cartItem.quantity > 0);
		}
		default: {
			return state;
		}
	}
};

export interface CartContextState {
	addToCart: (product: ProductFragment, quantity?: number) => void;
	cart: CartItem[];
	count: number;
	costTotalRequiredForFreeDelivery: number;
	hasFreeDelivery: boolean;
	isInCart: (productId: ProductFragment["id"]) => boolean;
	pullout: {
		isOpen: boolean;
		setIsOpen: (isOpen: boolean) => void;
	};
	quantitySet: ({
		productId,
		quantity,
	}: {
		productId: ProductFragment["id"];
		quantity: number;
	}) => void;
	removeFromCart: (productId: ProductFragment["id"]) => void;
	costTotal: {
		amount: number;
		currency: string;
	};
}

const CartContext = createContext<CartContextState>({
	addToCart: () => {},
	cart: [],
	count: 0,
	costTotalRequiredForFreeDelivery: 50,
	hasFreeDelivery: false,
	isInCart: () => false,
	quantitySet: () => {},
	removeFromCart: () => {},
	pullout: {
		isOpen: false,
		setIsOpen: () => {},
	},
	costTotal: {
		amount: 0,
		currency: "GBP",
	},
});

const CartProvider: FC<PropsWithChildren> = ({ children }) => {
	const [pulloutIsOpen, setPulloutIsOpen] = useState(false);
	const [cart, dispatch] = useReducer(cartReducer, []);

	const costTotal = cart.reduce(
		(acc, cartItem) => {
			const { amount, currency } =
				cartItem?.product?.pricing?.priceRange?.stop?.gross ?? {};

			if (!amount || !currency) return acc;

			return {
				amount: acc.amount + amount * cartItem.quantity,
				currency,
			};
		},
		{
			amount: 0,
			// TODO: get currency from context
			currency: "GBP",
		} as CartContextState["costTotal"]
	);

	const hasFreeDelivery = costTotal?.amount >= 50;

	return (
		<CartContext.Provider
			value={{
				addToCart: (product, quantity) => {
					dispatch({
						type: CartActionType.PRODUCT_ADD,
						payload: {
							product,
							quantity,
						},
					});
				},
				cart,
				costTotalRequiredForFreeDelivery: 50,
				count: cart.reduce((acc, cartItem) => acc + cartItem.quantity, 0),
				hasFreeDelivery,
				quantitySet: (payload) => {
					dispatch({
						type: CartActionType.PRODUCT_QUANTITY_SET,
						payload,
					});
				},
				isInCart: (productId) =>
					cart.some((cartItem) => cartItem.product.id === productId),
				pullout: {
					isOpen: pulloutIsOpen,
					setIsOpen: setPulloutIsOpen,
				},
				removeFromCart: (productId) => {
					dispatch({
						type: CartActionType.PRODUCT_REMOVE,
						payload: productId,
					});
				},
				costTotal,
			}}
		>
			{children}
		</CartContext.Provider>
	);
};

export { CartContext, CartProvider };
