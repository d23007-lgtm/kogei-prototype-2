/* KOGEI 3D v4: hollow watertight lathe forms, open woven basket, responsive canvas. */
(()=>{'use strict';
 const host=document.getElementById('threeStage');if(!host||!window.THREE)return;
 const T=THREE;let renderer,scene,camera,group,object=null,angle=.32,tilt=.12,drag=null,latest=null,materialId='',texture=null,token=0;
 const cache=new Map();
 try{renderer=new T.WebGLRenderer({antialias:true,alpha:true,preserveDrawingBuffer:true});renderer.setPixelRatio(Math.min(devicePixelRatio||1,1.5));renderer.outputColorSpace=T.SRGBColorSpace;renderer.setSize(460,300,false);host.appendChild(renderer.domElement)}catch(e){console.warn('3D unavailable',e);return}
 scene=new T.Scene();camera=new T.PerspectiveCamera(35,460/300,.1,100);camera.position.set(0,2.7,8.7);camera.lookAt(0,.95,0);
 scene.add(new T.HemisphereLight(0xffffff,0x796e63,2.0));const sun=new T.DirectionalLight(0xffffff,2.8);sun.position.set(-3,7,6);scene.add(sun);const bounce=new T.DirectionalLight(0xffffff,1.1);bounce.position.set(5,3,-5);scene.add(bounce);
 group=new T.Group();scene.add(group);
 function dispose(g){g.traverse(o=>{if(o.geometry)o.geometry.dispose();if(o.material){for(const m of Array.isArray(o.material)?o.material:[o.material])m.dispose()}})}
 const v=(x,y)=>new T.Vector2(x,y), clamp=(x,a,b)=>Math.max(a,Math.min(b,x));
 function dimensions(s){let w=.73+Number(s.width)*.0065,h=.88+Number(s.height)*.0105;const kind=s.preset;
  if(kind==='shallow')h*=.43;if(kind==='tray')h*=.10+Number(s.detail)*.0020;if(kind==='basket')h*=.86;
  return {w,h,c:(Number(s.contour)-50)/50,d:Number(s.detail)/100,kind};}
 function radius(k,w,c,t,detailParam=.5){
  if(k==='bowl')return w*(.38+.62*Math.sin((.18+.82*t)*Math.PI/2)+.075*c*Math.sin(Math.PI*t));
  if(k==='spout')return w*(.48+.52*Math.pow(t,.83)+.11*c*Math.sin(Math.PI*t));
  if(k==='shallow')return w*(.36+.64*Math.pow(t,.68)+.12*c*Math.sin(Math.PI*t));
  if(k==='tray')return w*(.96+.04*t+.025*c*Math.sin(Math.PI*t));
  if(k==='basket')return w*(.69+.31*t+.10*c*Math.sin(Math.PI*t));
  if(k==='cylinder')return w*(.93+.07*t+.13*c*(t-.5)+.22*(detailParam-.5)*(t-.5));
  return w*(.78+.22*t+.12*c*Math.sin(Math.PI*t));
 }
 function lathe(d){const {w,h,c,d:detail,kind}=d;const N=48,outer=[],wall=kind==='shallow'?.052+.075*detail:kind==='tray'?.055:.065;
  const base=.11;for(let i=0;i<=N;i++){const t=i/N;outer.push(v(Math.max(.19,radius(kind,w,c,t,detail)),base+h*t));}
  // The profile starts on the axis at the underside, then runs up the outer wall,
  // around the rim, down the inside and back to the axis on the inner floor.
  const profile=[v(0,base),v(outer[0].x,base),...outer.slice(1)];
  const top=outer[N].x;profile.push(v(top+.006,base+h+.012),v(top-wall,base+h+.012));
  for(let i=N-1;i>=0;i--){const t=i/N;const innerY=base+Math.max(h*.095,h*t);profile.push(v(Math.max(.09,radius(kind,w,c,t,detail)-wall),innerY));}
  profile.push(v(0,base+Math.max(h*.095,.055)));
  return new T.LatheGeometry(profile,96);
 }
 function mat(m,wire=false){
  if(m.id==='glass')return new T.MeshPhysicalMaterial({color:'#c6e9e9',metalness:0,roughness:.075,transmission:.87,thickness:.32,ior:1.45,transparent:true,opacity:1,side:T.DoubleSide,depthWrite:false,clearcoat:.8});
  const has=!!texture;const wood=['beech','cedar','wipe-lacquer','bamboo'].includes(m.id);
  return new T.MeshStandardMaterial({color:has?'#ffffff':m.color,map:texture,roughness:m.id.includes('lacquer')?.26:wood?.62:.84,metalness:m.id.includes('lacquer')?.08:0,side:T.DoubleSide});
 }
 function tube(points,r,material,closed=false){return new T.Mesh(new T.TubeGeometry(new T.CatmullRomCurve3(points,closed,'centripetal'),Math.max(16,points.length*2),r,5,closed),material)}
 function ring(parent,r,y,thickness,material){const mesh=new T.Mesh(new T.TorusGeometry(r,thickness,7,100),material);mesh.rotation.x=Math.PI/2;mesh.position.y=y;parent.add(mesh)}
 function basket(root,d,m){const {w,h,c,d:detail}=d, base=.11;const material=mat(m),dark=new T.MeshStandardMaterial({color:m.dark,roughness:.85,side:T.DoubleSide});
  // Open basket: real spaces between the strips, not lines painted on a solid wall.
  const vertical=Math.round(10+detail*18),horizontal=Math.round(5+detail*11),strip=.013+detail*.003;
  for(let i=0;i<vertical;i++){const a=i*2*Math.PI/vertical,pts=[];for(let j=0;j<=20;j++){const t=j/20,r=radius('basket',w,c,t)+(Math.sin(t*horizontal*Math.PI*2+i)*.009);pts.push(new T.Vector3(r*Math.cos(a),base+h*t,r*Math.sin(a)));}root.add(tube(pts,strip,material));}
  for(let j=0;j<=horizontal;j++){const t=j/horizontal,pts=[];for(let k=0;k<=96;k++){const a=k*Math.PI*2/96,r=radius('basket',w,c,t)+Math.sin(a*vertical/2+j*Math.PI)*.008;pts.push(new T.Vector3(r*Math.cos(a),base+h*t,r*Math.sin(a)));}root.add(tube(pts,strip,material,true));}
  ring(root,radius('basket',w,c,1),base+h,.036,material);ring(root,radius('basket',w,c,0),base,.028,material);
  // woven bottom, not a solid disc
  const r=radius('basket',w,c,0)*.94;for(let i=-6;i<=6;i++){const x=i*r/7,z=Math.sqrt(Math.max(0,r*r-x*x));root.add(tube([new T.Vector3(x,base,-z),new T.Vector3(x,base,z)],strip,material));root.add(tube([new T.Vector3(-z,base+.008,x),new T.Vector3(z,base+.008,x)],strip,material));}
 }
 function roundedCube(root,d,m){const {w,h,d:detail}=d;const r=.025+detail*.19,side=w*1.54;
  // Rounded solid block, retaining a proper closed bottom and rounded edges.
  const shape=new T.Shape(),a=-side/2,b=-side/2;shape.moveTo(a+r,b);shape.lineTo(a+side-r,b);shape.quadraticCurveTo(a+side,b,a+side,b+r);shape.lineTo(a+side,b+side-r);shape.quadraticCurveTo(a+side,b+side,a+side-r,b+side);shape.lineTo(a+r,b+side);shape.quadraticCurveTo(a,b+side,a,b+side-r);shape.lineTo(a,b+r);shape.quadraticCurveTo(a,b,a+r,b);
  const geom=new T.ExtrudeGeometry(shape,{depth:Math.max(.12,h-.06),bevelEnabled:true,bevelThickness:r*.2,bevelSize:r*.22,bevelSegments:3,steps:1,curveSegments:8});geom.rotateX(-Math.PI/2);geom.translate(0,.12,0);root.add(new T.Mesh(geom,mat(m)));
 }
 function details(root,d,m){const {w,h,c,d:detail,kind}=d,base=.11;
  if(kind==='basket'){basket(root,d,m);return}
  if(kind==='cube'){roundedCube(root,d,m);return}
  root.add(new T.Mesh(lathe(d),mat(m)));
  if(kind==='bowl'){
   const foot=.07+detail*.22,rad=radius(kind,w,c,0)*.72;
   const footMat=mat(m);const cylinder=new T.Mesh(new T.CylinderGeometry(rad,rad*.9,foot,64,1,true),footMat);cylinder.position.y=base-foot/2;root.add(cylinder);ring(root,rad*.92,base-foot,.019,footMat);
  }
  if(kind==='spout'){
   // Lip integrated into the rim: a rising fan, rather than a detached cone.
   const reach=.12+detail*.38,rr=radius(kind,w,c,1),verts=[],indices=[];
   for(let j=0;j<=12;j++){const a=(-.29+j*.58/12),r=rr+reach*(1-Math.abs(a)/.29);verts.push(r*Math.cos(a),base+h+reach*.48*(1-Math.abs(a)/.29),r*Math.sin(a));verts.push((rr-.065)*Math.cos(a),base+h-.025,(rr-.065)*Math.sin(a));if(j<12){const i=j*2;indices.push(i,i+1,i+2,i+1,i+3,i+2)}}
   const geom=new T.BufferGeometry();geom.setAttribute('position',new T.Float32BufferAttribute(verts,3));geom.setIndex(indices);geom.computeVertexNormals();root.add(new T.Mesh(geom,mat(m)));
  }
  if(kind==='tray'){const rimMat=mat(m);ring(root,radius(kind,w,c,1)-.015,base+h,.014+detail*.04,rimMat)}
 }
 function redraw(){group.rotation.y=angle;group.rotation.x=tilt;renderer.render(scene,camera)}
 let queued=false;function scheduleRebuild(){if(queued)return;queued=true;requestAnimationFrame(()=>{queued=false;rebuild()})}
 function rebuild(){if(!latest)return;if(object){group.remove(object);dispose(object)}object=new T.Group();details(object,dimensions(latest.s),latest.m);group.add(object);redraw()}
 function update(s,m){latest={s:{...s},m:{...m}};if(materialId!==m.id){materialId=m.id;texture=cache.get(m.id)||null;const request=++token;if(!texture){let i=0;const extensions=['jpg','jpeg','png','webp'];const load=()=>{if(request!==token)return;if(i>=extensions.length){console.warn('素材画像がありません:',m.id);return;}const url=new URL(`assets/materials/${m.id}.${extensions[i++]}`,document.baseURI).href;new T.TextureLoader().load(url,t=>{if(request!==token){t.dispose();return}t.colorSpace=T.SRGBColorSpace;t.wrapS=t.wrapT=T.RepeatWrapping;t.repeat.set(1.5,1);t.anisotropy=Math.min(renderer.capabilities.getMaxAnisotropy(),4);cache.set(m.id,t);texture=t;scheduleRebuild()},undefined,load)};load()}}scheduleRebuild()}
 const canvas=renderer.domElement;canvas.addEventListener('pointerdown',e=>{drag={x:e.clientX,y:e.clientY};canvas.setPointerCapture(e.pointerId)});canvas.addEventListener('pointermove',e=>{if(!drag)return;angle+=(e.clientX-drag.x)*.012;tilt=clamp(tilt+(e.clientY-drag.y)*.008,-.45,.52);drag={x:e.clientX,y:e.clientY};redraw()});canvas.addEventListener('pointerup',()=>drag=null);canvas.addEventListener('pointercancel',()=>drag=null);
 if(typeof ResizeObserver!=='undefined'){new ResizeObserver(()=>{const w=Math.max(180,host.clientWidth),h=Math.max(180,host.clientHeight);renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix();redraw()}).observe(host)}
 function snapshotData(){redraw();try{
  const out=document.createElement('canvas');out.width=420;out.height=320;
  const ctx=out.getContext('2d',{alpha:true});ctx.clearRect(0,0,420,320);
  ctx.drawImage(canvas,0,0,420,320);return out.toDataURL('image/png');
 }catch(e){console.warn('snapshot',e);return null}}
 window.Kogei3D={update,snapshotData,snapshotImage:()=>{const x=snapshotData();return x?`<img src="${x}" alt="制作した作品">`:''}};
})();
