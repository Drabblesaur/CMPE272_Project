const oauthController = (fastify, options, done) => {


// Endpoint to handle GitHub OAuth callback
fastify.get("/callback", async (req, reply) => {
    const token = await app.githubOAuth.getAccessTokenFromAuthorizationCodeFlow(
      req
    );
    console.log(token);
    if (token) {
      // return reply.send({
      //     success: true,
      //     token,
      //     message: 'GitHub authentication successful!'
      // });
      reply.redirect(`https://earnest-buttercream-edca31.netlify.app/home/token=${token}`);
    } else {
      return reply.status(400).send({
        success: false,
        message: "GitHub authentication failed.",
      });
    }
  });
    done();
};

export default oauthController;
