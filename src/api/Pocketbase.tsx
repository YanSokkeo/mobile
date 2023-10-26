import PocketBase from 'pocketbase';

// this 1 is host free
// const url = 'https://steep-electrician.pockethost.io/';

//  this 2 server host
// const url = 'https://others-pocketbase-quiz.jibofd.easypanel.host';
const url = 'https://quiz.panel.dreamslab.dev';
export const client = new PocketBase(url);
