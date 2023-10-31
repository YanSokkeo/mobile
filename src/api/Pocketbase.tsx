import PocketBase from 'pocketbase';

// this 1 is host free
// const url = 'https://steep-electrician.pockethost.io/';

//  this 2 server host
// const url = 'https://others-pocketbase-quiz.jibofd.easypanel.host';
const url = 'https://quiz.panel.dreamslab.dev';
export const client = new PocketBase(url);

export async function createUserScore({quiz_id, point, user_result}: any) {
  const data = {
    quiz: quiz_id,
    score: point,
    result: user_result,
  };
  await client.collection('User_answer').create(data);
}

export async function updateUserScore({quiz_id, point, user_result}: any) {
  const data = {
    quiz: quiz_id,
    score: point,
    result: user_result,
  };

  await client.collection('User_answer').update(quiz_id, data);
}
