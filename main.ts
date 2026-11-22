import { readdirSync, readFileSync, mkdirSync, writeFileSync } from "node:fs";
const I=process.env.MAKEFUN_INPUT_DIR||"/input",O=process.env.MAKEFUN_OUTPUT_DIR||"/output";
const T=new Uint16Array(256),Z=[0,0,1,17,2,65,3,4,4,6,5,10,6,11,7,15,16,9,17,9,18,9,19,9,20,9,21,9,22,9,23,5,24,9,25,9,26,9,27,5,28,9,29,9,30,9,32,9,33,9,34,9,48,32,49,36,50,36,51,32,52,0,64,5,65,8,80,4,81,4,82,1,83,4];
for(let j=0;j<Z.length;j+=2)T[Z[j]]=((j/2+1)<<8)|(Z[j+1]+1);
const E=new TextEncoder();
function M(a,b){const x=a>>>0,y=b>>>0,u=x&65535,v=x>>>16,h=y&65535,g=y>>>16;return(u*h+(((v*h+u*g)&65535)<<16))|0}
function R(P,Q){const n=P.length,V=new DataView(P.buffer,P.byteOffset,n),W=new Int32Array(576),G=new Uint8Array(65536);let s=0,c=0,l=0,i=0,p=0,k=0;const d=(x)=>({stdout:G.subarray(0,l),exit:x});
for(;;){
if(k===1e6)return d(10);
if(p<0||p>=n)return d(9);
const h=T[V.getUint8(p)];if(!h)return d(5);
const id=h>>8,q=(h&255)-1,im=q>>4,po=q>>2&3,pu=q&3;
if(p+im>=n)return d(9);
k++;const t=p+1+im;
if(s<po)return d(2);
if(s-po+pu>256)return d(3);
p=t;
switch(id){
case 1:return d(0);
case 2:W[s++]=V.getInt8(t-1);break;
case 3:W[s++]=V.getInt32(t-4,!0);break;
case 4:s--;break;
case 5:W[s]=W[s-1];s++;break;
case 6:{const x=W[s-1];W[s-1]=W[s-2];W[s-2]=x;break}
case 7:W[s]=W[s-2];s++;break;
case 8:{const x=W[s-3];W[s-3]=W[s-2];W[s-2]=W[s-1];W[s-1]=x;break}
case 16:W[s-1]=-W[s-1]|0;break;
case 20:W[s-1]=~W[s-1];break;
case 9:case 10:case 11:case 12:case 13:case 14:case 15:case 17:case 18:case 19:case 21:case 22:case 23:case 24:case 25:case 26:{const b=W[s-1],a=W[s-2];let r;
if(id===9)r=a+b|0;else if(id===10)r=a-b|0;else if(id===11)r=M(a,b);
else if(id===12){if(!b)return d(4);r=a===-2147483648&&b===-1?a:a/b|0}
else if(id===13){if(!b)return d(4);r=b===-1?0:a%b|0}
else if(id===14){if(!b)return d(4);r=Math.floor((a>>>0)/(b>>>0))|0}
else if(id===15){if(!b)return d(4);r=(a>>>0)%(b>>>0)|0}
else if(id===17)r=a&b;else if(id===18)r=a|b;else if(id===19)r=a^b;
else if(id===21)r=a<<(b&31);else if(id===22)r=a>>(b&31);else if(id===23)r=a>>>(b&31)|0;
else if(id===24)r=a===b?1:0;else if(id===25)r=a<b?1:0;else r=(a>>>0)<(b>>>0)?1:0;
s--;W[s-1]=r;break}
case 27:case 28:case 29:{const r=V.getInt16(t-2,!0);let tk=id===27;if(!tk){const x=W[--s];tk=id===28?x===0:x!==0}if(tk)p=t+r;break}
case 30:if(c===64)return d(7);W[512+c++]=t;p=V.getUint16(t-2,!0);break;
case 31:if(!c)return d(8);p=W[512+--c];break;
case 32:{const x=W[s-1];if(x<0||x>255)return d(6);W[s-1]=W[256+x];break}
case 33:{const x=W[s-1];if(x<0||x>255)return d(6);W[256+x]=W[s-2];s-=2;break}
case 34:{const x=E.encode(String(W[s-1]));if(l+x.length>65536)return d(11);s--;G.set(x,l);l+=x.length;break}
case 35:if(l===65536)return d(11);G[l++]=W[--s]&255;break;
case 36:W[s++]=i<Q.length?Q[i++]:-1;break;
case 37:return d(W[--s]&255);
}}}
for(const id of readdirSync(I).sort()){const D=I+"/"+id,r=R(readFileSync(D+"/program.bin"),readFileSync(D+"/input.bin")),F=O+"/"+id;mkdirSync(F,{recursive:true});writeFileSync(F+"/stdout.bin",r.stdout);writeFileSync(F+"/exit.txt",String(r.exit))}
