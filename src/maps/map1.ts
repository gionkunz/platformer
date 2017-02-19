export default {
  tiles: {
    0: {
      name: 'air',
      colour: '#eee',
      friction: {
        x: 0.98,
        y: 0.98
      },
      acceleration: {
        x: 0.1,
        y: 1
      }
    },
    1: {
      name: 'ground',
      colour: '#333',
      jump: true,
      solid: true,
      friction: {
        x: 0.8,
        y: 0.8
      }
    },
    2: {
      name: 'slime',
      colour: 'rgba(100, 200, 100, 0.8)',
      foreground: true,
      jump: true,
      friction: {
        x: 0.6,
        y: 0.6
      },
      acceleration: {
        x: 1,
        y: 1
      },
      gravity: {
        x: 0,
        y: 100
      },
      forcePriority: true
    },
    3: {
      name: 'ice',
      colour: 'rgba(200, 200, 255, 1)',
      jump: true,
      solid: true,
      friction: {
        x: 0.98,
        y: 0.98
      },
      acceleration: {
        x: 0.1,
        y: 0.8
      }
    },
    4: {
      name: 'elevation',
      colour: 'rgba(255, 0, 255, 0.3)',
      jump: false,
      foreground: true,
      gravity: {
        x: 0,
        y: -1000
      },
      forcePriority: true
    },
    5: {
      name: 'water',
      colour: 'rgba(120, 180, 255, 0.3)',
      jump: true,
      foreground: true,
      gravity: {
        x: 0,
        y: -400
      },
      friction: {
        x: 0.75,
        y: 0.75
      },
      forcePriority: true
    }
  },
  tileSize: 64,
  data: [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 4, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 4, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 4, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1],
    [1, 4, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 4, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 1, 5, 1],
    [1, 4, 1, 0, 1, 1, 1, 1, 0, 0, 0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1, 1, 1, 1, 1, 1, 3, 3, 3, 3, 3, 3, 3, 0, 1, 5, 1],
    [1, 4, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 5, 1],
    [1, 4, 1, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 0, 1, 1, 0, 1, 5, 1],
    [1, 4, 1, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 5, 1],
    [1, 4, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 5, 1],
    [1, 4, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 3, 1, 5, 1],
    [1, 4, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 3, 1, 1, 1, 1, 1, 5, 1],
    [1, 4, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 3, 1, 1, 1, 1, 1, 1, 5, 5, 5, 5, 1],
    [1, 4, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 3, 3, 3, 1, 1, 1, 1, 1, 5, 5, 5, 5, 1, 5, 1, 1, 1, 1],
    [1, 4, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 5, 5, 5, 5, 5, 5, 5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 5, 1, 1, 5, 1, 5, 5, 5, 1, 1],
    [1, 4, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 5, 5, 5, 5, 5, 5, 5, 1, 1, 1, 1, 1, 1, 5, 5, 5, 5, 1, 1, 5, 1, 1, 1, 5, 1, 1],
    [1, 4, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 1, 1, 1, 1, 1, 5, 5, 5, 5, 5, 1, 1],
    [1, 4, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 4, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1],
    [1, 4, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1],
    [1, 4, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1],
    [1, 4, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1],
    [1, 4, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1],
    [1, 4, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1],
    [1, 4, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1],
    [1, 4, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1],
    [1, 4, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1],
    [1, 4, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1],
    [1, 4, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1],
    [1, 4, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1],
    [1, 4, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1],
    [1, 4, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1],
    [1, 4, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1],
    [1, 4, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1],
    [1, 4, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1],
    [1, 4, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1],
    [1, 4, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1],
    [1, 4, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1],
    [1, 4, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1],
    [1, 4, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1],
    [1, 4, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1],
    [1, 4, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1],
    [1, 4, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
  ],
  entities: [{
    type: 'player',
    location: {x: 4, y: 1}, pivot: {x: 8, y: 8}
  }, {
    type: 'coin',
    location: {x: 6, y: 6}, pivot: {x: 8, y: 8}
  }, {
    type: 'coin',
    location: {x: 12, y: 6}, pivot: {x: 8, y: 8}
  }, {
    type: 'coin',
    location: {x: 14, y: 6}, pivot: {x: 8, y: 8}
  }, {
    type: 'coin',
    location: {x: 16, y: 6}, pivot: {x: 8, y: 8}
  }, {
    type: 'coin',
    location: {x: 15, y: 11}, pivot: {x: 8, y: 8}
  }, {
    type: 'coin',
    location: {x: 18, y: 6}, pivot: {x: 8, y: 8}
  }, {
    type: 'coin',
    location: {x: 27, y: 6}, pivot: {x: 8, y: 8}
  }, {
    type: 'coin',
    location: {x: 29, y: 6}, pivot: {x: 8, y: 8}
  }, {
    type: 'coin',
    location: {x: 31, y: 6}, pivot: {x: 8, y: 8}
  }, {
    type: 'coin',
    location: {x: 34, y: 11}, pivot: {x: 8, y: 8}
  }, {
    type: 'coin',
    location: {x: 26, y: 9}, pivot: {x: 8, y: 8}
  }, {
    type: 'coin',
    location: {x: 7, y: 11}, pivot: {x: 8, y: 8}
  }, {
    type: 'coin',
    location: {x: 25, y: 17}, pivot: {x: 8, y: 8}
  }, {
    type: 'coin',
    location: {x: 33, y: 14}, pivot: {x: 8, y: 8}
  }, {
    type: 'coin',
    location: {x: 31, y: 18}, pivot: {x: 8, y: 8}
  }, {
    type: 'coin',
    location: {x: 6, y: 41}, pivot: {x: 8, y: 8}
  }, {
    type: 'coin',
    location: {x: 3, y: 38}, pivot: {x: 8, y: 8}
  }, {
    type: 'coin',
    location: {x: 6, y: 35}, pivot: {x: 8, y: 8}
  }, {
    type: 'coin',
    location: {x: 3, y: 32}, pivot: {x: 8, y: 8}
  }, {
    type: 'coin',
    location: {x: 6, y: 29}, pivot: {x: 8, y: 8}
  }, {
    type: 'coin',
    location: {x: 3, y: 26}, pivot: {x: 8, y: 8}
  }, {
    type: 'coin',
    location: {x: 6, y: 23}, pivot: {x: 8, y: 8}
  }, {
    type: 'coin',
    location: {x: 3, y: 20}, pivot: {x: 8, y: 8}
  }, {
    type: 'coin',
    location: {x: 6, y: 17}, pivot: {x: 8, y: 8}
  }]
};