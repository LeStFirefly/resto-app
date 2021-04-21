const initialState = {
    menu: [
    ],
    loading: true,
    items: [],
    error: false,
    total: 0
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'MENU_LOADED':
            return {
                ...state,
                menu: action.payload,
                loading: false,
                error: false
            };
        case 'MENU_REQUESTED':
            return {
                ...state,
                menu: state.menu,
                loading: true,
                error: false
            };
        case 'MENU_ERROR':
            return {
                ...state,
                menu: state.menu,
                error: true
            };
        case 'ITEM_ADD_TO_CART':
            {
            const id=action.payload;
            const indItem = state.items.findIndex(item => item.id === id);

            if (indItem>=0) {
                const repeatItem = state.items.find(item => item.id === id);
                const newItem = {
                    ...repeatItem,
                    count: ++repeatItem.count
                };

                return {
                    ...state,
                    items: [
                        ...state.items.slice(0,indItem),
                        newItem,
                        ...state.items.slice(indItem+1)
                    ],
                    total: state.total+newItem.price
                }
            }
            
            const item = state.menu.find(item => item.id === id);
            const newItem = {
                title: item.title,
                price: item.price,
                url: item.url,
                id: item.id,
                count: 1
            };

            return {
                ...state,
                items: [
                    ...state.items,
                    newItem
                ],
                total: state.total+newItem.price
            };
        }
        case 'ITEM_REMOVE_FROM_CART':
            {
            const id=action.payload;
            const itemIndex = state.items.findIndex(item => item.id === id);
            const deletePrice = state.items[itemIndex].price*state.items[itemIndex].count;
            return {
                ...state,
                total: state.total - deletePrice,
                items: [
                    ...state.items.slice(0,itemIndex),
                    ...state.items.slice(itemIndex+1)
                ]
            };
        }
        case 'DEC_ITEM_COUNT':
            {
            const item = action.payload;
            const id = item.id;
            const index = state.items.findIndex(item => item.id === id);
            
            const changedItem = {
                title: item.title,
                price: item.price,
                url: item.url,
                id: item.id,
                count: --item.count
            };

            if (changedItem.count === 0) {
                return {
                    ...state,
                    total: state.total-item.price,
                    items: [
                        ...state.items.slice(0,index),
                        ...state.items.slice(index+1)
                    ]
                };
            }

            return {
                ...state,
                total: state.total-item.price,
                items: [
                    ...state.items.slice(0,index),
                    changedItem,
                    ...state.items.slice(index+1)
                ]
            };
        }
        case 'INC_ITEM_COUNT':
        {
            const item = action.payload;
            const id = item.id;
            const index = state.items.findIndex(item => item.id === id);
            
            const changedItem = {
                title: item.title,
                price: item.price,
                url: item.url,
                id: item.id,
                count: ++item.count
            };

            return {
                ...state,
                total: state.total+item.price,
                items: [
                    ...state.items.slice(0,index),
                    changedItem,
                    ...state.items.slice(index+1)
                ]
            };
        }
        default:
            return state;
    }
}

export default reducer;