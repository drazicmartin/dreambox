import { OPENAI_API_KEY } from '$env/static/private'
import OpenAI from "openai";
import axios from 'axios';
import { BACKEND_URL } from '$lib/constants.js';
import { redirect } from '@sveltejs/kit';
import { generateImage, generateImageOfCards } from '$lib/utils';
import type { SetOfCards } from '$lib/types.js';

const openai = new OpenAI({
    apiKey: OPENAI_API_KEY,
});

/** @type {import('./$types').actions} */
export const actions = {
	generate_story: async ({ request }) => {
		const data = await request.formData();

		const character_title = data.get('character_title');
		const character_description = data.get('character_description');
        const character_id = data.get('character_id');
        
		const spot_title = data.get('spot_title');
		const spot_description = data.get('spot_description');
        const spot_id = data.get('spot_id');
        
		const universe_title = data.get('universe_title');
		const universe_description = data.get('universe_description');
        const universe_id = data.get('universe_id');
        
		const quest_title = data.get('quest_title');
		const quest_description = data.get('quest_description');
        const quest_id = data.get('quest_id');

        // Set new card attibute to false 

        [character_id, spot_id, universe_id, quest_id].forEach(card_id => {
            axios.put(BACKEND_URL + 'cards/' + card_id, {
                data: {
                    is_new: false
                }
            })
            .catch((error) => {
                console.log(error);
            });
        });

        // generate the story

        const response_story = await openai.chat.completions.create({
                model: "gpt-3.5-turbo",
                messages: [{
                    "role": "system", 
                    "content": `
                        You are a story teller, you will be asked to image a fictionary story.
                        The story must include a main character, a spot, an quest that the main character have to execute during the story, and a universe.
                        All those informations are given in the following lines.
                        You should write the story according to the universe.
                        The main character can not unsucced the quest.
                        you must be descriptive as much as possible and give details.
                        The main character is ${character_title}, ${character_description}.
                        The spot is ${spot_title}, ${spot_description}.
                        The quest is ${quest_title}, ${quest_description}.
                        The universe is ${universe_title}, ${universe_description}.
                        You must not write the name of the universe you are using.
                        You must use <br> to create return line.
                        You must write the story in french.
                        you must use html elements and css to stylise the text.
                        you must not finish the story, but you must tell the reader to imagine the end of the story.
                    `
                    },
                    {
                        "role": "user",
                        "content": "write the story."
                    }
                ],
        })

        let story = response_story.choices[0].message.content;

        // generate the image

        const response_img = await generateImage(`${character_description} in the universe of ${universe_title}`);

        let img_url = response_img.data[0].url;

        let story_id = await axios.post(BACKEND_URL + 'stories', {
            data: {
                text: story,
                image_url: img_url,
                info: {
                    universe: {
                        title: universe_title,
                        description: universe_description,
                    },
                    spot: {
                        title: spot_title,
                        description: spot_description,
                    },
                    quest: {
                        title: quest_title,
                        description: quest_description,
                    },
                    character: {
                        title: character_title,
                        description: character_description,
                    },
                }
            }
          })
          .then((response) => response.data.data.id
        )
        .catch((error) => {
            console.log(error);
        });
        
        throw redirect(303, `/story/${story_id}`);
	},
    draw_cards: async ({ request }) => {
        let cards: SetOfCards = await axios.get(BACKEND_URL + 'card/draw').then(response => response.data.data);

        // data = await generateImageOfCards(data);

        return {
            cards
        }
    }
};