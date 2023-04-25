import { CategoryFragment } from "lush/schema";
import { createContext, FC, PropsWithChildren, useReducer } from "react";

enum CategoryActionType {
	ClearAll = "CATEGORIES_CLEAR_ALL",
	Toggle = "CATEGORY_TOGGLE",
}

interface CategoryAction {
	payload?: CategoryFragment;
	type: CategoryActionType;
}

const categoriesReducer = (
	state: CategoryFragment[],
	action: CategoryAction
) => {
	switch (action.type) {
		case CategoryActionType.Toggle: {
			const { payload } = action;

			if (!payload) {
				return state;
			}

			return state.some((category) => category.id === payload.id)
				? state.filter((category) => category.id !== payload.id)
				: [...state, payload];
		}
		case CategoryActionType.ClearAll: {
			return [];
		}
		default: {
			return state;
		}
	}
};

export interface FiltersContextState {
	activeCategories: CategoryFragment[];
	clearAllCategories: () => void;
	toggleCategory: (category: CategoryFragment) => void;
}

const FiltersContext = createContext<FiltersContextState>({
	activeCategories: [],
	clearAllCategories: () => {},
	toggleCategory: () => {},
});

const FiltersProvider: FC<PropsWithChildren> = ({ children }) => {
	const [activeCategories, dispatch] = useReducer(categoriesReducer, []);

	return (
		<FiltersContext.Provider
			value={{
				activeCategories,
				clearAllCategories: () => {
					dispatch({
						type: CategoryActionType.ClearAll,
					});
				},
				toggleCategory: (category) => {
					dispatch({
						payload: category,
						type: CategoryActionType.Toggle,
					});
				},
			}}
		>
			{children}
		</FiltersContext.Provider>
	);
};

export { FiltersContext, FiltersProvider };
