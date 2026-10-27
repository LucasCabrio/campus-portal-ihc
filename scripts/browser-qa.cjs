// npm install --no-save playwright; npx playwright install chromium
// Execute com o servidor local ativo: node scripts/browser-qa.cjs
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');
(async () => {
 const browser = await chromium.launch({ headless: true, ...(process.env.BROWSER_CHANNEL ? {channel: process.env.BROWSER_CHANNEL} : {}) });
 const context = await browser.newContext({ viewport: {width:1440,height:1100}, locale:'pt-BR', timezoneId:'America/Sao_Paulo' });
 const page = await context.newPage(); const errors = []; const checks = [];
 page.on('pageerror', error => errors.push(error.message));
 fs.mkdirSync('docs/screenshots', {recursive:true});
 const base = process.env.BASE_URL || 'http://localhost:4173';
 await page.goto(base); await page.getByRole('heading', {name:'Olá, Lucas'}).waitFor();
 assert.equal(await page.locator('.brand').evaluate(e=>getComputedStyle(e).outlineStyle),'none');
 await page.screenshot({path:'docs/screenshots/01-painel.png',fullPage:true});
 await page.getByRole('link', {name:'Solicitar documento'}).click();
 await page.locator('select[name=type]').selectOption('Declaração de matrícula');
 await page.locator('input[name=reason]').fill('Comprovação de vínculo para estágio');
 await page.getByRole('button', {name:'Solicitar documento'}).click();
 await page.getByText('Protocolo DOC-', {exact:false}).waitFor();
 assert.equal(await page.locator('[data-download]').count(),1);
 const downloadPromise = page.waitForEvent('download'); await page.locator('[data-download]').click();
 const download = await downloadPromise; assert.match(download.suggestedFilename(), /^DOC-.*\.txt$/);
 checks.push('Emissão de documento, protocolo e download');
 await page.screenshot({path:'docs/screenshots/02-documentos.png',fullPage:true});
 await page.reload(); assert.equal(await page.locator('[data-download]').count(),1); checks.push('Persistência após recarregamento');
 await page.getByRole('link',{name:'Laboratórios',exact:true}).click();
 const future = new Date(); future.setDate(future.getDate()+2); const date = `${future.getFullYear()}-${String(future.getMonth()+1).padStart(2,'0')}-${String(future.getDate()).padStart(2,'0')}`;
 async function fillReservation() { await page.locator('[name=room]').selectOption('Laboratório de Redes'); await page.locator('[name=date]').fill(date); await page.locator('[name=time]').selectOption('14:00'); await page.locator('[name=reason]').fill('Reunião do projeto final de IHC'); }
 await fillReservation(); await page.getByRole('button',{name:'Confirmar reserva'}).click(); await page.getByText('Confirmada',{exact:true}).waitFor();
 await page.screenshot({path:'docs/screenshots/03-laboratorios.png',fullPage:true});
 await fillReservation(); await page.getByRole('button',{name:'Confirmar reserva'}).click(); assert.match(await page.locator('#form-error').textContent(), /já está reservado/); checks.push('Reserva válida e bloqueio de conflito');
 await page.getByRole('link',{name:'Minha agenda',exact:true}).click(); assert.equal(await page.getByText('Reunião do projeto final de IHC',{exact:false}).count(),1); checks.push('Reserva integrada à agenda');
 await page.getByRole('link',{name:'Laboratórios',exact:true}).click(); await page.locator('[data-cancel]').click(); await page.getByRole('button',{name:'Voltar',exact:true}).click(); assert.equal(await page.getByText('Confirmada',{exact:true}).count(),1);
 await page.locator('[data-cancel]').click(); await page.locator('#confirm').click(); assert.equal(await page.getByText('Cancelada',{exact:true}).count(),1); checks.push('Confirmação de cancelamento e opção Voltar');
 await fillReservation(); await page.getByRole('button',{name:'Confirmar reserva'}).click(); assert.equal(await page.getByText('Confirmada',{exact:true}).count(),1); checks.push('Horário liberado após cancelamento');
 await page.getByRole('link',{name:'Notas e frequência',exact:true}).click(); assert.equal(await page.locator('tbody tr').count(),5);
 await page.screenshot({path:'docs/screenshots/04-notas.png',fullPage:true}); checks.push('Consulta de cinco disciplinas');
 await page.locator('#search').fill('ajuda'); await page.locator('#search-form').evaluate(f=>f.requestSubmit()); await page.getByRole('heading',{name:'Central de ajuda'}).waitFor(); checks.push('Busca por serviços');
 await page.getByRole('link',{name:'Preferências de acessibilidade'}).click(); await page.locator('#contrast').check(); await page.locator('#large').check(); await page.reload(); assert.equal(await page.locator('body.contrast.large').count(),1); checks.push('Preferências de acessibilidade persistentes');
 await page.locator('#contrast').uncheck(); await page.locator('#large').uncheck();
 await page.goto(base); await page.keyboard.press('Tab'); assert.equal(await page.locator('.skip').evaluate(e=>e===document.activeElement),true); checks.push('Link de pular conteúdo por teclado');
 await page.locator('main').focus(); await page.setViewportSize({width:390,height:844}); await page.screenshot({path:'docs/screenshots/05-mobile.png',fullPage:true});
 for (const route of ['inicio','documentos','laboratorios','notas','agenda','ajuda','acessibilidade']) { await page.goto(`${base}/#${route}`); await page.locator('main h1').waitFor(); assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth+1),`Overflow em ${route}`); }
 checks.push('Sete telas em viewport móvel, sem overflow da página');
 await page.goto(`${base}/#laboratorios`); await page.locator('[name=room]').selectOption('Sala de Estudos'); await page.locator('[name=date]').fill(date); await page.locator('[name=time]').selectOption('16:00'); await page.locator('[name=reason]').fill('<img src=x onerror=alert(1)>'); await page.getByRole('button',{name:'Confirmar reserva'}).click(); assert.equal(await page.locator('main img').count(),0); checks.push('Texto fornecido pelo usuário escapado');
 assert.deepEqual(errors,[]); checks.push('Nenhum erro JavaScript durante os cenários');
 fs.writeFileSync('docs/test-results.json',JSON.stringify({executedAt:new Date().toISOString(),browser:'Chromium / headless',unitTests:7,checks},null,2));
 console.log(JSON.stringify({passed:checks.length, checks},null,2)); await browser.close();
})().catch(error=>{console.error(error);process.exit(1)});
