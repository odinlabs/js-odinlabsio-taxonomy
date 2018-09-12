/** src/schema.js */
// profile hierarchy
const SocialAccount = { Facebook: 'leaf', Google: 'leaf', Twitter: 'leaf' };

const Contact = { Id: 'leaf', Address: 'leaf', EAddress: 'leaf' };
const Profile = { Contact, SocialAccount };

// activity hierarchy
const Finance = { NavigationHistory: 'leaf', ProductHistory: 'leaf', TransactionHistory: 'leaf', Chat: 'leaf' };
const Commerce = { NavigationHistory: 'leaf', ProductHistory: 'leaf', TransactionHistory: 'leaf', Chat: 'leaf' };
const Divertissement = { NavigationHistory: 'leaf', TransactionHistory: 'leaf' };
const Health = { NavigationHistory: 'leaf', ProductHistory: 'leaf', TransactionHistory: 'leaf', Chat: 'leaf' };

// data schema
const Schema = { Profile, Finance, Commerce, Divertissement, Health };

module.exports.schema = Schema;