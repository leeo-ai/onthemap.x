
const body = document.body;
const page = body.dataset.page;
document.querySelectorAll('[data-nav]').forEach(a => { if (a.dataset.nav === page) a.classList.add('active'); });

const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
if(menuToggle){ menuToggle.addEventListener('click',()=>nav.classList.toggle('open')); }

const observer = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{ if(entry.isIntersecting){ entry.target.classList.add('visible'); observer.unobserve(entry.target); } });
},{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

const routeData = {
  quiet:{img:'assets/editorial-books.webp',title:'Quiet Treasure',copy:'작지만 오래 남는 취향. 차분한 비즈와 은색 포인트로 일상에 조용한 표시를 남깁니다.'},
  bold:{img:'assets/denim-layer.webp',title:'Bold Route',copy:'색과 레이어를 두려워하지 않는 선택. 한 번에 시선을 붙잡는 나만의 경로입니다.'},
  gift:{img:'assets/route-red.webp',title:'A Mark for Someone',copy:'소중한 사람에게 건네는 작은 목적지. 마음이 머무는 곳을 X로 표시합니다.'}
};
document.querySelectorAll('.route-option').forEach(btn=>{
  btn.addEventListener('click',()=>{
    document.querySelectorAll('.route-option').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    const d=routeData[btn.dataset.route];
    const img=document.querySelector('#route-result-img');
    const title=document.querySelector('#route-result-title');
    const copy=document.querySelector('#route-result-copy');
    if(img){img.style.opacity='.15';setTimeout(()=>{img.src=d.img;img.style.opacity='.8'},180)}
    if(title) title.textContent=d.title;
    if(copy) copy.textContent=d.copy;
  });
});

document.querySelectorAll('.filter-btn').forEach(btn=>{
  btn.addEventListener('click',()=>{
    document.querySelectorAll('.filter-btn').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    const filter=btn.dataset.filter;
    document.querySelectorAll('.collection-item').forEach(item=>{
      item.classList.toggle('hidden', filter!=='all' && item.dataset.category!==filter);
    });
  });
});

const lightbox=document.querySelector('.lightbox');
const lightboxImg=document.querySelector('.lightbox img');
document.querySelectorAll('.open-lightbox').forEach(btn=>{
  btn.addEventListener('click',()=>{ if(lightbox&&lightboxImg){lightboxImg.src=btn.dataset.src;lightbox.classList.add('open');body.style.overflow='hidden';} });
});
function closeLightbox(){if(lightbox){lightbox.classList.remove('open');body.style.overflow='';}}
document.querySelector('.lightbox-close')?.addEventListener('click',closeLightbox);
lightbox?.addEventListener('click',e=>{if(e.target===lightbox) closeLightbox();});
document.addEventListener('keydown',e=>{if(e.key==='Escape') closeLightbox();});
