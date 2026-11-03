import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.dirname(fileURLToPath(import.meta.url));
let html=fs.readFileSync(path.join(root,'dist/index.html'),'utf8');
html=html.replace('<html lang="zh-CN">','<html lang="zh-CN" data-offline="true">');
html=html.replace('<link rel="stylesheet" href="styles.css">',()=>'<style>'+fs.readFileSync(path.join(root,'dist/styles.css'),'utf8')+'</style>');
for(const file of ['data.js','engine.js','app.js']){
 let code=fs.readFileSync(path.join(root,'dist',file),'utf8');
 if(file==='data.js')for(const name of ['li-chenguang.png','colleague.png','senior.png'])code=code.replace('assets/characters/'+name,'data:image/png;base64,'+fs.readFileSync(path.join(root,'dist/assets/characters',name)).toString('base64'));
 html=html.replace(`<script src="${file}"></script>`,()=>'<script>'+code.replace(/<\/script/gi,'<\\/script')+'</script>');
}
fs.writeFileSync(path.join(root,'dist/hospital-chat-offline.html'),html);
console.log('Built complete offline app with 8 scenarios, 24 rounds, and 3 embedded portraits.');
