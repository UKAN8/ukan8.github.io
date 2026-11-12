/* 예비고1 정규 시즌 일정 데이터 — 커리큘럼·데스크 페이지 공용. 날짜를 바꿀 땐 여기만 고친다. */
window.CUR = (function(){
  const WEEKS = [ // [주차, 월요일, 단원, 메모]
    [1,'2026-11-30','다항식의 연산','개강'],
    [2,'2026-12-07','항등식과 나머지정리',''],
    [3,'2026-12-14','인수분해',''],
    [4,'2026-12-21','복소수',''],
    [5,'2026-12-28','이차방정식',''],
    [6,'2027-01-04','이차방정식과 이차함수','자체 중간고사 (1~6단원)'],
    [7,'2027-01-11','여러 가지 방정식',''],
    [8,'2027-01-18','일차부등식',''],
    [9,'2027-01-25','이차부등식',''],
    [10,'2027-02-01','경우의 수',''],
    [11,'2027-02-08','순열과 조합',''],
    [12,'2027-02-15','행렬','자체 기말고사 (7~12단원)'],
    [13,'2027-02-22','진도 보강','휴강으로 빠진 회차 · 남은 진도'],
  ];
  const HOL = {'2026-12-25':'성탄절','2027-01-01':'신정','2027-02-06':'설 연휴','2027-02-08':'설날 연휴','2027-02-09':'설 대체공휴일'};
  const CLASSES = [ // getDay: 0일 1월 … 6토
    {id:'A', name:'예비고1 A', level:'심화', teacher:'유강', slots:{2:'18–20',4:'18–20',6:'12–14'}},
    {id:'K', name:'예비고1 K', level:'기본', teacher:'규진', slots:{1:'20–22',3:'20–22',5:'20–22'}},
    {id:'M', name:'예비고1 M', level:'기본', teacher:'다부', slots:{2:'20–22',4:'20–22',6:'12–14'}},
  ];
  const START='2026-12-01', END='2027-02-27';
  const DOW='일월화수목금토';
  const iso=d=>d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');
  const parse=s=>{const [y,m,d]=s.split('-').map(Number);return new Date(y,m-1,d);};
  const label=d=>(d.getMonth()+1)+'/'+d.getDate()+'('+DOW[d.getDay()]+')';
  function weekOf(d){let w=null;for(const x of WEEKS){if(parse(x[1])<=d)w=x;}return w;}
  function days(){const out=[];for(let d=parse(START);d<=parse(END);d.setDate(d.getDate()+1))out.push(new Date(d));return out;}
  function sessions(cls){
    let n=0;const out=[];
    for(const d of days()){
      const t=cls.slots[d.getDay()]; if(!t) continue;
      const k=iso(d), w=weekOf(d), hol=HOL[k];
      if(hol){out.push({date:d,iso:k,label:label(d),time:t,week:w[0],unit:w[2],memo:w[3],off:hol});continue;}
      n++; out.push({date:d,iso:k,label:label(d),time:t,week:w[0],unit:w[2],memo:w[3],no:n});
    }
    return out;
  }
  return {WEEKS,HOL,CLASSES,START,END,iso,parse,label,weekOf,days,sessions};
})();
