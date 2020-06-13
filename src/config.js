export default {
    MAX_ATTACHMENT_SIZE: 5000000,
    s3: {
      REGION: "ap-south-1",
      BUCKET: "notes-app-jimil"
    },
    apiGateway: {
      REGION: "ap-south-1",
      URL: "https://l58ka8fx61.execute-api.ap-south-1.amazonaws.com/prod"
    },
    cognito: {
      REGION: "ap-south-1",
      USER_POOL_ID: "ap-south-1_LH1QYugQf",
      APP_CLIENT_ID: "7vl5i3ufoaeuultvrohmhfqmli",
      IDENTITY_POOL_ID: "ap-south-1:c795c9cd-ead4-44f7-84b7-342d4723fd3c"
    }
  };
  