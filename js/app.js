"use strict";

// import { films } from "./data";

// import { films } from './data.js'

// Bienvenue dans le fichier de travail principal de CineBook !
// Le HTML et les données sont prêts, mais les interactions sont volontairement absentes.
// La page contient déjà un exemple statique complet pour montrer le résultat attendu.
// Inspectez et copiez la structure HTML utile, puis remplacez ces exemples avec
// les éléments que votre code crée à partir des tableaux de data.js.
// Avancez section par section et testez souvent dans le navigateur.

// ==================================================
// 0 - SÉLECTIONNER LES ÉLÉMENTS HTML
// ==================================================
// OBJECTIF : garder des références vers les zones qui seront modifiées.
// NOTIONS UTILES : const, document.querySelector(), document.getElementById().
// QUESTIONS : Quel identifiant correspond au catalogue ? Au prix total ?
// TODO : créez ici des constantes explicites pour les éléments nécessaires.
// ÉCRIVEZ VOTRE CODE ICI :

const containerFilms = document.getElementById("films-container")
const filmsIds = []
const newObjs = []
const seanceChoix = []
let idFilm;


const createCardsFilms = () => {
    films.forEach((e) => {
        let CalcHours = Math.floor(e.duree / 60)
        let CalcMins = e.duree % 60
        let resultatDuree = CalcMins < 10 ? `${CalcHours} h 0${CalcMins} min` : `${CalcHours} h ${CalcMins} min`;
        const cart = `
        <article class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg cardFilm" data-id="${e.id}">
          <div class="relative">
            <img src="${e.affiche}" alt="Affiche de ${e.titre}" class="aspect-[2/3] w-full object-cover">
                <span class="absolute bottom-3 right-3 rounded-full bg-white/95 px-3 py-1 text-xs font-extrabold shadow-lg">${e.prix} DH</span>
          </div>
          <div class="p-4">
            <p class="text-xs font-bold uppercase tracking-wider text-cine-red">
                ${e.genre}
            </p>
             <h3 class="mt-1 text-lg font-black">
                ${e.titre}
            </h3>
            <p class="mt-2 text-sm text-slate-500">${resultatDuree}</p>
            <button type="button" data-film-id=${e.id} data-clicked = "0" class="mt-4 w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 font-extrabold text-slate-700 choixFilm">
                Choisir ce film 
            </button>
          </div>
        </article>

        `
        containerFilms.innerHTML += cart
    })
}
createCardsFilms()


const btns = document.querySelectorAll(".choixFilm")

btns.forEach((ele) => {
    ele.addEventListener('click', (e) => {
        idFilm = Number(e.target.dataset.filmId)
        if (ele.dataset.clicked == "1") {
            ele.className = "mt-4 w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 font-extrabold text-slate-700"
            ele.textContent = "Choisir ce film"
            ele.parentElement.parentElement.classList = "overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg"
            ele.dataset.clicked = "0"
            console.log("FILM ID clicked  = 1=>", idFilm)
            if (newObjs.length > 0) {
                newObjs.splice(filmsIds.indexOf(idFilm), 1)
                seanceChoix.splice(filmsIds.indexOf(idFilm), 1)
                filmsIds.splice(filmsIds.indexOf(idFilm), 1)
                console.log("Unselct", filmsIds)
                afficherFilmsChoix()
                afficherSeance()
            }
        } else {
            ele.className = "mt-4 w-full rounded-xl bg-cine-red px-4 py-3 font-extrabold text-white"
            ele.textContent = "Sélectionné"
            ele.parentElement.parentElement.className = "overflow-hidden rounded-2xl border border-red-400 bg-white shadow-xl ring-2 ring-red-100"
            ele.dataset.clicked = "1"
            console.log("FILM ID clicked  = 0=>", idFilm)
            if (idFilm !== undefined) {
                filmsIds.push(idFilm)
                newObjs.push(films.find((e) => e.id == idFilm))
                afficherFilmsChoix()
                afficherSeance()
            }
        }
    })
})



const containerFilmsChoix = document.getElementById("film-details")
function afficherFilmsChoix() {
    containerFilmsChoix.innerHTML = ''

    if (filmsIds.length > 0) {
        newObjs.forEach((e) => {
            let CalcHours = Math.floor(e.duree / 60)
            let CalcMins = e.duree % 60
            let resultatDuree = CalcMins < 10 ? `${CalcHours} h 0${CalcMins} min` : `${CalcHours} h ${CalcMins} min`;
            containerFilmsChoix.innerHTML += `
              <img src="${e.affiche}" alt="${e.titre}" class="aspect-[2/3] w-24 rounded-xl object-cover shadow-md">
              <div>
              <div class="flex flex-wrap items-center gap-2"><h3 class="text-xl font-black">${e.titre}</h3><span class="rounded-full bg-red-100 px-3 py-1 text-xs font-bold text-red-700">${e.prix} DH</span>
              </div><p class="mt-2 text-sm font-semibold text-slate-500">Science-fiction · ${resultatDuree}</p>
              <p class="mt-3 leading-7 text-slate-600">${e.description}</p></div>
        `
        })

    }
}

const seanceContainer = document.getElementById("seances-container")

let seanceId;
let filmId;
function afficherSeance() {
    seanceContainer.innerHTML = ``

    if (newObjs.length > 0) {
        console.log("newObjs", newObjs)
        newObjs.forEach((ele) => {
            seanceContainer.innerHTML += `
                <div class="w-full mb-4">
                    <p class="mb-3 text-[.7rem] font-extrabold uppercase tracking-[.2em] text-cine-red">Votre Film: ${ele.titre}</p>
                    <div class="flex flex-wrap gap-3 mb-4">
                        ${ele.seances.map(e => `<button type="button" data-film-id="${ele.id}" data-seance-id="${e.id}" class="rounded-xl border border-slate-300 bg-slate-50 px-5 py-3 font-bold text-slate-700 seanceFilm">${e.horaire}</button>`).join("")}
                    </div>
                    <hr class="w-full border-slate-200">
                </div>
            `
            const btsnSeance = document.querySelectorAll(".seanceFilm")
            btsnSeance.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    let divBtns = btn.parentElement.querySelectorAll(".seanceFilm")

                    filmId = Number(e.target.dataset.filmId)
                    seanceId = Number(e.target.dataset.seanceId)

                    let found = seanceChoix.find(e => e.id == filmId)

                    if (found == undefined) {
                        seanceChoix.push({
                            id: filmId,
                            seanceId: seanceId
                        })
                    } else {
                        found.seanceId = seanceId
                    }

                    divBtns.forEach((ele) => {
                        ele.className = `rounded-xl border border-slate-300 bg-slate-50 text-slate-700 px-5 py-3 font-bold seanceFilm`
                    })
                    btn.className = "rounded-xl bg-cine-red px-5 py-3 font-bold text-white shadow-md seanceFilm"
                })
            })
        })
    }

}


const sieges = document.getElementById("sieges-container")
function afficherSieges(){
    sieges.innerHTML = ``

    for(let j = 0; j < rangees.length; j++){

        sieges.innerHTML += `<span class="self-center text-xs font-extrabold text-slate-500">${rangees[j]}</span>`
    for(let i = 0 ; i < siegesParRangee; i++){
            sieges.innerHTML +=`
            <button class="aspect-square rounded-lg bg-blue-600 text-xs font-bold text-white">${rangees[j]}${i+1}</button>
            `
        }
    }

}
afficherSieges()


// ==================================================
// 0 BIS - MÉMORISER L'ÉTAT DE L'APPLICATION
// ==================================================
// OBJECTIF : mémoriser temporairement le film, la séance et les sièges choisis.
// Les données décrivent les films ; l'état décrit les choix actuels de l'utilisateur.
// NOTIONS UTILES : let, null, tableau vide [].
// PISTES : que faut-il remettre à zéro lorsqu'un autre film est choisi ?
// TODO : déclarez trois variables avec des valeurs initiales adaptées.
// ÉCRIVEZ VOTRE CODE ICI :


// ==================================================
// US01 - AFFICHER LES FILMS
// ==================================================
// OBJECTIF : créer une carte pour chaque objet du tableau "films" et l'ajouter
// dans #films-container.
// NOTIONS UTILES : forEach, createElement ou innerHTML, propriétés d'un objet.
// QUESTIONS : Comment parcourir films ? Comment utiliser film.affiche et film.titre ?
// TODO : 1) vider les cartes statiques ; 2) construire les cartes ; 3) les insérer.
// PISTE : ajoutez l'identifiant du film dans un attribut data-film-id du bouton.
// MODÈLE : observez l'élément <article data-film-id="1"> dans index.html.
// ÉCRIVEZ VOTRE CODE ICI :


// ==================================================
// US02 - SÉLECTIONNER UN FILM
// ==================================================
// OBJECTIF : réagir au clic sur une carte, retrouver le film correspondant et
// afficher ses informations dans #film-details.
// NOTIONS UTILES : addEventListener, Number(), find(), textContent, classList.
// QUESTIONS : Où lire l'id du bouton ? Comment comparer cet id à film.id ?
// TODO : écouter les clics, modifier l'état et mettre à jour les détails.
// PISTE : un changement de film doit aussi réinitialiser séance et sièges.
// MODÈLE : #film-details contient déjà un exemple de détail à reproduire.
// ÉCRIVEZ VOTRE CODE ICI :


// ==================================================
// US03 - AFFICHER LES SÉANCES
// ==================================================
// OBJECTIF : afficher les horaires du film sélectionné dans #seances-container.
// NOTIONS UTILES : tableau imbriqué, boucle, bouton, innerHTML.
// QUESTIONS : Dans quelle propriété du film se trouvent les séances ?
// TODO : créer un bouton par séance et conserver son id dans data-seance-id.
// MODÈLE : les trois boutons statiques de #seances-container montrent le HTML attendu.
// ÉCRIVEZ VOTRE CODE ICI :


// ==================================================
// US04 - SÉLECTIONNER UNE SÉANCE
// ==================================================
// OBJECTIF : mémoriser la séance cliquée et montrer visuellement le bouton actif.
// NOTIONS UTILES : addEventListener, find(), classList, conditions.
// QUESTIONS : Faut-il autoriser une séance qui n'appartient pas au film choisi ?
// TODO : retrouver la séance, modifier l'état et réinitialiser les sièges choisis.
// ÉCRIVEZ VOTRE CODE ICI :


// ==================================================
// US05 - AFFICHER LES 30 SIÈGES
// ==================================================
// OBJECTIF : créer les rangées A à E, avec les numéros 1 à 6.
// NOTIONS UTILES : boucles imbriquées, concaténation, createElement, classList.
// QUESTIONS : Comment fabriquer le nom "C4" ? Où sont les sièges occupés ?
// TODO : générer les sièges et donner un état visuel différent aux places occupées.
// PISTE : rangees et siegesParRangee sont fournis dans data.js.
// MODÈLE : #sieges-container contient les 30 sièges statiques et leurs classes Tailwind.
// ÉCRIVEZ VOTRE CODE ICI :


// ==================================================
// US06 - SÉLECTIONNER ET DÉSÉLECTIONNER DES SIÈGES
// ==================================================
// OBJECTIF : ajouter ou retirer une place du tableau des sièges sélectionnés.
// NOTIONS UTILES : includes(), push(), splice() ou filter(), classList.toggle().
// QUESTIONS : Comment empêcher le clic sur une place occupée ?
// TODO : écouter chaque siège disponible et actualiser son état visuel.
// ÉCRIVEZ VOTRE CODE ICI :


// ==================================================
// US07 - CALCULER LE TOTAL ET METTRE À JOUR LE RÉCAPITULATIF
// ==================================================
// OBJECTIF : afficher le film, la séance, les sièges et le montant actuel.
// NOTIONS UTILES : multiplication, length, join(), textContent.
// QUESTIONS : Quelle formule relie prix du film et nombre de sièges ?
// TODO : écrire une fonction appelée après chaque changement de sélection.
// MODÈLE : le récapitulatif HTML affiche des exemples de valeurs déjà remplies.
// ÉCRIVEZ VOTRE CODE ICI :


// ==================================================
// US08 - CONFIRMER LA RÉSERVATION
// ==================================================
// OBJECTIF : vérifier les choix puis afficher un succès ou une erreur dans
// #reservation-message. Les données restent seulement en mémoire.
// NOTIONS UTILES : if / else, addEventListener, textContent, classList.
// QUESTIONS : Quelles conditions rendent une réservation valide ?
// TODO : écouter #confirmer-reservation et construire un message clair.
// ÉCRIVEZ VOTRE CODE ICI :


// PREMIER TEST CONSEILLÉ :
// console.log(films);
// Décommentez temporairement cette ligne pour explorer les données, puis avancez.
