import { API_TOKEN } from "@env"
import axios from "axios";

export const getFilms = async(text, page) => {
    try {
        const url = 'https://api.themoviedb.org/3/search/movie?api_key=' + API_TOKEN + '&language=fr-FR&query=' + text + '&page=' + page
        const response = await axios.get(url)
        if(response) {
            return response.data
        }
    } catch (error) {
        console.log(error)
    }
}

export function getImage (name) {
    return 'https://image.tmdb.org/t/p/w500' + name
}

export const getMovieDetail = async(id) => {
    try {
        const url = 'https://api.themoviedb.org/3/movie/' + id + '?api_key=' + API_TOKEN + '&language=fr-FR&append_to_response=videos'
        const response = await axios.get(url)
        if(response) {
            return response.data
        }
    } catch (error) {
        console.log(error)
    }
}

export const getTvDetail = async(id) => {
    try {
        const url = 'https://api.themoviedb.org/3/tv/' + id + '?api_key=' + API_TOKEN + '&language=fr-FR&append_to_response=videos'
        const response = await axios.get(url)
        if(response) {
            return response.data
        }
    } catch (error) {
        console.log(error)
    }
}

export const getNewFilms = async(page) => {
    try {
        const url = 'https://api.themoviedb.org/3/discover/movie?api_key=' + API_TOKEN + '&vote_count.gte=1000&sort_by=release_date.desc&language=fr-FR&page=' + page
        const response = await axios.get(url)
        if(response) {
            return response.data
        }
    } catch (error) {
        console.log(error)
    }
}

export const getNowPlaying = async(page) => {
    try {
        const url = 'https://api.themoviedb.org/3/movie/now_playing?api_key=' + API_TOKEN + '&language=fr-FR&page=' + page
        const response = await axios.get(url)
        if(response) {
            return response.data
        }
    } catch (error) {
        console.log(error)
    }
}

export const getPopular = async(page, type="movie") => {

    try {
        const url = 'https://api.themoviedb.org/3/' + type + '/popular?api_key=' + API_TOKEN + '&language=fr-FR&page=' + page
        const response = await axios.get(url)
        if(response) {
            return response.data
        }
    } catch (error) {
        console.log(error)
    }
}

export const getUpcoming = async(page) => {
    try {
        const url = 'https://api.themoviedb.org/3/movie/upcoming?api_key=' + API_TOKEN + '&language=fr-FR&page=' + page
        const response = await axios.get(url)
        if(response) {
            return response.data
        }
    } catch (error) {
        console.log(error)
    }
}

export const getTopRated = async(page) => {
    try {
        const url = 'https://api.themoviedb.org/3/movie/top_rated?api_key=' + API_TOKEN + '&language=fr-FR&page=' + page
        const response = await axios.get(url)
        if(response) {
            return response.data
        }
    } catch (error) {
        console.log(error)
    }
}
