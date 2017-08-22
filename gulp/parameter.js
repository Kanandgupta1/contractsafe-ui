import gulp from 'gulp';
import cryptoJS from 'crypto-js';
import base64 from 'base-64';
import { argv } from 'yargs';

const secret = "N2fUFBY4gVoSI4qdOPkJtyQfkEcxyqFsw1TWUpp75RapOQNGPw0NwHimVMUuUZWwzdMWrplJT3We";

const parameter = (stage, full = false) => {
  let username = Math.random().toString();
  let url = `https://vertragstresor${stage === 'production' ? '' : '-' + stage}.fino.digital`;
  let timestamp = +new Date();
  timestamp = "1483455579"

  let message = username + ":" + url + ":" + timestamp;

  let hmac = cryptoJS.HmacSHA1(message, secret);
  const p = "?userid=" + base64.encode(username) + "&hash=" + base64.encode(hmac.toString()) + "&timestamp=" + timestamp;
  return full ? `${url}/#${p}` : p;
}

gulp.task('parameter', () => {
  const link = parameter(argv.stage || 'dev', !!argv.link);
  console.log(link);
});

export default parameter;
