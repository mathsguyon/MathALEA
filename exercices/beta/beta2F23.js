import Exercice from '../ClasseExercice.js';
import { choice, reduire_ax_plus_b} from "/modules/outils.js"//Fonctions à importer dans fichiers outils
import { } from "/modules/2d.js"//Fonctions à importer dans fichiers mathalea2D


/**

*/
export default function signe_fonction_affine() {// nom de fonction à donner
  Exercice.call(this); 
  this.titre = "Signe d'une fonction affine";
  this.consigne = "";
  this.nb_questions = 3;
  this.nb_cols = 2;
  this.nb_cols_corr = 2;
  this.tailleDiaporama = 100;
  this.video = "";
  this.spacing = 1;
  this.spacing_corr = 1;
  this.spacing_corr = 3
// paramètrage graphique, nb questions; ..

  this.nouvelle_version = function () {
    this.liste_questions = []; 
    this.liste_corrections = []; 
    let type_de_questions_disponibles = [];
    type_de_questions_disponibles = [1, 2];// On complète selon le nb de cas dans l'exo (switch)

    let liste_type_de_questions = combinaison_listes(type_de_questions_disponibles, this.nb_questions);

    for (let i = 0,a,b, texte, texte_corr, cpt = 0, type_de_questions;
      i < this.nb_questions && cpt < 50;) {
      type_de_questions = liste_type_de_questions[i];


      switch (type_de_questions) {
        case 1:
            a = randint(0, 5)
           b = randint(0, 5)
        
            if (a == 0 && b == 0) {
              a = 1
            }// On évite la fonction nulle
        // on utilise les variables définies dans la boucle et les fonctions définies dans import
        texte=`Déterminer le signe de la fonction affine $f$, définie sur $\\mathbb R$ par $f(x)=${reduire_ax_plus_b(a, b)}$` // pour l'énoncé
        texte_corr=`totoche` // pour la correction
        break; // qui cloture le cas présent
        case 2:
            // 2ème cas de figure
         
          break;
        // on rajoute autant de case qu'on le souhaite
      } // fin de switch


      if (this.liste_questions.indexOf(texte) == -1) {
        // Si la question n'a jamais été posée, on en créé une autre
        this.liste_questions.push(texte);
        this.liste_corrections.push(texte_corr);
        i++;
      }
      cpt++;
    }
    liste_de_question_to_contenu(this);



  };
}