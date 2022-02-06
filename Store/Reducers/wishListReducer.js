function toggleWishList(state = { wishListFilms: [] }, action) {
    let newState
    switch(action.type) {
        case 'TOGGLE_WISHLIST':
            const wishListFilmIndex = state.wishListFilms.findIndex(item => item.id === action.value.id)
            if(wishListFilmIndex !== -1) {
                newState = {
                    ...state,
                    wishListFilms: state.wishListFilms.filter((item, index) => index !== wishListFilmIndex)
                }
            } else {
                newState = {
                    ...state,
                    wishListFilms: [...state.wishListFilms, action.value]
                }
            }
            return newState || state
        default:
            return state
    }
}

export default toggleWishList