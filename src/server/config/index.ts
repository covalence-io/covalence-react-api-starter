
//Choose development or production config
//development.ts is in .gitignore to prevent you from pushing sensitive information to your repo
//Create development.ts in order for this project to work - copy production.ts and fill out with the correct values
export default require(`./${process.env.NODE_ENV ? process.env.NODE_ENV : 'development'}`).default;