import Exercice from '../ClasseExercice.js';
import {liste_de_question_to_contenu,randint,choice,combinaison_listes,ecriture_parenthese_si_negatif,ecriture_algebrique} from "/modules/outils.js"
import { repere2, courbe2, mathalea2d, point, tracePoint, labelPoint, vecteur, representantNomme } from "/modules/2d.js"

/**
 * @Auteur Stéphane Guyon
 */
export default function calculer_coordonnees_vecteurs() {
    Exercice.call(this); // Héritage de la classe Exercice()
    this.titre = "Déterminer les coordonnées d'un vecteur.";

    this.nb_questions = 2;
    this.nb_cols = 2;
    this.nb_cols_corr = 2;
    this.sup = 1; // 
    this.nouvelle_version = function () {
        this.liste_questions = []; // Liste de questions
        this.liste_corrections = []; // Liste de questions corrigées
        let type_de_questions_disponibles = [1];
        let type_de_questions

        let liste_type_de_questions = combinaison_listes(type_de_questions_disponibles, this.nb_questions);
        for (let i = 0, A,B,t,l,r,ux, uy, xA, yA, xB, yB,xC,yC, v,V,V1,C,texte, texte_corr, nom, cpt = 0; i < this.nb_questions && cpt < 50;) {
            type_de_questions = liste_type_de_questions[i];
            switch (type_de_questions) {
                // Cas par cas, on définit le type de nombres que l'on souhaite
                // Combien de chiffres ? Quelles valeurs ?
                case 1:


                    xA = randint(0, 5) * choice([-1, 1]);
                    yA = randint(0, 5) * choice([-1, 1]);
                    ux = randint(1, 5) * choice([-1, 1]);
                    uy = randint(1, 5) * choice([-1, 1]);
                    xB = xA + ux;

                    yB = yA + uy;


                    texte = `Dans un repère orthonormé $(O,\\vec i,\\vec j)$, on donne les points suivants :`;
                    texte += ` $A\\left(${xA};${yA}\\right)$ et $B\\left(${xB};${yB}\\right)$`;
                    texte += `<br>Déterminer les coordonnées du vecteur $\\overrightarrow{AB}$ <br>`;
                    r = repere2()//On définit le repère  
                    A = point(xA, yA,'A')
                    B = point(xB, yB,'B')  
                    v=vecteur(A,B)
                    V=v.representant(A)                   
                    V.color='red'    
                    l = labelPoint(A,B)// Variable qui trace les nom s A et B
                    l.color='red' 
                    nom=v.representantNomme(A,'v',3)              
                    texte += mathalea2d({
                      xmin: -8,
                      ymin: -8,
                      xmax: 8,
                      ymax: 8
                    }, r,l,V,nom);// On trace le graphique



                    texte_corr = `<br>On sait d'après le cours, que si $A(x_A;y_A)$ et $B(x_B;y_B)$ sont deux points d'un repère,`;
                    texte_corr += ` <br>alors on a : $\\overrightarrow{AB}\\begin{pmatrix}x_B-x_A  \\\\y_B-y_A\\end{pmatrix}$<br>`;
                    texte_corr += ` <br>On applique ici aux données de l'énoncé :`;
                    texte_corr += ` $\\overrightarrow{AB}\\begin{pmatrix}${xB}-${ecriture_parenthese_si_negatif(xA)}  \\\\${yB}-${ecriture_parenthese_si_negatif(yA)}\\end{pmatrix}$<br>`;
                    texte_corr += `Ce qui donne au final : $\\overrightarrow{AB}\\begin{pmatrix}${xB - xA}  \\\\${yB - yA}\\end{pmatrix}$<br>`;
                    texte_corr +=mathalea2d({
                        xmin: -8,
                        ymin: -8,
                        xmax: 8,
                        ymax: 8
                      }, r, t,l);// On trace le graphique

                    break;
                case 2:


                    xA = randint(0, 5) * choice([-1, 1]);
                    yA = randint(0, 5) * choice([-1, 1]);
                    ux = randint(1, 5) * choice([-1, 1]);
                    uy = randint(1, 5) * choice([-1, 1]);
                    xB = xA + ux;

                    yB = yA + uy;


                    texte = `Dans un repère orthonormé $(O,\\vec i,\\vec j)$, on donne les points suivants :`;
                    texte += ` $A\\left(${xA};${yA}\\right)$ et $B\\left(${xB};${yB}\\right)$`;
                    texte += `<br>Déterminer les coordonnées du vecteur $\\overrightarrow{AB}$ `;
                    texte_corr = `<br>On sait d'après le cours, que si $A(x_A;y_A)$ et $B(x_B;y_B)$ sont deux points d'un repère,`;
                    texte_corr += ` <br>alors on a : $\\overrightarrow{AB}\\begin{pmatrix}x_B-x_A  \\\\y_B-y_A\\end{pmatrix}$<br>`;
                    texte_corr += ` <br>On applique ici aux données de l'énoncé :`;
                    texte_corr += ` $\\overrightarrow{AB}\\begin{pmatrix}${xB}-${ecriture_parenthese_si_negatif(xA)}  \\\\${yB}-${ecriture_parenthese_si_negatif(yA)}\\end{pmatrix}$<br>`;
                    texte_corr += `Ce qui donne au final : $\\overrightarrow{AB}\\begin{pmatrix}${xB - xA}  \\\\${yB - yA}\\end{pmatrix}$<br>`;
                    A = point(xA, yA,'A')
                    B = point(xB, yB,'B')  
                    v=vecteur(A,B)
                    V=v.representant(A)                   
                    V.color='red'    
                    texte_corr +=mathalea2d({
                        xmin: -8,
                        ymin: -8,
                        xmax: 8,
                        ymax: 8
                      }, r, t,l);// On trace le graphique

                    break;
                case 3:


                        xA = randint(0, 5) * choice([-1, 1]);
                        yA = randint(0, 5) * choice([-1, 1]);
                        ux = randint(1, 5) * choice([-1, 1]);
                        uy = randint(1, 5) * choice([-1, 1]);
                        xB = xA + ux;
    
                        yB = yA + uy;
                        xC = randint(0, 5) * choice([-1, 1]);
                        yC = randint(0, 5) * choice([-1, 1]);
                        if (xC==xA &&yC==yA){
                            xC=xC-1
                            yC=yC+1}
    
                        texte = `Dans un repère orthonormé $(O,\\vec i,\\vec j)$, on donne les points suivants :`;
                        texte += ` $A\\left(${xA};${yA}\\right)$ ; $B\\left(${xB};${yB}\\right)$ et $B\\left(${xC};${yC}\\right)$`;
                        texte += `<br>Déterminer les coordonnées du point $M$ du plan qui vérifie l'égalité :$\\overrightarrow{CM}=\\overrightarrow{AB}$ `;
                        texte_corr = `<br>On sait d'après le cours, que si $A(x_A;y_A)$ et $B(x_B;y_B)$ sont deux points d'un repère,`;
                        texte_corr += ` <br>alors on a : $\\overrightarrow{AB}\\begin{pmatrix}x_B-x_A  \\\\y_B-y_A\\end{pmatrix}$<br>`;
                        texte_corr += ` <br>On applique ici aux données de l'énoncé :`;
                        texte_corr += ` $\\overrightarrow{AB}\\begin{pmatrix}${xB}-${ecriture_parenthese_si_negatif(xA)}  \\\\${yB}-${ecriture_parenthese_si_negatif(yA)}\\end{pmatrix}$<br>`;
                        texte_corr += `Ce qui donne : $\\overrightarrow{AB}\\begin{pmatrix}${xB - xA}  \\\\${yB - yA}\\end{pmatrix}$<br>`;
                        texte_corr +=`Soit $M(x;y)$ les coordonnées du point M que l'ont cherche à déterminer.<br>`
                        texte_corr +=`On a donc : $\\overrightarrow{CM}\\begin{pmatrix}x-${ecriture_parenthese_si_negatif(xC)}  \\\\y-${ecriture_parenthese_si_negatif(yC)}\\end{pmatrix}$<br>`;
                        texte_corr +=`Les coordonnées du point $M$ vérifient donc :<br>`
                        texte_corr +=`$\\begin{cases}x-${ecriture_parenthese_si_negatif(xC)}=${xB - xA} \\\\y-${ecriture_parenthese_si_negatif(yC)}=${yB - yA}\\end{cases}<br>$`
                        texte_corr +=`$\\iff \\begin{cases}x=${xB - xA}${ecriture_algebrique(xC)} \\\\y=${yB - yA}${ecriture_algebrique(yC)}\\end{cases}$<br>`
                        texte_corr +=`$\\iff \\begin{cases}x=${xB - xA+xC} \\\\y=${yB - yA+yC}\\end{cases}$`
                        A = point(xA, yA,'A')
                        B = point(xB, yB,'B')  
                        C=point(xC,yC,'C')
                        v=vecteur(A,B)
                       
                        V=v.representant(A) 
                        V1=v.representant(C)              
                        V.color='red'    
                        texte_corr +=mathalea2d({
                            xmin: -8,
                            ymin: -8,
                            xmax: 8,
                            ymax: 8
                          }, r, t,l);// On trace le graphique
    
                        break;

            }
            if (this.liste_questions.indexOf(texte) == -1) { // Si la question n'a jamais été posée, on en créé une autre
                this.liste_questions.push(texte);
                this.liste_corrections.push(texte_corr);
                i++;
            }
            cpt++;
        }
        liste_de_question_to_contenu(this);
    };
    this.besoin_formulaire_numerique = ['Niveau de difficulté', 4, '1 :Calculer vec(AB) avec repère\n 2 : :Calculer vec(AB) sans repère\n 3 : Déterminer M tq AM=u\n 4 : Déterminer M tq MB=u'];
}
