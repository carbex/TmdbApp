import{ createStore } from 'redux'
import toggleFavorite from './Reducers/favoriteReducer'
import toggleSeen from './Reducers/seenReducer'
import toggleWishList from './Reducers/wishListReducer'
import setAvatar from './Reducers/avatarReducer'
import { persistCombineReducers } from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage'

const rootPersistConfig = {
    key: 'root',
    storage: AsyncStorage
}

export default createStore(persistCombineReducers(rootPersistConfig, { toggleFavorite, toggleSeen, toggleWishList, setAvatar}))