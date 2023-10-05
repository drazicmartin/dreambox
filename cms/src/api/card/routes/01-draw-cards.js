module.exports = {
    routes: [
      { // Path defined with a URL parameter
        method: 'GET',
        path: '/card/draw',
        handler: 'card.draw',
        config: {
          auth: false,
        },
      },
    ]
  }