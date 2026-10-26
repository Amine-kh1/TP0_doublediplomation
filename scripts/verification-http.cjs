const base='http://127.0.0.1:8080/tp0-khabot-amine/';
const decode=t=>t.replace(/&amp;/g,'&').replace(/&quot;/g,'"').replace(/&#39;/g,"'").replace(/&lt;/g,'<').replace(/&gt;/g,'>');
function check(ok,label){if(!ok)throw Error(label);console.log('OK : '+label)}
function area(h,n){return decode(h.match(new RegExp('<textarea[^>]*name="form:'+n+'"[^>]*>([\\s\\S]*?)</textarea>'))?.[1]||'');}
async function session(){let cookie='',html='';async function request(url,opts={}){const r=await fetch(url,{...opts,headers:{...opts.headers,...(cookie?{Cookie:cookie}:{})}});const c=r.headers.getSetCookie();if(c.length)cookie=c.map(s=>s.split(';')[0]).join('; ');html=await r.text();check(r.status===200,'HTTP 200');return html;}
 await request(base+'index.xhtml');
 return {get html(){return html},async send(question,role,button='Envoyer la question'){
  const data=new URLSearchParams({form:'form','form:question':question,'form:reponse':area(html,'reponse')});
  const state=html.match(/name="jakarta.faces.ViewState"[^>]*value="([^"]+)"/)[1];data.set('jakarta.faces.ViewState',decode(state));
  const input=html.match(/<input[^>]*type="submit"[^>]*value="[^"]*"[^>]*>/g).find(t=>t.includes('value="'+button+'"'));
  data.set(input.match(/name="([^"]+)"/)[1],button);
  if(!html.includes('id="form:rolesysteme" class="ui-selectonemenu ui-widget ui-state-default ui-state-disabled"')){
   const roleValue=html.match(/<option value="([^"]*)"/)[1];
   data.set('form:rolesysteme_input',role?decode(roleValue):'');data.set('form:rolesysteme_editableInput',role?'Assistant':'');
  }
  const action=decode(html.match(/<form[^>]*action="([^"]+)"/)[1]);
  return request(new URL(action,base),{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:data});
 }};
}
(async()=>{
 let s=await session();check(!s.html.includes('#{bb.'),'Expressions EL remplacées par du HTML');
 await s.send('3661',false);check(s.html.includes('Vous devez indiquer le rôle'),'Rôle obligatoire');
 s=await session();await s.send('   ',true);check(s.html.includes('Il manque le texte de la question'),'Question vide refusée');
 check(area(s.html,'conversation')==='','Pas de conversation ajoutée pour une question vide');
 s=await session();await s.send('3661',true);
 check(area(s.html,'reponse')==='3661 s = 1 h 1 min 1 s','Conversion de 3661 secondes');
 check(s.html.includes('disabled="disabled"'),'Rôle figé après le premier envoi');
 await s.send('60',true);check(area(s.html,'reponse')==='60 s = 0 h 1 min 0 s','Conversion suivante');
 check(area(s.html,'conversation').includes('3661 s = 1 h 1 min 1 s')&&area(s.html,'conversation').includes('60 s = 0 h 1 min 0 s'),'Historique conservé');
 for(const value of ['-1','1.5','bonjour']){
   await s.send(value,true);check(area(s.html,'reponse').startsWith('Saisissez un nombre entier'),'Saisie refusée : '+value);
 }
 await s.send('9223372036854775808',true);check(area(s.html,'reponse').startsWith('La durée est trop grande'),'Dépassement de long géré');
 await s.send('0',true);check(area(s.html,'reponse')==='0 s = 0 h 0 min 0 s','Zéro accepté après les erreurs');
 await s.send('0',true,'Nouveau chat');
 check(area(s.html,'conversation')===''&&area(s.html,'question')==='','Nouveau chat réinitialisé');
 check(!s.html.includes('ui-state-disabled'),'Choix du rôle réactivé');
 for(const resource of ['js/script.js','css/mycsslayout.css']){
   const r=await fetch(base+'jakarta.faces.resource/'+resource+'.xhtml');check(r.status===200,'Ressource servie : '+resource);
 }
 const accueil=await fetch(base);check(accueil.status===200&&(await accueil.text()).includes('form:question'),'Accueil sur la page JSF');
 console.log('Tous les tests fonctionnels du convertisseur ont réussi.');
})().catch(e=>{console.error(e);process.exit(1)});
