import { graphqlHTTP } from 'express-graphql';
import { graphQlMainSchema } from '../services/graphql.service';

export default graphqlHTTP({
	schema: graphQlMainSchema,
	graphiql: true,
});
