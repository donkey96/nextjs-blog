import path from 'path';
import fs from 'fs';
import matter from 'gray-matter';
import Post from '../pages/posts/[id]';
// import fetch from 'node-fetch'
// import someDataBaseSDK from 'someDataBaseSDK';

const postsDirectory = path.join(process.cwd(), 'posts');

// const databaseClient = someDataBaseSDK.createClient(...);

export function getSortedPostsData() {
// export async function getSortedPostsData() {

  // ファイルシステムの代わりに
  // 外部のAPIエンドポイントから投稿データを取得する
  // const res = await fetch('..')
  // return res.json()

  // ファイルシステムの代わりに
  // データベースから投稿データを取得する
  // return databaseClient.query('SELECT posts...')


  // /posts配下のファイル名を取得する
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map(fileName => {
    // id を取得するためにファイル名から ".md" を削除する
    const id = fileName.replace(/\.md$/, '');

    // マークダウンファイルを文字列として読み取る
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // 投稿のメタデータ部分を解析するために gray-matter を使う
    const matterResult = matter(fileContents);

    // データを id と合わせる
    return {
      id,
      ...matterResult.data,
    };
  });
  // 投稿を日付でソートする
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map(fileName => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ''),
      },
    };
  });
}