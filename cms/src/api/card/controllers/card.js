'use strict';

/**
 * card controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::card.card', ({ strapi }) =>  ({
  // custom quest to draw 4 random card of each type
  async draw(ctx) {

    let populate = ["image"]

    const universes = (await strapi.db.query('api::card.card').findMany({
        where: 
        {
            type: "universe",
        },
        populate: populate,
    }))

    const characters = (await strapi.db.query('api::card.card').findMany({
        where: 
        {
            type: "character",
        },
        populate: populate,
    }))

    const spots = (await strapi.db.query('api::card.card').findMany({
        where: 
        {
            type: "spot",
        },
        populate: populate,
    }))

    const quests = (await strapi.db.query('api::card.card').findMany({
        where: 
        {
            type: "quest",
        },
        populate: populate,
    }))

    const universe = universes[Math.floor(Math.random() * universes.length)];
    const spot = spots[Math.floor(Math.random() * spots.length)];
    const character = characters[Math.floor(Math.random() * characters.length)];
    const quest = quests[Math.floor(Math.random() * quests.length)];

    return {
        data: {
            universe,
            spot,
            character,
            quest,
        }
    };
  },
}));