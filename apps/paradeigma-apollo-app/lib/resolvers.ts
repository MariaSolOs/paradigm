import { Mikro } from '@paradeigma/mongoose';
import { ProgrammingLanguage } from '@paradeigma/graphql';
import { LazyFuse } from 'lib/fuse';
import type Fuse from 'fuse.js';
import type { LeanDocument, Types } from 'mongoose';
import type { MikroDocument } from '@paradeigma/mongoose';
import type { Resolvers } from '@paradeigma/graphql';

const mikroFuse = new LazyFuse<LeanDocument<MikroDocument & { _id: Types.ObjectId }>>({
    listProvider: async () => Mikro.find({}).lean(),
    fuseOptions: {
        keys: [ 'name', 'description', 'language' ],
        useExtendedSearch: true
    }
});

const resolvers: Resolvers = {
    Mikro: {
        id: mikro => mikro._id.toString()
    },

    Query: {
        mikros: async (_, { query, languages }) => {
            const fuse = await mikroFuse.getFuse();

            const filters: Fuse.Expression[] = [];

            // If we have a query string, use it to search a mikro with a matching
            // name or description.
            if (query) {
                filters.push({
                    $or: [
                        { name: query },
                        { description: query }
                    ]
                });
            }

            // By default use all programming languages.
            filters.push({
                language: (languages ?? Object.values(ProgrammingLanguage)).map(lang => `=${lang}`).join(' | ')
            });

            const searchResults = fuse.search({ $and: filters });

            return searchResults.map(result => result.item);
        }
    },

    Mutation: {
        createMikro: async (_, { name, description, content, language, style }) => {
            const mikro = await Mikro.create({
                name,
                description,
                content,
                language,
                style
            });
            
            // Add the mikro to the Fuse collection.
            (await mikroFuse.getFuse()).add(mikro);
            
            return mikro;
        }
    }
}

export default resolvers;