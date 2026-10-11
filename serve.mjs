import {createServer} from 'node:http';
import {createReadStream} from 'node:fs';
import {stat} from 'node:fs/promises';
import {dirname,resolve,extname,sep} from 'node:path';
import {fileURLToPath} from 'node:url';
const root=dirname(fileURLToPath(import.meta.url));
const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8',
  '.js':'text/javascript; charset=utf-8','.png':'image/png','.webp':'image/webp',
  '.jpg':'image/jpeg','.mp4':'video/mp4','.svg':'image/svg+xml',
  '.md':'text/plain; charset=utf-8'};
createServer(async(req,res)=>{
  try{
    const path=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
    let target=resolve(root,'.'+path);
    if(target!==root&&!target.startsWith(root+sep)){
      res.writeHead(403);return res.end();
    }
    if((await stat(target)).isDirectory())target=resolve(target,'index.html');
    const {size}=await stat(target);
    const headers={'Content-Type':types[extname(target)]||'application/octet-stream',
      'Cache-Control':'no-cache','Accept-Ranges':'bytes'};
    let start=0,end=size-1,status=200;
    if(req.headers.range){
      const match=/^bytes=(\d*)-(\d*)$/.exec(req.headers.range);
      if(!match||(!match[1]&&!match[2])){
        res.writeHead(416,{'Content-Range':`bytes */${size}`});return res.end();
      }
      start=match[1]?Number(match[1]):Math.max(0,size-Number(match[2]));
      end=match[1]&&match[2]?Math.min(Number(match[2]),size-1):size-1;
      if(start>=size||start>end){
        res.writeHead(416,{'Content-Range':`bytes */${size}`});return res.end();
      }
      status=206;headers['Content-Range']=`bytes ${start}-${end}/${size}`;
    }
    headers['Content-Length']=Math.max(0,end-start+1);
    res.writeHead(status,headers);
    if(req.method==='HEAD'||size===0)return res.end();
    const stream=createReadStream(target,{start,end});
    stream.on('error',()=>res.destroy());
    res.on('close',()=>stream.destroy());
    stream.pipe(res);
  }catch{res.writeHead(404);res.end('Not found');}
}).listen(4173,'127.0.0.1',()=>console.log('Preview: http://127.0.0.1:4173'));
