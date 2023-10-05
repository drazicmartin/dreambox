import { BACKEND_URL } from '$lib/constants.js';
import axios from 'axios';

export async function load({params}){
    let story_id = params.story_id;

    let data = await axios.get(BACKEND_URL + `stories/${story_id}`).then(response => response.data.data);

    return data;
}