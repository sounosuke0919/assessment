'use strict';

const userNameInput = document.getElementById('user-name');
const assessmentButton = document.getElementById('assessment');
const resultDivided = document.getElementById('result-area');
const tweetDivision = document.getElementById('tweet-area');

assessmentButton.onclick = () => {
  const userName = userNameInput.value;
  if (userName.length === 0) {
    return; //名前が空の時は関数の処理を終了する。
  }
  //ここから下は名前が空でない時

  // 診断結果表示エリアの作成
  
  resultDivided.innerText = ''; //作成の前にタグを空にする

  //headerDividedの作成
  const headerDivided = document.createElement('div'); //divタグを作る
  headerDivided.setAttribute('class', 'card-header');
  headerDivided.innerText = '診断結果'; //中身の文章を設定

  //bodyDividedの作成
  const bodyDivided = document.createElement('div');
  bodyDivided.setAttribute('class', 'card-body');
  
  const paragraph = document.createElement('p');
  paragraph.setAttribute('class', 'card-text');
  const result = assessment(userName); //診断結果を取得
  paragraph.innerText = result;
  bodyDivided.appendChild(paragraph);

  //resultDividedにcardスタイルを追加
  resultDivided.setAttribute('class', 'card');
  resultDivided.setAttribute('style', 'max-width: 700px');

  //headerDivided と bodyDivided に resultDivided を差し込む
  resultDivided.appendChild(headerDivided);
  resultDivided.appendChild(bodyDivided);

  // ツイートエリアの作成
  tweetDivision.innerText = ''; //作成の前にタグを空にする
  const anchor = document.createElement('a'); //aタグの作成
  const hrefValue = 'https://x.com/intent/tweet?button_hashtag=' + encodeURIComponent('あなたのいいところ') + '&ref_src=twsrc%5Etfw';

  anchor.setAttribute('href', hrefValue);
  anchor.setAttribute('class', 'twitter-hashtag-button');
  anchor.setAttribute('data-test', result);
  anchor.innerText = '#あなたのいいところを投稿する'

  tweetDivision.appendChild(anchor);

  const script = document.createElement('script');
  script.setAttribute('src', 'https://platform.x.com/widgets.js');
  tweetDivision.appendChild(script);
}

userNameInput.addEventListener(
  'keydown',
  (event) => {
    if(event.code === 'Enter') {
      assessmentButton.dispatchEvent(new Event('click'));
    }
  }
)

const answers = [
  '###userName###のいいところは声です。###userName###の特徴的な声は皆を惹きつけ、心に残ります。',
  '###userName###のいいところはまなざしです。###userName###に見つめられた人は、気になって仕方がないでしょう。',
  '###userName###のいいところは情熱です。###userName###の情熱に周りの人は感化されます。',
  '###userName###のいいところは厳しさです。###userName###の厳しさがものごとをいつも成功に導きます。',
  '###userName###のいいところは知識です。博識な###userName###を多くの人が頼りにしています。',
  '###userName###のいいところはユニークさです。###userName###だけのその特徴が皆を楽しくさせます。',
  '###userName###のいいところは用心深さです。###userName###の洞察に、多くの人が助けられます。',
  '###userName###のいいところは見た目です。内側から溢れ出る###userName###の良さに皆が気を惹かれます。',
  '###userName###のいいところは決断力です。###userName###がする決断にいつも助けられる人がいます。',
  '###userName###のいいところは思いやりです。###userName###に気をかけてもらった多くの人が感謝しています。',
  '###userName###のいいところは感受性です。###userName###が感じたことに皆が共感し、わかりあうことができます。',
  '###userName###のいいところは節度です。強引すぎない###userName###の考えに皆が感謝しています。',
  '###userName###のいいところは好奇心です。新しいことに向かっていく###userName###の心構えが多くの人に魅力的に映ります。',
  '###userName###のいいところは気配りです。###userName###の配慮が多くの人を救っています。',
  '###userName###のいいところはその全てです。ありのままの###userName###自身がいいところなのです。',
  '###userName###のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる###userName###が皆から評価されています。'
];

/**
 * 名前の文字列を渡すと診断結果を返す関数
 * @param {string} userName ユーザの名前
 * @return {string} 診断結果
 */
function assessment(userName) {
  // 全文字のコード番号を取得してそれを足し合わせる
  let sumOfCharCode = 0;
  for(let i = 0; i < userName.length; i++) {
    sumOfCharCode = sumOfCharCode + userName.charCodeAt(i);
  }

  // 文字のコード番号の合計を回答の数で割って添字の数値を求める
  const index = sumOfCharCode % answers.length;
  const result = answers[index];

  const resultWithUserName = result.replaceAll('###userName###', userName);
  return resultWithUserName;
}

console.assert(
  assessment('望月奏之介') ===
  '望月奏之介のいいところは決断力です。望月奏之介がする決断にいつも助けられる人がいます。',
  '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。'
);

console.assert(
  assessment('望月奏之介') === assessment('望月奏之介'),
  '入力が同じ名前なら同じ診断結果を出力する処理が正しくありません。'
);