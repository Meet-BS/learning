const pactum = require('pactum');
const { any, int, string, eachLike, like } = require('pactum-matchers');

const response_clone = {
  "success": true,
  "data": {
    "name": ":projectname",
    "id": "246516",
    "recurring": true,
    "active": true,
    "isRunning": false,
    "createdBy": {
      "id": 7000,
      "name": "Meet Patel"
    },
    "scanData": {
      "pageCount": 1,
      "urlSet": [
        "https://sandbox.mabl.com"
      ],
      "authData": {
        "isAuthConfigured": false,
        "isAuthDeleted": false
      },
      "localData": {
        "isEnabled": false,
        "cltEnabled": false
      },
      "sitemapBaseUrl": "",
      "sitemapId": null,
      "crawledAt": "",
      "a11yConfigCreated": true,
      "stagingBaseUrl": null,
      "a11yConfig": {
        "needsReview": true,
        "bestPractices": false,
        "advanced": true,
        "wcagVersion": {
          "value": "wcag21aa"
        }
      },
      "visualConfig": {
        "scannerDelay": 5,
        "viewportSettings": {
          "desktop": [
            "1280"
          ]
        },
        "enableLayout": null
      }
    },
    "nextScanDate": "2025-05-05T10:30:00.000+00:00",
    "schedulePattern": "30 10 * * 1",
    "cookieConfig": [],
    "stagingBaseUrl": null
  }
}

const CLONE_SCAN_RESPONSE = {
  success: true,
  data: {
    name: string(), // Dynamic string value
    id: string(), // Dynamic string value
    recurring: any(Boolean), // Boolean value
    active: any(Boolean), // Boolean value
    isRunning: any(Boolean), // Boolean value
    createdBy: {
      id: int(), // Integer value
      name: string() // String value
    },
    scanData: {
      pageCount: int(), // Integer value
      urlSet: eachLike(string()), // Array of strings
      authData: {
        isAuthConfigured: any(Boolean), // Boolean value
        isAuthDeleted: any(Boolean) // Boolean value
      },
      localData: {
        isEnabled: any(Boolean), // Boolean value
        cltEnabled: any(Boolean) // Boolean value
      },
      sitemapBaseUrl: any(string), // String value
      sitemapId: any(null, string()), // Can be null or string
      crawledAt: any(string), // String value
      a11yConfigCreated: any(Boolean), // Boolean value
      stagingBaseUrl: any(null, string()), // Can be null or string
      // a11yConfig: any({
      //   needsReview: any(Boolean), // Boolean value
      //   bestPractices: any(Boolean), // Boolean value
      //   advanced: any(Boolean), // Boolean value
      //   wcagVersion: {
      //     value: string() // String value
      //   }
      // }, null), // Optional, can be null
      // visualConfig: regex(/.*/), // Optional: Matches any object or null

    },
    nextScanDate: string(), // String value
    schedulePattern: string(), // String value
    cookieConfig: eachLike(string(), { min: 0 }), // Array of strings or an empty array
    stagingBaseUrl: any(null, string()) // Can be null or string
  }
}

const SCAN_SCHEMA_VARIANTS = {
  withA11y: {
    success: true,
    data: {
      name: string(),
      id: string(),
      recurring: any(Boolean),
      active: any(Boolean),
      isRunning: any(Boolean),
      createdBy: {
        id: int(),
        name: string()
      },
      scanData: {
        pageCount: int(),
        urlSet: eachLike(string()),
        authData: {
          isAuthConfigured: any(Boolean),
          isAuthDeleted: any(Boolean)
        },
        localData: {
          isEnabled: any(Boolean),
          cltEnabled: any(Boolean)
        },
        sitemapBaseUrl: any(string),
        sitemapId: any(null, string()),
        crawledAt: any(string),
        a11yConfigCreated: any(Boolean),
        stagingBaseUrl: any(null, string()),
        a11yConfig: like({
          needsReview: any(Boolean),
          bestPractices: any(Boolean),
          advanced: any(Boolean),
          wcagVersion: {
            value: string()
          }
        }),
      },
      nextScanDate: string(),
      schedulePattern: string(),
      cookieConfig: eachLike(string(), { min: 0 }),
      stagingBaseUrl: any(null, string())
    }
  },

  withVisual: {
    success: true,
    data: {
      name: string(),
      id: string(),
      recurring: any(Boolean),
      active: any(Boolean),
      isRunning: any(Boolean),
      createdBy: {
        id: int(),
        name: string()
      },
      scanData: {
        pageCount: int(),
        urlSet: eachLike(string()),
        authData: {
          isAuthConfigured: any(Boolean),
          isAuthDeleted: any(Boolean)
        },
        localData: {
          isEnabled: any(Boolean),
          cltEnabled: any(Boolean)
        },
        sitemapBaseUrl: any(string),
        sitemapId: any(null, string()),
        crawledAt: any(string),
        a11yConfigCreated: any(Boolean),
        stagingBaseUrl: any(null, string()),
        visualConfig: like({
          scannerDelay: int(),
          viewportSettings: {
            desktop: eachLike(string())
          },
          enableLayout: any(null, Boolean)
        })
      },
      nextScanDate: string(),
      schedulePattern: string(),
      cookieConfig: eachLike(string(), { min: 0 }),
      stagingBaseUrl: any(null, string())
    }
  },

  withA11yAndVisual: {
    success: true,
    data: {
      name: string(),
      id: string(),
      recurring: any(Boolean),
      active: any(Boolean),
      isRunning: any(Boolean),
      createdBy: {
        id: int(),
        name: string()
      },
      scanData: {
        pageCount: int(),
        urlSet: eachLike(string()),
        authData: {
          isAuthConfigured: any(Boolean),
          isAuthDeleted: any(Boolean)
        },
        localData: {
          isEnabled: any(Boolean),
          cltEnabled: any(Boolean)
        },
        sitemapBaseUrl: any(string),
        sitemapId: any(null, string()),
        crawledAt: any(string),
        a11yConfigCreated: any(Boolean),
        stagingBaseUrl: any(null, string()),
        a11yConfig: like({
          needsReview: any(Boolean),
          bestPractices: any(Boolean),
          advanced: any(Boolean),
          wcagVersion: {
            value: string()
          }
        }),
        visualConfig: like({
          scannerDelay: int(),
          viewportSettings: {
            desktop: eachLike(string())
          },
          enableLayout: any(null, Boolean)
        })
      },
      nextScanDate: string(),
      schedulePattern: string(),
      cookieConfig: eachLike(string(), { min: 0 }),
      stagingBaseUrl: any(null, string())
    }
  }
};

pactum.request.setBaseUrl('http://0.0.0.0:9393');


describe('Validate CLONE_SCAN_RESPONSE', () => {
  before(async () => {
    await pactum.mock.start(); // Start the mock server
    pactum.mock.addInteraction({
      request: {
        method: 'GET',
        path: '/mocked-endpoint'
      },
      response: {
        status: 200,
        body: response_clone
      }
    });
  });

  it('should validate the API response against the expected schema', async () => {
    const response = await pactum.spec()
      .get('/mocked-endpoint')
      .expectStatus(200)
      .returns('res.body'); // Capture the response body

    const { scanData } = response.data;

    // Check for a11yConfig and visualConfig and validate accordingly
    if (scanData.a11yConfig && scanData.visualConfig) {
      pactum.spec().expectJsonMatch(response, SCAN_SCHEMA_VARIANTS.withA11yAndVisual); // Validate against withA11yAndVisual schema
    } else if (scanData.a11yConfig) {
      pactum.spec().expectJsonMatch(response, SCAN_SCHEMA_VARIANTS.withA11y); // Validate against withA11y schema
    } else if (scanData.visualConfig) {
      pactum.spec().expectJsonMatch(response, SCAN_SCHEMA_VARIANTS.withVisual); // Validate against withVisual schema
    } else {
      throw new Error('Response does not contain a11yConfig or visualConfig');
    }
  });

  after(async () => {
    await pactum.mock.stop(); // Stop the mock server
  });
});