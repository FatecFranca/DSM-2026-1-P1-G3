/* ------- ESTADO GLOBAL ------- */
const app = {
  cart:   JSON.parse(localStorage.getItem('ic-cart')  || '[]'),
  user:   JSON.parse(localStorage.getItem('ic-user')  || 'null'),
  pgAtual: 'home',
};


/* ------- NAVEGAÇÃO ENTRE PÁGINAS ------- */
function irPara(pg) {
  const nav = {
    'home':         'index.html',
    'acougue':      'acougue.html',
    'carrinho':     'carrinho.html',
    'login':        'login.html',
    'cadastro':     'cadastro.html',
    'levantamento': 'levantamento.html',
    'cad-produto':  'cadastro-produto.html',
    'pagamento':    'pagamento.html',
    'painel':       'pedidos-acougue.html',
    'avaliacao':    'avaliacao.html',
    'termos':       'termos.html',
  };
  if (nav[pg]) window.location.href = nav[pg];
}


/* ------- PRODUTOS ------- */
const produtosCad = [
  { id:'picanha',  nome:'Picanha Bovina',     cat:'bovinos',  peso:'1kg',   preco:89.90,  qtd:25, min:5,
    img:'https://images.unsplash.com/photo-1558030006-450675393462?w=300&q=80' },
  { id:'fraldinha',nome:'Fraldinha',          cat:'bovinos',  peso:'3kg',   preco:129.90, qtd:18, min:5,
    img:'https://images.unsplash.com/photo-1544025162-d76694265947?w=300&q=80' },
  { id:'alcatra',  nome:'Alcatra',            cat:'bovinos',  peso:'1kg',   preco:55.90,  qtd:3,  min:5,
    img:'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=300&q=80' },
  { id:'fmignon',  nome:'Filé Mignon',        cat:'bovinos',  peso:'1kg',   preco:99.80,  qtd:10, min:5,
    img:'https://images.unsplash.com/photo-1585627003263-27c6bb225f7f?w=300&q=80' },
  { id:'costela',  nome:'Costela Bovina',     cat:'costela',  peso:'1,2kg', preco:69.90,  qtd:0,  min:5,
    img:'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=300&q=80' },
  { id:'panceta',  nome:'Panceta',            cat:'suinos',   peso:'2kg',   preco:52.45,  qtd:14, min:5,
    img:'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=300&q=80' },
  { id:'coracao',  nome:'Coração de Galinha', cat:'aves',     peso:'1kg',   preco:27.80,  qtd:30, min:10,
    img:'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=300&q=80' },
  { id:'linguica', nome:'Linguiça Toscana',   cat:'linguicas',peso:'500g',  preco:19.90,  qtd:22, min:8,
    img:'https://images.unsplash.com/photo-1617196034183-421b4040ed20?w=300&q=80' },
];

function htmlCard(p) {
  return `<div class="card-produto" data-cat="${p.cat}">
    <div class="card-prod-foto">
      <img src="${p.img}" alt="${p.nome}" loading="lazy">
    </div>
    <div class="card-prod-body">
      <div class="card-prod-nome">${p.nome}</div>
      <div class="card-prod-peso">${p.peso}</div>
      <div class="card-prod-rodape">
        <span class="card-prod-preco">R$${p.preco.toFixed(2).replace('.',',')}</span>
        <button class="btn-add" onclick="adicionarCart({id:'${p.id}',nome:'${p.nome}',preco:${p.preco},peso:'${p.peso}',img:'${p.img}'})">+</button>
      </div>
    </div>
  </div>`;
}

function renderProdutos(cat) {
  const gr = document.getElementById('grade-produtos');
  if (!gr) return;
  const lista = cat && cat !== 'todos'
    ? produtosCad.filter(p => p.cat === cat)
    : produtosCad;
  gr.innerHTML = lista.map(htmlCard).join('');
}

function renderProdutosAcougue() {
  const gr = document.getElementById('grade-acougue-prods');
  if (!gr) return;
  gr.innerHTML = produtosCad.map(htmlCard).join('');
}

function selecionarCat(el, cat) {
  document.querySelectorAll('.cat-item').forEach(c => c.classList.remove('sel'));
  el.classList.add('sel');
  renderProdutos(cat);
}

/* ------- CARRINHO ------- */
function salvarCart()  { localStorage.setItem('ic-cart', JSON.stringify(app.cart)); }
function totalCart()   { return app.cart.reduce((s,i) => s + i.preco * i.qtd, 0); }
function countCart()   { return app.cart.reduce((s,i) => s + i.qtd, 0); }

function adicionarCart(p) {
  const ex = app.cart.find(i => i.id === p.id);
  if (ex) ex.qtd++;
  else app.cart.push({...p, qtd:1});
  salvarCart();
  atualizarCartUI();
  mostrarToast(`${p.nome} adicionado! 🥩`, 'ok');
  renderMiniCart();
}

function removerCart(id) {
  app.cart = app.cart.filter(i => i.id !== id);
  salvarCart(); atualizarCartUI(); renderCarrinho(); renderMiniCart();
}

function mudarQtd(id, delta) {
  const item = app.cart.find(i => i.id === id);
  if (!item) return;
  item.qtd += delta;
  if (item.qtd <= 0) removerCart(id);
  else { salvarCart(); atualizarCartUI(); renderCarrinho(); renderMiniCart(); }
}

function limparCart() {
  app.cart = []; salvarCart(); atualizarCartUI(); renderCarrinho(); renderMiniCart();
}

function atualizarCartUI() {
  const n = countCart();
  document.querySelectorAll('#num-cart').forEach(el => {
    el.textContent = n;
    el.style.display = n > 0 ? 'flex' : 'none';
  });
}

function renderCarrinho() {
  const tb = document.getElementById('tbody-cart');
  if (!tb) return;
  if (!app.cart.length) {
    tb.innerHTML = '<tr><td colspan="5" style="text-align:center;padding:36px;color:var(--cin2)">Carrinho vazio. <span style="color:var(--vm);font-weight:700;cursor:pointer" onclick="irPara(\'home\')">Ver produtos</span></td></tr>';
  } else {
    tb.innerHTML = app.cart.map(i => `<tr>
      <td><div class="prod-info-cel">
        <img src="${i.img}" class="prod-mini-foto" alt="${i.nome}">
        <div><div class="prod-cel-nome">${i.nome}</div><div class="prod-cel-peso">${i.peso}</div></div>
      </div></td>
      <td>R$${i.preco.toFixed(2).replace('.',',')}</td>
      <td><div class="ctrl-qtd">
        <button class="btn-qtd" onclick="mudarQtd('${i.id}',-1)">−</button>
        <span class="num-qtd">${i.qtd}</span>
        <button class="btn-qtd" onclick="mudarQtd('${i.id}',1)">+</button>
      </div></td>
      <td>R$${(i.preco*i.qtd).toFixed(2).replace('.',',')}</td>
      <td><button class="btn-remover" onclick="removerCart('${i.id}')">✕</button></td>
    </tr>`).join('');
  }
  const t = totalCart();
  const sub = document.getElementById('res-sub');
  const tot = document.getElementById('res-total');
  if (sub) sub.textContent = `R$${t.toFixed(2).replace('.',',')}`;
  if (tot) tot.textContent = `R$${t.toFixed(2).replace('.',',')}`;
}

function renderMiniCart() {
  const c = document.getElementById('mini-lista');
  const t = document.getElementById('mini-total');
  if (!c) return;
  if (!app.cart.length) {
    c.innerHTML = '<div style="text-align:center;padding:16px 0;color:var(--cin2)">Nenhum item</div>';
  } else {
    c.innerHTML = app.cart.map(i => `<div style="display:flex;gap:8px;margin-bottom:10px;padding-bottom:10px;border-bottom:1px solid var(--cin3)">
      <img src="${i.img}" style="width:44px;height:44px;border-radius:7px;object-fit:cover;flex-shrink:0">
      <div style="flex:1">
        <div style="font-weight:700;font-size:.78rem">${i.nome}</div>
        <div style="font-size:.74rem;color:var(--cin2);margin-top:2px">${i.qtd}x R$${i.preco.toFixed(2).replace('.',',')}</div>
      </div>
    </div>`).join('');
  }
  if (t) t.textContent = `R$${totalCart().toFixed(2).replace('.',',')}`;
}

function selPgto(el) {
  document.querySelectorAll('.icon-pgto').forEach(i => i.classList.remove('selecionado'));
  el.classList.add('selecionado');
}

/* ------- LEVANTAMENTO ------- */
function statusLev(p) {
  if (p.qtd === 0)      return {label:'Esgotado',    cor:'#e53935',bg:'#fff0f0',key:'zero'};
  if (p.qtd < p.min)    return {label:'Est. baixo',  cor:'#e67e22',bg:'#fff8ee',key:'baixo'};
  return                       {label:'Disponível',   cor:'#0a7a2e',bg:'#e6f9ed',key:'ok'};
}

function renderLev(lista) {
  const tb = document.getElementById('tbody-lev');
  if (!tb) return;
  if (!lista.length) {
    tb.innerHTML = '<tr><td colspan="7" style="text-align:center;padding:36px;color:var(--cin2)">Nenhum produto encontrado.</td></tr>';
    return;
  }
  tb.innerHTML = lista.map(p => {
    const s = statusLev(p);
    return `<tr>
      <td style="font-weight:700">${p.nome}</td>
      <td>${p.cat}</td>
      <td>${p.peso}</td>
      <td style="font-weight:800">R$${p.preco.toFixed(2).replace('.',',')}</td>
      <td><strong>${p.qtd}</strong> un.</td>
      <td><span class="badge-status" style="background:${s.bg};color:${s.cor}">${s.label}</span></td>
      <td style="text-align:center">
        <div style="display:flex;gap:5px;justify-content:center">
          <button onclick="irPara('cad-produto')" style="background:var(--am);color:var(--pre);padding:5px 10px;border:none;border-radius:5px;font-size:.73rem;font-weight:700;cursor:pointer">✏️</button>
          <button onclick="this.closest('tr').remove();mostrarToast('Produto removido.','ok')" style="background:var(--bg);color:var(--vm);border:1px solid var(--cin3);padding:5px 10px;border-radius:5px;font-size:.73rem;font-weight:700;cursor:pointer">🗑</button>
        </div>
      </td>
    </tr>`;
  }).join('');
}

function filtrarLev() {
  const busca = document.getElementById('busca-lev').value.toLowerCase();
  const cat   = document.getElementById('fil-cat-lev').value.toLowerCase();
  const est   = document.getElementById('fil-est-lev').value;
  const lista = produtosCad.filter(p => {
    return p.nome.toLowerCase().includes(busca)
      && (!cat || p.cat === cat)
      && (!est || statusLev(p).key === est);
  });
  renderLev(lista);
}

function exportarCSV() {
  const linhas = [['Produto','Categoria','Peso','Preco','Estoque','Status']];
  produtosCad.forEach(p => linhas.push([p.nome, p.cat, p.peso, p.preco.toFixed(2), p.qtd, statusLev(p).label]));
  const csv = linhas.map(r => r.join(',')).join('\n');
  const a = document.createElement('a');
  a.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv);
  a.download = 'levantamento-icougue.csv';
  a.click();
  mostrarToast('CSV exportado!','ok');
}

/* ------- CADASTRO PRODUTO ------- */
function verFoto(input) {
  if (input.files && input.files[0]) {
    const r = new FileReader();
    r.onload = e => {
      document.getElementById('img-prev').src = e.target.result;
      document.getElementById('prev-foto').style.display = 'block';
    };
    r.readAsDataURL(input.files[0]);
  }
}

function salvarProduto(e) {
  e.preventDefault();
  const nome = document.getElementById('p-nome').value.trim();
  if (!nome) { mostrarToast('Preencha o nome do produto.','erro'); return; }
  mostrarToast(`"${nome}" cadastrado com sucesso! 🥩`,'ok');
  setTimeout(() => irPara('levantamento'), 1500);
}

/* ------- PAGAMENTO ------- */
function trocarMetodo(btn) {
  document.querySelectorAll('.btn-metodo').forEach(b => b.classList.remove('ativo'));
  btn.classList.add('ativo');
  ['form-cartao','form-pix','form-boleto','form-dinheiro'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.display = el.id === btn.dataset.form ? '' : 'none';
  });
}

function usarCupom() {
  const v = document.getElementById('input-cupom').value.trim().toUpperCase();
  const msg = document.getElementById('msg-cupom');
  msg.style.display = 'block';
  if (v === 'PRIMEIRACOMPRA') {
    msg.innerHTML = '<span style="color:#0a7a2e;font-weight:700">✅ Cupom aplicado! Entrega grátis.</span>';
    document.getElementById('pgto-desc').textContent = '−R$15,00';
    document.getElementById('pgto-total').textContent = 'R$134,80';
  } else {
    msg.innerHTML = '<span style="color:var(--vm);font-weight:700">❌ Cupom inválido.</span>';
  }
}

function confirmarPedido() {
  mostrarToast('Pedido confirmado! Você receberá um e-mail. 🎉','ok');
  setTimeout(() => irPara('home'), 2000);
}

/* ------- PAINEL PEDIDOS ------- */
const pedidos = [
  { id:'#4521', cliente:'Maria Silva',    itens:'Picanha 1kg, Linguiça 500g', total:'R$109,80', hora:'14:32', status:'novo' },
  { id:'#4520', cliente:'João Pereira',   itens:'Fraldinha 3kg',              total:'R$129,90', hora:'14:18', status:'novo' },
  { id:'#4519', cliente:'Ana Costa',      itens:'Alcatra 1kg, Costela 1,2kg', total:'R$125,80', hora:'14:05', status:'novo' },
  { id:'#4518', cliente:'Carlos Souza',   itens:'Filé Mignon 1kg',            total:'R$99,80',  hora:'13:50', status:'preparo' },
  { id:'#4517', cliente:'Lucia Oliveira', itens:'Panceta 2kg, Coração 1kg',   total:'R$80,25',  hora:'13:35', status:'preparo' },
  { id:'#4516', cliente:'Paulo Martins',  itens:'Kit Churrasco Premium',      total:'R$245,00', hora:'13:10', status:'entrega' },
  { id:'#4515', cliente:'Sandra Lima',    itens:'Picanha 1kg',                total:'R$89,90',  hora:'12:45', status:'entregue' },
  { id:'#4514', cliente:'Roberto Dias',   itens:'Fraldinha 3kg, Alcatra 1kg', total:'R$185,80', hora:'11:20', status:'cancelado' },
];

const cfgStatus = {
  novo:      { label:'Novo',       cor:'#e67e22', bg:'#fff8ee', prox:'preparo',  prxLabel:'Aceitar e Preparar' },
  preparo:   { label:'Em preparo', cor:'#d35400', bg:'#fff0e6', prox:'entrega',  prxLabel:'Saiu para Entrega' },
  entrega:   { label:'Em entrega', cor:'#3498db', bg:'#e8f4fc', prox:'entregue', prxLabel:'Marcar como Entregue' },
  entregue:  { label:'Entregue',   cor:'#0a7a2e', bg:'#e6f9ed', prox:null,       prxLabel:null },
  cancelado: { label:'Cancelado',  cor:'#e53935', bg:'#fff0f0', prox:null,       prxLabel:null },
};

function renderPedidos(lista) {
  const cont = document.getElementById('lista-pedidos');
  if (!cont) return;
  if (!lista.length) {
    cont.innerHTML = '<div style="text-align:center;padding:36px;color:var(--cin2);background:var(--bco);border-radius:var(--r);box-shadow:var(--sombra)">Nenhum pedido nesta categoria.</div>';
    return;
  }
  cont.innerHTML = lista.map(p => {
    const s = cfgStatus[p.status];
    return `<div class="card-pedido" style="border-left:4px solid ${s.cor}">
      <div style="flex:0 0 72px">
        <div style="font-family:'Playfair Display',serif;font-size:1rem;font-weight:700">${p.id}</div>
        <div style="font-size:.7rem;color:var(--cin2);margin-top:2px">🕒 ${p.hora}</div>
      </div>
      <div style="flex:1;min-width:180px">
        <div style="font-weight:700;font-size:.9rem">${p.cliente}</div>
        <div style="font-size:.78rem;color:var(--cin2);margin-top:2px">${p.itens}</div>
      </div>
      <div style="font-family:'Playfair Display',serif;font-size:1.1rem;font-weight:700">${p.total}</div>
      <div>
        <span class="badge-status" style="background:${s.bg};color:${s.cor}">${s.label}</span>
      </div>
      <div style="display:flex;gap:6px;flex-wrap:wrap">
        ${s.prox ? `<button class="m-btn m-btn-vm" style="padding:7px 12px;font-size:.78rem;border-radius:7px" onclick="avancarPedido('${p.id}','${s.prox}')">${s.prxLabel}</button>` : ''}
        ${p.status==='novo' ? `<button onclick="cancelarPedido('${p.id}')" style="background:var(--bg);color:var(--vm);border:1px solid var(--cin3);padding:7px 12px;border-radius:7px;font-size:.78rem;font-weight:700;cursor:pointer">Cancelar</button>` : ''}
      </div>
    </div>`;
  }).join('');
}

function filtrarPedidos(btn) {
  document.querySelectorAll('.btn-filtro').forEach(b => b.classList.remove('ativo'));
  btn.classList.add('ativo');
  const st = btn.dataset.st;
  renderPedidos(st === 'todos' ? pedidos : pedidos.filter(p => p.status === st));
}

function avancarPedido(id, novoSt) {
  const p = pedidos.find(x => x.id === id);
  if (p) { p.status = novoSt; renderPedidos(pedidos); mostrarToast(`Pedido ${id} atualizado!`,'ok'); }
}

function cancelarPedido(id) {
  const p = pedidos.find(x => x.id === id);
  if (p) { p.status = 'cancelado'; renderPedidos(pedidos); mostrarToast(`Pedido ${id} cancelado.`,'erro'); }
}

/* ------- AVALIACAO ------- */
const lblNota = ['','😞 Péssimo','😕 Ruim','😐 Regular','😊 Bom','🤩 Excelente!'];

function clicarEstrela(campo, val) {
  document.getElementById('nota-' + campo).value = val;
  document.getElementById('est-' + campo).querySelectorAll('.est-grande').forEach((s,i) => {
    s.style.filter = i < val ? 'grayscale(0)' : 'grayscale(1)';
  });
  const lbl = document.getElementById('lbl-nota');
  if (lbl) lbl.textContent = lblNota[val] || '';
}

function clicarMini(campo, val) {
  document.getElementById('nota-' + campo).value = val;
  document.getElementById('est-' + campo).querySelectorAll('.est-mini').forEach((s,i) => {
    s.style.filter = i < val ? 'grayscale(0)' : 'grayscale(1)';
  });
}

function enviarAv(e) {
  e.preventDefault();
  const nota = parseInt(document.getElementById('nota-geral').value);
  if (!nota) { mostrarToast('Selecione uma nota geral.','erro'); return; }
  mostrarToast('Avaliação enviada! Obrigado 🙏','ok');
  setTimeout(() => irPara('home'), 1800);
}

/* ------- AUTH ------- */
function fazerLogin(e) {
  e.preventDefault();
  const email = document.getElementById('login-email').value.trim();
  const senha = document.getElementById('login-senha').value;
  if (!email || !senha) { mostrarToast('Preencha todos os campos.','erro'); return; }
  const u = JSON.parse(localStorage.getItem('ic-user') || 'null');
  if (u && u.email === email) {
    app.user = u;
    mostrarToast(`Bem-vindo(a), ${u.nome}! 🥩`,'ok');
    setTimeout(() => irPara('home'), 1400);
  } else {
    mostrarToast('E-mail ou senha incorretos.','erro');
  }
}

function fazerCadastro(e) {
  e.preventDefault();
  const nome    = document.getElementById('cad-nome').value.trim();
  const email   = document.getElementById('cad-email').value.trim();
  const senha   = document.getElementById('cad-senha').value;
  const confirma= document.getElementById('cad-confirma').value;
  const termos  = document.getElementById('cad-termos').checked;
  if (!nome || !email || !senha) { mostrarToast('Preencha todos os campos.','erro'); return; }
  if (senha !== confirma)         { mostrarToast('As senhas não coincidem.','erro'); return; }
  if (senha.length < 6)           { mostrarToast('Senha: mínimo 6 caracteres.','erro'); return; }
  if (!termos)                    { mostrarToast('Aceite os termos de uso.','erro'); return; }
  app.user = { nome, email };
  localStorage.setItem('ic-user', JSON.stringify(app.user));
  mostrarToast(`Conta criada! Bem-vindo(a), ${nome} 🎉`,'ok');
  setTimeout(() => irPara('home'), 1600);
}

/* ------- TOAST ------- */
function mostrarToast(msg, tipo) {
  const cont = document.getElementById('area-toast');
  const t = document.createElement('div');
  t.className = `m-toast ${tipo}`;
  t.innerHTML = `<span>${tipo==='ok'?'✅':'❌'}</span>${msg}`;
  cont.appendChild(t);
  requestAnimationFrame(() => requestAnimationFrame(() => t.classList.add('visivel')));
  setTimeout(() => {
    t.classList.remove('visivel');
    setTimeout(() => t.remove(), 350);
  }, 3000);
}