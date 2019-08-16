export default [
  {
    '@id': '1',
    'id': '20c907d1-52cf-4c99-bbf7-1860847cd77e',
    'scheduled': Date.now(),
    'name': 'K1',
    'sides': {
      'visitor': {
        'team': {
          '@id': '11',
          'id': '6ba0bba3-c7b7-4216-850d-ca0b2dffb14d',
          'name': 'West Salem Panthers',
        },
        'score': { 'score': 20 }
      },
      'home': {
        'team': {
          '@id': '13',
          'id': '3ecec587-9646-4050-b3b8-ff9ad8711f5e',
          'name': 'Cochrane Fountain City Pirates',
        },
        'score': { 'score': 42 },
      }
    },
  }, {
    '@id': '15',
    'id': '35b0745d-ef13-4255-8c40-c9daa95e4cc4',
    'scheduled': 1499551200000,
    'name': 'K5',
    'sides': {
      'visitor': {
        'team': null,
        'score': null,
        'seed': {
          'sourceGame': {
            '@id': '17',
            'id': '5dd25794-429b-4a1b-9926-bca93438a799',
            'scheduled': 1499547600000,
            'name': 'K4',
            'sides': {
              'visitor': {
                'team': null,
                'score': null,
                'seed': {
                  'sourceGame': {
                    '@id': '18',
                    'id': 'b43e7160-9a6a-4fef-8d6a-1dfb73473653',
                    'scheduled': 1499540400000,
                    'name': 'B2',
                    'sides': {
                      'visitor': {
                        'team': {
                          '@id': 90,
                          name: 'Paulo'
                        },
                        'score': {score: 10},
                      },
                      'home': {
                        'team': {
                          '@id': 91,
                          name: 'Lucas'
                        },
                        'score': {score: 10}
                      }
                    },
                  }, 
                  'rank': 1, 
                  'displayName': 'Winner of B2'
                }
              },
              'home': {
                'team': {
                  '@id': '19',
                  'id': '7237ea20-b342-46be-9148-4b57e990be76',
                  'name': 'Whitehall Norse',
                },
                'score': null
              }
            },
          }, 
          'rank': 1, 
          'displayName': 'Winner of K4'
        }
      },
      'home': {
        'team': null,
        'score': null,
        'seed': {
          'sourceGame': {
            '@id': '20',
            'id': 'b6e869cc-e6ad-4151-9186-5df828b45802',
            'scheduled': 1499547600000,
            'name': 'B3',
            'ignoreStandings': false,
            'sides': {
              'visitor': {
                'score': null,
                'seed': { 
                  'sourceGame': { '@ref': '1' }, 
                  'sourcePool': null, 
                  'rank': 1, 
                  'displayName': 'Winner of B1' 
                }
              },
              'home': {
                'team': {
                  '@id': '21',
                  'id': 'cf2cb3a0-3659-4bda-9a60-4ec9b373aa25',
                  'name': 'Westby Norsemen',
                },
                'score': null,
                'seed': {
                  'sourceGame': null,
                  'rank': 1,
                  'displayName': ''
                }
              }
            },
          }, 
          'rank': 1, 
          'displayName': 'Winner of B3'
        }
      }
    },
  }
];
