/* ============================================================
   PERSONALITZACIONS DE MIREIA DURAN — personal.js
   ------------------------------------------------------------
   A l'app MARE aquest fitxer és BUIT a posta. A l'app de cada
   mestra hi va tot el que és seu i només seu.

   Es carrega l'ÚLTIM de tots, quan la resta de l'app ja hi és,
   i `sync-filla.js` no el trepitja mai: així una mestra es pot
   personalitzar tant com calgui sense que cap fitxer del base
   divergeixi, i continua rebent tots els arranjaments.

   ⚠ La regla que ho fa sostenible: **el que sigui per a ella, aquí.**
   Si es toca `app.js`, `perfil.js` o `notes.js` dins de la seva
   carpeta, aquell fitxer deixa de rebre arranjaments per sempre.

   ------------------------------------------------------------
   COM S'HI FAN LES COSES

   Embolcallar una funció que ja existeix, sense modificar-la:

     var orig = window.perfilSave;
     window.perfilSave = function () {
       var r = orig.apply(this, arguments);
       ferLaMevaCosa();
       return r;
     };

   Canviar una pantalla sencera: redefinir la funció que la pinta.
   Afegir una eina nova: escriure-la aquí i penjar-la del menú.

   Si el que necessita una mestra el necessitaran també les altres,
   val més fer-ho **opció al base per a tothom** que repetir-ho a
   cada app (com ja es va fer amb els objectius, l'estil dels
   comentaris, els aspectes d'actitud i els enllaços).

   Veure FILLES.md.
   ============================================================ */

/* ============================================================
   LA CARPETA VIATGERA, OFERTA NOMÉS AQUÍ
   ------------------------------------------------------------
   En Pol, 7/10/2026: «posa-li com a actualització disponible només
   a la Mireia».

   Per què és aquí i no a `js/millores.js` de la mare: el catàleg
   només sap filtrar per ROL (`tutor`, `especialista`, `direccio`),
   i ella és tutora com tres més. Posant-la a la mare s'oferiria a
   tothom. Aquest fitxer, en canvi, és només d'aquesta app i la
   sincronització no el trepitja mai.

   Si algun dia s'ha d'oferir a més gent, es treu d'aquí i es posa
   a `js/millores.js` amb `interruptor: 'EINES_CARPETA'` i el `rols`
   que toqui. La recepta és a MILLORES.md, a `carpeta-viatgera`.

   ⚠ Això NOMÉS l'hi OFEREIX. Encara no la té: quan cliqui «Jo la
   vull!», arriba el correu i llavors se li posa
   `window.EINES_CARPETA = true` aquí mateix.
   ============================================================ */
if (typeof MILLORES !== 'undefined' && Array.isArray(MILLORES) &&
    !MILLORES.some(function (m) { return m.id === 'carpeta-viatgera'; })) {
  MILLORES.push({
    id: 'carpeta-viatgera',
    titol: 'La Carpeta Viatgera, dins de la nota',
    ras: 'Poses la nota de la Carpeta Viatgera un sol cop i surt sola, amb el seu pes, a Matemàtiques i Català.',
    mes: [
      'Tens una pestanya de notes que es diu «Carpeta Viatgera» i hi avalues com a qualsevol altra assignatura: les activitats que vulguis, amb el seu pes.',
      'La nota que en surt es copia sola a una columna de Matemàtiques i de Català, al final de la graella i just abans de la Mitjana. Allà no s\'hi pot escriure: només mirar.',
      'Compta per a la nota final amb pes 2. Si canvies una activitat de la Carpeta, les dues columnes es tornen a posar al dia.',
    ],
    data: '2026-10-07',
    /* Així, quan ja la tingui encesa, el catàleg li dirà «Ja la tens»
       en lloc de tornar-li a oferir el botó. */
    interruptor: 'EINES_CARPETA',
  });
}

/* ============================================================
   L'AVÍS DE L'INICI
   ------------------------------------------------------------
   La targeta vermella de sobre «Possibles actualitzacions». El
   text viu a l'index.html; aquí només hi diu QUIN avís toca.

   Aquesta app el té perquè ha fet servir l'assistent i se li ha de
   dir que ja no hi és. Una app nova no neix amb aquesta línia: no
   té sentit donar l'adéu a una eina que no ha tingut mai.

   Quan la mestra el marqui com a llegit, no li tornarà a sortir
   (es desa al seu perfil i per tant també al mòbil). Aquesta línia
   es pot treure d'aquí quan ja faci temps que el va llegir.
   ============================================================ */
window.AVIS_INICI = 'assoliments-automatics';


/* ============================================================
   ⚠ TEMPORAL (22/11/2026): EL PERFIL QUE HA QUEDAT BUIT AL FULL
   ------------------------------------------------------------
   Obrint l'app per primer cop al MacBook, el perfil del full ha
   quedat buit: l'avís de l'inici es va marcar com a llegit abans
   que hagués arribat el perfil, i l'app el va desar tal com el
   tenia en aquell moment (buit). L'arranjament de debò és a l'app
   per a tothom (v380); això d'aquí és la xarxa per als aparells
   que encara corrin la versió d'abans, perquè aquest fitxer el
   navegador el va a buscar sempre a la xarxa.

   Si del full arriba un perfil buit i aquest aparell en té un de
   bo DE LA MIREIA (amb el seu nom), es queda el bo, se'n guarda
   una còpia i es torna a desar al full. Es comprova el nom perquè
   totes les apps viuen a la mateixa adreça i comparteixen el que
   guarden al navegador: no s'ha de pujar mai el perfil d'una altra.

   Es pot treure quan el perfil ja torni a ser bo al full.
   ============================================================ */
(function () {
  if (typeof _perfilArribaDelFull === 'function') return;   // l'app ja ho sap fer sola
  var orig = window.appsScriptGet;
  if (typeof orig !== 'function') return;
  function teAlgo(o) {
    return !!(o && typeof o === 'object' && Object.keys(o).some(function (k) { return Array.isArray(o[k]) && o[k].length; }));
  }
  function buit(p) {
    if (!p || typeof p !== 'object') return true;
    if (String(p.nom || '').trim() || String(p.cognom || '').trim()) return false;
    if (p.tutorCurs || p.tutorLinia) return false;
    if (teAlgo(p.classes) || teAlgo(p.altres)) return false;
    return !(Array.isArray(p.cursos) && p.cursos.length);
  }
  function esDeLaMireia(p) { return !!(p && !buit(p) && /mireia/i.test(String(p.nom || ''))); }
  var curat = false;
  window.appsScriptGet = async function (params) {
    var r = await orig.apply(this, arguments);
    try {
      var a = params && params.action;
      if ((a === 'bootstrap' || a === 'loadProfile') && r && r.ok && buit(r.profile)) {
        var local = null;
        try { local = JSON.parse(localStorage.getItem('vedruna_perfil') || 'null'); } catch (e) {}
        if (!esDeLaMireia(local) && typeof _perfil !== 'undefined' && esDeLaMireia(_perfil)) local = _perfil;
        if (esDeLaMireia(local)) {
          try { localStorage.setItem('vedruna_perfil_copia', JSON.stringify(local)); } catch (e) {}
          var bo = JSON.parse(JSON.stringify(local));
          if (r.profile && r.profile.millores && typeof r.profile.millores === 'object') {
            bo.millores = Object.assign({}, bo.millores || {}, r.profile.millores);
          }
          r = Object.assign({}, r, { profile: bo });
          if (!curat && typeof appsScriptPost === 'function') {
            curat = true;
            appsScriptPost({ action: 'saveProfile', profile: JSON.stringify(bo) }).catch(function () {});
          }
        }
      }
    } catch (e) {}
    return r;
  };
})();
