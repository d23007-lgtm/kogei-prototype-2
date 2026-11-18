const IDEALS = [
  {id:'impression',title:'印象に残る形にしたい',short:'印象に残る形',hints:['輪郭の強弱で、形の印象をつくる','異なる形を組み合わせてみる','一部分に特徴を集めてみる']},
  {id:'useful',title:'美しさと使いやすさを両立したい',short:'美しさと使いやすさ',hints:['使う動作から形を考えてみる','縁の形に役割を持たせる','支える部分の形を工夫する']},
  {id:'texture',title:'素材の質感を引き立たせたい',short:'素材の質感',hints:['素材の模様や流れを生かす','仕上げの違いを使い分ける','色や表情の対比を考える']},
  {id:'light',title:'軽やかな印象にしたい',short:'軽やかな印象',hints:['隙間をつくって空間を見せる','広がる輪郭を試してみる','色の面積や配置を工夫する']}
];
const PRESETS = [
  {id:'bowl',name:'茶碗',kind:'bowl'}, {id:'katakuchi',name:'片口',kind:'spout'}, {id:'shallow',name:'浅鉢',kind:'shallow'},
  {id:'tray',name:'丸盆',kind:'tray'}, {id:'basket',name:'籠',kind:'basket'}, {id:'cube',name:'立方体',kind:'cube'}, {id:'cylinder',name:'円柱',kind:'cylinder'}
];
const MATERIALS = [
  {id:'white',name:'焼き締め（白）',color:'#D8CFC0',dark:'#938575',inner:'#8A7A68',description:'落ち着いた明るい土の色'},
  {id:'red',name:'焼き締め（赤）',color:'#AA432E',dark:'#2B0800',inner:'#4D1D12',description:'赤みのある土の色'},
  {id:'celadon',name:'青磁釉',color:'#9ABBB1',dark:'#557C73',inner:'#456A61',description:'青みを含んだ淡い緑'},
  {id:'iron',name:'鉄釉',color:'#4A342A',dark:'#1D1715',inner:'#211713',description:'深く落ち着いた茶色'},
  {id:'beech',name:'ブナ',color:'#D4B48A',dark:'#8C6846',inner:'#B08A5E',description:'明るい木の色'},
  {id:'cedar',name:'スギ',color:'#B98254',dark:'#714329',inner:'#8D5C38',description:'赤みのある木の色'},
  {id:'black-lacquer',name:'黒漆',color:'#282423',dark:'#080808',inner:'#161313',description:'光を抑えた黒'},
  {id:'vermilion-lacquer',name:'朱漆',color:'#C8442C',dark:'#7D1D13',inner:'#8C271B',description:'鮮やかな朱色'},
  {id:'wipe-lacquer',name:'拭き漆',color:'#98613D',dark:'#4B2D1E',inner:'#64412C',description:'木目が見える漆仕上げ'},
  {id:'bamboo',name:'竹編み',color:'#C7B17C',dark:'#82734D',inner:'#9D8B5C',description:'編み目を感じる黄褐色'},
  {id:'glass',name:'硝子',color:'#9ABFC0',dark:'#5A8588',inner:'#D5E6E5',description:'透け感のある青緑'}
];
const CRAFT_IDEAS = {
  impression:[['輪郭に強弱をつける','張り出しやくびれをつくり、形の変化から特徴を生み出す。'],['異なる形を組み合わせる','曲線と直線、丸と角など、異なる形状を一つの造形にまとめる。'],['一部分を強調する','口元・縁・脚など、特定の部分に特徴を集中させる。']],
  useful:[['使う動作から形を考える','持つ・注ぐ・置くなど、使用時の動作を形状に反映する。'],['縁の形に役割を持たせる','縁の高さや角度を、見た目だけでなく使い方にも結びつける。'],['支える部分を工夫する','底や脚の形を調整し、安定性と造形の特徴を両立させる。']],
  texture:[['素材の模様や流れを生かす','木目や繊維の方向を観察し、形や加工の方向を合わせる。'],['仕上げの違いを使い分ける','磨き方や塗り方を変え、光沢や手触りの違いを表現に取り入れる。'],['素材の色や表情を対比させる','異なる色味や質感の素材を隣り合わせ、互いの特徴を際立たせる。']],
  light:[['隙間をつくる','素材を詰め切らず、空間が見える構造にする。'],['広い輪郭をつくる','上部に向かって広がる形や、薄く開いた縁を用いる。'],['色の重さを調整する','色の面積や配置を工夫し、形の密度や広がりの感じ方を変える。']]
};
// Museum and collection records below are factual references; the design insight is an interpretation for this prototype.
const REFERENCES = {
  impression:[
    {title:'朱漆三面鏡',maker:'黒田辰秋',date:'1934年',material:'漆工',insight:'朱色の面が視線を集める。色と形の組み合わせで、印象の中心をつくる見方ができます。',url:'https://search.artmuseums.go.jp/records.php?sakuhin=153181',source:'国立美術館 所蔵作品検索'},
    {title:'朱漆宝結文円卓',maker:'黒田辰秋',date:'1936年',material:'漆工',insight:'円形の天板と文様の組み合わせに注目。形の輪郭と表面の意匠を組み合わせる参考になります。',url:'https://search.artmuseums.go.jp/records.php?sakuhin=2930',source:'国立美術館 所蔵作品検索'},
    {title:'螺鈿唐花文座卓',maker:'黒田辰秋',date:'1926年',material:'漆工',insight:'輪郭と装飾の配置を観察してみましょう。形以外の要素でも視線を誘導できます。',url:'https://search.artmuseums.go.jp/records.php?sakuhin=2930',source:'国立美術館 作家作品一覧'},
    {title:'耀貝螺鈿飾文筺',maker:'黒田辰秋',date:'1974年',material:'漆・乾漆・螺鈿',insight:'貝の輝きが面のアクセントになる作品。素材の違いを一点に集め、特徴を際立たせる視点です。',url:'https://search.artmuseums.go.jp/records.php?sakuhin=2930',source:'国立美術館 所蔵作品検索'},
    {title:'彩漆群蝶図手筐',maker:'黒田辰秋',date:'1948年',material:'漆工',insight:'色漆で描かれた蝶の大小に注目。モチーフの大きさや配置で、見る人の視線を動かす参考になります。',url:'https://www.museum.toyota.aichi.jp/collection/kuroda-tatsuaki',source:'豊田市美術館 コレクション'}
  ],
  useful:[
    {title:'欅拭漆食卓・肘掛椅子・椅子',maker:'黒田辰秋',date:'1928年',material:'欅・漆',insight:'座る・置くという行為と家具の形を一緒に考える参考です。使う場面から形を考えてみましょう。',url:'https://www.asahigroup-oyamazaki.com/collection/crafts/09/',source:'大山崎山荘美術館 所蔵品'},
    {title:'欅拭漆飾棚',maker:'黒田辰秋',date:'1970年',material:'欅・漆',insight:'収納するものや手を伸ばす動作を想像すると、棚の高さや区切りにも役割があると気づけます。',url:'https://www.museum.toyota.aichi.jp/collection/kuroda-tatsuaki',source:'豊田市美術館 コレクション'},
    {title:'拭漆欅座卓',maker:'黒田辰秋',date:'1961年',material:'欅・漆',insight:'低い台の高さと広い天板に注目。どんな姿勢で使うかを想像して形を見る参考になります。',url:'https://search.artmuseums.go.jp/records.php?sakuhin=153178',source:'国立美術館 所蔵作品検索'},
    {title:'拭漆楢机椅子揃',maker:'黒田辰秋',date:'昭和初期',material:'楢・漆',insight:'机と椅子を組み合わせて見ると、ひとつの道具だけでなく、使う人の動きから寸法を考えられます。',url:'https://search.artmuseums.go.jp/records.php?sakuhin=200231',source:'国立美術館 所蔵作品検索'},
    {title:'欅拭漆肘掛椅子',maker:'黒田辰秋',date:'1928年',material:'欅・漆',insight:'肘を置く場所や座面の高さに注目。身体を支える部分も、形を考える手がかりになります。',url:'https://www.asahigroup-oyamazaki.com/collection/crafts/09/',source:'大山崎山荘美術館 所蔵品'}
  ],
  texture:[
    {title:'欅拭漆飾棚',maker:'黒田辰秋',date:'1970年',material:'欅・漆',insight:'木目を隠さず仕上げる拭漆に注目。素材の表情を見せる仕上げ方を考える参考です。',url:'https://www.museum.toyota.aichi.jp/collection/kuroda-tatsuaki',source:'豊田市美術館 コレクション'},
    {title:'黒柿紙刀',maker:'黒田辰秋',date:'1965–74年',material:'柿・漆',insight:'木目の美しさを生かした作品。素材が持つ模様を、造形の見どころにする視点です。',url:'https://www.museum.toyota.aichi.jp/collection/kuroda-tatsuaki',source:'豊田市美術館 コレクション'},
    {title:'拭漆欅座卓',maker:'黒田辰秋',date:'1961年',material:'欅・漆',insight:'木の表情と漆の艶の関係を観察。表面の仕上げが素材の見え方を変える参考です。',url:'https://search.artmuseums.go.jp/records.php?sakuhin=153178',source:'国立美術館 所蔵作品検索'},
    {title:'螺鈿卍文茶器',maker:'黒田辰秋',date:'1940–44年',material:'漆・螺鈿',insight:'漆の落ち着いた面と貝の光沢の対比に注目。異なる質感を隣り合わせる方法です。',url:'https://search.artmuseums.go.jp/records.php?sakuhin=200218',source:'国立美術館 所蔵作品検索'},
    {title:'貝象嵌色字筥',maker:'黒田辰秋',date:'1928年頃',material:'木・貝象嵌',insight:'貝の輝きと木の面の違いを見比べてみましょう。素材ごとの特徴を組み合わせる考え方です。',url:'https://www.asahigroup-oyamazaki.com/collection/crafts/08/',source:'大山崎山荘美術館 所蔵品'}
  ],
  light:[
    {title:'乾漆耀貝螺鈿捻十稜水指',maker:'黒田辰秋',date:'1965年',material:'漆・螺鈿',insight:'十稜の輪郭がつくるリズムに注目。丸い形を少し変えるだけでも、軽快な印象を生み出せます。',url:'https://www.museum.toyota.aichi.jp/collection/kuroda-tatsuaki',source:'豊田市美術館 コレクション'},
    {title:'乾漆耀貝螺鈿喰篭',maker:'黒田辰秋',date:'作品一覧掲載',material:'乾漆・螺鈿',insight:'籠状の構造を手がかりに、面を埋めるだけでなく、隙間や抜けを造形に使う視点を考えます。',url:'https://www.nihonkogeikai.or.jp/works/15361/',source:'日本工芸会 作品一覧'},
    {title:'朱漆流稜文飾箱',maker:'黒田辰秋',date:'1957年頃',material:'漆工',insight:'面の流れや稜線に注目。線の向きが、形の動きや軽快さの感じ方に影響します。',url:'https://www.nihonkogeikai.or.jp/works/15361/',source:'日本工芸会 作品一覧'},
    {title:'拭漆花梨葡萄杢手筐',maker:'黒田辰秋',date:'作品一覧掲載',material:'花梨・漆',insight:'木目の流れが視線を導きます。色や模様の向きを使って、重さの感じ方を変える参考です。',url:'https://www.nihonkogeikai.or.jp/works/15361/',source:'日本工芸会 作品一覧'},
    {title:'耀貝螺鈿流卍文茶器',maker:'黒田辰秋',date:'作品一覧掲載',material:'漆・螺鈿',insight:'流れる文様の配置に注目。形を変えなくても、模様の方向で動きのある印象をつくれます。',url:'https://www.nihonkogeikai.or.jp/works/15361/',source:'日本工芸会 作品一覧'}
  ]
};

let state = {ideal:null,preset:'bowl',material:'red',height:50,width:50,contour:50,detail:50,selectedIdeas:[],memo:'',startedAt:null,remaining:90,saveAfter:'finish'};
let timerInterval=null;
const $=s=>document.querySelector(s); const $$=s=>[...document.querySelectorAll(s)];
function showScreen(id){$$('.screen').forEach(s=>s.classList.toggle('active',s.id===id));window.scrollTo({top:0,behavior:'smooth'});if(id!=='workScreen')stopTimer();}
function getIdeal(){return IDEALS.find(x=>x.id===state.ideal)||IDEALS[0]}
function getPreset(){return PRESETS.find(x=>x.id===state.preset)||PRESETS[0]}
function getMaterial(){return MATERIALS.find(x=>x.id===state.material)||MATERIALS[1]}
function renderIdeals(){ $('#idealGrid').innerHTML=IDEALS.map((x,i)=>`<button class="ideal-card ${state.ideal===x.id?'selected':''}" data-ideal="${x.id}"><span class="ideal-number">IDEAL / 0${i+1}</span><span class="ideal-title">${x.title}</span></button>`).join('');$$('[data-ideal]').forEach(b=>b.addEventListener('click',()=>{state.ideal=b.dataset.ideal;renderIdeals();$('#chooseIdealButton').disabled=false;}));$('#chooseIdealButton').disabled=!state.ideal;}
function miniShape(kind){const paths={bowl:'<path d="M15 22 Q50 33 85 22 L76 65 Q70 77 50 78 Q30 77 24 65Z" fill="#AA432E"/><ellipse cx="50" cy="22" rx="35" ry="10" fill="#CF4E35"/><ellipse cx="50" cy="23" rx="25" ry="6" fill="#2B0800"/>',spout:'<path d="M20 25 Q45 36 74 25 L66 64 Q60 75 44 75 Q28 73 26 60Z" fill="#AA432E"/><path d="M69 29 Q88 14 88 25 Q86 35 72 40" fill="#CF4E35"/><ellipse cx="47" cy="25" rx="27" ry="9" fill="#CF4E35"/><ellipse cx="47" cy="26" rx="19" ry="5" fill="#2B0800"/>',shallow:'<path d="M13 35 Q50 48 87 35 L79 58 Q71 72 50 72 Q29 72 21 58Z" fill="#AA432E"/><ellipse cx="50" cy="35" rx="37" ry="12" fill="#CF4E35"/><ellipse cx="50" cy="36" rx="27" ry="7" fill="#2B0800"/>',tray:'<path d="M10 35 Q50 48 90 35 L84 58 Q50 71 16 58Z" fill="#AA432E"/><ellipse cx="50" cy="35" rx="40" ry="12" fill="#CF4E35"/><ellipse cx="50" cy="36" rx="30" ry="7" fill="#2B0800"/>',basket:'<path d="M20 30 Q50 41 80 30 L73 64 Q50 75 27 64Z" fill="#C7B17C" stroke="#82734D" stroke-width="2"/><ellipse cx="50" cy="30" rx="30" ry="10" fill="#DCCB9E" stroke="#82734D" stroke-width="2"/><path d="M26 42 L74 58 M34 31 L32 66 M50 32 L50 70 M66 31 L68 66 M24 52 L76 43" stroke="#82734D" stroke-width="2"/>',cube:'<path d="M20 28 L50 14 L82 29 L50 44Z" fill="#CF4E35"/><path d="M20 28 L50 44 L50 78 L20 61Z" fill="#AA432E"/><path d="M50 44 L82 29 L82 62 L50 78Z" fill="#7D2B1B"/>',cylinder:'<path d="M23 25 L23 68 Q50 82 77 68 L77 25Z" fill="#AA432E"/><ellipse cx="50" cy="25" rx="27" ry="9" fill="#CF4E35"/><ellipse cx="50" cy="26" rx="19" ry="5" fill="#2B0800"/>'};return `<svg viewBox="0 0 100 90" aria-hidden="true">${paths[kind]||paths.bowl}</svg>`}
function renderPresets(){$('#presetGrid').innerHTML=PRESETS.map(p=>`<button class="preset-card ${state.preset===p.id?'selected':''}" data-preset="${p.id}">${miniShape(p.kind)}<span>${p.name}</span></button>`).join('');$$('[data-preset]').forEach(b=>b.addEventListener('click',()=>{state.preset=b.dataset.preset;renderPresets();updateDetailControl();updatePreview();}));}
const DETAIL_LABELS={bowl:'高台の高さ',spout:'注ぎ口の大きさ',shallow:'縁の厚み',tray:'縁の高さ',basket:'編み目の密度',cube:'角の丸み',cylinder:'上下のすぼまり'};
function updateDetailControl(){const el=$('#detailLabel');if(el)el.textContent=DETAIL_LABELS[state.preset]||'細部';}
function renderMaterials(){$('#materialList').innerHTML=MATERIALS.map(m=>`<button class="material-card ${state.material===m.id?'selected':''}" data-material="${m.id}"><span class="swatch" style="--swatch:${m.color}"></span><span>${m.name}</span></button>`).join('');$$('[data-material]').forEach(b=>b.addEventListener('click',()=>{state.material=b.dataset.material;renderMaterials();updatePreview();}));}
function vesselPath(p,h,w,c){
  // 各スライダーの変化がプレビュー上で十分に見えるようにする。
  const H=Number(h), W=Number(w), C=Number(c);
  const width=62+(W-25)*1.65;
  let top=100, depth=66+(H-25)*2.1;
  if(p==='shallow'||p==='tray'){top=136;depth=25+(H-25)*1.15;}
  const bottom=Math.min(302,top+depth);
  const cx=210, left=cx-width, right=cx+width;
  const ry=Math.max(12,width*.25);
  if(p==='cylinder'){
    const taper=(C-50)*.32;
    return {body:`M${left} ${top} L${left+taper} ${bottom-12} Q${cx} ${bottom+9} ${right-taper} ${bottom-12} L${right} ${top} Z`,rimY:top,rx:width,ry,insideRx:width*.78};
  }
  if(p==='cube'){
    const skew=(C-50)*.36;
    return {body:`M${left} ${top+12} L${cx-width*.18} ${top-16} L${right} ${top+12} L${right-8+skew} ${bottom-8} L${cx} ${bottom+7} L${left+8-skew} ${bottom-8} Z`,rimY:top+12,rx:width,ry,insideRx:width*.72};
  }
  // C=0 はすぼまった形、C=100 は外側に張り出した形。
  const flare=(C-50)*.90;
  const midWidth=Math.max(24,width*.76+flare);
  const footWidth=Math.max(18,width*(p==='tray'?.73:.54)-flare*.35);
  const midY=top+depth*.58;
  const body=`M${left} ${top} C${left+8} ${top+depth*.20} ${cx-midWidth} ${midY-depth*.13} ${cx-midWidth} ${midY} C${cx-midWidth} ${bottom-12} ${cx-footWidth} ${bottom} ${cx} ${bottom} C${cx+footWidth} ${bottom} ${cx+midWidth} ${bottom-12} ${cx+midWidth} ${midY} C${cx+midWidth} ${midY-depth*.13} ${right-8} ${top+depth*.20} ${right} ${top} Z`;
  return {body,rimY:top,rx:width,ry,insideRx:width*.79};
}
const textureCache = new Map();
let textureRequest = 0;
let currentTextureMaterial = null;
function loadMaterialTexture(id){
  const image=$('#materialTextureImage');
  const overlay=$('#vesselTextureOverlay');
  if(!image||!overlay)return;
  // 形状のスライダー操作では素材の再読み込みをしない。
  if(currentTextureMaterial===id)return;
  currentTextureMaterial=id;
  const request=++textureRequest;
  overlay.style.display='none';
  const use=(src)=>{
    if(request!==textureRequest)return;
    image.setAttribute('href',src);
    image.setAttributeNS('http://www.w3.org/1999/xlink','href',src);
    overlay.style.display='';
    overlay.setAttribute('opacity',id==='glass'?'0.48':'0.88');
  };
  if(textureCache.has(id)){use(textureCache.get(id));return;}
  const extensions=['jpg','jpeg','png','webp'];
  let i=0;
  const next=()=>{
    if(request!==textureRequest)return;
    if(i>=extensions.length){console.warn('素材画像が見つかりません:',id);return;}
    const url=new URL(`assets/materials/${id}.${extensions[i++]}`,document.baseURI).href;
    const probe=new Image();
    probe.onload=()=>{textureCache.set(id,url);use(url)};
    probe.onerror=next;
    probe.src=url;
  };
  next();
}
function updatePreview(){const m=getMaterial(),p=getPreset(),g=vesselPath(p.kind,Number(state.height),Number(state.width),Number(state.contour));const body=$('#vesselBody'),rim=$('#vesselRim'),inside=$('#vesselInside'),shine=$('#vesselShine'),innerLight=$('#vesselInnerLight');body.setAttribute('d',g.body); const clip=$('#vesselTextureClipPath');if(clip)clip.setAttribute('d',g.body); body.setAttribute('fill',m.color);loadMaterialTexture(m.id);rim.setAttribute('cx','210');rim.setAttribute('cy',g.rimY);rim.setAttribute('rx',g.rx);rim.setAttribute('ry',g.ry);rim.setAttribute('fill',m.color);inside.setAttribute('cx','210');inside.setAttribute('cy',g.rimY+2);inside.setAttribute('rx',g.insideRx);inside.setAttribute('ry',g.ry*.64);inside.setAttribute('fill',m.dark);shine.setAttribute('d',`M${210-g.rx*.82} ${g.rimY+g.ry*.55} Q${210-g.rx*.65} ${g.rimY+g.ry} ${210-g.rx*.55} ${g.rimY+g.ry+40} L${210-g.rx*.42} ${g.rimY+Math.max(30,Number(state.height)*1.4)} Q${210-g.rx*.5} ${g.rimY+Math.max(30,Number(state.height)*1.4)+9} ${210-g.rx*.61} ${g.rimY+Math.max(30,Number(state.height)*1.4)} Z`);shine.setAttribute('opacity',m.id==='black-lacquer'?'.18':'.65');innerLight.setAttribute('d',`M${210-g.insideRx} ${g.rimY+2} Q210 ${g.rimY+g.ry*1.5} ${210+g.insideRx} ${g.rimY+2}`);$('#shapeCaption').textContent=`${p.name} / ${m.name}`;$('#heightValue').value=state.height;$('#widthValue').value=state.width;$('#contourValue').value=state.contour;$('#heightRange').value=state.height;$('#widthRange').value=state.width;$('#contourRange').value=state.contour;$('#detailRange').value=state.detail;$('#detailValue').value=state.detail;$('#currentIdeal').textContent=getIdeal().title;$('#timerValue').textContent=state.remaining;$('#vesselStage').style.background=m.id==='glass'?'radial-gradient(ellipse at 50% 48%,#f5ffff 0%,#dbe9e8 100%)':'';window.Kogei3D?.update(state,m);}
function renderIdeas(){
 const ideas=CRAFT_IDEAS[state.ideal]||CRAFT_IDEAS.impression;
 const icons=['◌','◇','◐'];
 $('#craftIdeas').innerHTML=ideas.map(([title,desc],i)=>`<article class="craft-idea ${state.selectedIdeas.includes(title)?'selected':''}"><div class="idea-head"><span class="idea-icon" aria-hidden="true">${icons[i]}</span><h3>${title}</h3><button class="idea-select" data-select-idea="${title}" aria-label="${title}を振り返りに追加">${state.selectedIdeas.includes(title)?'✓ 保存中':'＋ 保存'}</button></div><details><summary>詳しく見る</summary><p>${desc}</p></details></article>`).join('');
 $$('[data-select-idea]').forEach(b=>b.addEventListener('click',()=>{const title=b.dataset.selectIdea;state.selectedIdeas=state.selectedIdeas.includes(title)?state.selectedIdeas.filter(x=>x!==title):[...state.selectedIdeas,title];renderIdeas()}));
 const records=REFERENCES[state.ideal]||REFERENCES.impression;
 $('#referenceList').innerHTML=records.map((r,i)=>`<article class="reference-card"><div class="reference-head"><span class="reference-index" aria-hidden="true">${String(i+1).padStart(2,'0')}</span><strong>${r.insight.split('。')[0]}。</strong></div><details><summary>作品を見る</summary><p class="reference-full">${r.insight}</p><div class="reference-meta"><strong>${r.title}</strong><span>${r.maker} / ${r.date} ・ ${r.material}</span></div><a href="${r.url}" target="_blank" rel="noopener noreferrer">出典を見る ↗</a></details></article>`).join('');
 $('#resultSummary').textContent=`${getPreset().name} / ${getMaterial().name}`;
 $('#resultGoal').textContent=getIdeal().title;
 $('#resultThumb').innerHTML=state.completedSnapshot?`<img src="${state.completedSnapshot}" alt="完成した作品">`:previewMarkup();
}
function previewMarkup(){
 const svg=$('#vesselSvg').cloneNode(true);
 svg.removeAttribute('id');
 // SVG複製時のID衝突を防ぐため参照先を固有化
 const suffix='thumb'+Math.random().toString(36).slice(2);
 svg.querySelectorAll('[id]').forEach(el=>{const prev=el.id;el.id=prev+'-'+suffix;svg.querySelectorAll('*').forEach(n=>{for(const a of ['fill','clip-path','href']){const v=n.getAttribute(a);if(v)n.setAttribute(a,v.replace('url(#'+prev+')','url(#'+el.id+')'))}})});
 return svg.outerHTML;
}
async function makeSnapshot(){
 const svg=$('#vesselSvg').cloneNode(true);
 svg.setAttribute('xmlns','http://www.w3.org/2000/svg');
 svg.setAttribute('viewBox','0 0 420 330');
 const image=svg.querySelector('#materialTextureImage');
 const overlay=svg.querySelector('#vesselTextureOverlay');
 const source=textureCache.get(state.material);
 if(image && overlay && source){
   try{
     // 同一オリジンの画像を縮小して埋め込み、保存後も質感を保持する。
     const original=await new Promise((resolve,reject)=>{
       const im=new Image(); im.onload=()=>resolve(im);im.onerror=reject;im.src=source;
     });
     const canvas=document.createElement('canvas');
     canvas.width=512;canvas.height=402;
     const ctx=canvas.getContext('2d');
     ctx.drawImage(original,0,0,512,402);
     const data=canvas.toDataURL('image/jpeg',0.66);
     image.setAttribute('href',data);
     image.setAttributeNS('http://www.w3.org/1999/xlink','href',data);
     overlay.style.display='';
   }catch(error){console.warn('サムネイルの質感保存に失敗:',error);overlay.remove();}
 }else if(overlay){overlay.remove();}
 return 'data:image/svg+xml;charset=utf-8,'+encodeURIComponent(new XMLSerializer().serializeToString(svg));
}
function renderReflection(){const options=(CRAFT_IDEAS[state.ideal]||CRAFT_IDEAS.impression).map(x=>x[0]);$('#reflectionChoices').innerHTML=options.map(x=>`<label class="reflection-choice"><input type="checkbox" value="${x}" ${state.selectedIdeas.includes(x)?'checked':''}><span>${x}</span></label>`).join('');$$('#reflectionChoices input').forEach(ch=>ch.addEventListener('change',()=>{state.selectedIdeas= $$('#reflectionChoices input:checked').map(x=>x.value);}));$('#memoInput').value=state.memo||'';$('#reflectionThumb').innerHTML=state.completedSnapshot?`<img src="${state.completedSnapshot}" alt="完成した作品">`:previewMarkup();$('#reflectionSummary').textContent=`${getPreset().name} / ${getMaterial().name}`;$('#reflectionGoal').textContent=getIdeal().title;const rating=document.querySelector(`input[name="selfRating"][value="${state.rating||3}"]`);if(rating)rating.checked=true;}
function readSaved(){try{return JSON.parse(localStorage.getItem('kogei-ideas-library')||'[]')}catch(e){return []}}
function writeSaved(list){localStorage.setItem('kogei-ideas-library',JSON.stringify(list));updateSavedCount();}
function updateSavedCount(){$('#savedCount').textContent=readSaved().length}
function renderLibrary(){
 const list=readSaved();
 if(!list.length){$('#libraryList').innerHTML='<div class="empty-state">まだ保存された作品はありません。<br>まずはひとつ、形をつくってみましょう。</div>';return;}
 $('#libraryList').innerHTML=list.slice().reverse().map(entry=>`<article class="library-entry"><div class="library-entry-head"><span class="eyebrow">SAVED CREATION</span><button class="delete-entry" data-delete="${entry.id}">削除 ×</button></div><div class="library-thumb">${entry.snapshot?`<img src="${entry.snapshot}" alt="制作サムネイル">`:miniShape('bowl')}</div><h3>${escapeHtml(entry.idealTitle)}</h3><div class="entry-meta">${escapeHtml(entry.preset)} / ${escapeHtml(entry.material)} ・ ${escapeHtml(entry.date)}</div><div class="entry-rating">自己評価：${'★'.repeat(Number(entry.rating||3))}${'☆'.repeat(5-Number(entry.rating||3))}</div><div class="entry-ideas"><strong>参考になった工夫</strong><br>${entry.ideas.length?entry.ideas.map(escapeHtml).join('、'):'未選択'}</div>${entry.memo?`<p class="entry-memo"><strong>メモ</strong><br>${escapeHtml(entry.memo)}</p>`:''}</article>`).join('');
 $$('[data-delete]').forEach(b=>b.addEventListener('click',()=>{writeSaved(readSaved().filter(x=>x.id!==b.dataset.delete));renderLibrary()}));
}
function escapeHtml(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function startTimer(){stopTimer();state.remaining=90;state.startedAt=Date.now();updatePreview();timerInterval=setInterval(()=>{const elapsed=Math.floor((Date.now()-state.startedAt)/1000);state.remaining=Math.max(0,90-elapsed);$('#timerValue').textContent=state.remaining;$('#workScreen').classList.toggle('urgent',state.remaining<=30);const hintIndex=Math.floor(elapsed/18)%getIdeal().hints.length;$('#hintText').textContent=getIdeal().hints[hintIndex];if(state.remaining<=0){finishMaking();}},250);}
function stopTimer(){if(timerInterval){clearInterval(timerInterval);timerInterval=null;}}
let countdownInterval=null;function startCountdown(){if(countdownInterval)clearInterval(countdownInterval);$('#countdownGoal').textContent=getIdeal().title;let n=3;$('#countdownNumber').textContent=n;showScreen('countdownScreen');countdownInterval=setInterval(()=>{n--;if(n>0){$('#countdownNumber').textContent=n;}else{clearInterval(countdownInterval);countdownInterval=null;showScreen('workScreen');window.Kogei3D?.update(state,getMaterial());startTimer();}},1000);}
function beginCreation(){state.preset='bowl';state.material='red';state.height=50;state.width=50;state.contour=50;state.detail=50;state.selectedIdeas=[];state.memo='';state.rating=3;state.remaining=90;state.completedSnapshot=null;renderPresets();renderMaterials();updateDetailControl();updatePreview();startCountdown();}
let finishTransition=null;
function finishMaking(){
 if(!$('#workScreen').classList.contains('active'))return;
 stopTimer();$('#workScreen').classList.remove('urgent');
 state.completedSnapshot=window.Kogei3D?.snapshotData()||null;$('#finishCreation').innerHTML=state.completedSnapshot?`<img src="${state.completedSnapshot}" alt="完成した作品">`:previewMarkup();showScreen('finishScreen');
 if(finishTransition)clearTimeout(finishTransition);
 finishTransition=setTimeout(()=>{finishTransition=null;renderIdeas();showScreen('ideasScreen');},2500);
}
async function saveSession(){
 state.memo=$('#memoInput').value.trim();
 state.rating=Number(document.querySelector('input[name="selfRating"]:checked')?.value||3);
 const entry={id:Date.now().toString(36),date:new Date().toLocaleDateString('ja-JP'),ideal:state.ideal,idealTitle:getIdeal().title,preset:getPreset().name,material:getMaterial().name,ideas:[...state.selectedIdeas],memo:state.memo,rating:state.rating,snapshot:(state.completedSnapshot||await makeSnapshot())};
 const list=readSaved();list.push(entry);
 try{writeSaved(list);renderLibrary();showScreen('libraryScreen');}
 catch(error){console.error(error);alert('保存領域が不足している可能性があります。保存済みの作品を整理してから、もう一度お試しください。');}
}
// Screen navigation and controls
$('#startButton').addEventListener('click',()=>{state.ideal=null;renderIdeals();showScreen('idealScreen')});$('#chooseIdealButton').addEventListener('click',()=>{if(state.ideal)beginCreation()});$('#changeIdealButton').addEventListener('click',()=>{stopTimer();renderIdeals();showScreen('idealScreen')});$('#resetButton').addEventListener('click',()=>{if(confirm('形と素材を初期状態に戻しますか？')){state.preset='bowl';state.material='red';state.height=50;state.width=50;state.contour=50;state.detail=50;renderPresets();renderMaterials();updateDetailControl();updatePreview();}});$$('.tab').forEach(t=>t.addEventListener('click',()=>{$$('.tab').forEach(x=>x.classList.toggle('active',x===t));$$('.tab-panel').forEach(p=>p.classList.toggle('active',p.id===`${t.dataset.tab}Panel`));}));[['heightRange','height'],['widthRange','width'],['contourRange','contour'],['detailRange','detail']].forEach(([id,key])=>$('#'+id).addEventListener('input',e=>{state[key]=Number(e.target.value);$('#'+key+'Value').value=state[key];updatePreview();}));$('#finishButton').addEventListener('click',finishMaking);$('#redoButton').addEventListener('click',beginCreation);$('#reflectionButton').addEventListener('click',()=>{renderReflection();showScreen('reflectionScreen')});$('#saveButton').addEventListener('click',saveSession);$('#libraryButton').addEventListener('click',()=>{renderLibrary();showScreen('libraryScreen')});$('#titleLibraryButton').addEventListener('click',()=>{renderLibrary();showScreen('libraryScreen')});$('#libraryStartButton').addEventListener('click',()=>{state.ideal=null;renderIdeals();showScreen('idealScreen')});$('#homeButton').addEventListener('click',()=>showScreen('titleScreen'));$$('[data-go]').forEach(b=>b.addEventListener('click',()=>showScreen(b.dataset.go)));
renderIdeals();renderPresets();renderMaterials();updateDetailControl();updatePreview();updateSavedCount();
