const express = require('express');
const bcrypt = require('bcrypt');
const session = require('express-session');
const bodyParser = require('body-parser');
// const expressLayouts = require('express-ejs-layouts');
const path = require('path');
const app = express();


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// app.use(expressLayouts);
app.set('layout', 'layouts/layout'); // デフォルトのレイアウトを設定

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({
    secret: 'QGeYsDyJ7TjB',
    resave: false,
    saveUninitialized: true,
}));

// ログイン処理
app.post('/auth/login', async (req, res) => {
  const { username, mailAddress } = req.body;
  
  // usernameとmailAddressが一致するユーザーを検索
  const user = users.find(u => u.username === username && u.mailAddress === mailAddress);

  if (user) {
      // パスワード認証が不要の場合はこの部分をコメントアウトまたは削除
      /*
      const match = await bcrypt.compare(password, user.password);
      if (match) {
          req.session.userId = user.id;
          req.session.loginSuccess = true; // ログイン成功フラグをセッションに設定
          return res.redirect('/');
      }
      */

      // ユーザーが見つかったらログイン成功と見なす
      req.session.userId = user.id;
      req.session.loginSuccess = true; // ログイン成功フラグをセッションに設定
      return res.redirect('/');
  }

  // 認証に失敗した場合の処理
  res.render('auth/login', { error: 'Invalid username or email' });
});


app.get('/auth/signup', (req, res) => {
  res.render('auth/signup');  // 修正
});

app.post('/auth/signup', async (req, res) => {
  const { username, password } = req.body;
  const existingUser = users.find(u => u.username === username);
  if (existingUser) {
      return res.render('auth/signup', { error: 'Username already exists' });  // 修正
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = {
      id: users.length + 1,
      username: username,
      password: hashedPassword
  };
  users.push(newUser);
  req.session.userId = newUser.id;
  res.redirect('/auth/login');
});



// ログアウト処理
app.get('/logout', (req, res) => {
  req.session.destroy(err => {
      if (err) {
          return res.redirect('/index');
      }
      res.redirect('/login');
  });
});

// ユーザーデータのサンプル（本来はデータベースで管理）
const users = [
  { id: 1, username: 'user1', password: '$2b$10$e5.hEsmOK8LsM9KsI5n7ae5y9WBCb0Y2Oe5tFxfgWk57HvWXsyozG' }, // パスワード: 'password1'
  { id: 2, username: 'user2', password: '$2b$10$JHlyz5eOzU2CofFkt9S8/eQ.l6Y9V4X2Q0mN9EhOzOtM2IR5pldDq' }, // パスワード: 'password2'
];


// 学生データ
const students = [
  { name: '田口先生', major: 'ものづくり、SDGs', interests: '日本酒', hobby: '', zipcode: '大阪' },
  { name: 'takutosan', major: 'IT', interests: '海外サッカー', hobby: 'プログラミング', zipcode: '福岡' },
  { name: 'ふうか', major: 'マーケティング', interests: '', hobby: '', zipcode: '' },
  { name: 'ありさ', major: 'マーケティング', interests: '', hobby: '', zipcode: '' },
  { name: 'ゆきと', major: 'フランチャイズ', interests: '', hobby: '', zipcode: '' },
  { name: 'おおしま', major: '', interests: '', hobby: '', zipcode: '' },
  { name: 'しんご', major: '', interests: '', hobby: '', zipcode: '' },
  { name: 'あおと', major: '', interests: '', hobby: '', zipcode: '' },
  { name: 'いつき', major: '', interests: '', hobby: '', zipcode: '' },
  { name: 'しょうま', major: '', interests: '', hobby: '', zipcode: '' },
  { name: 'せいご', major: '', interests: '', hobby: '', zipcode: '' },
  { name: 'はるか', major: '', interests: '', hobby: '', zipcode: '' },
  { name: 'まう', major: '', interests: '', hobby: '', zipcode: '' },
  { name: 'まゆ', major: '', interests: '', hobby: '', zipcode: '' },
  { name: 'みずき', major: '', interests: '', hobby: '', zipcode: '' },
  { name: 'かな', major: '', interests: '', hobby: '', zipcode: '' }
];

// 活動データ
const activities = [
  { title: 'Hill Top工場見学', description: '7月4日に、京都の宇治市にある株式会社HILLTOPさんを訪れました。' },
  { title: '田口ゼミ説明会', description: '2回生向けにゼミの説明会を行いました。' }
];

// サブゼミデータ
const subzemi = [
  { title: 'サブゼミ活動内容1', description: '詳細内容1' },
  { title: 'サブゼミ活動内容2', description: '詳細内容2' }
];

// スケジュールデータ
const schedule = [
  { event: '4月', activity: '新入生歓迎会' },
  { event: '7月', activity: '夏合宿' },
  { event: '12月', activity: '冬の活動' }
];

// ログイン成功時のメッセージ表示
app.get('/', (req, res) => {
  const loginSuccess = req.session.loginSuccess;
  req.session.loginSuccess = false; // フラグをクリア
  res.render('index', { title: 'トップページ', loginSuccess });
});

app.get('/index', (req, res) => {
  res.render('index', { title: 'トップページ', req });  // `req` は不要
});

app.get('/activities', (req, res) => {
  res.render('activities', { title: '過去の活動', activities, req });
});

app.get('/subzemi', (req, res) => {
  res.render('subzemi', { title: 'サブゼミ活動', subzemi, req });
});

app.get('/profile', (req, res) => {
  res.render('profile', { title: 'ゼミ生のプロフィール', students, req });
});

app.get('/schedule', (req, res) => {
  res.render('schedule', { title: '年間スケジュール', schedule, req });
});

app.get('/auth/login', (req, res) => {
  res.render('auth/login', { title: 'ログイン', req });
});

app.get('/auth/signup', (req, res) => {
  res.render('auth/signup', { title: '新規登録', req });
});


app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
