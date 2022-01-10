function toggleSeen(state = { seenFilms: [] }, action) {
    let newState
    switch(action.type) {
        case 'TOGGLE_SEEN':
            const seenFilmIndex = state.seenFilms.findIndex(item => item.id === action.value.id)
            if(seenFilmIndex !== -1) {
                newState = {
                    ...state,
                    seenFilms: state.seenFilms.filter((item, index) => index !== seenFilmIndex)
                }
            } else {
                newState = {
                    ...state,
                    seenFilms: [...state.seenFilms, action.value]
                }
            }
            return newState || state
        default:
            return state
    }
}

export default toggleSeen