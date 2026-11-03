import fs from 'node:fs';
import path from 'node:path';
import {execFileSync} from 'node:child_process';
const files=['index.html','styles.css','data.js','engine.js','app.js','hospital-chat-offline.html','.nojekyll','assets/characters/li-chenguang.png','assets/characters/colleague.png','assets/characters/senior.png'];
const expected=new Set(files);
function walk(dir,prefix=''){for(const e of fs.readdirSync(dir,{withFileTypes:true})){const rel=prefix+e.name,full=path.join(dir,e.name);if(e.isSymbolicLink())throw Error('Symlink in published assets');if(e.isDirectory())walk(full,rel+'/');else {if(!expected.has(rel))throw Error('Unexpected public asset: '+rel);expected.delete(rel);if(!rel.endsWith('.png')){const s=fs.readFileSync(full,'utf8');for(const pattern of [/sk-[A-Za-z0-9_-]{20,}/,/gh[pousr]_[A-Za-z0-9]{20,}/,/github_pat_[A-Za-z0-9_]{20,}/,/-----BEGIN .*PRIVATE KEY-----/,/appgprj_[A-Za-z0-9]+/,/libfile_[A-Za-z0-9]+/,/\/workspace\//,/\/home\/oai\//])if(pattern.test(s))throw Error('Private metadata or credential-like text in '+rel);}}}}
walk('dist');if(expected.size)throw Error('Missing public assets: '+[...expected]);
for(const file of ['data.js','engine.js','app.js'])execFileSync(process.execPath,['--check','dist/'+file]);
console.log('Public asset allowlist, credential-pattern scan, metadata scan and JavaScript syntax passed.');
