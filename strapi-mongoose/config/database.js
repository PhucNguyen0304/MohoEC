module.exports = ({ env }) => ({
  defaultConnection: 'default',
  connections: {
    default: {
      connector: 'mongoose',
      settings: {
        uri: env('DATABASE_URI', 'mongodb+srv://henrynguyen:007007007@cluster0.w9gqw.mongodb.net/moho?retryWrites=true&w=majority'),
      },
      options: {
        ssl: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
    },
  },
});
