(function(root){
'use strict';
const MAX_LENGTH=600;
function clean(text){return String(text??'').trim();}
function escapeHTML(value){return String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function firstHit(text,terms,positive=false){
 for(const term of terms){let from=0,idx;while((idx=text.indexOf(term,from))!==-1){const before=text.slice(Math.max(0,idx-12),idx).split(/[，,。.!！？?；;\n]/).pop().replace(/能不能/g,'能否').replace(/可不可以/g,'可以吗').replace(/不能不/g,'必须');if(!positive||!/(?:不用|不需要|无需|不想|不必|不要|没必要|没有必要|拒绝|不会|不能|不可以|不再|不可)[^，。！？；\n]{0,5}$/.test(before))return term;from=idx+term.length;}}
 return '';
}
function sensitive(text){
 text=String(text).normalize("NFKC");
 if(/\b1[3-9]\d{9}\b/.test(text))return '疑似手机号码';
 if(/\b\d{17}[0-9xX]\b/.test(text))return '疑似证件号码';
 if(/[\w.+-]+@[\w.-]+\.[A-Za-z]{2,}/.test(text))return '疑似电子邮箱';
 if(/(?:患者姓名|住院号|身份证号|病案号)\s*[:：]\s*[^\s，。；;]{2,}/.test(text))return '带标识的患者信息';
 return '';
}
function validate(text){const value=clean(text);if(!value)return {ok:false,message:'先写一句你的回复。'};if(value.length>MAX_LENGTH)return {ok:false,message:'这条消息超过 600 字，请拆短一点。'};const hit=sensitive(value);if(hit)return {ok:false,message:`检测到${hit}，请移除后再练习。这里只使用虚构或去标识的内容。`};return {ok:true,value};}
function analyzeReply(scene,input,round=0,history=[]){
 const text=clean(input);
 const prior=round>0?history.map(x=>x.text).join("。"):"";
 const facts=firstHit(text,scene.facts)||firstHit(prior,scene.facts);
 const impact=firstHit(text,scene.risks)||firstHit(prior,scene.risks);
 const action=firstHit(text,scene.actions,true);
 const closure=firstHit(text,scene.closure,true);
 const unsafeTone=/(?:你.{0,4}(?:蠢货|废物|傻子)|滚开|等着瞧|老子|出.{0,3}事.{0,8}(?:跟我无关|与我无关|不关我事))/.test(text);
 const disengage=/(?:直接走人|直接不去|关机不管|不交班就走|不交接就走)/.test(text);
 const overclaim=/(?:肯定|必然|一定|百分之百).{0,4}(?:出事|死人|出错|医疗事故)/.test(text);
 const unlinkedRisk=!scene.clinical&&/(?:患者安全|医疗安全|病人安全|医疗质量)/.test(text);
 const dismiss=/(?:不用|不需要|无需|没必要|不想).{0,5}(?:复核|交接|核对|确认)/.test(text);
 const violation=(scene.id==='record'&&!!firstHit(text,['改成已完成','写成已经完成','把时间提前','按你说的改'],true))||(scene.id==='privacy'&&!!firstHit(text,['直接发群','发到普通群','发你个人号'],true));
 const warnings=[];
 if(unsafeTone)warnings.push('这句话可能把协作变成对抗。试着把指责或免责改成事实、风险和支持请求。');
 if(disengage)warnings.push('需要明确交接或排班协调，不能用突然离开代替支持安排。');
 if(overclaim)warnings.push('不把可能的风险说成一定发生。说已经观察到的影响和需要的支持。');
 if(unlinkedRisk)warnings.push('本情景没有给出直接患者安全风险。先把贡献、交付或责任说清，不额外编造临床后果。');
 if(dismiss)warnings.push('这句话可能在取消核对或交接。请确认必要的安全步骤仍有安排。');
 if(violation)warnings.push('这句话可能答应了情景中的不当做法。请核对真实记录或授权传递的边界。');
 const checks=[
  {key:'facts',label:'事实说具体',ok:!!facts,evidence:facts,tip:'加上当前任务、已发生的影响或可核对的时间线。'},
  {key:'impact',label:scene.clinical?'风险有依据':'影响说清楚',ok:!!facts&&!!impact&&!unlinkedRisk,evidence:impact,tip:scene.clinical?'说明这件事可能怎样影响核对、交接或患者信息安全。':'说明这件事对交付、核查或责任确认的影响。'},
  {key:'request',label:'请求能执行',ok:!!action,evidence:action,tip:'让对方知道你需要复核、接替、排序还是明确分工。'},
  {key:'closure',label:'下一步有确认',ok:!!action&&!!closure,evidence:closure,tip:'补上谁负责、何时回应、怎样交接或确认收到。'}
 ];
 const risky=unsafeTone||disengage||overclaim||dismiss||violation;
 let branch=risky?'risky':facts&&action&&(!scene.clinical||impact)&&(round<2||closure)?'clear':facts||action?'partial':'vague';
 if(unlinkedRisk&&branch==='clear')branch='partial';
 const missing=checks.filter(c=>!c.ok);
 const headline=risky?'把边界说清，也留住解决问题的路径':branch==='clear'?'这次，请求已经能接得住':branch==='partial'?'方向有了，再补一个具体安排':'先给对方一个能回应的请求';
 return {branch,checks,warnings,headline,next:missing[0]?.tip||'下一步看对方是否明确回应；表达完整，不等于安排已经落实。'};
}
function responseFor(scene,round,analysis,mode='standard'){
 const r=scene.rounds[round];if(!r)throw new RangeError('Round is complete');
 if(mode==='pressure')return {actor:r.actor,text:r.pressure,kind:'pressure'};
 if(analysis.branch==='risky')return {actor:r.actor,text:'先把话说具体，我们现在需要解决哪件事、由谁来处理？',kind:'redirect'};
 const key=analysis.branch==='clear'?'good':analysis.branch==='partial'?'partial':'vague';
 return {actor:r.actor,text:r[key],kind:key};
}
function createSession(scene,mode='standard'){return {id:scene.id,mode:mode==='pressure'?'pressure':'standard',round:0,messages:scene.opening.map(([actor,text])=>({actor,text})),history:[],pending:false,ended:false,revision:0};}
function submit(scene,session,input){
 if(session.pending)return {ok:false,message:'对方正在回复，等这一轮结束再发。'};
 if(session.ended||session.round>=scene.rounds.length)return {ok:false,message:'这轮演练已结束，可以重练或换一个群。'};
 const checked=validate(input);if(!checked.ok)return checked;
 const analysis=analyzeReply(scene,checked.value,session.round,session.history);
 return {ok:true,text:checked.value,analysis,response:responseFor(scene,session.round,analysis,session.mode)};
}
function sanitizeProgress(value,scenes){const ids=new Set(scenes.map(x=>x.id));const templates=new Set(scenes.flatMap(s=>s.rounds.map((r,i)=>`${s.id}:${i}`)));if(!value||typeof value!=='object')value={};return {completed:[...new Set(Array.isArray(value.completed)?value.completed.filter(x=>ids.has(x)):[])],saved:[...new Set(Array.isArray(value.saved)?value.saved.filter(x=>templates.has(x)):[])]};}
function transcript(scene,session){let out=`# ${scene.group}｜${scene.title}\n\n虚构情景 · ${session.mode==='pressure'?'持续施压':'协商练习'}\n\n`;const names={me:'李晨光（你）',senior:'周老师',peer:'林医生'};for(const m of session.messages)out+=`**${names[m.actor]||'系统'}**：${m.text}\n\n`;out+='## 复盘\n\n'+scene.takeaway+'\n\n'+scene.escalation+'\n\n本文件仅包含本次练习。分享前请再次核对没有真实个人或患者信息。\n';return out;}
const api={MAX_LENGTH,clean,escapeHTML,sensitive,validate,analyzeReply,responseFor,createSession,submit,sanitizeProgress,transcript};
if(typeof module==='object'&&module.exports)module.exports=api;else root.ChatEngine=api;
})(typeof globalThis!=='undefined'?globalThis:this);
