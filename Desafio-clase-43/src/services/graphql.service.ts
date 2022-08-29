import { SchemaComposer } from 'graphql-compose';
import { productTcMutation, productTcQuery } from '../models/products/prod.controller';

const schemaComposer = new SchemaComposer();

schemaComposer.Query.addFields({
	...productTcQuery,
});

schemaComposer.Mutation.addFields({
	...productTcMutation,
});

export const graphQlMainSchema = schemaComposer.buildSchema();
