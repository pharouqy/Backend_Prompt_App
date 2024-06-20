const { OpenAIApi, Configuration } = require("openai");

exports.prompt = async (req, res, next) => {
  const messages = [
    {
      role: "system",
      content: "You are a helpful assistant.",
    },
    {
      role: "user",
      content: req.body.prompt,
    },
  ];

  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
    organization: process.env.OPENAI_ORGANIZATION,
  });

  const openai = new OpenAIApi(configuration);

  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-4",
      messages: messages,
      temperature: 0.5,
      max_tokens: 1024,
    });

    const completion_text = completion.data.choices[0].message.content;

    res.status(200).json({ response: completion_text });
  } catch (error) {
    res.status(500).json({
      error: `Une erreur s'est produite lors de la communication avec l'API OpenAI. ${error.message}`,
    });
  }
};
