let searchTextData = []; // Initialize the variable to hold the searchText

export const setSearchTextData = (text) => { // Function to update searchTextData
    searchTextData = text;
};

export const getSearchTextData = () => { // Function to retrieve searchTextData
    return searchTextData;
};