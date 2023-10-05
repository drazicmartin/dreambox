'use strict';

/**
 * card controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::card.card', ({ strapi }) =>  ({
  // custom quest to draw 4 random card of each type
  async draw(ctx) {

    const universes = (await strapi.db.query('api::card.card').findMany({
        where: 
        {
            type: "universe",
        },
    }))

    const characters = (await strapi.db.query('api::card.card').findMany({
        where: 
        {
            type: "character",
        },
    }))

    const spots = (await strapi.db.query('api::card.card').findMany({
        where: 
        {
            type: "spot",
        },
    }))

    const quests = (await strapi.db.query('api::card.card').findMany({
        where: 
        {
            type: "quest",
        },
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