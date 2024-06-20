const { OpenAIApi, Configuration } = require("openai");

exports.prompt = async (req, res, next) => {
  console.log(req.body.prompt);

  const obj = {
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: req.body.prompt,
      },
    ],
    temperature: 0.5,
    max_tokens: 1024,
  };

  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
    organization: process.env.OPENAI_ORGANIZATION,
  });

  const openai = new OpenAIApi(configuration);

  try {
    const completion = await openai.chat.completions.create(obj);
    const completion_text = completion.data.choices[0].message.content;

    res.status(200).json({ response: completion_text });
  } catch (error) {
    console.error("Erreur : ", error);
    res.status(500).json({
      error: `Une erreur s'est produite lors de la communication avec l'API OpenAI. ${error}`,
    });
  }
};
