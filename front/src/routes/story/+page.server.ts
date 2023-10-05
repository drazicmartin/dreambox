import { BACKEND_URL } from '$lib/constants.js';
import axios from 'axios';

export async function load(){
    let stories = await axios.get(BACKEND_URL + `stories`).then(response => response.data.data);
    
    return {
        stories: stories
    };
}