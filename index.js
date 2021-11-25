const request = require("request");

exports.handler = async (event) => {
  console.log(JSON.stringify(event, null, 2));

  // const projectName = "<Project Name>";
  const region = event.Records[0].awsRegion;
  const bucket = event.Records[0].s3.bucket.name;
  const key = event.Records[0].s3.object.key;
  const link = `https://${bucket}.s3-${region}.amazonaws.com/${key}`;

  const options = {
    url: "<Slack Incoming WebHook URL>",
    headers: {
      "Content-type": "application/json",
    },
    body: {
      username: "Lambda",
      text: link,
      icon_emoji: ":lambda:",
    },
    json: true,
  };

  return new Promise((resolve) =>
    request.post(options).on("response", () => resolve())
  );
};
