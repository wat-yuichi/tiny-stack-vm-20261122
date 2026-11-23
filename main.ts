import{readFileSync as R,readdirSync as L,mkdirSync as K,writeFileSync as W}from'node:fs';
import{join as J}from'node:path';
const I=process.env.MAKEFUN_INPUT_DIR??'/input',O=process.env.MAKEFUN_OUTPUT_DIR??'/output',E=new TextEncoder;
function run(p:Uint8Array,q:Uint8Array){
 let d=new Int32Array(256),c=new Uint16Array(64),m=new Int32Array(256),z=new Uint8Array(65536),s=0,cs=0,pc=0,ip=0,n=0,l=0,x=0;
 const end=(e:number)=>[z.subarray(0,l),e]as const;
 for(;;){
  if(n++==1e6)return end(10);if(pc<0||pc>=p.length)return end(9);let o=p[pc++],a=0,b=0,r=0;
  let im=o==1?1:o==2?4:o>=48&&o<=51?2:0;
  if(!([0,1,2,3,4,5,6,7,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,32,33,34,48,49,50,51,52,64,65,80,81,82,83].includes(o)))return end(5);
  if(pc+im>p.length)return end(9);
  let pop=o==3||o==4||o==23||o==27||o==49||o==50||o==64||o==80||o==81||o==83?1:o==5||o==6||o==65||(o>=16&&o<=34&&o!=23&&o!=27)?2:o==7?3:0;
  let push=o==1||o==2||o==4||o==82?1:o==6?1:0;if(o==4)push=2;if(o==6)push=3;if(o==7)push=3;if(o>=16&&o<=34)push=1;
  if(s<pop)return end(2);if(s-pop+push>256)return end(3);
  if(o==0)return end(0);
  if(o==1){d[s++]=p[pc++]<<24>>24;continue}
  if(o==2){d[s++]=p[pc]|p[pc+1]<<8|p[pc+2]<<16|p[pc+3]<<24;pc+=4;continue}
  if(o==3){s--;continue}if(o==4){d[s]=d[s-1];s++;continue}
  if(o==5){x=d[s-1];d[s-1]=d[s-2];d[s-2]=x;continue}
  if(o==6){d[s]=d[s-2];s++;continue}
  if(o==7){x=d[s-3];d[s-3]=d[s-2];d[s-2]=d[s-1];d[s-1]=x;continue}
  if(o==23){d[s-1]=-d[s-1]|0;continue}if(o==27){d[s-1]=~d[s-1];continue}
  if(o>=16&&o<=34){b=d[--s];a=d[s-1];if(o>=19&&o<=22&&b==0)return end(4);
   if(o==16)r=a+b;else if(o==17)r=a-b;else if(o==18)r=Math.imul(a,b);else if(o==19)r=a==-2147483648&&b==-1?a:a/b;else if(o==20)r=b==-1?0:a%b;else if(o==21)r=Math.floor((a>>>0)/(b>>>0));else if(o==22)r=(a>>>0)%(b>>>0);else if(o==24)r=a&b;else if(o==25)r=a|b;else if(o==26)r=a^b;else if(o==28)r=a<<b;else if(o==29)r=a>>b;else if(o==30)r=a>>>b;else if(o==32)r=+(a==b);else if(o==33)r=+(a<b);else r=+((a>>>0)<(b>>>0));d[s-1]=r|0;continue}
  if(o>=48&&o<=50){x=p[pc]|p[pc+1]<<8;pc+=2;x=x<<16>>16;if(o>48){a=d[--s];if((o==49)==(a!=0))continue}pc+=x;continue}
  if(o==51){if(cs==64)return end(7);c[cs++]=pc+2;pc=p[pc]|p[pc+1]<<8;continue}
  if(o==52){if(!cs)return end(8);pc=c[--cs];continue}
  if(o==64){a=d[s-1];if(a<0||a>255)return end(6);d[s-1]=m[a];continue}
  if(o==65){a=d[s-1];if(a<0||a>255)return end(6);m[a]=d[s-2];s-=2;continue}
  if(o==82){d[s++]=ip<q.length?q[ip++]:-1;continue}
  if(o==83)return end(d[--s]&255);
  if(o==81){if(l==65536)return end(11);z[l++]=d[--s];continue}
  let t=E.encode(String(d[s-1]));if(l+t.length>65536)return end(11);s--;z.set(t,l);l+=t.length
 }
}
for(const id of L(I).sort()){let h=J(I,id),[a,b]=run(new Uint8Array(R(J(h,'program.bin'))),new Uint8Array(R(J(h,'input.bin')))),o=J(O,id);K(o,{recursive:true});W(J(o,'stdout.bin'),a);W(J(o,'exit.txt'),b+'\n')}
