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
window.AVIS_INICI = 'adeu-assistent';
