const menuLoaded = (newMenu) => {
    return {
        type: 'MENU_LOADED',
        payload: newMenu
    };
};

const menuRequested = () => {
    return {
        type: 'MENU_REQUESTED',
    };
};

const menuError = () => {
    return {
        type: 'MENU_ERROR',
    };
};

const addedToCart = (id) => {
    return {
        type: 'ITEM_ADD_TO_CART',
        payload: id
    };
};

const deleteFromCart = (id) => {
    return {
        type: 'ITEM_REMOVE_FROM_CART',
        payload: id
    };
};

const decCount = (item) => {
    return {
        type: 'DEC_ITEM_COUNT',
        payload: item
    };
};

const incCount = (item) => {
    return {
        type: 'INC_ITEM_COUNT',
        payload: item
    };
};

export {
    menuLoaded,
    menuRequested,
    menuError,
    addedToCart,
    deleteFromCart,
    decCount,
    incCount
};