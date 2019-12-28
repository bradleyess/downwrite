import { ApolloServer } from "apollo-server-micro";
import jwt from "jsonwebtoken";
import { DownwriteAPI, schema } from "../../utils/graphql";
import { REST_ENDPOINT } from "../../utils/urls";

const server = new ApolloServer({
  schema,
  async context({ req }) {
    const token: string = req.cookies.DW_TOKEN || req.headers.authorization;
    const authScope = jwt.decode(token);
    return {
      authScope,
      token
    };
  },
  playground: {
    settings: {
      "editor.fontFamily": "Operator Mono, monospace"
      // "schema.polling.enable": false
    }
  },
  dataSources() {
    return {
      dwnxtAPI: new DownwriteAPI(REST_ENDPOINT)
    };
  }
});

export const config = {
  api: {
    bodyParser: false
  }
};

const handler = server.createHandler({ path: "/api/apollo" });

export default handler;
