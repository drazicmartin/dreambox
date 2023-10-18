import axios from "axios";
import type { SetOfCards } from "./types";
import { OPENAI_API_KEY } from '$env/static/private'
import OpenAI from "openai";
import { BACKEND_URL } from "./constants";

const openai = new OpenAI({
    apiKey: OPENAI_API_KEY,
});

export async function uploadImage(imageUrl: string) {
    // Download the image from the URL
    const imageResponse = await fetch(imageUrl);
    const imageBlob = await imageResponse.blob();

    // Prepare the FormData object
    const formData = new FormData();
    console.log(imageResponse);
    formData.append('files', imageBlob);
  
    const response = await axios.post(BACKEND_URL + 'upload', formData).then((response) => response?.data)

    return response[0].id;
  }

export async function generateImage(prompt: string){
    return openai.images.generate({
        prompt: prompt,
        size: "256x256",
    })
}

export async function generateImageOfCards(data: SetOfCards){
    if (data.character.image && data.quest.image && data.spot.image && data.universe.image){
        return data;
    }
    let next_index = 0;
    let promise_array = [];
    let character_index = 0;
    if (!data.character.image) {
        character_index = next_index;
        next_index++;
        promise_array.push(
            generateImage(data.character.description)
        )
    }

    let spot_index = 0;
    if (!data.spot.image) {
        spot_index = next_index;
        next_index++;
        promise_array.push(
            generateImage(data.spot.description)
        )
    }

    let universe_index = 0;
    if (!data.universe.image) {
        universe_index = next_index;
        next_index++;
        promise_array.push(
            generateImage(data.universe.description)
        )
    }

    let quest_index = 0;
    if (!data.quest.image) {
        quest_index = next_index;
        next_index++;
        promise_array.push(
            generateImage(data.quest.description)
        )
    }

    const images = await Promise.all(promise_array);

    if (!data.character.image) {
        let id = await uploadImage(images[character_index].data[0].url!);

        data.character = await axios.put(BACKEND_URL + `cards/${data.character.id}?populate=image`, {
            data: {
                image: {
                    id : id
                }
            }
        }).then(response => response.data.data.attributes);
    }

    if (!data.spot.image) {
        let id = await uploadImage(images[spot_index].data[0].url!);

        data.spot = await axios.put(BACKEND_URL + `cards/${data.spot.id}?populate=image`, {
            data: {
                image: {
                    id : id
                }
            }
        }).then(response => response.data.data.attributes);
    }

    if (!data.universe.image) {
        let id = await uploadImage(images[universe_index].data[0].url!);

        data.universe = await axios.put(BACKEND_URL + `cards/${data.universe.id}?populate=image`, {
            data: {
                image: {
                    id : id
                }
            }
        }).then(response => response.data.data.attributes);
    }

    if (!data.quest.image) {
        let id = await uploadImage(images[quest_index].data[0].url!);

        data.quest = await axios.put(BACKEND_URL + `cards/${data.quest.id}?populate=image`, {
            data: {
                image: {
                    id : id
                }
            }
        }).then(response => response.data.data.attributes);
    }

    return data;
}
