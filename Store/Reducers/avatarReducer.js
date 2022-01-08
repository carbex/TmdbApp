const initialState = { avatar: require('../../Images/ic_tag_faces.png')}
function setAvatar(state= initialState, action) {
    let newState
    switch(action.type) {
        case 'SET_AVATAR':
            newState = {
                ...state,
                avatar: action.value
            }
            return newState || state
        default: 
        return state
    }
}

export default setAvatar