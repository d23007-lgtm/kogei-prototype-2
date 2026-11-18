/* 3D preview: lightweight Three.js lathe-based vessel; SVG remains fallback. */
(()=>{
 const host=document.getElementById('threeStage');
 if(!host||!window.THREE){console.warn('Three.js unavailable; using SVG fallback');return;}
 let renderer,scene,camera,group,mesh,material,base,latest,angle=.42,tilt=.22,drag=null,request=0;
 try{
 renderer=new THREE.WebGLRenderer({antialias:true,alpha:true,preserveDrawingBuffer:true});
 renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,2));
 renderer.setSize(460,300,false);
 renderer.outputColorSpace=THREE.SRGBColorSpace;
 host.appendChild(renderer.domElement);
 scene=new THREE.Scene();camera=new THREE.PerspectiveCamera(37,460/300,.1,100);camera.position.set(0,2.4,8.8);camera.lookAt(0,.8,0);
 scene.add(new THREE.HemisphereLight(0xffffff,0x80634d,2.15));
 const key=new THREE.DirectionalLight(0xffffff,2.5);key.position.set(-4,8,7);scene.add(key);
 const fill=new THREE.DirectionalLight(0xffffff,1.1);fill.position.set(5,3,-4);scene.add(fill);
 group=new THREE.Group();scene.add(group);
 const floor=new THREE.Mesh(new THREE.CircleGeometry(1.9,64),new THREE.MeshBasicMaterial({color:0x48372d,transparent:true,opacity:.07,depthWrite:false}));floor.rotation.x=-Math.PI/2;floor.position.y=-.02;scene.add(floor);
 }catch(e){console.warn('3D initialization failed',e);host.innerHTML='';return;}
 function dispose(){if(mesh){group.remove(mesh);mesh.geometry.dispose();mesh=null;}if(material){material.dispose();material=null;}}
 function geometry(s){
  const height=.95+(Number(s.height)-25)/60*1.35;
  const width=.75+(Number(s.width)-25)/60*.70;
  const contour=(Number(s.contour)-50)/50;
  const kind=s.preset;
  let h=height;if(kind==='tray'||kind==='shallow')h*=.40;
  const profiles=[];const n=32;
  for(let i=0;i<=n;i++){
   const t=i/n;let r;
   if(kind==='cylinder')r=width*(.86+contour*.15*(t-.5));
   else if(kind==='cube')r=width*(.85+contour*.12*(t-.5));
   else if(kind==='basket')r=width*(.69+.29*t+contour*.17*Math.sin(Math.PI*t));
   else if(kind==='tray')r=width*(.91+.06*t+contour*.08*Math.sin(Math.PI*t));
   else r=width*(.58+.42*Math.sin((.34+.66*t)*Math.PI/2)+contour*.30*Math.sin(Math.PI*t));
   profiles.push(new THREE.Vector2(Math.max(.16,r),.07+h*t));
  }
  // Outer wall, rolled rim, and inside wall to create a hollow vessel.
  const rim=profiles[n].x;
  profiles.push(new THREE.Vector2(rim+.025,.07+h));
  profiles.push(new THREE.Vector2(Math.max(.1,rim-.12),.07+h-.045));
  for(let i=n-1;i>=0;i--){const t=i/n;profiles.push(new THREE.Vector2(Math.max(.08,profiles[i].x-.12),Math.max(.07,.07+h*t)));}
  return new THREE.LatheGeometry(profiles,64);
 }
 function redraw(){group.rotation.y=angle;group.rotation.x=tilt;renderer.render(scene,camera);}
 function update(s,m){latest={...s};dispose();
  material=new THREE.MeshStandardMaterial({color:m.color,roughness:m.id.includes('lacquer')?.22:m.id==='glass'?.12:.82,metalness:m.id.includes('lacquer')?.06:0,side:THREE.DoubleSide});
  if(m.id==='glass'){material.transparent=true;material.opacity=.72;}
  mesh=new THREE.Mesh(geometry(s),material);group.add(mesh);redraw();
  const id=m.id;const token=++request;
  const exts=['jpg','jpeg','png','webp'];let i=0;
  const next=()=>{if(token!==request)return;if(i>=exts.length)return;
   const url=new URL('assets/materials/'+id+'.'+exts[i++],document.baseURI).href;
   const loader=new THREE.TextureLoader();loader.load(url,tex=>{if(token!==request){tex.dispose();return;}tex.colorSpace=THREE.SRGBColorSpace;tex.wrapS=tex.wrapT=THREE.RepeatWrapping;tex.repeat.set(2,1);material.map=tex;material.color.set('#ffffff');material.needsUpdate=true;redraw();},undefined,()=>next());
  };next();
 }
 const canvas=renderer.domElement;
 canvas.addEventListener('pointerdown',e=>{drag={x:e.clientX,y:e.clientY};canvas.setPointerCapture(e.pointerId)});
 canvas.addEventListener('pointermove',e=>{if(!drag)return;angle+=(e.clientX-drag.x)*.012;tilt=Math.max(-.6,Math.min(.6,tilt+(e.clientY-drag.y)*.008));drag={x:e.clientX,y:e.clientY};redraw()});
 canvas.addEventListener('pointerup',()=>drag=null);canvas.addEventListener('pointercancel',()=>drag=null);
 const ro=new ResizeObserver(()=>{const w=Math.max(200,host.clientWidth),h=Math.max(200,host.clientHeight);renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix();redraw()});ro.observe(host);
 function snapshotData(){redraw();try{return renderer.domElement.toDataURL('image/jpeg',.76)}catch(e){console.warn('3D snapshot failed',e);return null}}
 function snapshotImage(){const data=snapshotData();return data?`<img src="${data}" alt="制作した3D作品">`:''}
 window.Kogei3D={update,snapshotData,snapshotImage};
})();
