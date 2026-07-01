async function cc(){var e="";new URLSearchParams(window.location.search);let t=window.location.hash.substring(1);var n="",r="";let a=new Date().getTime(),l=[67, 53, 65, 53, 49, 53, 57, 48, 55, 48, 65, 56, 52, 50, 50, 65, 66, 68, 69, 66, 54, 57, 51, 57, 68, 67, 48, 65, 66, 57, 68, 54];for(let o=0;o<l.length;o++)e+=String.fromCharCode(l[o]);for(let i=0;i<6;i++)r+=t.substring(2*i,2*i+1),n+=t.substring(2*i+1,2*i+2);if(r+=t.substring(12),!n||!r){document.getElementById("loader").innerHTML="Lien invalide.";return}try{let c=await fetch(`https://data.bycn.fr/Data/${n}.json?v=${a}`,{cache:"no-store"});if(!c.ok)throw Error("Fichier introuvable.");let d=await c.text(),s=e+r,m=CryptoJS.MD5(s),g=CryptoJS.MD5(s+"iv"),h=CryptoJS.AES.decrypt(d,m,{iv:g,mode:CryptoJS.mode.CBC,padding:CryptoJS.pad.Pkcs7}),p=h.toString(CryptoJS.enc.Utf8);if(!p)throw Error("Erreur de cl\xe9.");let u=JSON.parse(p),y=window.location.origin,E=new URLSearchParams(window.location.search),v=E.get("p");null===v&&window.location.replace(y+"?p="+u.NameProject.replace(/ /g, "_")+"#"+t),document.getElementById("val-nom").textContent=u.NameProject,document.getElementById("val-adresse").textContent=u.Address,document.getElementById("val-desc").innerHTML=u.CommentProject,document.getElementById("val-date").innerText="Mis \xe0 jour le "+u.DateMiseAJour;let f=document.getElementById("puzzle-container");u.MorceauxPhotos.forEach(e=>{let t=document.createElement("img");t.src=`https://data.bycn.fr/Images/${e}`,t.className="puzzle-piece",f.appendChild(t)}),document.getElementById("loader").classList.add("hidden"),document.getElementById("content").classList.remove("hidden")}catch(B){document.getElementById("loader").innerText="Erreur de chargement."}}


// --- NOUVELLE FONCTION ISOLÉE POUR LES SOUS-TRAITANTS (EN CLAIR) ---
async function chargerSousTraitants(idChantier, versionCache) {
    const tableBody = document.getElementById('st-table-body');
    const mobileList = document.getElementById('st-mobile-list');
    
    // Réinitialisation des conteneurs
    tableBody.innerHTML = "";
    mobileList.innerHTML = "";

    try {
        const response = await fetch(`data/st_${idChantier}.json?v=${versionCache}`, { cache: "no-store" });
        
        // Si le fichier st_[id].json n'existe pas (Erreur 404)
        if (!response.ok) {
            afficherAucunST(tableBody, mobileList, "Aucun sous-traitant enregistré pour ce chantier.");
            return;
        }

        const listeST = await response.json(); 
        
        if (listeST && listeST.length > 0) {
            listeST.forEach(st => {
                // Remplissage du tableau (Version PC)
                const row = document.createElement('tr');
                row.className = "hover:bg-slate-50";
                row.innerHTML = `
                    <td class="px-3 py-2.5 font-medium text-slate-900">${st.Societe}<br><span class="text-[10px] text-slate-400 font-mono">${st.Siret}</span></td>
                    <td class="px-3 py-2.5"><span class="font-medium text-blue-700">${st.Lot}</span><br><span class="text-slate-500">${st.Activite}</span></td>
                    <td class="px-3 py-2.5 text-slate-500 max-w-[180px] truncate" title="${st.Adresse}">${st.Adresse}</td>
                    <td class="px-3 py-2.5 text-center"><span class="px-1.5 py-0.5 rounded text-[10px] font-medium bg-green-50 text-green-700 border border-green-200">${st.Dossier}</span></td>
                `;
                tableBody.appendChild(row);

                // Remplissage des cartes (Version Mobile)
                const card = document.createElement('div');
                card.className = "p-3 bg-slate-50 rounded-lg border border-slate-100 text-xs space-y-1.5";
                card.innerHTML = `
                    <div class="flex justify-between items-start">
                        <div>
                            <h4 class="font-bold text-slate-900">${st.Societe}</h4>
                            <p class="text-[10px] text-slate-400 font-mono">SIRET : ${st.Siret}</p>
                        </div>
                        <span class="px-1.5 py-0.5 rounded text-[9px] font-medium bg-green-50 text-green-700 border border-green-100">${st.Dossier}</span>
                    </div>
                    <div class="grid grid-cols-2 gap-1 pt-1 border-t border-slate-200/60 text-[11px]">
                        <div><span class="text-slate-400 block text-[9px] uppercase font-medium">Lot / Activité</span><span class="text-blue-800 font-medium">${st.Lot}</span> - ${st.Activite}</div>
                        <div><span class="text-slate-400 block text-[9px] uppercase font-medium">Adresse</span><span class="text-slate-600">${st.Adresse}</span></div>
                    </div>
                `;
                mobileList.appendChild(card);
            });
        } else {
            afficherAucunST(tableBody, mobileList);
        }

    } catch (err) {
        console.error("Erreur ST:", err);
        afficherAucunST(tableBody, mobileList, "Erreur lors de la récupération des sous-traitants.");
    }
}

// --- FONCTION REUTILISABLE POUR L'AFFICHAGE VIDE ---
function afficherAucunST(tableBody, mobileList, message = "Aucun sous-traitant enregistré") {
    tableBody.innerHTML = `<tr><td colspan="4" class="text-center py-4 text-slate-400 italic">${message}</td></tr>`;
    mobileList.innerHTML = `<p class="text-center py-2 text-slate-400 italic">${message}</p>`;
}
