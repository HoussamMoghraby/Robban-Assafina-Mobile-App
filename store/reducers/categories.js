//import { posts_data } from '../../data/posts';
import { FETCH_CATEGORIES, FETCH_ARCHIVES_CATEGORIES } from '../actions/categories';

export const initialState = {
    categories: [],
    archiveCategories: []
}


const categoriesReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_CATEGORIES:
            var loadedCategories = action.categories;
            return { ...state, categories: loadedCategories };
        case FETCH_ARCHIVES_CATEGORIES:
            var loadedArchiveCategories = action.archiveCategories;
            return { ...state, archiveCategories: loadedArchiveCategories };
        default:
            return state;
    }
}

export default categoriesReducer;