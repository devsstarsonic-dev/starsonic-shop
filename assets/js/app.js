// View + tab navigation for the single-page prototype. Relies on ARTISTS (data.js).

function openArtist(slug){
  const a = ARTISTS[slug];
  if(!a) return;
  document.getElementById('artist-avatar').className = 'w-28 h-28 rounded-full flex items-center justify-center flex-shrink-0 ' + a.avatar;
  document.getElementById('artist-initials').textContent = a.initials;
  document.getElementById('artist-name').textContent = a.name;
  document.getElementById('artist-meta').textContent = a.meta;
  document.getElementById('artist-bio').textContent = a.bio;
  document.getElementById('artist-songs-count').textContent = a.songs;
  document.getElementById('artist-sales-count').textContent = a.sales;
  document.getElementById('artist-rating').textContent = a.rating;

  const grid = document.getElementById('artist-songs-grid');
  grid.innerHTML = a.catalog.map(s => `
    <div class="music-card p-4">
      <div class="relative mb-3">
        <div class="w-full aspect-square rounded-lg ${s.avatar} flex items-center justify-center">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="#0a0a2e"><path d="M9 19V6l12-3v13"/></svg>
        </div>
        ${s.tag ? `<span class="badge-review text-[9px]" style="position:absolute;top:8px;left:8px;padding:2px 8px;">${s.tag}</span>` : ''}
      </div>
      <p class="text-white font-bold text-sm mb-1 truncate">${s.title}</p>
      <p class="text-slate-400 text-xs mb-3 truncate">${s.genre}</p>
      <div class="flex items-center justify-between">
        <span class="text-cyan-400 font-bold text-sm">${s.price}</span>
        <button class="btn-primary px-3 py-1.5 rounded-lg text-xs">Comprar</button>
      </div>
    </div>
  `).join('');

  showView('artist');
}

function showSubtab(tab){
  document.querySelectorAll('.subtab-content').forEach(x=>x.classList.add('hidden'));
  document.getElementById('subtab-'+tab).classList.remove('hidden');
  document.querySelectorAll('.subtab-btn').forEach(x=>x.classList.remove('active'));
  document.querySelectorAll('.subtab-btn[data-subtab="'+tab+'"]').forEach(x=>x.classList.add('active'));
}

function showView(v){
  document.querySelectorAll('.view').forEach(x=>x.classList.remove('active'));
  document.getElementById('view-'+v).classList.add('active');
  const logged = !['login','signup'].includes(v);
  document.getElementById('header-logged').style.display = logged ? 'block' : 'none';
  window.scrollTo({top:0, behavior:'smooth'});
}
function doLogin(){
  showView('account');
  showLogged('my-purchases');
}
function showLogged(tab){
  document.querySelectorAll('.tab-content').forEach(x=>x.classList.add('hidden'));
  document.getElementById('tab-'+tab).classList.remove('hidden');
  document.querySelectorAll('.tab-btn[data-tab]').forEach(x=>x.classList.remove('active'));
  document.querySelectorAll('.tab-btn[data-tab="'+tab+'"]').forEach(x=>x.classList.add('active'));
  const menu = document.getElementById('userMenu');
  if(menu) menu.classList.remove('open');
}
function toggleDropdown(){
  document.getElementById('userMenu').classList.toggle('open');
}
document.addEventListener('click', function(e){
  const menu = document.getElementById('userMenu');
  if(menu && !menu.contains(e.target)) menu.classList.remove('open');
});
