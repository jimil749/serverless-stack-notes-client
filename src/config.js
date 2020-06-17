const dev = {
  STRIPE_KEY: "pk_test_51GsXbVHiX32xsQfErWqvuPu96XflcKImg463SGDk55Mwiw93wZUb3ChqiropOHsa2PUNDDSUnlxassCaBYnwsQaC00DhU04DHM",
  s3: {
    REGION: "ap-south-1",
    BUCKET: "notes-app-2-api-dev-attachmentsbucket-1r3r92qhwyvta"
  },
  apiGateway: {
    REGION: "ap-south-1",
    URL: "https://5vcqahiowj.execute-api.ap-south-1.amazonaws.com/dev"
  },
  cognito: {
    REGION: "ap-south-1",
    USER_POOL_ID: "ap-south-1_HXtIGP6tL",
    APP_CLIENT_ID: "1qqdcae2lstpkonpk61pkvdqmj",
    IDENTITY_POOL_ID: "ap-south-1:745cfd36-3eb6-45ad-903d-ef1b6dca8617"
  }
};

const prod = {
  STRIPE_KEY: "pk_test_51GsXbVHiX32xsQfErWqvuPu96XflcKImg463SGDk55Mwiw93wZUb3ChqiropOHsa2PUNDDSUnlxassCaBYnwsQaC00DhU04DHM",
  s3: {
    REGION: "ap-south-1",
    BUCKET: " notes-app-2-api-prod-attachmentsbucket-1jugigjzppdff"
  },
  apiGateway: {
    REGION: "ap-south-1",
    URL: "https://j7mvpg8u57.execute-api.ap-south-1.amazonaws.com/prod"
  },
  cognito: {
    REGION: "ap-south-1",
    USER_POOL_ID: "ap-south-1_wUYmuAsdb",
    APP_CLIENT_ID: "6l4om6r0n23kp3l8ge1becu0ei",
    IDENTITY_POOL_ID: "ap-south-1:bc15582f-849c-4452-b715-705c619c907b"
  }
};

// Default to dev if not set
const config = process.env.REACT_APP_STAGE === 'prod'
  ? prod
  : dev;

export default {
  // Add common config values here
  MAX_ATTACHMENT_SIZE: 5000000,
  ...config
};