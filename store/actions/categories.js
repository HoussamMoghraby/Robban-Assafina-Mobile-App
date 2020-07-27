import { apiUrl } from "../../helpers/apiUtils";
export const FETCH_CATEGORIES = 'FETCH_CATEGORIES';
export const FETCH_ARCHIVES_CATEGORIES = 'FETCH_ARCHIVES_CATEGORIES';

const DEFAULT_LIMIT = 100;
var excludedCategories = [];
const setExludedCategories = async () => {
    if (excludedCategories.length == 0) {
        try {
            const excludedCategoriesResponse = await fetch(`${apiUrl}categories?parent=202&per_page=100`);
            excludedCategories = (await excludedCategoriesResponse.json()).map(ec => ec.id);
            console.log(`excluded_categories:${excludedCategories}`);
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    }
}

export const fetchCategories = (start = 1, limit = DEFAULT_LIMIT) => {
    return async dispatch => {
        try {
            //any async code
            await setExludedCategories();
            let url = `${apiUrl}categories?status=publish&per_page=${limit}&page=${start}&hide_empty=true&exclude=${excludedCategories.join(',')}`;
            const response = await fetch(url);
            var resData = await response.json();
            if (resData.code) {
                resData = [];
            }
            //debugger;
            dispatch({ type: FETCH_CATEGORIES, categories: resData });
        } catch (error) {
            throw error;
        }
    }
}

export const fetchArchivesCategories = (start = 1, limit = DEFAULT_LIMIT) => {
    return async dispatch => {
        try {
            //any async code
            let url = `${apiUrl}categories?status=publish&per_page=${limit}&page=${start}&parent=202`;
            const response = await fetch(url);
            var resData = await response.json();
            if (resData.code) {
                resData = [];
            }
            console.log('archive categories');
            console.log(resData);
            // debugger;
            dispatch({ type: FETCH_ARCHIVES_CATEGORIES, archiveCategories: resData });
        } catch (error) {
            throw error;
        }
    }
}