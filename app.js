'use strict';
const books = [
  {key:'night',id:'1040765595',title:'夜无疆',author:'辰东',genre:'玄幻',tag:'东方玄幻',description:'太阳落下之后，再也没有升起。辰东以这个设定，开启一段黑夜中的东方玄幻想象。'},
  {key:'mountain',id:'1033014772',title:'青山',author:'会说话的肘子',genre:'玄幻',tag:'东方玄幻',description:'名利侵蚀了天下的侠气。这是会说话的肘子笔下，关于最后一分侠气的东方玄幻故事。'},
  {key:'1979',id:'1039689097',title:'1979黄金时代',author:'睡觉会变白',genre:'都市',tag:'都市生活',description:'睡觉会变白创作的都市生活作品。以1979年为故事起点，在时代变迁中书写人生与梦想。'},
  {key:'galaxy',id:'1047654482',title:'星河之主',author:'烽仙',genre:'玄幻',tag:'高武世界',description:'烽仙创作的高武世界作品。从个体的成长到更辽阔的星河，以修行与力量铺展玄幻想象。'},
  {key:'minister',id:'1047634306',title:'白衣卿相',author:'王梓钧',genre:'历史',tag:'两宋元明',description:'王梓钧创作的历史作品。在两宋元明的时代背景中，感受人物命运与历史风云的交织。'},
  {key:'inn',id:'1041604040',title:'异度旅社',author:'远瞳',genre:'科幻',tag:'时空穿梭',description:'当于生打开一扇门，熟悉的世界开始崩塌。在日常与理性的边界之外，一场通向真相的探索展开。'},
  {key:'demon',id:'1041162879',title:'魔王大人深不可测',author:'晨星LL',genre:'轻小说',tag:'原生幻想',description:'晨星LL创作的原生幻想作品。围绕魔王与他的世界，展开充满奇思与趣味的冒险。'},
  {key:'dragon',id:'1039457453',title:'鸣龙',author:'关关公子',genre:'玄幻',tag:'东方玄幻',description:'关关公子创作的东方玄幻作品。在东方幻想的背景中，体验人物成长与冒险的故事。'},
  {key:'chenmo',id:'1045948840',title:'关于陈默的一切',author:'仔姜肥鹅',genre:'现实',tag:'社会悬疑',description:'仔姜肥鹅创作的社会悬疑作品。围绕陈默的故事，在现实生活的细节中寻找人物与真相。'},
  {key:'game',id:'1049849815',title:'游戏入侵：开局龙象般若功',author:'止语观南',genre:'游戏',tag:'游戏异界',description:'止语观南创作的游戏异界作品。当游戏与另一种人生相遇，开启关于力量与冒险的故事。'},
  {key:'immortal',id:'1049003034',title:'有仙则名',author:'金色茉莉花',genre:'轻小说',tag:'原生幻想',description:'金色茉莉花创作的原生幻想作品。以仙意与想象为线索，发现日常之外的另一种可能。'},
  {key:'alchemy',id:'1049842057',title:'修仙长生，从外聘丹师开始',author:'爱喝凉白开的驴',genre:'仙侠',tag:'修真文明',description:'爱喝凉白开的驴创作的修真文明作品。从丹师的修行之路出发，走进求道长生的仙侠世界。'},
  {key:'dream',id:'1050647661',title:'梦魇潜航',author:'北海牧鲸',genre:'奇幻',tag:'神秘幻想',description:'蒸汽文明与灵性世界相接。威尔·德雷克潜入层层梦境，面对逐渐脱离常识的梦魇大海。'},
  {key:'doubles',id:'1050530120',title:'活人成双',author:'坏掉的拳头',genre:'悬疑灵异',tag:'诡异神秘',description:'一座旧宅、一只会让物品成双的衣橱，以及一支抵挡怨灵的打火机。日常背后的诡异，开始显露。'},
  {key:'huashan',id:'1050942331',title:'武侠世界，剑出华山',author:'李午未',genre:'武侠',tag:'武侠同人',description:'华山弟子李逍遥以小无相功为根基，推演武学、闯荡江湖，寻找属于自己的剑道。'},
  {key:'romance',id:'1048827307',title:'嫁纨绔，重生主母掀翻国公府',author:'纳兰初晴',genre:'古代言情',tag:'宫闱宅斗',description:'戚钰重回大婚之日，与纨绔卫峥结为夫妻。两人发现彼此隐藏的一面，携手揭开国公府的阴谋。'}
];
const genres = [
  {name:'玄幻',en:'FANTASY',title:'天地之外，<br>还有万千可能。',description:'越过熟悉的边界，在想象中重塑天地。<br>每一次成长，都可能改写世界。',tags:['东方玄幻','高武世界','成长冒险'],scene:'theater',books:['night','mountain']},
  {name:'仙侠',en:'IMMORTAL WORLDS',title:'一剑问天地，<br>一念见长生。',description:'云海、山门与漫漫求道之路。<br>在天地之间，寻找自己的答案。',tags:['修真文明','求道长生','东方想象'],scene:'dawn',books:['alchemy']},
  {name:'都市',en:'CITY STORIES',title:'灯火千万，<br>总有你的故事。',description:'在熟悉的街巷里，遇见不一样的人生。<br>时代、梦想与日常，都值得被书写。',tags:['都市生活','时代记忆','人生际遇'],scene:'city',books:['1979']},
  {name:'科幻',en:'BEYOND THE STARS',title:'向未知出发，<br>想象没有终点。',description:'穿过时空，抵达日常之外。<br>下一次相遇，也许来自另一重世界。',tags:['时空穿梭','未知探索','异度世界'],scene:'space',books:['inn']},
  {name:'历史',en:'ECHOES OF HISTORY',title:'翻过一页，<br>走进千年。',description:'与历史中的风云同席。<br>从人物的命运，看见时代的回声。',tags:['两宋元明','时代风云','人物命运'],scene:'history',books:['minister']},
  {name:'悬疑',en:'HIDDEN TRUTHS',title:'再近一步，<br>真相就在背后。',description:'每一个细节，都可能是新的线索。<br>跟随疑问，把故事读到最后。',tags:['谜题推演','未知线索','气氛悬念'],scene:'mystery',books:['doubles']},
  {name:'奇幻',en:'OTHER REALMS',title:'另一片大陆，<br>另一种法则。',description:'踏入陌生的文明与幻想国度。<br>让冒险重新定义你眼中的世界。',tags:['幻想国度','异界冒险','奇异文明'],scene:'theater',books:['dream']},
  {name:'武侠',en:'WANDERING HEROES',title:'江湖路远，<br>侠义在心。',description:'山水之间，快意恩仇。<br>一场相逢，一段属于江湖的故事。',tags:['江湖风云','侠义精神','快意恩仇'],scene:'dawn',books:['huashan']},
  {name:'游戏',en:'PLAY ANOTHER LIFE',title:'新的规则，<br>由你来闯。',description:'走进游戏中的异界。<br>从一次挑战，开启另一种人生。',tags:['游戏异界','力量成长','冒险挑战'],scene:'space',books:['game']},
  {name:'现实',en:'LIFE IN FOCUS',title:'平凡之中，<br>藏着不凡。',description:'把目光落在身边的人与事。<br>生活的细节，同样有故事的分量。',tags:['社会悬疑','人物命运','现实生活'],scene:'city',books:['chenmo']},
  {name:'轻小说',en:'A LITTLE WONDER',title:'轻轻一页，<br>奇思正好。',description:'让奇妙的设定与鲜活的人物相遇。<br>总有一份新鲜感，等你发现。',tags:['原生幻想','奇思妙想','轻松冒险'],scene:'dawn',books:['demon','immortal']},
  {name:'言情',en:'WHEN HEARTS MEET',title:'心动的瞬间，<br>值得慢慢读。',description:'相逢、成长与细腻的情感。<br>在人物的相伴中，感受另一种温度。',tags:['情感故事','相遇相伴','人物成长'],scene:'history',books:['romance']}
];
const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
const cover = b => `assets/covers/${b.key}.webp`;
const getBook = key => books.find(b=>b.key===key);
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
const dialog = $('.book-dialog');
let dialogOpener = null;
function openBook(key,opener){
  const b=getBook(key);if(!b)return;
  dialogOpener=opener;
  $('.dialog-book').innerHTML=`<img src="${cover(b)}" alt="《${b.title}》真实书封">`;
  $('#dialog-title').textContent=b.title;
  $('.dialog-meta').textContent=`${b.author} 著 · ${b.genre}`;
  $('.dialog-tags').innerHTML=`<span>${b.tag}</span><span>起点中文网</span>`;
  $('.dialog-description').textContent=b.description;
  dialog.showModal();document.body.style.overflow='hidden';$('.dialog-close').focus();window.dispatchEvent(new Event('book-dialog-open'));
}
dialog.addEventListener('close',()=>{document.body.style.overflow='';window.dispatchEvent(new Event('book-dialog-close'));dialogOpener?.focus({preventScroll:true});});
$('.dialog-close').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();}});
document.addEventListener('click',event=>{const target=event.target.closest('[data-book]');if(target)openBook(target.dataset.book,target);});
const stageKeys=['minister','mountain','night','inn','galaxy','1979'];
$('.book-stage').innerHTML=stageKeys.map((key,i)=>{const b=getBook(key);return `<button class="stage-book" data-book="${key}" aria-label="查看《${b.title}》简介" style="--lift:${[7,-24,-58,-58,-24,7][i]}px;--angle:${[24,15,8,-8,-15,-24][i]}deg;--roll:${[-10,-6,-2,2,6,10][i]}deg"><img src="${cover(b)}" alt="${b.title}" fetchpriority="${i===2?'high':'auto'}"><span class="stage-label">${b.title} ↗</span></button>`;}).join('');
$('.selected-grid').innerHTML=['night','mountain','1979','inn','minister','galaxy'].map((key,i)=>{const b=getBook(key);return `<button class="selected-card" data-book="${key}" aria-label="查看《${b.title}》简介"><span class="card-index">0${i+1} / ${b.genre}</span><div class="selected-cover"><img src="${cover(b)}" alt="《${b.title}》书封" loading="lazy"></div><h3>${b.title}</h3><p>${b.author} 著<br>${b.tag}</p><span class="card-action">认识这个世界 <span aria-hidden="true">↗</span></span></button>`;}).join('');
function genreButton(g,i){return `<button role="tab" id="genre-${i}" data-genre="${i}" aria-selected="${i===0}" aria-controls="world-panel" tabindex="${i===0?0:-1}">${g.name}</button>`;}
$('.genre-tabs').innerHTML=genres.slice(0,6).map(genreButton).join('');
$('.extra-genres').innerHTML=genres.slice(6).map((g,i)=>genreButton(g,i+6)).join('');
let activeGenre=0,backgroundLayer=0;
const worldScenes={theater:{url:'theater.png',position:'center',size:'cover',filter:'none'},dawn:{url:'dawn.png',position:'center',size:'cover',filter:'brightness(.68) saturate(.7)'},city:{url:'worlds.png',position:'0% 0%',size:'200% 200%',filter:'none'},space:{url:'worlds.png',position:'100% 0%',size:'200% 200%',filter:'none'},history:{url:'worlds.png',position:'0% 100%',size:'200% 200%',filter:'none'},mystery:{url:'worlds.png',position:'100% 100%',size:'200% 200%',filter:'none'}};
function selectGenre(index,trigger='keyboard'){
  if(index===activeGenre&&$('#world-panel').dataset.initialized==='true')return;
  $('#world-panel').dataset.initialized='true';
  $('#world-panel').dataset.switchTrigger=trigger;
  activeGenre=index;const g=genres[index],scene=worldScenes[g.scene];
  $$('.genre-tabs button,.extra-genres button').forEach((b,i)=>{b.setAttribute('aria-selected',String(i===index));b.tabIndex=i===index?0:-1;});
  $('#world-panel').setAttribute('aria-labelledby',`genre-${index}`);
  const layer=$$('.world-image')[backgroundLayer];backgroundLayer=1-backgroundLayer;
  Object.assign(layer.style,{backgroundImage:`url('assets/scenes/${scene.url}')`,backgroundPosition:scene.position,backgroundSize:scene.size,filter:scene.filter});
  $$('.world-image').forEach(b=>b.classList.toggle('active',b===layer));
  $('.world-label').textContent=`${g.name} / ${g.en}`;$('.world-title').innerHTML=g.title;$('.world-description').innerHTML=g.description;
  $('.world-tags').innerHTML=g.tags.map(t=>`<span>${t}</span>`).join('');$('.world-index').textContent=String(index+1).padStart(2,'0');
  $('.world-books').innerHTML=g.books.map(key=>{const b=getBook(key);return `<button class="world-book" data-book="${key}" aria-label="查看《${b.title}》简介"><img src="${cover(b)}" alt="《${b.title}》书封" loading="lazy"><strong>${b.title}</strong><small>${b.author} 著 · ${b.genre}</small></button>`;}).join('');
  if(!g.books.length)$('.world-books').innerHTML='<div class="genre-quote" aria-label="题材意象"><span>故事的边界</span><strong>由想象<br>继续拓宽。</strong></div>';
  const panel=$('.world-panel');panel.classList.remove('changing');void panel.offsetWidth;panel.classList.add('changing');
}
$$('[data-genre]').forEach(button=>{
  const index=Number(button.dataset.genre);
  button.addEventListener('pointerenter',event=>{
    if(event.pointerType==='mouse'||event.pointerType==='pen')selectGenre(index,'hover');
  });
  button.addEventListener('focus',()=>selectGenre(index,'focus'));
  button.addEventListener('click',()=>selectGenre(index,'click'));
});
$('.more-genres').addEventListener('click',()=>{const expanded=$('.more-genres').getAttribute('aria-expanded')==='true';$('.more-genres').setAttribute('aria-expanded',String(!expanded));$('#extra-genres').hidden=expanded;if(expanded&&activeGenre>=6)selectGenre(0);});
function tabKeyboard(container,selector,onSelect){container.addEventListener('keydown',e=>{if(!['ArrowLeft','ArrowRight','Home','End'].includes(e.key))return;const tabs=[...container.querySelectorAll(selector)],current=tabs.indexOf(document.activeElement);if(current<0)return;e.preventDefault();const next=e.key==='Home'?0:e.key==='End'?tabs.length-1:(current+(e.key==='ArrowRight'?1:-1)+tabs.length)%tabs.length;tabs[next].focus();onSelect(tabs[next]);});}
tabKeyboard($('.genre-tabs'),'button',b=>selectGenre(Number(b.dataset.genre)));tabKeyboard($('.extra-genres'),'button',b=>selectGenre(Number(b.dataset.genre)));
selectGenre(0);
const appFeatures={discover:{title:'在万千故事里，遇见你的热爱。',text:'小说、漫画与有声内容，一起打开更多故事的入口。通过作品推荐与阅读社区，发现下一段想读的内容。'},read:{title:'边读边聊，也能闭上眼听故事。',text:'通过「本章说」与读者交流，在情节中分享你的想法；真人有声，让熟悉的故事在声音中展开。'}};
function selectApp(mode){const f=appFeatures[mode];$$('[data-app]').forEach(b=>{const selected=b.dataset.app===mode;b.setAttribute('aria-selected',String(selected));b.tabIndex=selected?0:-1;});$('#app-feature').setAttribute('aria-labelledby',`app-tab-${mode}`);$('#app-feature h3').textContent=f.title;$('#app-feature p').textContent=f.text;$('.app-art').classList.toggle('read-mode',mode==='read');$('.app-screen-pair').hidden=mode!=='read';$('.app-art>img').hidden=mode==='read';$('.app-art-caption').textContent=mode==='read'?'App Store 官方展示截图':'起点读书官方展示素材';}
$$('[data-app]').forEach(b=>b.addEventListener('click',()=>selectApp(b.dataset.app)));tabKeyboard($('.app-tabs'),'button',b=>selectApp(b.dataset.app));selectApp('discover');
$$('.download').forEach(button=>button.addEventListener('click',()=>{button.classList.remove('pulse');void button.offsetWidth;button.classList.add('pulse');}));
const visibilityObserver=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');visibilityObserver.unobserve(e.target);}}),{threshold:.12});$$('.reveal').forEach(el=>visibilityObserver.observe(el));
const sectionObserver=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting)$$('.nav nav a').forEach(a=>a.classList.toggle('active',a.getAttribute('href')===`#${e.target.id}`));});},{rootMargin:'-20% 0px -50% 0px'});$$('main section[id]').forEach(s=>sectionObserver.observe(s));
$$('.selected-card').forEach(card=>{card.addEventListener('pointermove',e=>{if(reducedMotion.matches)return;const r=card.getBoundingClientRect();card.style.setProperty('--tilt-x',`${-(e.clientY-r.top-r.height/2)/r.height*12}deg`);card.style.setProperty('--tilt-y',`${(e.clientX-r.left-r.width/2)/r.width*14}deg`);});card.addEventListener('pointerleave',()=>{card.style.setProperty('--tilt-x','0deg');card.style.setProperty('--tilt-y','0deg');});});
$('.hero').addEventListener('pointermove',e=>{if(reducedMotion.matches)return;const r=$('.hero').getBoundingClientRect();$('.hero').style.setProperty('--scene-x',`${-(e.clientX-r.width/2)*.012}px`);$('.hero').style.setProperty('--scene-y',`${-(e.clientY-r.top-r.height/2)*.012}px`);});
const clamp=(v,min=0,max=1)=>Math.min(max,Math.max(min,v));
const ease=v=>{v=clamp(v);return v*v*(3-2*v);};
let rafPending=false;
function renderScroll(){
  rafPending=false;
  const y=window.scrollY,h=innerHeight,total=document.documentElement.scrollHeight-h;
  $('.page-progress').style.transform=`scaleX(${clamp(y/total)})`;
  $('.nav').classList.toggle('scrolled',y>40);
  const opening=$('.opening'),length=opening.offsetHeight-h,p=clamp(y/length);
  const config=window.OPENING_CONFIG;
  const reveal=ease((p-config.contentRevealStart)/(1-config.contentRevealStart));
  document.documentElement.style.setProperty('--intro-reveal',String(reveal));
  const nav=$('.nav');
  nav.classList.toggle('intro-hidden',reveal===0);
  nav.inert=p<0.995;
  nav.setAttribute('aria-hidden',String(reveal===0));
  const fade=ease((p-config.transitionStart)/(1-config.transitionStart));
  $('.opening-sticky').style.opacity=String(1-fade);
  opening.style.visibility=p>=1?'hidden':'visible';
  opening.inert=p>=0.995;
  opening.dataset.scrollProgress=p.toFixed(4);
  $('.opening-bottom').style.opacity=String(1-ease((p-.82)/.08));
  $('.ink-transition').style.opacity=String(ease((p-.86)/.14));
  const filmProgress=clamp(p/config.filmEndProgress);
  window.openingFilm.setEnabled(!document.hidden);
  window.openingFilm.setProgress(reducedMotion.matches?0:filmProgress);
  $('.opening-poster').style.transform=reducedMotion.matches?'none':`scale(${1+ease(p/.70)*.10})`;
}
function scheduleScroll(){if(!rafPending){rafPending=true;requestAnimationFrame(renderScroll);}}
window.addEventListener('scroll',scheduleScroll,{passive:true});
window.addEventListener('resize',scheduleScroll);
document.addEventListener('visibilitychange',scheduleScroll);
reducedMotion.addEventListener('change',scheduleScroll);
$('.skip-intro').addEventListener('click',()=>{
  window.scrollTo({top:$('#hero').getBoundingClientRect().top+window.scrollY,
    behavior:reducedMotion.matches?'instant':'smooth'});
});
renderScroll();
