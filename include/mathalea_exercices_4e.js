
/**
* * Calcul de l'inverse d'un nombre. 
*
* Paramétrages possibles :
* * 1 : inverse d'un nombre entier
* * 2 : inverse d'une fraction
* * 3 : inverse d'un nombre décimal
* * 4 : mélange des trois autres niveaux
* @auteur Jean-Claude Lhote
*/
function Exercice_trouver_l_inverse(){
	Exercice.call(this); // Héritage de la classe Exercice()
	this.sup = 1 ; // Avec ou sans relatifs
	this.titre = "Trouver l'inverse d'un nombre"
	this.consigne = "Calculer l'inverse et donner la réponse sous forme décimale ou de fraction simplifiée quand c'est impossible"
	this.spacing = 2;
	this.spacing_corr = 2;
	this.nb_questions = 5;
	this.nb_cols_corr = 1;

	this.nouvelle_version = function(numero_de_l_exercice){
		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées
		let type_de_questions_disponibles
		let liste_entiers=[[1,1],[2,0.5],[3,0],[4,0.25],[5,0.2],[6,0],[7,0],[8,0.125],[9,0],[10,0.1],[11,0],[12,0],[13,0],[14,0],[15,0],[20,0.05],[50,0.02],[100,0.01]]
		// [n,0] si l'inverse de n n'est pas décimal [n,1/n] si il est décimal.
		let liste_decimaux=[[0.1,10,1],[0.2,5,1],[0.3,10,3],[0.4,10,4],[0.5,2,1],[0.6,10,6],[0.75,100,75],[0.8,10,8],[1.2,10,12],[1.5,10,15],[2.5,10,25],[3.5,10,35],[4.8,10,48],[7.5,10,75]]
		// [x,n,d] n/d = inverse de x fraction à réduire si besoin ... d=1 si l'inverse de x est entier. 
		let liste_fractions=[[3,4,false],[5,2,true],[4,5,true],[5,7,true],[7,3,false],[16,6,true],[12,18,true],[9,4,false],[4,6,true],[8,7,true],[5,9,true],[9,7,false],[13,6,false],[7,2,false]]
		// [n,d,bol] inverse d/n à simplifier si besoin. si bol = true, alors d/n est décimal.
		let liste_couples_d_inverses
		let couples_d_inverses
		if (this.sup==4) {type_de_questions_disponibles = [1,1,2,2,3]} // nombre entier,fraction,décimal]
		else {type_de_questions_disponibles = [parseInt(this.sup)]}
		let liste_type_de_questions = combinaison_listes(type_de_questions_disponibles,this.nb_questions)
		for (let i = 0, nombre_choisi, nombre_inverse, nombre_inverse_num, nombre_inverse_den, texte, texte_corr, type_de_questions, cpt=0; i < this.nb_questions&&cpt<50;) {
			type_de_questions = liste_type_de_questions[i];
			switch (type_de_questions){
				case 1 : //inverse d'entier
					couples_d_inverses = choice(liste_entiers)
					nombre_choisi = couples_d_inverses[0];
					nombre_inverse = couples_d_inverses[1];
					if (choice([true,false])) { // nombre entier positif
						if (nombre_inverse!=0) {  //inverse décimal
							texte_corr = `L\'inverse de $${nombre_choisi}$ est $${tex_nombrec(nombre_inverse)} \\:$ car $\\: ${nombre_choisi}   \\times   ${tex_nombrec(nombre_inverse)} =  1$.`
						}
						else {  //inverse non décimal
							texte_corr = `L\'inverse de $${nombre_choisi}$ est $${tex_fraction(1,nombre_choisi)} \\:$ car $\\: ${nombre_choisi}   \\times   ${tex_fraction(1,nombre_choisi)} =  1$.`
						}
						} else { //nombre entier négatif
							nombre_choisi=-nombre_choisi
							if (nombre_inverse!=0) { //inverse décimal
								texte_corr = `L'inverse de $${nombre_choisi}$ est $${tex_nombrec(-nombre_inverse)} \\:$`
								texte_corr+=` car $\\: ${nombre_choisi}  \\times  \\left(-${tex_nombrec(nombre_inverse)}\\right)  =  1$.`
							}
							else {  //inverse non décimal
								texte_corr = `L\'inverse de $${nombre_choisi}$ est $-${tex_fraction(1,-nombre_choisi)} \\:$ car $\\: ${nombre_choisi}   \\times   \\left(-${tex_fraction(1,-nombre_choisi)}\\right) =  1$.`
							}
					}
					texte = `Quel est l'inverse de $${tex_nombrec(nombre_choisi)}$ ?`;
				break
				case 2 :
					couples_d_inverses = choice(liste_decimaux)
					nombre_choisi = couples_d_inverses[0];
					nombre_inverse_num = couples_d_inverses[1];
					nombre_inverse_den = couples_d_inverses[2];
					if (choice([true,false])) { // nombre positif
						if (pgcd(nombre_inverse_num,nombre_inverse_den)==1) {  //non simplifiable après inversion
							texte_corr = `Comme $${tex_nombrec(nombre_choisi)}=${tex_fraction(nombre_inverse_den,nombre_inverse_num)}$, l'inverse de $${tex_nombrec(nombre_choisi)}$ est $${tex_fraction(nombre_inverse_num,nombre_inverse_den)} \\:$ car $\\: ${tex_fraction(nombre_inverse_den,nombre_inverse_num)}   \\times   ${tex_fraction(nombre_inverse_num,nombre_inverse_den)} =  1$.`
						}
						else {  // à simplifier après inversion
							texte_corr = `Comme $${tex_nombrec(nombre_choisi)}=${tex_fraction(nombre_inverse_den,nombre_inverse_num)}=${tex_fraction_reduite(nombre_inverse_den,nombre_inverse_num)}$, l'inverse de $${tex_nombrec(nombre_choisi)}$ est $${tex_fraction_reduite(nombre_inverse_num,nombre_inverse_den)} \\:$ car $\\: ${tex_fraction_reduite(nombre_inverse_den,nombre_inverse_num)}  \\times   ${tex_fraction_reduite(nombre_inverse_num,nombre_inverse_den)} =  1$.`	
						}
							
					} else { // nombre négatif
						nombre_choisi=-nombre_choisi
						if (pgcd(nombre_inverse_num,nombre_inverse_den)==1) {  //non simplifiable après inversion
							texte_corr = `L'inverse de $${tex_nombrec(nombre_choisi)}$ est $-${tex_fraction(nombre_inverse_num,nombre_inverse_den)} \\:$ car $\\: ${tex_nombrec(nombre_choisi)}   \\times   \\left(-${tex_fraction(nombre_inverse_num,nombre_inverse_den)}\\right) =  1$.`
							texte_corr = `Comme $${tex_nombrec(nombre_choisi)}=-${tex_fraction(nombre_inverse_den,nombre_inverse_num)}$, l'inverse de $${tex_nombrec(nombre_choisi)}$ est $-${tex_fraction(nombre_inverse_num,nombre_inverse_den)} \\:$ car $\\: -${tex_fraction(nombre_inverse_den,nombre_inverse_num)}   \\times  \\left(- ${tex_fraction(nombre_inverse_num,nombre_inverse_den)}\\right) =  1$.`
						
						}
						else {  // à simplifier après inversion
							texte_corr = `Comme $${tex_nombrec(nombre_choisi)}=-${tex_fraction(nombre_inverse_den,nombre_inverse_num)}=-${tex_fraction_reduite(nombre_inverse_den,nombre_inverse_num)}$, l'inverse de $${tex_nombrec(nombre_choisi)}$ est $-${tex_fraction_reduite(nombre_inverse_num,nombre_inverse_den)} \\:$ car $\\: -${tex_fraction_reduite(nombre_inverse_den,nombre_inverse_num)}  \\times  \\left(- ${tex_fraction_reduite(nombre_inverse_num,nombre_inverse_den)} \\right)=  1$.`	
					}
					}
					texte = `Quel est l'inverse de $${tex_nombrec(nombre_choisi)}$ ?`;
				break	
				case 3 :
					couples_d_inverses = choice(liste_fractions)
					nombre_inverse_num = couples_d_inverses[0];
					nombre_inverse_den = couples_d_inverses[1];
					if (choice([true,false])) {  // fraction positive
						if (couples_d_inverses[2]==true) {  // inverse décimal
							texte_corr = `L'inverse de $${tex_fraction(nombre_inverse_num,nombre_inverse_den)}$ est $${tex_fraction(nombre_inverse_den,nombre_inverse_num)}=${tex_nombrec(nombre_inverse_den/nombre_inverse_num)} \\:$ car $\\: ${tex_fraction(nombre_inverse_num,nombre_inverse_den)}   \\times   ${tex_fraction(nombre_inverse_den,nombre_inverse_num)} =  1$.`
						}
						else {   // inverse non décimal
							texte_corr = `L'inverse de $${tex_fraction(nombre_inverse_num,nombre_inverse_den)}$ est $${tex_fraction(nombre_inverse_den,nombre_inverse_num)} \\:$ car $\\: ${tex_fraction(nombre_inverse_num,nombre_inverse_den)}   \\times   ${tex_fraction(nombre_inverse_den,nombre_inverse_num)} =  1$.`
						}
						texte = `Quel est l'inverse de $${tex_fraction(nombre_inverse_num,nombre_inverse_den)}$ ?`;
					} 
					else {  // fraction négative
						if (couples_d_inverses[2]==true) {  // inverse décimal
							texte_corr = `L'inverse de $-${tex_fraction(nombre_inverse_num,nombre_inverse_den)}$ est $-${tex_fraction(nombre_inverse_den,nombre_inverse_num)}=-${tex_nombrec(nombre_inverse_den/nombre_inverse_num)} \\:$ car $\\: -${tex_fraction(nombre_inverse_num,nombre_inverse_den)}   \\times  \\left(- ${tex_fraction(nombre_inverse_den,nombre_inverse_num)}\\right) =  1$.`
						}
						else {   // inverse non décimal
							texte_corr = `L'inverse de $-${tex_fraction(nombre_inverse_num,nombre_inverse_den)}$ est $-${tex_fraction(nombre_inverse_den,nombre_inverse_num)} \\:$ car $\\: -${tex_fraction(nombre_inverse_num,nombre_inverse_den)}   \\times  \\left(- ${tex_fraction(nombre_inverse_den,nombre_inverse_num)} \\right)=  1$.`
						}
						texte = `Quel est l'inverse de $-${tex_fraction(nombre_inverse_num,nombre_inverse_den)}$ ?`;
					}
					
				break	
			}
			
			if (this.liste_questions.indexOf(texte)==-1){ // Si la question n'a jamais été posée, on en créé une autre
				this.liste_questions.push(texte);
				this.liste_corrections.push(texte_corr);
				i++;
			}
			cpt++
		}
		liste_de_question_to_contenu(this); //Espacement de 2 em entre chaque questions.
	}
	this.besoin_formulaire_numerique = ['Niveau de difficulté',4,"1 : Nombres entiers\n 2 : Fractions\n 3 : Nombres décimaux\n 4 : Mélange des 3 niveaux"]
}

/**
* Exercice de calcul de produit de deux fractions. 
* 
* Paramétrages possibles :
* * 1 : Produits de nombres positifs seulement
* * 2 : deux questions niveau 1 puis deux questions niveau 3
* * 3 : Produits de nombres relatifs
* * Si décomposition cochée : les nombres utilisés sont plus importants.
* @auteur Jean-Claude Lhote
*/
function Exercice_multiplier_fractions(){
	Exercice.call(this); // Héritage de la classe Exercice()
	this.sup = 1 ; // Avec ou sans relatifs
	this.titre = "Mutliplier des fractions"
	this.consigne = "Calculer et donner le résultat sous forme irréductible"
	this.spacing = 2;
	this.spacing_corr = 2;
	this.nb_questions = 5;
	this.nb_cols_corr = 1;
	this.sup2 = false; //méthode
	this.nouvelle_version = function(numero_de_l_exercice){
		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées
		let type_de_questions_disponibles
		liste_fractions = obtenir_liste_fractions_irreductibles();

		if (this.sup==1) {type_de_questions_disponibles = [1,2,2,2]} // 1*nombre entier,3*fraction (pas de négatifs)
		else if (this.sup==2) {type_de_questions_disponibles = [2,2,3,3]} // fractions, 2*positifs, 2*relatifs
		else {type_de_questions_disponibles = [3]}
		let nombre_de_signe_moins;
		let liste_type_de_questions = combinaison_listes(type_de_questions_disponibles,this.nb_questions);
		for (let i = 0, ab, cd, a, b, c, d, p, aa,bb,cc,dd, signe,numerateur,denominateur,index, texte, texte_corr, type_de_questions, cpt = 0; i < this.nb_questions && cpt < 50;) {
				type_de_questions = liste_type_de_questions[i];
				ab = choice(liste_fractions);
				cd = choice(liste_fractions);
				a = ab[0];
				b = ab[1]
				c = cd[0];
				d = cd[1];
				if (this.sup2==false){  // methode 1 : simplifications finale
					switch (type_de_questions) {
						case 1: // entier * fraction (tout positif)
							if (a == 1) { a = randint(2,9) };
							if (a==c) {a=a+1}
							texte = `$${tex_fraction(a, 1)}\\times${tex_fraction(c, d)}=$`;
							texte_corr = `$${tex_fraction(a, 1)}\\times${tex_fraction(c, d)}$`
							texte_corr +=`$=\\dfrac{${a}}{1}\\times${tex_fraction(c, d)}$`
							texte_corr +=`$=${tex_fraction(a + '\\times' + c, '1\\times' + d)}$`
							texte_corr +=`$=${tex_fraction(a * c, d)}$`
							if (pgcd(a * c, d) != 1) {
								texte_corr += `$=${tex_fraction_reduite(a * c, d)}$`
							}
							break

						case 2: // fraction * fraction tout positif
							p = pgcd(a * c, b * d);
							texte = `$${tex_fraction(a, b)}\\times${tex_fraction(c, d)}=$`;
							texte_corr = `$${tex_fraction(a, b)}\\times${tex_fraction(c, d)}$`
							texte_corr += `$=${tex_fraction(a + '\\times' + c, b + '\\times' + d)}$`
							texte_corr += `$=${tex_fraction(a * c, b * d)}$`
							if (p != 1) {
								texte_corr += `$=${tex_fraction(a * c / p + '\\times\\cancel{' + p + '}', b * d / p + '\\times\\cancel{' + p + '}')}$`
								texte_corr += `$=${tex_fraction(a * c / p, b * d / p)}$`
							}
							break


						case 3:
							a = a * randint(-1, 1, [0]);
							b = b * randint(-1, 1, [0]);
							c = c * randint(-1, 1, [0]);
							d = d * randint(-1, 1, [0]);
							nombre_de_signe_moins = (a < 0) + (b < 0) + (c < 0) + (d < 0);
							if (Math.pow(-1, nombre_de_signe_moins) == 1) { signe = '' } else { signe = '-' }

							texte = `$${tex_fraction(a, b)}\\times${tex_fraction(c, d)}$`;
							texte_corr = `$${tex_fraction(a, b)}\\times${tex_fraction(c, d)}$`
							aa = abs(a);
							bb = abs(b);
							cc = abs(c);
							dd = abs(d);
							p = pgcd(aa * cc, bb * dd);
							texte_corr += `$=${signe}${tex_fraction(aa, bb)}\\times${tex_fraction(cc, dd)}$`
							texte_corr += `$=${signe}${tex_fraction(aa + '\\times' + cc, bb + '\\times' + dd)}$`
							if (p == 1) {
								texte_corr += `$=${signe}${tex_fraction(aa * cc, bb * dd)}$`
							}
							else {

								texte_corr += `$=${signe}${tex_fraction(aa * cc, bb * dd)}$`
								if (aa * cc != bb * dd) {
									texte_corr += `$=${signe}${tex_fraction(aa * cc / p + '\\times\\cancel{' + p + '}', bb * dd / p + '\\times\\cancel{' + p + '}')}$`
									texte_corr += `$=${signe}${tex_fraction(aa * cc / p, bb * dd / p)}$`
								}
								else {
									texte_corr += `$=${signe}1$`
								}
							}
							break
					}
				}
				else { //méthode 2 : décomposition
					if (a==c) {a++}
					aa=obtenir_liste_nombres_premiers()[randint(1,5)];
					bb=obtenir_liste_nombres_premiers()[randint(1,5,[aa])];
					a=a*aa;
					d=d*aa;
					b=b*bb;
					c=c*bb;
					
					var listea=obtenir_liste_facteurs_premiers(a);
					var listeb=obtenir_liste_facteurs_premiers(b);
					var listec=obtenir_liste_facteurs_premiers(c);
					var listed=obtenir_liste_facteurs_premiers(d);
					var listeavf,listebvf;

					switch (type_de_questions) {
						case 1: // entier * fraction (tout positif)

							texte = `$${a}\\times${tex_fraction(c, d)}=$`;
							texte_corr = `$${a}\\times${tex_fraction(c, d)}$`;
							texte_corr+= `$=${tex_fraction(a+'\\times'+c,d)}$`;
							texte_corr += `$=${tex_fraction(decomposition_facteurs_premiers(a)+'\\times'+decomposition_facteurs_premiers(c), decomposition_facteurs_premiers(d))}$`;
							// texte_corr += `$=${tex_fraction(decomposition_facteurs_premiers(a * c), decomposition_facteurs_premiers(d))}$`
							for (let k in listec) {listea.push(listec[k])}
							listeb = listed;
							listeavf=[];
							listebvf=[];
							
							listea.forEach (function a_ajouter_dans_listeavf(element) {
								listeavf.push([element,true]);
							});
							listeb.forEach (function a_ajouter_dans_listebvf(element) {
								listebvf.push([element,true]);
							});
							
							for (index=0; index<listeb.length;) {
								for (let j = 0; j <= listea.length;) {
									if (listeb[index] == listea[j]) {
										listebvf[index]=[listeb[index],false];
										listeavf[j]=[listea[j],false];
										listea[j]=1;
										listeb[index]=1;
										break
									}
									j++;
								}
								index++;
							}
						
							a=1;b=1;
							for (let k in listea) {a=a*listea[k]};
							for (let k in listeb) {b=b*listeb[k]};
							
							numerateur ='';
							denominateur ='';
					
							for (let j in listeavf) {
								if (listeavf[j][1]==true) {
									numerateur+=listeavf[j][0] + '\\times';
								}
								else {
									numerateur+='\\cancel{'+listeavf[j][0]+'}\\times';
								}
							}
							numerateur=numerateur.substr(0,numerateur.length-6);

							for (let j in listebvf) {
								if (listebvf[j][1]==true) {
									denominateur+=listebvf[j][0] + '\\times';
								}
								else {
									denominateur+='\\cancel{'+listebvf[j][0]+'}\\times';
								}
							}
							denominateur=denominateur.substr(0,denominateur.length-6);
							
							texte_corr += `$=\\dfrac{${numerateur}}{${denominateur}}$`
							texte_corr += `$=${tex_fraction(a,b)}$`
							break

						case 2: // fraction * fraction tout positif
							
							texte = `$${tex_fraction(a, b)}\\times${tex_fraction(c, d)}=$`;
							texte_corr = `$${tex_fraction(a, b)}\\times${tex_fraction(c, d)}$`
							texte_corr += `$=${tex_fraction(a + '\\times' + c, b + '\\times' + d)}$`

							for (let k in listec) {listea.push(listec[k])}
							for (let k in listed) {listeb.push(listed[k])}

							listeavf=[];
							listebvf=[];

							listea.forEach (function a_ajouter_dans_listeavf(element) {
								listeavf.push([element,true]);
							});
							listeb.forEach (function a_ajouter_dans_listebvf(element) {
								listebvf.push([element,true]);
							});
							
							for (index=0; index<listeb.length;) {
								for (let j = 0; j <= listea.length;) {
									if (listeb[index] == listea[j]) {
										listebvf[index]=[listeb[index],false];
										listeavf[j]=[listea[j],false];
										listea[j]=1;
										listeb[index]=1;
										break
									}
									j++;
								}
								index++;
							}
						
							a=1;b=1;
							for (let k in listea) {a=a*listea[k]};
							for (let k in listeb) {b=b*listeb[k]};
							
							numerateur ='';
							denominateur ='';
							
							for (let j in listeavf) {
								if (listeavf[j][1]==true) {
									numerateur+=listeavf[j][0] + '\\times';
								}
								else {
									numerateur+='\\cancel{'+listeavf[j][0]+'}\\times';
								}
							}
							numerateur=numerateur.substr(0,numerateur.length-6);

							for (let j in listebvf) {
								if (listebvf[j][1]==true) {
									denominateur+=listebvf[j][0] + '\\times';
								}
								else {
									denominateur+='\\cancel{'+listebvf[j][0]+'}\\times';
								}
							}
							denominateur=denominateur.substr(0,denominateur.length-6);
							
							texte_corr += `$=\\dfrac{${numerateur}}{${denominateur}}$`
							texte_corr += `$=${tex_fraction(a,b)}$`
							break

						case 3:
							a = a * randint(-1, 1, [0]);
							b = b * randint(-1, 1, [0]);
							c = c * randint(-1, 1, [0]);
							d = d * randint(-1, 1, [0]);
							nombre_de_signe_moins = (a < 0) + (b < 0) + (c < 0) + (d < 0);
							if (Math.pow(-1, nombre_de_signe_moins) == 1) { signe = '' } else { signe = '-' }

							texte = `$${tex_fraction(a, b)}\\times${tex_fraction(c, d)}$`;
							texte_corr = `$${tex_fraction(a, b)}\\times${tex_fraction(c, d)}$`
							aa = abs(a);
							bb = abs(b);
							cc = abs(c);
							dd = abs(d);
						
							texte_corr += `$=${signe}${tex_fraction(aa, bb)}\\times${tex_fraction(cc, dd)}$`
							texte_corr += `$=${signe}${tex_fraction(aa + '\\times' + cc, bb + '\\times' + dd)}$`

							for (let k in listec) {listea.push(listec[k])}
							for (let k in listed) {listeb.push(listed[k])}

							listeavf=[];
							listebvf=[];

							listea.forEach (function a_ajouter_dans_listeavf(element) {
								listeavf.push([element,true]);
							});
							listeb.forEach (function a_ajouter_dans_listebvf(element) {
								listebvf.push([element,true]);
							});
							
							for (index=0; index<listeb.length;) {
								for (let j = 0; j <= listea.length;) {
									if (listeb[index] == listea[j]) {
										listebvf[index]=[listeb[index],false];
										listeavf[j]=[listea[j],false];
										listea[j]=1;
										listeb[index]=1;
										break
									}
									j++;
								}
								index++;
							}
						
							a=1;b=1;
							for (let k in listea) {a=a*listea[k]};
							for (let k in listeb) {b=b*listeb[k]};
							
							numerateur ='';
							denominateur ='';
						
							for (let j in listeavf) {
								if (listeavf[j][1]==true) {
									numerateur+=listeavf[j][0] + '\\times';
								}
								else {
									numerateur+='\\cancel{'+listeavf[j][0]+'}\\times';
								}
							}
							numerateur=numerateur.substr(0,numerateur.length-6);

							for (let j in listebvf) {
								if (listebvf[j][1]==true) {
									denominateur+=listebvf[j][0] + '\\times';
								}
								else {
									denominateur+='\\cancel{'+listebvf[j][0]+'}\\times';
								}
							}
							denominateur=denominateur.substr(0,denominateur.length-6);
							
							texte_corr += `$=${signe}\\dfrac{${numerateur}}{${denominateur}}$`
							texte_corr += `$=${signe}${tex_fraction(a,b)}$`
							break
					}
				}
				if (this.liste_questions.indexOf(texte) == -1) { // Si la question n'a jamais été posée, on en créé une autre
					this.liste_questions.push(texte);
					this.liste_corrections.push(texte_corr);
					i++;
				}
				cpt++
		}
		
		liste_de_question_to_contenu(this); //Espacement de 2 em entre chaque questions.
	}
	this.besoin_formulaire_numerique = ['Niveau de difficulté',3,"1 : Fractions à numérateurs et dénominateurs positifs \n 2 : Type 1 et type 3 pour 50%/50%\n 3 : Ecritures fractionnaires à numérateur et dénominateur entiers relatifs"]
	this.besoin_formulaire2_case_a_cocher = ['Avec décomposition']
}

/**
* Calcul du quotient de deux fractions. Paramétrages possibles :
* * 1 : Nombres positifs exclusivement
* * 2 : nombres relatifs
* @auteur Jean-Claude Lhote
*/
function Exercice_diviser_fractions(){
	Exercice.call(this); // Héritage de la classe Exercice()
	this.sup = 1 ; // Avec ou sans relatifs
	this.titre = "Diviser des fractions"
	this.consigne = "Calculer et donner le résultat sous forme irréductible"
	this.spacing = 2;
	this.spacing_corr = 2;
	this.nb_questions = 5;
	this.nb_cols_corr = 1;

	this.nouvelle_version = function(numero_de_l_exercice){
		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées
		liste_fractions = obtenir_liste_fractions_irreductibles();

		let type_de_questions_disponibles
		type_de_questions_disponibles = [parseInt(this.sup)];
		let nombre_de_signe_moins				
		let liste_type_de_questions = combinaison_listes(type_de_questions_disponibles,this.nb_questions)
		for (let i = 0, ab,cd,a, b, c, d, p,signe, texte, texte_corr, type_de_questions, cpt=0; i < this.nb_questions&&cpt<50;) {
			type_de_questions = liste_type_de_questions[i];
			ab=choice(liste_fractions);
			cd=choice(liste_fractions);
			a=ab[0];
			b=ab[1]
			c=cd[0];
			d=cd[1];
			
			p=pgcd(a*d,b*c);
			
			switch (type_de_questions){
			//	case 0 : // entier * fraction (tout positif)
			//		texte=`$${tex_fraction(a,1)}\\div${tex_fraction(c,d)}=$`;
			//		if (pgcd(a*d,c)==1) {
			//			texte_corr= `$${tex_fraction(a,1)}\\div${tex_fraction(c,d)}=${tex_fraction(a,1)}\\times${tex_fraction(d,c)}=\\dfrac{${a}}{1}\\times${tex_fraction(d,c)}=${tex_fraction(a +'\\times'+d,'1\\times'+c)}=${tex_fraction(a*d,c)}$`
			//		}
			//		else {
			//			texte_corr= `$${tex_fraction(a,1)}\\div${tex_fraction(c,d)}=${tex_fraction(a,1)}\\times${tex_fraction(d,c)}=${tex_fraction(a*d,c)}=${tex_fraction_reduite(a*d,c)}$`
			//		}
			//		break
			//	
				case 1 : // fraction * fraction tout positif
				texte=`$${tex_fraction(a,b)}\\div${tex_fraction(c,d)}=$`;
				if (p==1) {
					texte_corr= `$${tex_fraction(a,b)}\\div${tex_fraction(c,d)}=${tex_fraction(a,b)}\\times${tex_fraction(d,c)}=${tex_fraction(a +'\\times'+d,b+'\\times'+c)}=${tex_fraction(a*d,b*c)}$`
				}
				else {
					texte_corr= `$${tex_fraction(a,b)}\\div${tex_fraction(c,d)}=${tex_fraction(a,b)}\\times${tex_fraction(d,c)}=${tex_fraction(a +'\\times'+d,b+'\\times'+c)}=${tex_fraction(a*d,b*c)}=${tex_fraction(a*d/p +'\\times\\cancel{'+p+'}',b*c/p+'\\times\\cancel{'+p+'}')}=${tex_fraction(a*d/p,b*c/p)}$`

				}
				break
			
				case 2 :
					a=a*randint(-1,1,[0]);
					b=b*randint(-1,1,[0]);
					c=c*randint(-1,1,[0]);
					d=d*randint(-1,1,[0]);
					nombre_de_signe_moins=(a<0)+(b<0)+(c<0)+(d<0);
					if (Math.pow(-1,nombre_de_signe_moins)==1) {signe=''} else {signe='-'}
					texte=`$${tex_fraction(a,b)}\\div${tex_fraction(c,d)}=$`;
					texte_corr= `$${tex_fraction(a,b)}\\div${tex_fraction(c,d)}$`
					a=abs(a);
					b=abs(b);
					c=abs(c);
					d=abs(d);
					p=pgcd(a*d,b*c);
					texte_corr+=`$=${signe}${tex_fraction(a,b)}\\times${tex_fraction(d,c)}$`
					texte_corr+=`$=${signe}${tex_fraction(a +'\\times'+ecriture_parenthese_si_negatif(d),b+'\\times'+ecriture_parenthese_si_negatif(c))}$`
					if (p==1) {
						texte_corr+=`$=${signe}${tex_fraction_signe(a*d,b*c)}$`
					}
					else {
	
						texte_corr+=`$=${signe}${tex_fraction(a*d,b*c)}$`
						if (a*d!=b*c){
							texte_corr+=`$=${signe}${tex_fraction(a*d/p +'\\times\\cancel{'+p+'}',b*c/p+'\\times\\cancel{'+p+'}')}$`
							texte_corr+=`$=${signe}${tex_fraction(a*d/p,b*c/p)}$`
						}
						else {
							texte_corr+=`$=${signe}1$`							
						}
					}	
				break	
			}
		
			if (this.liste_questions.indexOf(texte)==-1){ // Si la question n'a jamais été posée, on en créé une autre
				this.liste_questions.push(texte);
				this.liste_corrections.push(texte_corr);
				i++;
			}
			
			cpt++
		}
		liste_de_question_to_contenu(this); //Espacement de 2 em entre chaque questions.
	}
	this.besoin_formulaire_numerique = ['Niveau de difficulté',2,"1 : Fractions à numérateur et dénominateur positifs \n 2 : Fractions à numérateur et dénominateur relatifs"]
}

/**
* * Calcul fractionnaire : somme d'une fraction et du produit de deux autres fractions. Paramétrages possibles :
* 1 : Calcul avec nombres positifs sans piège de priorité
* * 2 : Calcul avec nombres positifs avec piège
* * 3 : Calcul avec nombres relatifs
* @auteur Jean-Claude Lhote
*/
function Exercice_additionner_fraction_produit(){
	Exercice.call(this); // Héritage de la classe Exercice()
	this.sup = 1 ; // Avec ou sans relatifs
	this.titre = "Fractions et priorités opératoires"
	this.consigne = "Calculer et donner le résultat sous forme irréductible"
	this.spacing = 2;
	this.spacing_corr = 2;
	this.nb_questions = 5;
	this.nb_cols_corr = 1;

	this.nouvelle_version = function(numero_de_l_exercice){
		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées
		let type_de_questions_disponibles
		liste_fractions = obtenir_liste_fractions_irreductibles();
		let nombre_de_signe_moins;
		if (this.sup==1) {type_de_questions_disponibles = [1,1,2,2]} // 1*nombre entier,3*fraction (pas de négatifs)
		else if (this.sup==2) {type_de_questions_disponibles = [2,2,3,3]} // fractions, 2*positifs, 2*relatifs
		else {type_de_questions_disponibles = [3]}
		
		let liste_type_de_questions = combinaison_listes(type_de_questions_disponibles,this.nb_questions)
		for (let i = 0,ab,cd,ef, a, b, c, d, e, f, p, k1, k2, signe1,signe2, texte, texte_corr, type_de_questions, cpt=0; i < this.nb_questions&&cpt<50;) {
			type_de_questions = liste_type_de_questions[i];
			ab=choice(liste_fractions);
			cd=choice(liste_fractions);
			ef=choice(liste_fractions)
			a=ab[0];
			b=ab[1];
			c=cd[0];
			d=cd[1];
			e=ef[0];
			f=ef[1];
	
			switch (type_de_questions){
				case 1 : // sans piège fraction1 + fraction2 x fraction3 (tout positif)
					texte=`$${tex_fraction(a,b)}+${tex_fraction(c,d)}\\times${tex_fraction(e,f)}$`;
					
					p=pgcd(c*e,d*f);
					texte_corr= `$${tex_fraction(a,b)}+${tex_fraction(c,d)}\\times${tex_fraction(e,f)}$`;
					texte_corr+=`$=${tex_fraction(a,b)}+${tex_fraction(c +'\\times'+e,d+'\\times'+f)}$`;
					texte_corr+=`$=${tex_fraction(a,b)}+${tex_fraction(c*e,d*f)}$`;
					// faut-il simplifier c*e/d*f
					if ((p!=1)&&(ppcm(b,d*f)>ppcm(b,d*f/p))) {
						texte_corr+=`$=${tex_fraction(a,b)}+${tex_fraction(e*c/p +'\\times\\cancel{'+p+'}',f*d/p+'\\times\\cancel{'+p+'}')}$`
						c=e*c/p;
						d=f*d/p;
					}
					else {
						c=e*c;
						d=f*d;
					}
					p=ppcm(b,d); // p = dénominateur commun
					k1=p/b;
					k2=p/d;
					if (k1!=1) {
						texte_corr+=`$=${tex_fraction(a+mise_en_evidence('\\times'+k1),b+mise_en_evidence('\\times'+k1))}$`;
					} 
					else {
						texte_corr+=`$=${tex_fraction(a,b)}$`	
					}
					if (k2!=1) {
						texte_corr+=`$+${tex_fraction(c+mise_en_evidence('\\times'+k2),d+mise_en_evidence('\\times'+k2))}$`;
					} 
					else {
						texte_corr+=`$+${tex_fraction(c,d)}$`	
					}
								
					texte_corr+=`$=${tex_fraction(a*k1,p)}+${tex_fraction(c*k2,p)}$`;
					e=a*k1+c*k2;
					f=p;
					texte_corr+=`$=${tex_fraction(e,f)}$`;
					p=pgcd(e,f);
					// faut-il simplifier e/f
					if (p!=1) {
						texte_corr+=`$=${tex_fraction(e/p +'\\times\\cancel{'+p+'}',f/p+'\\times\\cancel{'+p+'}')}$`
						texte_corr+=`$=${tex_fraction_reduite(e/p,f/p)}$`;
					}
				
					break
				
				case 2 : // avec piege addition non prioritaire fraction1 + fraction2 * fraction3 tout positif
					d = b;
					
					texte = `$${tex_fraction(a, b)}+${tex_fraction(c, d)}\\times${tex_fraction(e, f)}$`;
				
					p = pgcd(c * e, d * f);
					texte_corr = `$${tex_fraction(a, b)}+${tex_fraction(c, d)}\\times${tex_fraction(e, f)}$`;
					texte_corr += `$=${tex_fraction(a, b)}+${tex_fraction(c + '\\times' + e, d + '\\times' + f)}$`;
					texte_corr += `$=${tex_fraction(a, b)}+${tex_fraction(c * e, d * f)}$`
					
					// faut-il simplifier c*e/d*f
					if ((p!=1)&&(ppcm(b,d*f)>ppcm(b,d*f/p))) {
						texte_corr+=`$=${tex_fraction(a,b)}+${tex_fraction(e*c/p +'\\times\\cancel{'+p+'}',f*d/p+'\\times\\cancel{'+p+'}')}$`
						c=e*c/p;
						d=f*d/p;
					}
					else {
						c=e*c;
						d=f*d;
					}
					p = ppcm(b, d); //denominateur commun = p
					k1 = p / b;
					k2 = p / d;
					if (k1 != 1) {
						texte_corr += `$=${tex_fraction(a + mise_en_evidence('\\times' + k1), b + mise_en_evidence('\\times' + k1))}$`
					}
					else {
						texte_corr += `$=${tex_fraction(a, b)}$`
					}
					if (k2 != 1) {
						texte_corr += `$+${tex_fraction(c + '\\times' + k2, d + '\\times' + k2)}$`
					}
					else {
						texte_corr += `$+${tex_fraction(c, d)}$`
					}
					texte_corr += `$=${tex_fraction(a * k1, b * k1)}+${tex_fraction(c * k2, d * k2)}=${tex_fraction(a * k1 + c * k2, p)}$`
					e=a * k1 + c * k2;
					f=p;
					texte_corr+=`$=${tex_fraction(e,f)}$`;
					p=pgcd(e,f);
					// faut-il simplifier e/f
					if (p!=1) {
						texte_corr+=`$=${tex_fraction(e/p +'\\times\\cancel{'+p+'}',f/p+'\\times\\cancel{'+p+'}')}$`
						texte_corr+=`$=${tex_fraction_reduite(e/p,f/p)}$`;
					}
			
				break

				case 3 :
					a=a*randint(-1,1,[0]);
					b=b*randint(-1,1,[0]);
					c=c*randint(-1,1,[0]);
					d=d*randint(-1,1,[0]);
					e=e*randint(-1,1,[0]);
					f=f*randint(-1,1,[0]);

					nombre_de_signe_moins=(c<0)+(d<0)+(e<0)+(f<0);
					if (Math.pow(-1,nombre_de_signe_moins)==1) {signe2='+'} else {signe2='-'}
					texte=`$${tex_fraction(a,b)}+${tex_fraction(c,d)}\\times${tex_fraction(e,f)}=$`;
					texte_corr=`$${tex_fraction(a,b)}+${tex_fraction(c,d)}\\times${tex_fraction(e,f)}$`
					
					c=abs(c); // gestion du signe du produit avec {signe}
					d=abs(d);
					e=abs(e);
					f=abs(f);
					
					
					if (a*b>0) {  //suppression des signes - superflus de la première fraction
					
						signe1=''
					} else {signe1='-'}

					a=abs(a);
					b=abs(b);

					texte_corr+=`$=${signe1}${tex_fraction(a,b)}${signe2}${tex_fraction(c +'\\times'+e,d+'\\times'+f)}$`
					texte_corr+=`$=${signe1}${tex_fraction(a,b)}${signe2}${tex_fraction(c*e,d*f)}$`
					
					p=pgcd(c*e,d*f);
					// faut-il simplifier c*e/d*f
					if ((p!=1)&&(ppcm(b,d*f)>ppcm(b,d*f/p))) {
						texte_corr+=`$=${signe1}${tex_fraction(a,b)}${signe2}${tex_fraction(e*c/p +'\\times\\cancel{'+p+'}',f*d/p+'\\times\\cancel{'+p+'}')}$`
						c=e*c/p;
						d=f*d/p;
					}
					else {
						c=e*c;
						d=f*d;
					}
					p=ppcm(d,b);  // mise au même dénominateur
					if (((d)%b!=0)&&(b%(d)!=0)) {
						// dénominateur commun = p
						k1=p/b;
						k2=p/d;
						texte_corr+=`$=${signe1}${tex_fraction(a+mise_en_evidence('\\times'+k1),b+mise_en_evidence('\\times'+k1))}${signe2}${tex_fraction(c+mise_en_evidence('\\times'+k2),d+mise_en_evidence('\\times'+k2))}$`
						texte_corr+=`$=${signe1}${tex_fraction(a*k1,b*k1)}${signe2}${tex_fraction(c*k2,d*k2)}$`
						texte_corr+=`$=${tex_fraction(signe1+a*k1+signe2+c*k2,b*k1)}$`
						a=a*k1;
						c=c*k2;
						d=p;
					}
					else {
						if (p==d) {
							k1=d/b;  // d = dénominateur commun
							texte_corr+=`$=${signe1}${tex_fraction(a+mise_en_evidence('\\times'+k1),b+mise_en_evidence('\\times'+k1))}${signe2}${tex_fraction(c,d)}$`
						texte_corr+=`$=${signe1}${tex_fraction(a*k1,d)}${signe2}${tex_fraction(c,d)}$`
						texte_corr+=`$=${tex_fraction(signe1+a*k1+signe2+c,d)}$`	
						a=a*k1;
						} 
						else{  // b=k2*d
							k2=b/d;  // b= dénominateur commun
							texte_corr+=`$=${signe1}${tex_fraction(a,b)}${signe2}${tex_fraction(c+mise_en_evidence('\\times'+k2),d+mise_en_evidence('\\times'+k2))}$`
						texte_corr+=`$=${signe1}${tex_fraction(a,b)}${signe2}${tex_fraction(c*k2,b)}$`
						texte_corr+=`$=${tex_fraction(signe1+a+signe2+c*k2,b)}$`
						c=c*k2;
						d=d*k2;
						}
					}
					
					if (a!=c) {
						e=0;
						if (signe1=='') {
							e=a;
						}
						else {
							e=-a
						}
						if (signe2=='+') {e+=c} else {e=e-c}

					}
					else {
						if (((signe1=='-')&&(signe2=='+'))||((signe1=='')&&(signe2=='-'))) {
							e=0;	
						}
						else {
							e=0;
							if (signe1=='') {e=a+c} else {e=-a-c}
						}
					}
					
					texte_corr+=`$=${tex_fraction_signe(e,d)}$`
					p=pgcd(abs(e),d);
					if (p!=1) {
						f=d/p;
						e=e/p;
						if (e>0) { // fraction positive => pas de signe
						texte_corr+=`$=${tex_fraction(e+'\\times\\cancel{'+p+'}',f+'\\times\\cancel{'+p+'}')}$`
						texte_corr+=`$=${tex_fraction(e,f)}$`
						}
						else {  // numérateur négatif => signe - devant les fractions suivantes.
							texte_corr+=`$=-${tex_fraction(-e+'\\times\\cancel{'+p+'}',f+'\\times\\cancel{'+p+'}')}$`
							texte_corr+=`$=-${tex_fraction(-e,f)}$`	
						}
					}

				break	
			}
			
			if (this.liste_questions.indexOf(texte)==-1){ // Si la question n'a jamais été posée, on en créé une autre
				this.liste_questions.push(texte);
				this.liste_corrections.push(texte_corr);
				i++;
			}
			cpt++
		}
		liste_de_question_to_contenu(this); //Espacement de 2 em entre chaque questions.
	}
	this.besoin_formulaire_numerique = ['Niveau de difficulté',3,"1 : nombres positifs sans piège de priorité\n 2 : 2 calculs avec positifs et piège de priorité et 2 calculs avec relatifs\n 3 : calculs avec relatifs"]
}

/**
* Développer en utilisant la distributivité simple
*
* * La lettre peut être x, y, z, t, a, b ou c
* * 3 fois sur 6 c'est une distributivité simple :  k(ax+b)
* * 1 fois sur 6 c'est une distributivité simple : (ax+b)×k
* * 1 fois sur 6, la variable est en facteur : kx(ax+b)
* * 1 fois sur 6 il faut ensuite réduire : k(ax+b)+c
* 
* Niveau de difficulté : 
* * 1 : Multiplication par un facteur positif
* * 2: Multiplication par un facteur relatif
* @Auteur Rémi Angot
*/
function Exercice_developper(difficulte=1){
	Exercice.call(this); // Héritage de la classe Exercice()
	this.sup = difficulte ;
	this.titre = "Utiliser la simple distributivité";
	this.consigne = 'Développer.';
	this.spacing = 1;
	this.nb_questions = 5 ;


	this.nouvelle_version = function(numero_de_l_exercice){
		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées
		
		let lettre = ['x','y','z','t','a','b','c'];
		let type_de_questions_disponibles = ['simple','simple','simple','simple2','x_en_facteur','developper_et_reduire']
		let liste_type_de_questions = combinaison_listes(type_de_questions_disponibles,this.nb_questions) // Tous les types de questions sont posées mais l'ordre diffère à chaque "cycle"
		for (let i = 0, texte, texte_corr, cpt=0; i < this.nb_questions && cpt<50; ) {
			type_de_questions = liste_type_de_questions[i];
			let k = randint(2,11);
			if (this.sup>1){ // si difficulté 2, k peut être négatif
				k = k*choice([-1,1])
			}
			let a = randint(1,9);
			let b = randint(1,9)*choice([-1,1]);
			let inconnue = choice(lettre);
			switch (type_de_questions){
				case 'simple' :
					if (a==1){ // ne pas écrire 1x
						texte = `$${lettre_depuis_chiffre(i+1)}=${k}(${inconnue}${ecriture_algebrique(b)})$`;
					} else {
						texte = `$${lettre_depuis_chiffre(i+1)}=${k}(${a}${inconnue}${ecriture_algebrique(b)})$`;
					}
					
					if (a==1){ // ne pas écrire 1x
						texte_corr = `$${lettre_depuis_chiffre(i+1)}=${k}(${inconnue}${ecriture_algebrique(b)})=${k}
						\\times ${inconnue}+${ecriture_parenthese_si_negatif(k)}\\times${ecriture_parenthese_si_negatif(b)}=${k*a}${inconnue}${ecriture_algebrique(k*b)}$`;
					} else {
						texte_corr = `$${lettre_depuis_chiffre(i+1)}=${k}(${a}${inconnue}${ecriture_algebrique(b)})=${k}
						\\times ${a}${inconnue}+${ecriture_parenthese_si_negatif(k)}\\times${ecriture_parenthese_si_negatif(b)}=${k*a}${inconnue}${ecriture_algebrique(k*b)}$`;
					}
					break ;
				case 'simple2' :
					if (a==1){ // ne pas écrire 1x
						texte = `$${lettre_depuis_chiffre(i+1)}=(${inconnue}${ecriture_algebrique(b)})\\times${ecriture_parenthese_si_negatif(k)}$`;
					} else {
						texte = `$${lettre_depuis_chiffre(i+1)}=(${a}${inconnue}${ecriture_algebrique(b)})\\times${ecriture_parenthese_si_negatif(k)}$`;
					}
					
					if (a==1){ // ne pas écrire 1x
						texte_corr = `$${lettre_depuis_chiffre(i+1)}=(${inconnue}${ecriture_algebrique(b)})\\times${ecriture_parenthese_si_negatif(k)}=${k}
						\\times ${inconnue}+${ecriture_parenthese_si_negatif(k)}\\times${ecriture_parenthese_si_negatif(b)}=${k*a}${inconnue}${ecriture_algebrique(k*b)}$`;
					} else {
						texte_corr = `$${lettre_depuis_chiffre(i+1)}=(${a}${inconnue}${ecriture_algebrique(b)})\\times${ecriture_parenthese_si_negatif(k)}=${k}
						\\times ${a}${inconnue}+${ecriture_parenthese_si_negatif(k)}\\times${ecriture_parenthese_si_negatif(b)}=${k*a}${inconnue}${ecriture_algebrique(k*b)}$`;

					}
					break ;
				case 'x_en_facteur' :
					if (a==1){ // ne pas écrire 1x
						texte = `$${lettre_depuis_chiffre(i+1)}=${k}${inconnue}(${inconnue}${ecriture_algebrique(b)})$`;
					} else {
						texte = `$${lettre_depuis_chiffre(i+1)}=${k}${inconnue}(${a}${inconnue}${ecriture_algebrique(b)})$`;
					}
					
					if (a==1){ // ne pas écrire 1x
						texte_corr = `$${lettre_depuis_chiffre(i+1)}=${k}${inconnue}(${inconnue}${ecriture_algebrique(b)})=${k}${inconnue}\\times ${inconnue} ${signe(k*b)}${k}${inconnue}\\times ${abs(b)}=${k*a}${inconnue}^2${ecriture_algebrique(k*b)}${inconnue}$`;
					} else {
						if (k>0) {
							texte_corr = `$${lettre_depuis_chiffre(i+1)}=${k}${inconnue}(${a}${inconnue}${ecriture_algebrique(b)})=${k}${inconnue}\\times ${a}${inconnue} + ${k}${inconnue}\\times ${ecriture_parenthese_si_negatif(b)}=${k*a}${inconnue}^2${ecriture_algebrique(k*b)}${inconnue}$`;
						} else {
							texte_corr = `$${lettre_depuis_chiffre(i+1)}=${k}${inconnue}(${a}${inconnue}${ecriture_algebrique(b)})=${k}${inconnue}\\times ${a}${inconnue} + (${k}${inconnue})\\times ${ecriture_parenthese_si_negatif(b)}=${k*a}${inconnue}^2${ecriture_algebrique(k*b)}${inconnue}$`;
						}

					}
					break ;
				case 'developper_et_reduire' :
					let c = randint(2,9);
					if (a==1){ // ne pas écrire 1x
						texte = `$${lettre_depuis_chiffre(i+1)}=${k}(${inconnue}${ecriture_algebrique(b)})+${c}$`;
					} else {
						texte = `$${lettre_depuis_chiffre(i+1)}=${k}(${a}${inconnue}${ecriture_algebrique(b)})+${c}$`;
					}
					
					if (a==1){ // ne pas écrire 1x
						texte_corr = `$${lettre_depuis_chiffre(i+1)}=${k}(${inconnue}${ecriture_algebrique(b)})+${c}=${k}\\times ${inconnue}+${ecriture_parenthese_si_negatif(k)}\\times${ecriture_parenthese_si_negatif(b)}+${c}
						=${k*a}${inconnue}${ecriture_algebrique(k*b)}+${c}=${k*a}${inconnue}${ecriture_algebrique(k*b+c)}$`;
					} else {
						texte_corr = `$${lettre_depuis_chiffre(i+1)}=${k}(${a}${inconnue}${ecriture_algebrique(b)})+${c}=${k}\\times${ecriture_parenthese_si_moins(a+inconnue)}+${ecriture_parenthese_si_negatif(k)}\\times${ecriture_parenthese_si_negatif(b)}+${c}
						=${k*a}${inconnue}${ecriture_algebrique(k*b)}+${c}=${k*a}${inconnue}${ecriture_algebrique(k*b+c)}$`;
					}
					break ;
			}
			
			if (this.liste_questions.indexOf(texte)==-1){ // Si la question n'a jamais été posée, on en créé une autre
				this.liste_questions.push(texte);
				this.liste_corrections.push(texte_corr);
				i++;
			}
			cpt++;	
		}
		liste_de_question_to_contenu(this);
	}
	this.besoin_formulaire_numerique = ['Niveau de difficulté',2,'1 : Multiplication par un facteur positif\n2: Multiplication par un facteur relatif'] 
}

/**
* Équation du premier degré
* * Type 1 : x+a=b ou ax=b
* * Type 2 : ax+b=c
* * Type 3 : ax+b=cx+d
* * Tous les types
* @Auteur Rémi Angot
*/
function Exercice_equation1(){
	Exercice.call(this); // Héritage de la classe Exercice()
	this.titre = "Équation du premier degré"
	this.consigne = 'Résoudre les équations suivantes'
	this.spacing = 2;
	sortie_html ? this.spacing_corr = 3 : this.spacing_corr = 2;
	this.correction_detaillee_disponible = true;
	this.sup = true; // Avec des nombres relatifs
	this.sup2 = 4; // Choix du type d'équation 

	this.nouvelle_version = function(numero_de_l_exercice){
		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées
		switch (this.sup2.toString()){
			case '1':
			liste_type_de_questions = ['ax=b','x+b=c'];
			break
			case '2':
			liste_type_de_questions = ['ax+b=c'];
			break
			case '3':
			liste_type_de_questions = ['ax+b=cx+d'];
			break
			default:
			liste_type_de_questions = ['ax+b=0','ax+b=c','ax=b','x+b=c','ax+b=cx+d'];
			break

		}
		liste_type_de_questions = combinaison_listes(liste_type_de_questions,this.nb_questions)
		for (let i = 0, a, b, c, d, texte, texte_corr, cpt=0; i < this.nb_questions && cpt<50;) { // On limite le nombre d'essais pour chercher des valeurs nouvelles
			a = randint(2,13);
			b = randint(1,13);
			c = randint(1,13);
			d = randint(1,13);
			if (this.sup) {
				a *= choice([-1,1]);
				b *= choice([-1,1]);
				c *= choice([-1,1]);
				d *= choice([-1,1]);

			}
			if (liste_type_de_questions[i]=='ax+b=0' || liste_type_de_questions[i]=='ax+b=c') {
				if (liste_type_de_questions[i]=='ax+b=0') {c = 0}
				if (!this.sup && c<b) {
					b = randint(1,9)
					c = randint(b,15) // c sera plus grand que b pour que c-b>0
				}
				texte = `$${a}x${ecriture_algebrique(b)}=${c}$`;
				texte_corr = texte+'<br>';
				if (this.correction_detaillee) {
					if (b>0) {
						texte_corr += `On soustrait $${b}$ aux deux membres.<br>`	
					} else {
						texte_corr += `On ajoute $${-1*b}$ aux deux membres.<br>`
					}
				}
				texte_corr += `$${a}x${ecriture_algebrique(b)}${mise_en_evidence(ecriture_algebrique(-1*b))}=${c}${mise_en_evidence(ecriture_algebrique(-1*b))}$<br>`;
				texte_corr += `$${a}x=${c-b}$<br>`
				if (this.correction_detaillee) {texte_corr += `On divise les deux membres par $${a}$.<br>`}
				texte_corr += `$${a}x${mise_en_evidence('\\div'+ecriture_parenthese_si_negatif(a))}=${c-b+mise_en_evidence('\\div'+ecriture_parenthese_si_negatif(a))}$<br>`
				texte_corr += `$x=${tex_fraction(c-b,a)}$`
				if (pgcd(abs(a),abs(c-b))>1 || a<0){
					texte_corr += `<br>$x=${tex_fraction_reduite(c-b,a)}$`
				}
				texte_corr += `<br> La solution est $${tex_fraction_reduite(c-b,a)}$.`
			}
			if (liste_type_de_questions[i]=='x+b=c') {
				if (!this.sup && c<b) {
					b = randint(-9,9,[0]) // b peut être négatif, ça sera une équation du type x-b=c
					c = abs(randint(b,15)) // c sera plus grand que b pour que c-b>0
				}
				texte = `$x${ecriture_algebrique(b)}=${c}$`;
				texte_corr = texte+'<br>';
				if (this.correction_detaillee) {
					if (b>0) {
						texte_corr += `On soustrait $${b}$ aux deux membres.<br>`	
					} else {
						texte_corr += `On ajoute $${-1*b}$ aux deux membres.<br>`
					}
				}
				texte_corr += `$x${ecriture_algebrique(b)}${mise_en_evidence(ecriture_algebrique(-1*b))}=${c}${mise_en_evidence(ecriture_algebrique(-1*b))}$<br>`;
				texte_corr += `$x=${c-b}$`
				texte_corr += `<br> La solution est $${c-b}$.`
			}
			if (liste_type_de_questions[i]=='ax=b') {
				texte = `$${a}x=${b}$`;
				texte_corr = texte+'<br>';
				if (this.correction_detaillee) {texte_corr += `On divise les deux membres par $${a}$.<br>`}
				texte_corr += `$${a}x${mise_en_evidence('\\div'+ecriture_parenthese_si_negatif(a))}=${b+mise_en_evidence('\\div'+ecriture_parenthese_si_negatif(a))}$<br>`
				texte_corr += `$x=${tex_fraction(b,a)}$`
				if (pgcd(abs(a),abs(b))>1 || a<0){
					texte_corr += `<br>$x=${tex_fraction_reduite(b,a)}$`
				}
				texte_corr += `<br> La solution est $${tex_fraction_reduite(b,a)}$.`
			}
			if (liste_type_de_questions[i]=='ax+b=cx+d') {
				if (c==a) {c = randint(1,13,[a])} // sinon on arrive à une division par 0
				if (!this.sup && a<c) {
					c = randint(1,9)
					a = randint(c+1,15) // a sera plus grand que c pour que a-c>0
				}
				if (!this.sup && d<b) {
					b = randint(1,9)
					d = randint(b+1,15) // d sera plus grand que b pour que d-b>0
				}
				texte = `$${rien_si_1(a)}x${ecriture_algebrique(b)}=${rien_si_1(c)}x${ecriture_algebrique(d)}$`;
				texte_corr = texte+'<br>';
				if (this.correction_detaillee) {
					if (c>0) {
						texte_corr += `On soustrait $${rien_si_1(c)}x$ aux deux membres.<br>`	
					} else {
						texte_corr += `On ajoute $${rien_si_1(-1*c)}x$ aux deux membres.<br>`
					}
				}
				texte_corr += `$${rien_si_1(a)}x${ecriture_algebrique(b)}${mise_en_evidence(signe(-1*c)+rien_si_1(abs(c))+'x')}=${c}x+${d}${mise_en_evidence(signe(-1*c)+rien_si_1(abs(c))+'x')}$<br>`;
				texte_corr += `$${rien_si_1(a-c)}x${ecriture_algebrique(b)}=${d}$<br>`
				if (this.correction_detaillee) {
					if (b>0) {
						texte_corr += `On soustrait $${b}$ aux deux membres.<br>`	
					} else {
						texte_corr += `On ajoute $${-1*b}$ aux deux membres.<br>`
					}
				}
				texte_corr += `$${rien_si_1(a-c)}x${mise_en_evidence(ecriture_algebrique(-1*b))}=${d}${mise_en_evidence(ecriture_algebrique(-1*b))}$<br>`
				texte_corr += `$${rien_si_1(a-c)}x=${d-b}$<br>`

				if (this.correction_detaillee) {texte_corr += `On divise les deux membres par $${a-c}$.<br>`}
				texte_corr += `$${rien_si_1(a-c)}x${mise_en_evidence('\\div'+ecriture_parenthese_si_negatif(a-c))}=${d-b+mise_en_evidence('\\div'+ecriture_parenthese_si_negatif(a-c))}$<br>`
				texte_corr += `$x=${tex_fraction(d-b,a-c)}$`
				if (pgcd(abs(d-b),abs(a-c))>1 || (a-c)<0){
					texte_corr += `<br>$x=${tex_fraction_reduite(d-b,a-c)}$`
				}
				texte_corr += `<br> La solution est $${tex_fraction_reduite(d-b,a-c)}$.`
			}
				
			if (this.liste_questions.indexOf(texte)==-1){ // Si la question n'a jamais été posée, on en créé une autre
				this.liste_questions.push(texte)//replace(/1x/g,'x')); //remplace 1x par x
				this.liste_corrections.push(texte_corr) //.replace(/1x/g,'x')); //remplace 1x par x
				i++;
			}
			cpt++;
		}
		liste_de_question_to_contenu(this);
	}
	 this.besoin_formulaire_case_a_cocher  = ['Avec des nombres relatifs'];	
	 this.besoin_formulaire2_numerique = ["Type d'équations",4,"1 : ax=b ou x+a=b ou x-a=b\n2: ax+b=c\n3: ax+b=cx+d\n4: Les 2 types précédents"] 	
}

/**
* @auteur Jean-Claude Lhote
*/
function Exercice_Thales(){
'use strict';
	Exercice.call(this); // Héritage de la classe Exercice()
	this.titre = "Déterminer une longueur avec la propriété de Thales";
	this.consigne = "";
	this.nb_questions = 1;
	this.nb_questions_modifiable = false;
	sortie_html ? this.spacing_corr = 3.5 : this.spacing_corr = 1
	this.nb_cols = 1;
	this.nb_cols_corr = 1;
	this.quatrieme=false;
	this.sup = 1; // 1 calcul direct | 2 calcul en deux étapes | 3 version 1&2 sans figure
	this.liste_packages = 'tkz-euclide';
	// paramètres communs Html ou Latex
	

	// let s1='A',s2='B',s3='C',s4='M',s5='N'
		// coefficient de l'homothétie compris entre -0,8 et -0,2 ou entre 0,2 et 0,8 pour éviter les constructions trop serrées
		this.nouvelle_version = function(numero_de_l_exercice){
		this.liste_questions = [];
		this.liste_corrections = [];
		let lettre1 = randint(1,26)	// aleatoirisation du nom des points
		let s1 = lettre_depuis_chiffre(lettre1)
		let lettre2 = randint(1, 26, [lettre1])
		let s2 = lettre_depuis_chiffre(lettre2)
		let lettre3 = randint(1, 26, [lettre1, lettre2])
		let s3 = lettre_depuis_chiffre(lettre3)
		let lettre4 = randint(1, 26, [lettre1, lettre2, lettre3])
		let s4 = lettre_depuis_chiffre(lettre4)
		let lettre5 = randint(1, 26, [lettre1, lettre2, lettre3, lettre4])
		let s5 = lettre_depuis_chiffre(lettre5)
		let x2 = randint(2,4)
		let y2 = randint(3, 5)
		let x3 = randint(5, 6)
		let y3 = randint(-2, 1)
		let k = randint(2, 8) * randint(-1, 1, [0]) / 10
		if (this.quatrieme) {k=abs(k)}	
		let dist23 = arrondi(Math.sqrt((x3-x2)**2+(y3-y2)**2),1) 		//calcul des longueurs du triangle principal
		let dist12 = arrondi(Math.sqrt(x2**2 + y2**2),1)
		let dist13 = arrondi(Math.sqrt(x3**2+ y3**2),1)
		let dist15 = arrondi(dist13 * abs(k),2)  
		let dist45 = arrondi(dist23 * abs(k),2)		
		let dist35,texte,texte_corr;
		let dist14 = arrondi(dist12*abs(k),2); // calcul des longueurs demandées à partir 
		
		// On ne garde qu'une approximation au dixième pour l'exercice

		let s45 = tex_nombrec(dist45)			// mise en texte avec 1 chiffres après la virgule pour énoncé
		let s13 = tex_nombrec(dist13)
		let s12 = tex_nombrec(dist12)
		let s15 = tex_nombrec(dist15)
		let s14 = tex_nombrec(dist14)
		let s23 = tex_nombrec(dist23)
		if (k < 0) { dist35 = dist13 + dist15 } else { dist35 = dist13 - dist15 } // calcul de la longueur intermédiaire dans un cas classique ou en papillon
		let s35 = tex_nombrec(dist35)  // à priori, c'est déjà arrondi au dixième, mais je me méfie des calculs flottants en js
		let niv_diff=randint(1,2);
		if (sortie_html) {
			this.type_exercice = 'MG32';
			this.taille_div_MG32 = [700,500];
			let codeBase64

			if (k<0) {codeBase64 ="TWF0aEdyYXBoSmF2YTEuMAAAABI+TMzNAAJmcv###wEA#wEAAAAAAAAAAAYfAAADsgAAAQEAAAAAAAAAAQAAACX#####AAAAAQAKQ0NhbGNDb25zdAD#####AAJwaQAWMy4xNDE1OTI2NTM1ODk3OTMyMzg0Nv####8AAAABAApDQ29uc3RhbnRlQAkh+1RELRj#####AAAAAQAKQ1BvaW50QmFzZQD#####AAAAAAAWAAJBJwBANgAAAAAAAEAzAAAAAAAABwABQHYBR64UeuFAcdwo9cKPXP####8AAAABABRDRHJvaXRlRGlyZWN0aW9uRml4ZQD#####AQAAAAAQAAABAAEAAAABAT#wAAAAAAAA#####wAAAAEAD0NQb2ludExpZURyb2l0ZQD#####AQAAAAAQAAJJJwDAGAAAAAAAAAAAAAAAAAAABQABQEerQ5WBBiUAAAAC#####wAAAAEACUNEcm9pdGVBQgD#####AQAAAAASAAABAAEAAAABAAAAA#####8AAAABABZDRHJvaXRlUGVycGVuZGljdWxhaXJlAP####8BAAAAABAAAAEAAQAAAAEAAAAE#####wAAAAEACUNDZXJjbGVPQQD#####AQAAAAABAAAAAQAAAAP#####AAAAAQAQQ0ludERyb2l0ZUNlcmNsZQD#####AAAABQAAAAb#####AAAAAQAQQ1BvaW50TGllQmlwb2ludAD#####AQAAAAAQAAABBQABAAAABwAAAAkA#####wEAAAAAEAACSicAwCgAAAAAAADAEAAAAAAAAAUAAgAAAAf#####AAAAAgAHQ1JlcGVyZQD#####AObm5gABAAAAAQAAAAMAAAAJAAAAAAAAAQAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAT#wAAAAAAAAAAAAAT#wAAAAAAAA#####wAAAAEACkNVbml0ZXhSZXAA#####wAEdW5pdAAAAAr#####AAAAAQALQ0hvbW90aGV0aWUA#####wAAAAH#####AAAAAQAKQ09wZXJhdGlvbgMAAAABP#AAAAAAAAD#####AAAAAQAPQ1Jlc3VsdGF0VmFsZXVyAAAAC#####8AAAABAAtDUG9pbnRJbWFnZQD#####AQAAAAASAAJXIgEBAAAAAAMAAAAM#####wAAAAEACUNMb25ndWV1cgD#####AAAAAQAAAA3#####AAAAAQAHQ0NhbGN1bAD#####AAJ4MgABMgAAAAFAAAAAAAAAAAAAABEA#####wACeTIAATUAAAABQBQAAAAAAAAAAAARAP####8AAngzAAE2AAAAAUAYAAAAAAAAAAAAEQD#####AAJ5MwACLTH#####AAAAAQAMQ01vaW5zVW5haXJlAAAAAT#wAAAAAAAAAAAAEQD#####AAFrAAQtMC41AAAAEgAAAAE#4AAAAAAAAP####8AAAABABBDUG9pbnREYW5zUmVwZXJlAP####8BAAAAABgAAlonAAAAAAAAAAAAQAgAAAAAAAAHAAAAAAoAAAABAAAAAAAAAAAAAAABAAAAAAAAAAAAAAATAP####8AAAAAABgAAkInAMAwAAAAAAAAwEOAAAAAAAAHAAAAAAoAAAAOAAAADwAAAA4AAAAQAAAAEwD#####AAAAAAAYAAJDJwAAAAAAAAAAAEAIAAAAAAAABwAAAAAKAAAADgAAABEAAAAOAAAAEgAAAAwA#####wAAABQAAAAOAAAAEwAAAA8A#####wAAAAAAGAACTScAwCQAAAAAAADAAAAAAAAAAAcAAAAAFQAAABcAAAAPAP####8AAAAAABgAAk4nAMAzAAAAAAAAwEMAAAAAAAAHAAAAABYAAAAX#####wAAAAEACUNQb2x5Z29uZQD#####AAAAAAACAAAABAAAABYAAAAVAAAAFAAAABYAAAAUAP####8AAAAAAAIAAAAEAAAAGQAAABQAAAAYAAAAGf####8AAAABABBDU3VyZmFjZVBvbHlnb25lAP####8BAAD#AAAABQAAABsAAAAVAP####8B#wAAAAAABQAAABr#####AAAAAQAQQ01hY3JvQXBwYXJpdGlvbgD#####AP8AAAH#####EECIoKPXCj1xQELhR64UeuECAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAZBcHBBTU4AAAAAAAEAAAAcAAAAABYA#####wD#AAAB#####xBAiLCj1wo9cUBUMKPXCj1wAgAAAAAAAAAAAAAAAAEAAAAAAAAAAAAGQXBwQUJDAAAAAAABAAAAHQD#####AAAAAQARQ01hY3JvRGlzcGFyaXRpb24A#####wD#AAAB#####xBAi+Cj1wo9cUBE4UeuFHrhAgAAAAAAAAAAAAAAAAEAAAAAAAAAAAAHTWFzcUFNTgAAAAAAAQAAABwAAAAXAP####8A#wAAAf####8QQIvoo9cKPXFAVPCj1wo9cAIAAAAAAAAAAAAAAAABAAAAAAAAAAAAB01hc3FBQkMAAAAAAAEAAAAd#####wAAAAEAC0NNYWNyb1BhdXNlAP####8A#wAAAf####8QQIj4o9cKPXFAX3Cj1wo9cAIAAAAAAAAAAAAAAAABAAAAAAAAAAAABVBhdXNlAAAAAAAB#####wAAAAEAEUNNYWNyb1N1aXRlTWFjcm9zAP####8A#wAAAf####8QQFHFHrhR64VAePwo9cKPXAIAAAAAAAAAAAAAAAABAAAAAAAAAAAAClRyaWFuZ2xlIDEAAAAAAAMAAAAfAAAAIgAAACEAAAAZAP####8A#wAAAf####8QQFFFHrhR64VAe3wo9cKPXAIAAAAAAAAAAAAAAAABAAAAAAAAAAAAClRyaWFuZ2xlIDIAAAAAAAMAAAAeAAAAIgAAACAAAAAO##########8="
			}
			else {codeBase64 ="TWF0aEdyYXBoSmF2YTEuMAAAABI+TMzNAAJmcv###wEA#wEAAAAAAAAAAAYfAAADsgAAAQEAAAAAAAAAAQAAACX#####AAAAAQAKQ0NhbGNDb25zdAD#####AAJwaQAWMy4xNDE1OTI2NTM1ODk3OTMyMzg0Nv####8AAAABAApDQ29uc3RhbnRlQAkh+1RELRj#####AAAAAQAKQ1BvaW50QmFzZQD#####AAAAAAAWAAJBJwDAKAAAAAAAAEAiAAAAAAAABwABQHMxR64UeuFAcbwo9cKPXP####8AAAABABRDRHJvaXRlRGlyZWN0aW9uRml4ZQD#####AQAAAAAOAAABAAEAAAABAT#wAAAAAAAA#####wAAAAEAD0NQb2ludExpZURyb2l0ZQD#####AQAAAAAQAAJJJwDAGAAAAAAAAAAAAAAAAAAABQABQEerQ5WBBiUAAAAC#####wAAAAEACUNEcm9pdGVBQgD#####AQAAAAASAAABAAEAAAABAAAAA#####8AAAABABZDRHJvaXRlUGVycGVuZGljdWxhaXJlAP####8BAAAAAA4AAAEAAQAAAAEAAAAE#####wAAAAEACUNDZXJjbGVPQQD#####AQAAAAABAAAAAQAAAAP#####AAAAAQAQQ0ludERyb2l0ZUNlcmNsZQD#####AAAABQAAAAb#####AAAAAQAQQ1BvaW50TGllQmlwb2ludAD#####AQAAAAAOAAABBQABAAAABwAAAAkA#####wEAAAAAEAACSicAwCgAAAAAAADAEAAAAAAAAAUAAgAAAAf#####AAAAAgAHQ1JlcGVyZQD#####AObm5gABAAAAAQAAAAMAAAAJAAAAAAAAAQAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAT#wAAAAAAAAAAAAAT#wAAAAAAAA#####wAAAAEACkNVbml0ZXhSZXAA#####wAEdW5pdAAAAAr#####AAAAAQALQ0hvbW90aGV0aWUA#####wAAAAH#####AAAAAQAKQ09wZXJhdGlvbgMAAAABP#AAAAAAAAD#####AAAAAQAPQ1Jlc3VsdGF0VmFsZXVyAAAAC#####8AAAABAAtDUG9pbnRJbWFnZQD#####AQAAAAASAAJXIgEBAAAAAAMAAAAM#####wAAAAEACUNMb25ndWV1cgD#####AAAAAQAAAA3#####AAAAAQAHQ0NhbGN1bAD#####AAJ4MgABMgAAAAFAAAAAAAAAAAAAABEA#####wACeTIAATUAAAABQBQAAAAAAAAAAAARAP####8AAngzAAE2AAAAAUAYAAAAAAAAAAAAEQD#####AAJ5MwACLTH#####AAAAAQAMQ01vaW5zVW5haXJlAAAAAT#wAAAAAAAAAAAAEQD#####AAFrAAMwLjUAAAABP+AAAAAAAAD#####AAAAAQAQQ1BvaW50RGFuc1JlcGVyZQD#####AQAAAAAYAAJaJwAAAAAAAAAAAEAIAAAAAAAABwAAAAAKAAAAAQAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAEwD#####AAAAAAAYAAJCJwDAMAAAAAAAAMBDgAAAAAAABwAAAAAKAAAADgAAAA8AAAAOAAAAEAAAABMA#####wAAAAAAGAACQycAAAAAAAAAAABACAAAAAAAAAcAAAAACgAAAA4AAAARAAAADgAAABIAAAAMAP####8AAAAUAAAADgAAABMAAAAPAP####8AAAAAABgAAk0nAMA7AAAAAAAAwDcAAAAAAAAHAAAAABUAAAAXAAAADwD#####AAAAAAAYAAJOJwDAKAAAAAAAAEAAAAAAAAAABwAAAAAWAAAAF#####8AAAABAAlDUG9seWdvbmUA#####wAAAAAAAgAAAAQAAAAWAAAAFQAAABQAAAAWAAAAFAD#####AAAAAAACAAAABAAAABkAAAAUAAAAGAAAABn#####AAAAAQAQQ1N1cmZhY2VQb2x5Z29uZQD#####AQAA#wAAAAUAAAAbAAAAFQD#####Af8AAAAAAAUAAAAa#####wAAAAEAEENNYWNyb0FwcGFyaXRpb24A#####wD#AAAB#####xBAiKCj1wo9cUBC4UeuFHrhAgAAAAAAAAAAAAAAAAEAAAAAAAAAAAAGQXBwQU1OAAAAAAABAAAAHAAAAAAWAP####8A#wAAAf####8QQIiwo9cKPXFAVDCj1wo9cAIAAAAAAAAAAAAAAAABAAAAAAAAAAAABkFwcEFCQwAAAAAAAQAAAB0A#####wAAAAEAEUNNYWNyb0Rpc3Bhcml0aW9uAP####8A#wAAAf####8QQIvgo9cKPXFAROFHrhR64QIAAAAAAAAAAAAAAAABAAAAAAAAAAAAB01hc3FBTU4AAAAAAAEAAAAcAAAAFwD#####AP8AAAH#####EECL6KPXCj1xQFTwo9cKPXACAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAdNYXNxQUJDAAAAAAABAAAAHf####8AAAABAAtDTWFjcm9QYXVzZQD#####AP8AAAH#####EECI+KPXCj1xQF9wo9cKPXACAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAVQYXVzZQAAAAAAAf####8AAAABABFDTWFjcm9TdWl0ZU1hY3JvcwD#####AP8AAAH#####EEBRxR64UeuFQHj8KPXCj1wCAAAAAAAAAAAAAAAAAQAAAAAAAAAAAApUcmlhbmdsZSAxAAAAAAADAAAAHwAAACIAAAAhAAAAGQD#####AP8AAAH#####EEBRRR64UeuFQHt8KPXCj1wCAAAAAAAAAAAAAAAAAQAAAAAAAAAAAApUcmlhbmdsZSAyAAAAAAADAAAAHgAAACIAAAAgAAAADv##########"
			}
			if (this.sup==1){  // calcul direct de AM et BC : pas de calcul intermédiaire de AN
				texte = `Dans la figure ci-dessous, les droites $(${s4+s5})$ et $(${s2+s3})$ sont parallèles.<br> $${s1+s2}=${s12}$ cm, $${s1+s3}=${s13}$ cm, $${s4+s5}=${s45}$ cm et $${s1+s5}=${s15}$ cm.<br>`
				texte += `Calculer $${s1+s4}$ et $${s2+s3}$.`
				if (k>0) {
					texte_corr = 'Dans le triangle '+`$${s1+s2+s3}$`+', les droites '+`$(${s4+s5})$`+' et '+`$(${s2+s3})$`+' sont parallèles.<br>'+' D&rsquo;après la propriété de Thales, on a '+`$${tex_fraction(s1+s4,s1+s2)}=${tex_fraction(s1+s5,s1+s3)}=${tex_fraction(s4+s5,s2+s3)}.$`+'<br>'
				}
				else {
					texte_corr = 'Les droites ' + `$(${s4+s5})$` + ' et ' + `$(${s2+s3})$` + ' sont parallèles.'
					texte_corr += `<br>Les points $${s2}$, $${s1}$, $${s4}$ et $${s3}$, $${s1}$, $${s5}$ sont alignés dans cet ordre.`
					texte_corr +='<br>D&rsquo;après la propriété de Thales, on a ' + `$${tex_fraction(s1+s4,s1+s2)}=${tex_fraction(s1+s5,s1+s3)}=${tex_fraction(s4+s5,s2+s3)}$` + '<br>'
				}
				}
			else if (this.sup==2)
			 {  // Calcul de AN nécessaire avant de calculer AM et BC
				texte = `Dans la figure ci-dessous, les droites $(${s4+s5})$ et $(${s2+s3})$ sont parallèles.<br> $${s1+s2}=${s12}$ cm, $${s1+s3}=${s13}$ cm, $${s4+s5}=${s45}$ cm et $${s5+s3}=${s35}$ cm.`
				texte += `<br>Le point $${s1}$ peut être déplacé.<br>`
				texte += `Calculer $${s1+s4}$ et $${s2+s3}$.`
				if (k>0) {
					texte_corr = 'Dans le triangle ' + `$${s1+s2+s3}$` + ', les droites ' + `$(${s4+s5})$` + ' et ' + `$(${s2+s3})$` + ' sont parallèles.<br>' + ' D&rsquo;après la propriété de Thales, on a ' + `$${tex_fraction(s1+s4,s1+s2)}=${tex_fraction(s1+s5,s1+s3)}=${tex_fraction(s4+s5,s2+s3)}.$` + '<br>'
				} else {
					texte_corr = `Les points $${s2}$, $${s1}$, $${s4}$ et $${s3}$, $${s1}$, $${s5}$ sont alignés dans cet ordre et les droites $(${s4+s5})$ et $(${s2+s3})$ sont parallèles.<br>` + ' D&rsquo;après la propriété de Thales, on a ' + `$${tex_fraction(s1+s4,s1+s2)}=${tex_fraction(s1+s5,s1+s3)}=${tex_fraction(s4+s5,s2+s3)}.$` + '<br>'
				}
				if (k>0){
					texte_corr +='On sait que '+`$${s1+s5}=${s1+s3}-${s5+s3}=${s13}-${s35}=${s15}$`+' cm.<br>'
				}
				else {
					texte_corr +='On sait que '+`$${s1+s5}=${s3+s5}-${s1+s3}=${s35}-${s13}=${s15}$`+' cm.<br>'
				}
			}
			else if (randint(1,2)==1) {
				texte = `$${s1}$, $${s2}$ et $${s3}$ sont trois point distincts. $${s4} \\in [${s1+s2}]$ et $${s5} \\in [${s1+s3}]$ tel que les droites $(${s4+s5})$ et $(${s2+s3})$ sont parallèles.<br> $${s1+s2}=${s12}$ cm, $${s1+s3}=${s13}$ cm, $${s4+s5}=${s45}$ cm et $${s1+s5}=${s15}$ cm.`
				texte += `<br>Calculer $${s1+s4}$ et $${s2+s3}$.`
				texte_corr = 'Dans le triangle '+`$${s1+s2+s3}$`+', les droites '+`$(${s4+s5})$`+' et '+`$(${s2+s3})$`+' sont parallèles.<br>'+' D&rsquo;après la propriété de Thales, on a '+`$${tex_fraction(s1+s4,s1+s2)}=${tex_fraction(s1+s5,s1+s3)}=${tex_fraction(s4+s5,s2+s3)}.$`+'<br>'
				}
			else {
				texte = `Les points $${s2}$, $${s1}$, $${s4}$ et $${s3}$, $${s1}$, $${s5}$ sont alignés dans cet ordre.`
				texte += `<br>Les droites $(${s4+s5})$ et $(${s2+s3})$ sont parallèles.<br> $${s1+s2}=${s12}$ cm, $${s1+s3}=${s13}$ cm, $${s4+s5}=${s45}$ cm et $${s5+s3}=${s35}$ cm.`
				texte += `<br>Calculer $${s1+s4}$ et $${s2+s3}$.`
				if (k>0) {
					texte_corr = 'Dans le triangle ' + `$${s1+s2+s3}$` + ', les droites ' + `$(${s4+s5})$` + ' et ' + `$(${s2+s3})$` + ' sont parallèles.<br>' + ' D&rsquo;après la propriété de Thales, on a ' + `$${tex_fraction(s1+s4,s1+s2)}=${tex_fraction(s1+s5,s1+s3)}=${tex_fraction(s4+s5,s2+s3)}.$` + '<br>'
				} else {
					texte_corr = `Les points $${s2}$, $${s1}$, $${s4}$ et $${s3}$, $${s1}$, $${s5}$ sont alignés et les droites $(${s4+s5})$ et $(${s2+s3})$ sont parallèles.<br>` + ' D&rsquo;après la propriété de Thales, on a ' + `$${tex_fraction(s1+s4,s1+s2)}=${tex_fraction(s1+s5,s1+s3)}=${tex_fraction(s4+s5,s2+s3)}.$` + '<br>'
				}
				if (k>0){
					texte_corr +='On sait que '+`$${s1+s5}=${s1+s3}-${s5+s3}=${s13}-${s35}=${s15}$`+' cm.<br>'
				}
				else {
					texte_corr +='On sait que '+`$${s1+s5}=${s3+s5}-${s1+s3}=${s35}-${s13}=${s15}$`+' cm.<br>'
				}
			}
			texte_corr += 'Avec les données numériques :<br>'
			texte_corr += `$${tex_fraction(s1 + s4, s12)}=${tex_fraction(s15, s13)}=${tex_fraction(s45, s2 + s3)}$` + '<br>'
			texte_corr += `Soit $${s1+s4}=` + quatrieme_proportionnelle(dist13,dist15,dist12,1) + '$ cm'
			texte_corr += ` et $${s2+s3}=` + quatrieme_proportionnelle(dist15,dist13,dist45,1)+ '$ cm.'
		
			if (this.sup<3)	{
			this.MG32codeBase64 = codeBase64
			this.MG32code_pour_modifier_la_figure = `
				mtg32App.giveFormula2("MG32svg${numero_de_l_exercice}", "x3", "${x3}");
		        mtg32App.giveFormula2("MG32svg${numero_de_l_exercice}", "y2", "${y2}");
				mtg32App.giveFormula2("MG32svg${numero_de_l_exercice}", "y3", "${y3}");
				mtg32App.giveFormula2("MG32svg${numero_de_l_exercice}", "k", "${k}");
				mtg32App.rename("MG32svg${numero_de_l_exercice}","A'","${s1}");
				mtg32App.rename("MG32svg${numero_de_l_exercice}","B'","${s2}");
				mtg32App.rename("MG32svg${numero_de_l_exercice}","C'","${s3}");
				mtg32App.rename("MG32svg${numero_de_l_exercice}","M'","${s4}");
				mtg32App.rename("MG32svg${numero_de_l_exercice}","N'","${s5}");
				mtg32App.calculate("MG32svg${numero_de_l_exercice}");
	        	mtg32App.display("MG32svg${numero_de_l_exercice}");
				` 	
				texte += `<br>$\\footnotesize{\\textit{Le point \\thickspace ${s1} peut être déplacé (si la figure est tronquée).}}$<br>`;
			}
			this.liste_questions.push(texte);	
			this.liste_corrections.push(texte_corr);
			if (this.sup<3) {
				liste_de_question_to_contenu(this)
			}
			else 	{
				this.type_exercice = '';
				liste_de_question_to_contenu_sans_numero(this)
			}	
			
		
	} else {	// sortie Latex
		texte = '\\begin{minipage}{.5 \\linewidth} 	\\vspace{0cm} Sur la figure ci-contre, on a  : \\begin{itemize}'
		texte += `\n\t\\item Les droites $(${s4+s5})$ et $(${s2+s3})$ sont parallèles.`
		if (this.sup==1){ //niveau 1 : Calcul direct quatrième proportionnelle
		
			// enoncé  niveau 1
		
			texte += '\n\t\\item '+`$${s1+s2+' = '+s12+'~\\text{cm}~;'}$`
			texte += '\n\t\\item '+`$${s1+s3+' = '+s13+'~\\text{cm}~;'}$`
			texte += '\n\t\\item '+`$${s4+s5+' = '+s45+'~\\text{cm}~;'}$`
			texte += '\n\t\\item '+`$${s1+s5+' = '+s15+'~\\text{cm}.'}$`
			texte += '\\end{itemize} \\bigskip  Calculer '+`$${s1+s4}$`+' et '+`$${s2+s3}$`+' à 0,1 près. \\end{minipage}'
		} 
		else if (this.sup==2) { // niveau 2 : Calcul intermédiaire nécessaire
		
			// enoncé  niveau 2
		
			texte += '\n\t\\item '+`$${s1+s2+' = '+s12+'~\\text{cm}~;'}$`
			texte += '\n\t\\item '+`$${s1+s3+' = '+s13+'~\\text{cm}~;'}$`
			texte += '\n\t\\item '+`$${s4+s5+' = '+s45+'~\\text{cm}~;'}$`
			texte += '\n\t\\item '+`$${s3+s5+' = '+s35+'~\\text{cm}.'}$`
			texte += '\\end{itemize} \\bigskip  Calculer '+`$${s1+s4}$`+' et '+`$${s2+s3}$`+' à 0,1 près. \\end{minipage}'
		}
		else  // énoncé sans figure
			
			if (k>0) {
				texte = `$${s1}$, $${s2}$ et $${s3}$`+' sont trois point distincts.<br>\n' + `$${s4} \\in [${s1+s2}]$`+' et '+`$${s5} \\in [${s1+s3}]$`+' tel que les droites '+`$(${s4+s5})$`+' et '+`$(${s2+s3})$`+' sont parallèles.<br>\n'
				texte += `$${s1+s2}=${s12}$ cm, $${s1+s3}=${s13}$ cm, $${s4+s5}=${s45}$ cm et `
				if (niv_diff==1) {
					texte +=`$${s1+s5}=${s15}$ cm.`
				}
				else {
					texte +=`$${s3+s5}=${s35}$ cm.`
				}
				texte += `<br>\nCalculer $${s1+s4}$ et $${s2+s3}$.`
				texte_corr = 'Dans le triangle '+`$${s1+s2+s3}$`+', les droites '+`$(${s4+s5})$`+' et '+`$(${s2+s3})$`+' sont parallèles.<br>\n'+' D\'après la propriété de Thales, on a '+`$${tex_fraction(s1+s4,s1+s2)}=${tex_fraction(s1+s5,s1+s3)}=${tex_fraction(s4+s5,s2+s3)}.$`
				if (niv_diff==2) {
					texte_corr +='On sait que '+`$${s1+s5}=${s1+s3}-${s5+s3}=${s13}-${s35}=${s15}$`+'~;cm.'
				}
			}
			else {
				texte = `Les points $${s2}$, $${s1}$, $${s4}$ et $${s3}$, $${s1}$, $${s5}$ sont alignés dans cet ordre.`
				texte += `<br>\nLes droites $(${s4+s5})$ et $(${s2+s3})$ sont parallèles.<br>\n $${s1+s2}=${s12}$ cm, $${s1+s3}=${s13}$ cm, $${s4+s5}=${s45}$ cm et `
				if (niv_diff==1) {
					texte +=`$${s1+s5}=${s15}$ cm.`
				}
				else {
					texte +=`$${s3+s5}=${s35}$ cm.`
				}
				texte += `<br>\nCalculer $${s1+s4}$ et $${s2+s3}$.`
				texte_corr = `Les points $${s2}$, $${s1}$, $${s4}$ et $${s3}$, $${s1}$, $${s5}$ sont alignés dans cet ordre et les droites $(${s4+s5})$ et $(${s2+s3})$ sont parallèles.<br>\n` + ' D\'après la propriété de Thales, on a ' + `$${tex_fraction(s1+s4,s1+s2)}=${tex_fraction(s1+s5,s1+s3)}=${tex_fraction(s4+s5,s2+s3)}.$` + '<br>\n'
				if (niv_diff==2) {
					texte_corr +='On sait que '+`$${s1+s5}=${s1+s3}-${s5+s3}=${s13}-${s35}=${s15}$`+' cm.'
				}
			}
		if (this.sup<3) { // on ne fait la figure que si niveau < 3
			texte += '\\begin{minipage}{0.5 \\linewidth}'
			// dessin de la figure
			texte += '\n \\begin{tikzpicture}' // Balise début de figure
			texte += '\n\t \\tkzDefPoints{0/0/'+s1+','+x3+'/'+y3+'/'+s3+','+x2+'/'+y2+'/'+s2+'}' // Placer les points du triangle principal
			texte += '\n\t \\tkzDrawPolygon(' + s1 + ',' + s2 + ',' + s3 + ')' // Trace le triangle principal
			// Définit les points M et N par homothétie de centre C et de rapport 0,3<k<0,8
			texte += '\n\t \\tkzDefPointBy[homothety=center ' + s1 + ' ratio ' + k + '](' + s2 + ')' + '\t\\tkzGetPoint{' + s4 + '}' // Place le premier point du triangle image
			texte += '\n\t \\tkzDefPointBy[homothety=center ' + s1 + ' ratio ' + k + '](' + s3 + ')' + '\t\\tkzGetPoint{' + s5 + '}' // Place le deuxième point du triangle image
			texte += '\n\t \\tkzDrawSegment(' + s4 + ',' + s5 + ')'	// Trace le segment
			if (k > 0) {
				texte += '\n\t \\tkzLabelPoints[left](' + s1 + ')' //nomme les points
				texte += '\n\t \\tkzLabelPoints[above left](' + s2 + ',' + s4 + ')' //nomme les points
				texte += '\n\t \\tkzLabelPoints[below](' + s3 + ',' + s5 + ')' //nomme les points
				// Nomme les points au dessus avec above, dessous avec below...
			}
			else {		// position papillon -> position du nom inversée et nécessité de tracer le triangle secondaire
				texte += '\n\t \\tkzLabelPoints[below](' + s1 + ')' //nomme les points
				texte += '\n\t \\tkzLabelPoints[below](' + s3 + ',' + s4 + ')' //nomme les points
				texte +='\n\t \\tkzLabelPoints[above](' + s2 + ',' + s5 + ')' //nomme les points
				texte += '\n\t \\tkzDrawPolygon(' + s1 + ',' + s4 + ',' + s5 + ')' // Trace le triangle secondaire
			}
			texte += '\n \\end{tikzpicture}' // Balise de fin de figure
			texte +=  '\\end{minipage}'
		}
			this.liste_questions.push(texte) // on envoie la question
				// correction 
			if (this.sup==2){		 //niveau 2 : Calcul intermédiaire nécessaire
				texte_corr = `Les droites $(${s4+s5})$ et $(${s2+s3})$ sont parallèles.<br>\n\t D\'après la propriété de Thales, on a $${tex_fraction(s1+s4,s1+s2)}=${tex_fraction(s1+s5,s1+s3)}=${tex_fraction(s4+s5,s2+s3)}.$<br>\n\t`
				if (k>0){
					texte_corr +='On sait que '+`$${s1+s5}=${s1+s3}-${s5+s3}=${s13}-${s35}=${s15}~\\text{cm}.$`
				}
				else {
					texte_corr +='On sait que '+`$${s1+s5}=${s3+s5}-${s1+s3}=${s35}-${s13}=${s15}~\\text{cm}.$`
				}
			}
			else 
			if (this.sup==1){
				if (k>0) {texte_corr = `Dans le triangle $${s1+s2+s3}$, les droites $(${s4+s5})$ et $(${s2+s3})$ sont parallèles.<br>\n D\'après la propriété de Thales, on a $${tex_fraction(s1+s4,s1+s2)}=${tex_fraction(s1+s5,s1+s3)}=${tex_fraction(s4+s5,s2+s3)}.$`
				}
				else {texte_corr = `Les points $${s2}$, $${s1}$, $${s4}$ et $${s3}$, $${s1}$, $${s5}$ sont alignés et les droites $(${s4+s5})$ et $(${s2+s3})$ sont parallèles.<br>\n` + ' D\'après la propriété de Thales, on a ' + `$${tex_fraction(s1+s4,s1+s2)}=${tex_fraction(s1+s5,s1+s3)}=${tex_fraction(s4+s5,s2+s3)}.$` + '<br>\n'
				}
			}
			texte_corr += `<br>\n On a donc $${tex_fraction(s1 + s4, s12)}=${tex_fraction(s15, s13)}=${tex_fraction(s45, s2 + s3)}$`
			texte_corr += `<br>\n Soit $${s1 + s4}=${tex_fraction(s15 + '\\times' + s12, s13)}\\approx${s14}~\\text{cm}$.`
			texte_corr += `<br>\n Et $${s2 + s3}=${tex_fraction(s13 + '\\times' + s45, s15)}\\approx${s23}~\\text{cm}$.`
			
			this.liste_corrections.push(texte_corr)

			liste_de_question_to_contenu_sans_numero(this);

		}

	}
	
	this.besoin_formulaire_numerique = ['Niveau de difficulté',3,'1 : Calcul direct de deux longueurs \n 2 : Avec calcul intermédiaire\n 3 : Sans figure'];
}

function Reciproque_Thales(){
	'use strict';
	Exercice.call(this); // Héritage de la classe Exercice()
	this.titre = "Contrôler si deux droites sont parallèles";
	this.consigne = "";
	this.nb_questions = 1;
	this.nb_questions_modifiable = false;
	sortie_html ? this.spacing_corr = 3.5 : this.spacing_corr = 2.5
	this.nb_cols = 1;
	this.nb_cols_corr = 1;
	this.quatrieme = false;
	this.sup=1;
	this.liste_packages = 'tkz-euclide'

	// let s1='A',s2='B',s3='C',s4='M',s5='N'
	// coefficient de l'homothétie compris entre -0,8 et -0,2 ou entre 0,2 et 0,8 pour éviter les constructions trop serrées
	this.nouvelle_version = function (numero_de_l_exercice) {
		this.liste_questions = [];
		this.liste_corrections = [];
		let lettre1 = randint(1, 26)	// aleatoirisation du nom des points
		let s1 = lettre_depuis_chiffre(lettre1)
		let lettre2 = randint(1, 26, [lettre1])
		let s2 = lettre_depuis_chiffre(lettre2)
		let lettre3 = randint(1, 26, [lettre1, lettre2])
		let s3 = lettre_depuis_chiffre(lettre3)
		let lettre4 = randint(1, 26, [lettre1, lettre2, lettre3])
		let s4 = lettre_depuis_chiffre(lettre4)
		let lettre5 = randint(1, 26, [lettre1, lettre2, lettre3, lettre4])
		let s5 = lettre_depuis_chiffre(lettre5)
		let x2 = randint(2, 4)
		let y2 = randint(3, 5)
		let x3 = randint(5, 6)
		let y3 = randint(-2, 1)
		let k = randint(2, 8) * randint(-1, 1, [0]) / 10
		let k2 = k*(1+randint(0,1)*0.1)
		if (this.quatrieme) { k = abs(k) ; k2=abs(k2) }
		let dist24;
		let dist12 = arrondi(Math.sqrt(x2 * x2 + y2 * y2), 1)
		let dist13 = arrondi(Math.sqrt(x3 * x3 + y3 * y3), 1)
		while (dist12==dist13) { //éviter les triangles isocèles imbriqués qui ne nécéssitent aucun calculs.
			x2 = randint(2, 4)
			y2 = randint(3, 5)
			x3 = randint(5, 6)
			y3 = randint(-2, 1)
			dist12 = arrondi(Math.sqrt(x2 * x2 + y2 * y2), 1)
			dist13 = arrondi(Math.sqrt(x3 * x3 + y3 * y3), 1)
		}
		let dist15 = arrondi(dist13 * abs(k), 2)
		let dist14 = arrondi(dist12 * abs(k2), 2); 	
		let dist35;

		let num1,num2,den1,den2;
		if (k<0) {
			dist35=dist13+dist15;
			dist24=dist12+dist14;
		}
		else {
			dist35=dist13-dist15;
			dist24=dist12-dist14;
		}

		let  texte, texte_corr;
		// On ne garde qu'une approximation au dixième pour l'exercice

		// mise en texte avec 1 chiffres après la virgule pour énoncé
		let s13 = tex_nombrec(dist13);
		let s12 = tex_nombrec(dist12);
		let s15 = tex_nombrec(dist15);
		let s14 = tex_nombrec(dist14);
		let s24 = tex_nombrec(dist24);
		let s35 = tex_nombrec(dist35);
		num1=arrondi(dist12*100);
		den1=arrondi(dist14*100);
		num2=arrondi(dist13*100);
		den2=arrondi(dist15*100);
		let fraction1=[],fraction2=[];
		fraction1=fraction_simplifiee(num1,den1);
		fraction2=fraction_simplifiee(num2,den2);


		if (sortie_html) {
			this.type_exercice = 'MG32';
			this.taille_div_MG32 = [700, 500];
			let codeBase64

			if (k < 0) {
				codeBase64 = "TWF0aEdyYXBoSmF2YTEuMAAAABI+TMzNAAJmcv###wEA#wEAAAAAAAAAAAYfAAADsgAAAQEAAAAAAAAAAQAAACX#####AAAAAQAKQ0NhbGNDb25zdAD#####AAJwaQAWMy4xNDE1OTI2NTM1ODk3OTMyMzg0Nv####8AAAABAApDQ29uc3RhbnRlQAkh+1RELRj#####AAAAAQAKQ1BvaW50QmFzZQD#####AAAAAAAWAAJBJwBANgAAAAAAAEAzAAAAAAAABwABQHYBR64UeuFAcdwo9cKPXP####8AAAABABRDRHJvaXRlRGlyZWN0aW9uRml4ZQD#####AQAAAAAQAAABAAEAAAABAT#wAAAAAAAA#####wAAAAEAD0NQb2ludExpZURyb2l0ZQD#####AQAAAAAQAAJJJwDAGAAAAAAAAAAAAAAAAAAABQABQEerQ5WBBiUAAAAC#####wAAAAEACUNEcm9pdGVBQgD#####AQAAAAASAAABAAEAAAABAAAAA#####8AAAABABZDRHJvaXRlUGVycGVuZGljdWxhaXJlAP####8BAAAAABAAAAEAAQAAAAEAAAAE#####wAAAAEACUNDZXJjbGVPQQD#####AQAAAAABAAAAAQAAAAP#####AAAAAQAQQ0ludERyb2l0ZUNlcmNsZQD#####AAAABQAAAAb#####AAAAAQAQQ1BvaW50TGllQmlwb2ludAD#####AQAAAAAQAAABBQABAAAABwAAAAkA#####wEAAAAAEAACSicAwCgAAAAAAADAEAAAAAAAAAUAAgAAAAf#####AAAAAgAHQ1JlcGVyZQD#####AObm5gABAAAAAQAAAAMAAAAJAAAAAAAAAQAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAT#wAAAAAAAAAAAAAT#wAAAAAAAA#####wAAAAEACkNVbml0ZXhSZXAA#####wAEdW5pdAAAAAr#####AAAAAQALQ0hvbW90aGV0aWUA#####wAAAAH#####AAAAAQAKQ09wZXJhdGlvbgMAAAABP#AAAAAAAAD#####AAAAAQAPQ1Jlc3VsdGF0VmFsZXVyAAAAC#####8AAAABAAtDUG9pbnRJbWFnZQD#####AQAAAAASAAJXIgEBAAAAAAMAAAAM#####wAAAAEACUNMb25ndWV1cgD#####AAAAAQAAAA3#####AAAAAQAHQ0NhbGN1bAD#####AAJ4MgABMgAAAAFAAAAAAAAAAAAAABEA#####wACeTIAATUAAAABQBQAAAAAAAAAAAARAP####8AAngzAAE2AAAAAUAYAAAAAAAAAAAAEQD#####AAJ5MwACLTH#####AAAAAQAMQ01vaW5zVW5haXJlAAAAAT#wAAAAAAAAAAAAEQD#####AAFrAAQtMC41AAAAEgAAAAE#4AAAAAAAAP####8AAAABABBDUG9pbnREYW5zUmVwZXJlAP####8BAAAAABgAAlonAAAAAAAAAAAAQAgAAAAAAAAHAAAAAAoAAAABAAAAAAAAAAAAAAABAAAAAAAAAAAAAAATAP####8AAAAAABgAAkInAMAwAAAAAAAAwEOAAAAAAAAHAAAAAAoAAAAOAAAADwAAAA4AAAAQAAAAEwD#####AAAAAAAYAAJDJwAAAAAAAAAAAEAIAAAAAAAABwAAAAAKAAAADgAAABEAAAAOAAAAEgAAAAwA#####wAAABQAAAAOAAAAEwAAAA8A#####wAAAAAAGAACTScAwCQAAAAAAADAAAAAAAAAAAcAAAAAFQAAABcAAAAPAP####8AAAAAABgAAk4nAMAzAAAAAAAAwEMAAAAAAAAHAAAAABYAAAAX#####wAAAAEACUNQb2x5Z29uZQD#####AAAAAAACAAAABAAAABYAAAAVAAAAFAAAABYAAAAUAP####8AAAAAAAIAAAAEAAAAGQAAABQAAAAYAAAAGf####8AAAABABBDU3VyZmFjZVBvbHlnb25lAP####8BAAD#AAAABQAAABsAAAAVAP####8B#wAAAAAABQAAABr#####AAAAAQAQQ01hY3JvQXBwYXJpdGlvbgD#####AP8AAAH#####EECIoKPXCj1xQELhR64UeuECAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAZBcHBBTU4AAAAAAAEAAAAcAAAAABYA#####wD#AAAB#####xBAiLCj1wo9cUBUMKPXCj1wAgAAAAAAAAAAAAAAAAEAAAAAAAAAAAAGQXBwQUJDAAAAAAABAAAAHQD#####AAAAAQARQ01hY3JvRGlzcGFyaXRpb24A#####wD#AAAB#####xBAi+Cj1wo9cUBE4UeuFHrhAgAAAAAAAAAAAAAAAAEAAAAAAAAAAAAHTWFzcUFNTgAAAAAAAQAAABwAAAAXAP####8A#wAAAf####8QQIvoo9cKPXFAVPCj1wo9cAIAAAAAAAAAAAAAAAABAAAAAAAAAAAAB01hc3FBQkMAAAAAAAEAAAAd#####wAAAAEAC0NNYWNyb1BhdXNlAP####8A#wAAAf####8QQIj4o9cKPXFAX3Cj1wo9cAIAAAAAAAAAAAAAAAABAAAAAAAAAAAABVBhdXNlAAAAAAAB#####wAAAAEAEUNNYWNyb1N1aXRlTWFjcm9zAP####8A#wAAAf####8QQFHFHrhR64VAePwo9cKPXAIAAAAAAAAAAAAAAAABAAAAAAAAAAAAClRyaWFuZ2xlIDEAAAAAAAMAAAAfAAAAIgAAACEAAAAZAP####8A#wAAAf####8QQFFFHrhR64VAe3wo9cKPXAIAAAAAAAAAAAAAAAABAAAAAAAAAAAAClRyaWFuZ2xlIDIAAAAAAAMAAAAeAAAAIgAAACAAAAAO##########8="
			}
			else {
				codeBase64 = "TWF0aEdyYXBoSmF2YTEuMAAAABI+TMzNAAJmcv###wEA#wEAAAAAAAAAAAYfAAADsgAAAQEAAAAAAAAAAQAAACX#####AAAAAQAKQ0NhbGNDb25zdAD#####AAJwaQAWMy4xNDE1OTI2NTM1ODk3OTMyMzg0Nv####8AAAABAApDQ29uc3RhbnRlQAkh+1RELRj#####AAAAAQAKQ1BvaW50QmFzZQD#####AAAAAAAWAAJBJwDAKAAAAAAAAEAiAAAAAAAABwABQHMxR64UeuFAcbwo9cKPXP####8AAAABABRDRHJvaXRlRGlyZWN0aW9uRml4ZQD#####AQAAAAAOAAABAAEAAAABAT#wAAAAAAAA#####wAAAAEAD0NQb2ludExpZURyb2l0ZQD#####AQAAAAAQAAJJJwDAGAAAAAAAAAAAAAAAAAAABQABQEerQ5WBBiUAAAAC#####wAAAAEACUNEcm9pdGVBQgD#####AQAAAAASAAABAAEAAAABAAAAA#####8AAAABABZDRHJvaXRlUGVycGVuZGljdWxhaXJlAP####8BAAAAAA4AAAEAAQAAAAEAAAAE#####wAAAAEACUNDZXJjbGVPQQD#####AQAAAAABAAAAAQAAAAP#####AAAAAQAQQ0ludERyb2l0ZUNlcmNsZQD#####AAAABQAAAAb#####AAAAAQAQQ1BvaW50TGllQmlwb2ludAD#####AQAAAAAOAAABBQABAAAABwAAAAkA#####wEAAAAAEAACSicAwCgAAAAAAADAEAAAAAAAAAUAAgAAAAf#####AAAAAgAHQ1JlcGVyZQD#####AObm5gABAAAAAQAAAAMAAAAJAAAAAAAAAQAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAT#wAAAAAAAAAAAAAT#wAAAAAAAA#####wAAAAEACkNVbml0ZXhSZXAA#####wAEdW5pdAAAAAr#####AAAAAQALQ0hvbW90aGV0aWUA#####wAAAAH#####AAAAAQAKQ09wZXJhdGlvbgMAAAABP#AAAAAAAAD#####AAAAAQAPQ1Jlc3VsdGF0VmFsZXVyAAAAC#####8AAAABAAtDUG9pbnRJbWFnZQD#####AQAAAAASAAJXIgEBAAAAAAMAAAAM#####wAAAAEACUNMb25ndWV1cgD#####AAAAAQAAAA3#####AAAAAQAHQ0NhbGN1bAD#####AAJ4MgABMgAAAAFAAAAAAAAAAAAAABEA#####wACeTIAATUAAAABQBQAAAAAAAAAAAARAP####8AAngzAAE2AAAAAUAYAAAAAAAAAAAAEQD#####AAJ5MwACLTH#####AAAAAQAMQ01vaW5zVW5haXJlAAAAAT#wAAAAAAAAAAAAEQD#####AAFrAAMwLjUAAAABP+AAAAAAAAD#####AAAAAQAQQ1BvaW50RGFuc1JlcGVyZQD#####AQAAAAAYAAJaJwAAAAAAAAAAAEAIAAAAAAAABwAAAAAKAAAAAQAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAEwD#####AAAAAAAYAAJCJwDAMAAAAAAAAMBDgAAAAAAABwAAAAAKAAAADgAAAA8AAAAOAAAAEAAAABMA#####wAAAAAAGAACQycAAAAAAAAAAABACAAAAAAAAAcAAAAACgAAAA4AAAARAAAADgAAABIAAAAMAP####8AAAAUAAAADgAAABMAAAAPAP####8AAAAAABgAAk0nAMA7AAAAAAAAwDcAAAAAAAAHAAAAABUAAAAXAAAADwD#####AAAAAAAYAAJOJwDAKAAAAAAAAEAAAAAAAAAABwAAAAAWAAAAF#####8AAAABAAlDUG9seWdvbmUA#####wAAAAAAAgAAAAQAAAAWAAAAFQAAABQAAAAWAAAAFAD#####AAAAAAACAAAABAAAABkAAAAUAAAAGAAAABn#####AAAAAQAQQ1N1cmZhY2VQb2x5Z29uZQD#####AQAA#wAAAAUAAAAbAAAAFQD#####Af8AAAAAAAUAAAAa#####wAAAAEAEENNYWNyb0FwcGFyaXRpb24A#####wD#AAAB#####xBAiKCj1wo9cUBC4UeuFHrhAgAAAAAAAAAAAAAAAAEAAAAAAAAAAAAGQXBwQU1OAAAAAAABAAAAHAAAAAAWAP####8A#wAAAf####8QQIiwo9cKPXFAVDCj1wo9cAIAAAAAAAAAAAAAAAABAAAAAAAAAAAABkFwcEFCQwAAAAAAAQAAAB0A#####wAAAAEAEUNNYWNyb0Rpc3Bhcml0aW9uAP####8A#wAAAf####8QQIvgo9cKPXFAROFHrhR64QIAAAAAAAAAAAAAAAABAAAAAAAAAAAAB01hc3FBTU4AAAAAAAEAAAAcAAAAFwD#####AP8AAAH#####EECL6KPXCj1xQFTwo9cKPXACAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAdNYXNxQUJDAAAAAAABAAAAHf####8AAAABAAtDTWFjcm9QYXVzZQD#####AP8AAAH#####EECI+KPXCj1xQF9wo9cKPXACAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAVQYXVzZQAAAAAAAf####8AAAABABFDTWFjcm9TdWl0ZU1hY3JvcwD#####AP8AAAH#####EEBRxR64UeuFQHj8KPXCj1wCAAAAAAAAAAAAAAAAAQAAAAAAAAAAAApUcmlhbmdsZSAxAAAAAAADAAAAHwAAACIAAAAhAAAAGQD#####AP8AAAH#####EEBRRR64UeuFQHt8KPXCj1wCAAAAAAAAAAAAAAAAAQAAAAAAAAAAAApUcmlhbmdsZSAyAAAAAAADAAAAHgAAACIAAAAgAAAADv##########"
			}

			if (this.sup == 1) {  // AM,AB,AN,AC sont donnés pas de calculs intermédiaires
				texte = `Dans la figure ci-dessous, $${s1 + s2}=${s12}$ cm, $${s1 + s3}=${s13}$ cm, $${s1 + s5}=${s15}$ cm et $${s1 + s4}=${s14}$ cm.<br>`
				texte_corr=``;
			}
			else if (this.sup == 2) {  // AN n'est pas donné, il faut le calculer avant.
				texte = `Dans la figure ci-dessous, $${s1 + s2}=${s12}$ cm, $${s1 + s3}=${s13}$ cm, $${s3 + s5}=${s35}$ cm et $${s2 + s4}=${s24}$ cm.<br>`
				texte_corr=``;
				if (k > 0) { //triangles imbriqués
					texte_corr += 'On sait que ' + `$${s1 + s5}=${s1 + s3}-${s3 + s5}=${s13}-${s35}=${s15}$` + ' cm.<br>'
					texte_corr += 'et que ' + `$${s1 + s4}=${s1 + s2}-${s2 + s4}=${s12}-${s24}=${s14}$` + ' cm.<br>'
				}
				else { // papillon
					texte_corr += 'On sait que ' + `$${s1 + s5}=${s3 + s5}-${s1 + s3}=${s35}-${s13}=${s15}$` + ' cm.<br>'
					texte_corr += 'et que ' + `$${s1 + s4}=${s2 + s4}-${s1 + s2}=${s24}-${s12}=${s14}$` + ' cm.<br>'
				}
			}
			else if (randint(1, 2) == 1) { //triangles imbriqués sans figure
				texte = `$${s1}$, $${s2}$ et $${s3}$ sont trois point distincts. $${s4} \\in [${s1 + s2}]$ et $${s5} \\in [${s1 + s3}]$ <br> $${s1 + s2}=${s12}$ cm, $${s1 + s3}=${s13}$ cm, $${s1 + s4}=${s14}$ cm et $${s1 + s5}=${s15}$ cm.`
				texte_corr = ``;
			}
			else { // papillon sans figure
				texte = `Les points $${s2}$, $${s1}$, $${s4}$ et $${s3}$, $${s1}$, $${s5}$ sont alignés dans cet ordre.<br>`
				texte += `$${s1 + s2}=${s12}$ cm, $${s1 + s3}=${s13}$ cm, $${s1 + s4}=${s14}$ cm et $${s1 + s5}=${s15}$ cm.`
				texte_corr = ``;
				}
			texte += `<br>Les droites $(${s2 + s3})$ et $(${s4 + s5})$ sont-elles parallèles ?<br>`
			
			texte_corr += `D'une part on a $\\dfrac{${s1 + s2}}{${s1 + s4}}=\\dfrac{${s12}}{${s14}}=\\dfrac{${s12}\\times${mise_en_evidence(s15)}}{${s14}\\times${mise_en_evidence(s15)}}=${tex_fraction(tex_nombrec(arrondi(dist12*dist15,3)),tex_nombrec(arrondi(dist14*dist15,4)))}$`;
			texte_corr += `<br>D'autre part on a $\\dfrac{${s1 + s3}}{${s1 + s5}}=\\dfrac{${s13}}{${s15}}=\\dfrac{${s13}\\times${mise_en_evidence(s14)}}{${s15}\\times${mise_en_evidence(s14)}}=${tex_fraction(tex_nombrec(arrondi(dist13*dist14,3)),tex_nombrec(arrondi(dist14*dist15,4)))}$`;

			if (k!=k2) { // droites non parallèles

				texte_corr+=`<br>$\\dfrac{${s1 + s2}}{${s1 + s4}}\\not=\\dfrac{${s1 + s3}}{${s1 + s5}}$.<br>`;
				texte_corr+=`Donc d'après le théorème de Thales, les droites $(${s2 + s3})$ et $(${s4 + s5})$ ne sont pas parallèles.<br>`
			}
			else { // droites parallèles
				texte_corr+=`<br>$\\dfrac{${s1 + s2}}{${s1 + s4}}=\\dfrac{${s1 + s3}}{${s1 + s5}}$.<br>`; //car les produits en croix sont égaux : $${s12}\\times${s15}=${s13}\\times${s14}=${tex_nombre(arrondi(dist12*dist15,3))}$.<br>`;
				if (k>0) texte_corr+=`$${s1}$,$${s4}$,$${s2}$ et $${s1}$,$${s5}$,$${s3}$ sont alignés dans le même ordre.<br>`
				else texte_corr+=`$${s4}$,$${s1}$,$${s2}$ et $${s5}$,$${s1}$,$${s3}$ sont alignés dans le même ordre.<br>`
				texte_corr+=`Donc d'après la réciproque du théorème de Thales, les droites $(${s2 + s3})$ et $(${s4 + s5})$ sont parallèles.<br>`;
			}


			if (this.sup < 3) {
				this.MG32codeBase64 = codeBase64
				this.MG32code_pour_modifier_la_figure = `
					mtg32App.giveFormula2("MG32svg${numero_de_l_exercice}", "x3", "${x3}");
					mtg32App.giveFormula2("MG32svg${numero_de_l_exercice}", "y2", "${y2}");
					mtg32App.giveFormula2("MG32svg${numero_de_l_exercice}", "y3", "${y3}");
					mtg32App.giveFormula2("MG32svg${numero_de_l_exercice}", "k", "${k}");
					mtg32App.rename("MG32svg${numero_de_l_exercice}","A'","${s1}");
					mtg32App.rename("MG32svg${numero_de_l_exercice}","B'","${s2}");
					mtg32App.rename("MG32svg${numero_de_l_exercice}","C'","${s3}");
					mtg32App.rename("MG32svg${numero_de_l_exercice}","M'","${s4}");
					mtg32App.rename("MG32svg${numero_de_l_exercice}","N'","${s5}");
					mtg32App.calculate("MG32svg${numero_de_l_exercice}");
					mtg32App.display("MG32svg${numero_de_l_exercice}");
					`
				texte += `<br>$\\footnotesize{\\textit{Le point \\thickspace ${s1} peut être déplacé (si la figure est tronquée).}}$<br>`;
			}
			this.liste_questions.push(texte);
			this.liste_corrections.push(texte_corr);
			if (this.sup < 3) {
				liste_de_question_to_contenu(this)
			}
			else {
				this.type_exercice = '';
				liste_de_question_to_contenu_sans_numero(this)
			}


		} else {	// sortie Latex
			texte_corr=``;
			if (this.sup == 1) { //niveau 1 : Calcul direct 
				texte = '\\begin{minipage}{.5 \\linewidth} 	\\vspace{0cm} Sur la figure ci-contre, on a  : \\begin{itemize}'
				texte += `\n\t \\item ${s1 + s2}=${s12} cm \n\t \\item ${s1 + s3}=${s13} cm\n\t \\item ${s1 + s5}=${s15} cm\n\t \\item ${s1 + s4}=${s14} cm.<br>`
				texte += `\\end{itemize} \\bigskip `+`Les droites (${s2 + s3}) et (${s4 + s5}) sont-elles parallèles ?<br>`+'. \\end{minipage}'
			}
			else if (this.sup == 2) { // niveau 2 : Calcul intermédiaire nécessaire
				texte = '\\begin{minipage}{.5 \\linewidth} 	\\vspace{0cm} Sur la figure ci-contre, on a  : \\begin{itemize}'
				texte += `\n\t \\item ${s1 + s2} = ${s12} cm\n\t \\item ${s1 + s3} = ${s13} cm\n\t \\item ${s3 + s5} = ${s35} cm\n\t \\item ${s2 + s4} = ${s24} cm.<br>`
				texte += '\\end{itemize} \\bigskip '+`Les droites (${s2 + s3}) et (${s4 + s5}) sont-elles parallèles ?<br>`+'. \\end{minipage}'
				if (k > 0) { // triangles imbriqués
					texte_corr += 'On sait que ' + `$${s1 + s5}=${s1 + s3}-${s3 + s5}=${s13}-${s35}=${s15}$` + ' cm.<br>'
					texte_corr += 'et que ' + `$${s1 + s4}=${s1 + s2}-${s2 + s4}=${s12}-${s24}=${s14}$` + ' cm.<br>'
				}
				else { // papillon
					texte_corr += 'On sait que ' + `$${s1 + s5}=${s3 + s5}-${s1 + s3}=${s35}-${s13}=${s15}$` + ' cm.<br>'
					texte_corr += 'et que ' + `$${s1 + s4}=${s2 + s4}-${s1 + s2}=${s24}-${s12}=${s14}$` + ' cm.<br>'
				}
			}
			 // énoncé sans figure
			else if (randint(1, 2) == 1) { // triangles imbriqués
				texte = `$${s1}$, $${s2}$ et $${s3}$ sont trois point distincts. $${s4} \\in [${s1 + s2}]$ et $${s5} \\in [${s1 + s3}]$ <br> $${s1 + s2}=${s12}$ cm, $${s1 + s3}=${s13}$ cm, $${s1 + s4}=${s14}$ cm et $${s1 + s5}=${s15}$ cm.<br>`
				texte += `Les droites (${s2 + s3}) et (${s4 + s5}) sont-elles parallèles ?<br>`
			}
			else { // papillon
				texte = `Les points $${s2}$, $${s1}$, $${s4}$ et $${s3}$, $${s1}$, $${s5}$ sont alignés dans cet ordre.<br>`
				texte += `$${s1 + s2}=${s12}$ cm, $${s1 + s3}=${s13}$ cm, $${s1 + s4}=${s14}$ cm et $${s1 + s5}=${s15}$ cm.<br>`
				texte += `Les droites (${s2 + s3}) et (${s4 + s5}) sont-elles parallèles ?<br>`
			}

			if (this.sup < 3) { // on ne fait la figure que si niveau < 3
				texte += '\\begin{minipage}{0.5 \\linewidth}'
				// dessin de la figure
				texte += '\n \\begin{tikzpicture}' // Balise début de figure
				texte += '\n\t \\tkzDefPoints{0/0/' + s1 + ',' + x3 + '/' + y3 + '/' + s3 + ',' + x2 + '/' + y2 + '/' + s2 + '}' // Placer les points du triangle principal
				texte += '\n\t \\tkzDrawPolygon(' + s1 + ',' + s2 + ',' + s3 + ')' // Trace le triangle principal
				// Définit les points M et N par homothétie de centre C et de rapport 0,3<k<0,8
				texte += '\n\t \\tkzDefPointBy[homothety=center ' + s1 + ' ratio ' + k + '](' + s2 + ')' + '\t\\tkzGetPoint{' + s4 + '}' // Place le premier point du triangle image
				texte += '\n\t \\tkzDefPointBy[homothety=center ' + s1 + ' ratio ' + k + '](' + s3 + ')' + '\t\\tkzGetPoint{' + s5 + '}' // Place le deuxième point du triangle image
				texte += '\n\t \\tkzDrawSegment(' + s4 + ',' + s5 + ')'	// Trace le segment
				if (k > 0) {
					texte += '\n\t \\tkzLabelPoints[left](' + s1 + ')' //nomme les points
					texte += '\n\t \\tkzLabelPoints[above left](' + s2 + ',' + s4 + ')' //nomme les points
					texte += '\n\t \\tkzLabelPoints[below](' + s3 + ',' + s5 + ')' //nomme les points
					// Nomme les points au dessus avec above, dessous avec below...
				}
				else {		// position papillon -> position du nom inversée et nécessité de tracer le triangle secondaire
					texte += '\n\t \\tkzLabelPoints[below](' + s1 + ')' //nomme les points
					texte += '\n\t \\tkzLabelPoints[below](' + s3 + ',' + s4 + ')' //nomme les points
					texte += '\n\t \\tkzLabelPoints[above](' + s2 + ',' + s5 + ')' //nomme les points
					texte += '\n\t \\tkzDrawPolygon(' + s1 + ',' + s4 + ',' + s5 + ')' // Trace le triangle secondaire
				}
				texte += '\n \\end{tikzpicture}' // Balise de fin de figure
				texte += '\\end{minipage}'
			}
			this.liste_questions.push(texte) // on envoie la question
			// correction 
			texte_corr += `D'une part on a $\\dfrac{${s1 + s2}}{${s1 + s4}}=\\dfrac{${s12}}{${s14}}=\\dfrac{${s12}\\times${mise_en_evidence(s15)}}{${s14}\\times${mise_en_evidence(s15)}}=${tex_fraction(tex_nombrec(arrondi(dist12*dist15,3)),tex_nombrec(arrondi(dist14*dist15,4)))}$`;
			texte_corr += `<br>D'autre part on a $\\dfrac{${s1 + s3}}{${s1 + s5}}=\\dfrac{${s13}}{${s15}}=\\dfrac{${s13}\\times${mise_en_evidence(s14)}}{${s15}\\times${mise_en_evidence(s14)}}=${tex_fraction(tex_nombrec(arrondi(dist13*dist14,3)),tex_nombrec(arrondi(dist14*dist15,4)))}$`;

			if (k!=k2) { // droites pas parallèles

				texte_corr+=`<br>$\\dfrac{${s1 + s2}}{${s1 + s4}}\\not=\\dfrac{${s1 + s3}}{${s1 + s5}}$.<br>`;
				texte_corr+=`Donc d'après le théorème de Thales, les droites $(${s2 + s3})$ et $(${s4 + s5})$ ne sont pas parallèles.<br>`
			}
			else { // droites parallèles
				texte_corr+=`<br>$\\dfrac{${s1 + s2}}{${s1 + s4}}=\\dfrac{${s1 + s3}}{${s1 + s5}}$.<br>`; //car les produits en croix sont égaux : $${s12}\\times${s15}=${s13}\\times${s14}=${tex_nombre(arrondi(dist12*dist15,3))}$.<br>`;
				if (k>0) texte_corr+=`$${s1}$,$${s4}$,$${s2}$ et $${s1}$,$${s5}$,$${s3}$ sont alignés dans le même ordre.<br>`
				else texte_corr+=`$${s4}$,$${s1}$,$${s2}$ et $${s5}$,$${s1}$,$${s3}$ sont alignés dans le même ordre.<br>`
				texte_corr+=`Donc d'après la réciproque du théorème de Thales, les droites $(${s2 + s3})$ et $(${s4 + s5})$ sont parallèles.<br>`;
			}

			this.liste_corrections.push(texte_corr)

			liste_de_question_to_contenu_sans_numero(this);

		}

	}

	this.besoin_formulaire_numerique = ['Niveau de difficulté', 3, '1 : Cas simple \n 2 : Complication \n 3 : Sans figure'];
}

/**
* @auteur Jean-Claude Lhote
*/
function Exercice_Pythagore() {
	Exercice.call(this); // Héritage de la classe Exercice()
	this.titre = "Déterminer une longueur avec l'égalité de Pythagore";
	this.consigne = "";
	this.nb_questions = 1;
	this.nb_questions_modifiable = false;
	this.nb_cols = 1;
	this.nb_cols_corr = 1;
	this.sup = 1; // 1 calcul de l'hypoténuse 2 calcul d'un côté de l'angle droit 
	sortie_html ? this.spacing_corr = 2.5 : this.spacing_corr = 1.5;
	this.liste_packages = 'tkz-euclide';

	this.nouvelle_version = function (numero_de_l_exercice) {


			this.type_exercice = 'MG32';
			this.taille_div_MG32 = [700, 500];
			this.liste_questions = [];
			this.liste_corrections = []; // Liste de questions corrigées
			let lettre0 = randint(11, 25)  // aleatoirisation du nom des points
			let s0 = lettre_depuis_chiffre(lettre0)
			lettre1 = randint(11, 25, [lettre0])
			let s1 = lettre_depuis_chiffre(lettre1)
			lettre2 = randint(11, 25, [lettre0, lettre1])
			let s2 = lettre_depuis_chiffre(lettre2)
			let type_de_questions
			if (this.sup == 1) {
				type_de_questions = 1 //calcul de l'hypoténuse
			}
			if (this.sup == 2) {
				type_de_questions = 2 //calcul d'un côté de l'angle droit
			}
			if (this.sup == 3) {
				type_de_questions = randint(1, 2) //un des deux calculs
			}
			if (this.sup == 4) {
				type_de_questions = randint(3, 4)
			}
			let nom_du_triangle = choice([s0 + s1 + s2, s0 + s2 + s1, s1 + s0 + s2, s1 + s2 + s0, s2 + s0 + s1, s2 + s1 + s0])
			let k1 = Math.round((Math.random() * 3 + 3) * 10) / 10
			let k2 = Math.round((Math.random() * 3 + 1) * 10) / 10
			let alpha1 = Math.random() * Math.PI - Math.PI / 2
			let alpha1deg = Math.round(alpha1 * 180 / Math.PI)
			let x1 = k1	// coordonnées des deux sommets du triangle
			let y2 = k2
			let s01 = arrondi_virgule(k1, 1)			// mise en texte avec 1 chiffres après la virgule pour énoncé
			let s02 = arrondi_virgule(k2, 1)

			let carre01 = Math.round(k1 * k1 * 100) / 100
			let carre02 = Math.round(k2 * k2 * 100) / 100
			let dist12 = Math.sqrt(carre01 + carre02)	   //calcul de l'hypoténuse
			dist12 = Math.round(dist12 * 10) / 10		// On ne garde qu'une approximation au dixième pour l'exercice
			let s12 = arrondi_virgule(dist12, 1)
			let carre12 = Math.round(dist12 * dist12 * 100) / 100


			let scarre01 = arrondi_virgule(carre01, 2)		// carremn = distance entre (xm;ym) et (xn;yn) au carré avec 2 décimales
			let scarre02 = arrondi_virgule(carre02, 2)		// scarremn = chaine de caractère avec 2 décimales après une virgule.
			let scarre12 = arrondi_virgule(carre12, 2)
			if (sortie_html) {
			let codeBase64
			if (alpha1deg < 0) {
				codeBase64 = "TWF0aEdyYXBoSmF2YTEuMAAAABI+TMzNAAJmcv###wEA#wEAAAAAAAAAAAQzAAACtAAAAQEAAAAAAAAAAQAAACH#####AAAAAQAKQ0NhbGNDb25zdAD#####AAJwaQAWMy4xNDE1OTI2NTM1ODk3OTMyMzg0Nv####8AAAABAApDQ29uc3RhbnRlQAkh+1RELRj#####AAAAAQAKQ1BvaW50QmFzZQD#####AAAAAAAWAAFBAMA7AAAAAAAAwCAAAAAAAAAFAAFAcLFHrhR64UBneFHrhR64#####wAAAAEAFENEcm9pdGVEaXJlY3Rpb25GaXhlAP####8BAAAAABYAAAEAAQAAAAEBP#AAAAAAAAD#####AAAAAQAPQ1BvaW50TGllRHJvaXRlAP####8BAAAAAA4AAUkAwBgAAAAAAAAAAAAAAAAAAAUAAUBHq0OVgQYlAAAAAv####8AAAABAAlDRHJvaXRlQUIA#####wEAAAAAEAAAAQABAAAAAQAAAAP#####AAAAAQAWQ0Ryb2l0ZVBlcnBlbmRpY3VsYWlyZQD#####AQAAAAAWAAABAAEAAAABAAAABP####8AAAABAAlDQ2VyY2xlT0EA#####wEAAAAAAQAAAAEAAAAD#####wAAAAEAEENJbnREcm9pdGVDZXJjbGUA#####wAAAAUAAAAG#####wAAAAEAEENQb2ludExpZUJpcG9pbnQA#####wEAAAAAFgAAAQUAAQAAAAcAAAAJAP####8BAAAAAA4AAUoAwCgAAAAAAADAEAAAAAAAAAUAAgAAAAf#####AAAAAgAHQ1JlcGVyZQD#####AObm5gABAAAAAQAAAAMAAAAJAAAAAAAAAQAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAT#wAAAAAAAAAAAAAT#wAAAAAAAA#####wAAAAEACkNVbml0ZXhSZXAA#####wAEdW5pdAAAAAr#####AAAAAQALQ0hvbW90aGV0aWUA#####wAAAAH#####AAAAAQAKQ09wZXJhdGlvbgMAAAABP#AAAAAAAAD#####AAAAAQAPQ1Jlc3VsdGF0VmFsZXVyAAAAC#####8AAAABAAtDUG9pbnRJbWFnZQD#####AQAAAAAQAAJXIgEBAAAAAAMAAAAM#####wAAAAEACUNMb25ndWV1cgD#####AAAAAQAAAA3#####AAAAAQAHQ0NhbGN1bAD#####AAJ4MQABNgAAAAFAGAAAAAAAAAAAABEA#####wACeDIAATQAAAABQBAAAAAAAAAAAAARAP####8ACGFscGhhZGVnAAMtOTD#####AAAAAQAMQ01vaW5zVW5haXJlAAAAAUBWgAAAAAAA#####wAAAAEAEENQb2ludERhbnNSZXBlcmUA#####wEAAAAAFgABWgDAFAAAAAAAAEAAAAAAAAAABwAAAAAKAAAAAQAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAEwD#####AQAAAAAWAAFGAAAAAAAAAAAAQAgAAAAAAAAHAAAAAAoAAAAOAAAADwAAAAEAAAAAAAAAAAAAABMA#####wEAAAAAFgABRAAAAAAAAAAAAEAIAAAAAAAABwAAAAAKAAAAAQAAAAAAAAAAAAAADgAAABD#####AAAAAQAJQ1JvdGF0aW9uAP####8AAAASAAAADgAAABEAAAAPAP####8AAAAAABYAAUIAQCoAAAAAAADALgAAAAAAAAcAAAAAEwAAABUAAAAPAP####8AAAAAABYAAUMAQBAAAAAAAADAOwAAAAAAAAcAAAAAFAAAABX#####AAAAAQAJQ1BvbHlnb25lAP####8AAAAAAAIAAAAEAAAAEgAAABYAAAAXAAAAEv####8AAAACABdDTWFycXVlQW5nbGVHZW9tZXRyaXF1ZQD#####AAAA#wAEAAAAAUAwAAAAAAAAAAAAFgAAABIAAAAX#####wAAAAEACENTZWdtZW50AP####8BAAD#ABAAAAEABAAAABcAAAAW#####wAAAAEAEENNYWNyb0FwcGFyaXRpb24A#####wD#AAAB#####xBAh8ij1wo9cUBHYUeuFHrhAgAAAAAAAAAAAAAAAAEAAAAAAAAAAAAFQXBwQkMAAAAAAAEAAAAaAP####8AAAABABFDTWFjcm9EaXNwYXJpdGlvbgD#####AP8AAAH#####EECKaKPXCj1xQEphR64UeuECAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAZNYXNxQkMAAAAAAAEAAAAa#####wAAAAEAC0NNYWNyb1BhdXNlAP####8A#wAAAf####8QQI1oo9cKPXFASuFHrhR64QIAAAAAAAAAAAAAAAABAAAAAAAAAAAABVBhdXNlAAAAAAABAAAAGQD#####AAAA#wH#####EECIIKPXCj1xQFqwo9cKPXACAAAAAAAAAAAAAAAAAQAAAAAAAAAAAApNYXNxQW5nZHJ0AAAAAAABAAAAGQAAABgA#####wAAAP8B#####xBAjAij1wo9cUBa8KPXCj1wAgAAAAAAAAAAAAAAAAEAAAAAAAAAAAAJQXBwQW5nRHJ0AAAAAAABAAAAGQD#####AAAAAQARQ01hY3JvU3VpdGVNYWNyb3MA#####wAAAP8B#####xBAWMUeuFHrhUB4fCj1wo9cAgAAAAAAAAAAAAAAAAEAAAAAAAAAAAALaHlwb3TDqW51c2UAAAAAAAsAAAAeAAAAGwAAAB0AAAAfAAAAHAAAAB0AAAAeAAAAGwAAAB0AAAAcAAAAHwAAAA7##########w=="
			}
			else {
				codeBase64 = "TWF0aEdyYXBoSmF2YTEuMAAAABI+TMzNAAJmcv###wEA#wEAAAAAAAAAAAQzAAACtAAAAQEAAAAAAAAAAQAAACH#####AAAAAQAKQ0NhbGNDb25zdAD#####AAJwaQAWMy4xNDE1OTI2NTM1ODk3OTMyMzg0Nv####8AAAABAApDQ29uc3RhbnRlQAkh+1RELRj#####AAAAAQAKQ1BvaW50QmFzZQD#####AAAAAAAWAAFBAMAUAAAAAAAAQBQAAAAAAAAFAAFAbFo9cKPXBkB0BhR64Ueu#####wAAAAEAFENEcm9pdGVEaXJlY3Rpb25GaXhlAP####8BAAAAABYAAAEAAQAAAAEBP#AAAAAAAAD#####AAAAAQAPQ1BvaW50TGllRHJvaXRlAP####8BAAAAAA4AAUkAwBgAAAAAAAAAAAAAAAAAAAUAAUBHq0OVgQYlAAAAAv####8AAAABAAlDRHJvaXRlQUIA#####wEAAAAAEAAAAQABAAAAAQAAAAP#####AAAAAQAWQ0Ryb2l0ZVBlcnBlbmRpY3VsYWlyZQD#####AQAAAAAWAAABAAEAAAABAAAABP####8AAAABAAlDQ2VyY2xlT0EA#####wEAAAAAAQAAAAEAAAAD#####wAAAAEAEENJbnREcm9pdGVDZXJjbGUA#####wAAAAUAAAAG#####wAAAAEAEENQb2ludExpZUJpcG9pbnQA#####wEAAAAAFgAAAQUAAQAAAAcAAAAJAP####8BAAAAAA4AAUoAwCgAAAAAAADAEAAAAAAAAAUAAgAAAAf#####AAAAAgAHQ1JlcGVyZQD#####AObm5gABAAAAAQAAAAMAAAAJAAAAAAAAAQAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAT#wAAAAAAAAAAAAAT#wAAAAAAAA#####wAAAAEACkNVbml0ZXhSZXAA#####wAEdW5pdAAAAAr#####AAAAAQALQ0hvbW90aGV0aWUA#####wAAAAH#####AAAAAQAKQ09wZXJhdGlvbgMAAAABP#AAAAAAAAD#####AAAAAQAPQ1Jlc3VsdGF0VmFsZXVyAAAAC#####8AAAABAAtDUG9pbnRJbWFnZQD#####AQAAAAAQAAJXIgEBAAAAAAMAAAAM#####wAAAAEACUNMb25ndWV1cgD#####AAAAAQAAAA3#####AAAAAQAHQ0NhbGN1bAD#####AAJ4MQABNgAAAAFAGAAAAAAAAAAAABEA#####wACeDIAATQAAAABQBAAAAAAAAAAAAARAP####8ACGFscGhhZGVnAAI5MAAAAAFAVoAAAAAAAP####8AAAABABBDUG9pbnREYW5zUmVwZXJlAP####8BAAAAABYAAVoAwBQAAAAAAABAAAAAAAAAAAcAAAAACgAAAAEAAAAAAAAAAAAAAAEAAAAAAAAAAAAAABIA#####wEAAAAAFgABRgAAAAAAAAAAAEAIAAAAAAAABwAAAAAKAAAADgAAAA8AAAABAAAAAAAAAAAAAAASAP####8BAAAAABYAAUQAAAAAAAAAAABACAAAAAAAAAcAAAAACgAAAAEAAAAAAAAAAAAAAA4AAAAQ#####wAAAAEACUNSb3RhdGlvbgD#####AAAAEgAAAA4AAAARAAAADwD#####AAAAAAAWAAFCAEAqAAAAAAAAwDgAAAAAAAAHAAAAABMAAAAVAAAADwD#####AAAAAAAWAAFDAMA3AAAAAAAAwEAAAAAAAAAHAAAAABQAAAAV#####wAAAAEACUNQb2x5Z29uZQD#####AAAAAAACAAAABAAAABIAAAAWAAAAFwAAABL#####AAAAAgAXQ01hcnF1ZUFuZ2xlR2VvbWV0cmlxdWUA#####wAAAP8ABAAAAAFAMAAAAAAAAAAAABYAAAASAAAAF#####8AAAABAAhDU2VnbWVudAD#####AQAA#wAQAAABAAQAAAAXAAAAFv####8AAAABABBDTWFjcm9BcHBhcml0aW9uAP####8A#wAAAf####8QQIfIo9cKPXFAR2FHrhR64QIAAAAAAAAAAAAAAAABAAAAAAAAAAAABUFwcEJDAAAAAAABAAAAGgD#####AAAAAQARQ01hY3JvRGlzcGFyaXRpb24A#####wAAAP8B#####xBAimij1wo9cUBKYUeuFHrhAgAAAAAAAAAAAAAAAAEAAAAAAAAAAAAGTWFzcUJDAAAAAAABAAAAGv####8AAAABAAtDTWFjcm9QYXVzZQD#####AP8AAAH#####EECNaKPXCj1xQErhR64UeuECAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAVQYXVzZQAAAAAAAQAAABgA#####wAAAP8B#####xBAh#Cj1wo9cUBbcKPXCj1wAgAAAAAAAAAAAAAAAAEAAAAAAAAAAAAKTWFzcUFuZ0RydAAAAAAAAQAAABkAAAAXAP####8AAAD#Af####8QQIw4o9cKPXFAXPCj1wo9cAIAAAAAAAAAAAAAAAABAAAAAAAAAAAACUFwcEFuZ0RydAAAAAAAAQAAABkA#####wAAAAEAEUNNYWNyb1N1aXRlTWFjcm9zAP####8AAAD#Af####8QQFjFHrhR64VAeHwo9cKPXAIAAAAAAAAAAAAAAAABAAAAAAAAAAAAC2h5cG90w6ludXNlAAAAAAALAAAAHgAAABsAAAAdAAAAHwAAABwAAAAdAAAAHgAAABsAAAAdAAAAHwAAABwAAAAO##########8="
			}
			
			if (type_de_questions == 1) { // calcul direct de l'hypoténuse
				texte = `Dans la figure ci-dessous, le triangle $${nom_du_triangle}$ est rectangle en $${s0}$, $${s0 + s1}=${s01}$ cm, $${s0 + s2}=${s02}$ cm.`
				texte += `<br>Le point $${s0}$ peut être déplacé.<br>`
				texte += `Calculer $${s1 + s2}$.`
				texte_corr = `Dans le triangle $${nom_du_triangle}$ rectangle en $${s0}$, d&rsquo;après le théorème de Pythagore, on a : $${s1 + s2}^2 = ${s0 + s1}^2~+~${s0 + s2}^2.$<br>`
				texte_corr += 'D&rsquo;où ' + `$${s1 + s2}^2~=~${s01}^2~+~${s02}^2~=~${scarre01}~+~${scarre02}~=~${arrondi_virgule(carre02 + carre01, 2)}.$` + '<br>'
				texte_corr += 'Soit ' + `$${s1 + s2}~=~\\sqrt{${arrondi_virgule(carre02 + carre01, 2)}}~\\approx${s12}$` + ' cm.'
			}
			if (type_de_questions == 2) { // Calcul d'un côté de l'angle droit
				texte = `Dans la figure ci-dessous, le triangle $${nom_du_triangle}$ est rectangle en $${s0}$, $${s0 + s1}=${s01}$ cm, $${s1 + s2}=${s12}$ cm.`
				texte += `Calculer $${s0 + s2}$.`
				texte_corr = `Dans le triangle $${nom_du_triangle}$ rectangle en $${s0}$, d&rsquo;après le théorème de Pythagore, on a : $${s1 + s2}^2 = ${s0 + s1}^2~+~${s0 + s2}^2.$<br>`
				texte_corr += 'D&rsquo;où ' + `$${s0 + s2}^2~=~${s1 + s2}^2~-~${s0 + s1}^2 = ${s12}^2~-~${s01}^2~=~${scarre12}~-~${scarre01}~=~${arrondi_virgule(carre12 - carre01, 2)}.$` + '<br>'
				texte_corr += 'Soit ' + `$${s0 + s2}~=~\\sqrt{${arrondi_virgule(carre12 - carre01, 2)}}~\\approx${s02}$` + ' cm.'
			}
			if (type_de_questions < 3) {
				this.type_exercice = 'MG32';
				this.MG32codeBase64 = codeBase64
				this.MG32code_pour_modifier_la_figure = `
				mtg32App.giveFormula2("MG32svg${numero_de_l_exercice}", "x2", "${y2}");
		        mtg32App.giveFormula2("MG32svg${numero_de_l_exercice}", "x1", "${x1}");
				mtg32App.giveFormula2("MG32svg${numero_de_l_exercice}", "alphadeg", "${alpha1deg}");
				mtg32App.rename("MG32svg${numero_de_l_exercice}","A","${s0}");
				mtg32App.rename("MG32svg${numero_de_l_exercice}","B","${s1}");
				mtg32App.rename("MG32svg${numero_de_l_exercice}","C","${s2}");
				mtg32App.calculate("MG32svg${numero_de_l_exercice}");
	        	mtg32App.display("MG32svg${numero_de_l_exercice}");
				`
				texte += `<br>$\\footnotesize{\\textit{Le point \\thickspace ${s0} peut être déplacé (si la figure est tronquée).}}$<br>`;
			} else {
				this.type_exercice = '';
			}
			this.liste_questions.push(texte);
			this.liste_corrections.push(texte_corr);
			if (type_de_questions < 3) {
				liste_de_question_to_contenu(this)
			}
			else {
				liste_de_question_to_contenu_sans_numero(this)
			}

		}
		else {
		
			if (type_de_questions < 3) {
				texte = '\\begin{minipage}{.7 \\linewidth} 	\\vspace{0cm} Sur la figure ci-contre, on a  : \\begin{itemize}'
				texte += '\n\t\\item Le côté ' + `$[${s0 + s1}]$` + ' est perpendiculaire au côté ' + `$[${s0 + s2}]~;$`
				if (type_de_questions == 1) { //niveau 1 : Calcul de l'hypoténuse

					// enoncé  niveau 1

					texte += '\n\t\\item ' + `$${s0 + s1 + ' = ' + s01 + '~\\text{cm}~;'}$`
					texte += '\n\t\\item ' + `$${s0 + s2 + ' = ' + s02 + '~\\text{cm}~;'}$`
					texte += '\\end{itemize} \\bigskip\n\t  Calculer ' + `$${s1 + s2}$` + ' à 0,1 près. \\end{minipage}'
				}
				else { // niveau 2 : Calcul d'un côté de l'angle droit
					// enoncé  niveau 2

					texte += '\n\t\\item ' + `$${s1 + s2 + ' = ' + s12 + '~\\text{cm}~;'}$`
					texte += '\n\t\\item ' + `$${s0 + s1 + ' = ' + s01 + '~\\text{cm}~;'}$`
					texte += '\\end{itemize} \\bigskip  Calculer ' + `$${s0 + s2}$` + ' à 0,1 près. \\end{minipage}'
			}
				texte += '\\begin{minipage}{0.3 \\linewidth}'
				// dessin de la figure
				texte += '\n \\begin{tikzpicture}[scale=0.7]' // Balise début de figure
				texte += '\n\t \\tkzDefPoints{0/0/' + s0 + ',' + x1 + '/0/B,0/' + y2 + '/C}' // créer les points du triangle initial 
				// Définit les points M et N par homothétie de centre C et de rapport 0,3<k<0,8
				texte += '\n\t \\tkzDefPointBy[rotation= center ' + s0 + ' angle ' + alpha1deg + '](B) \\tkzGetPoint{' + s1 + '}' // transformer le premier point par rotation
				texte += '\n\t \\tkzDefPointBy[rotation= center ' + s0 + ' angle ' + alpha1deg + '](C) \\tkzGetPoint{' + s2 + '}' // transformer le deuxième point par rotation
				texte += '\n\t \\tkzDrawPolygon(' + s0 + ',' + s1 + ',' + s2 + ')' // Trace le triangle
				// marquer l'angle droit
				texte += '\n\t \\tkzDefPointBy[homothety=center ' + s0 + ' ratio 0.1](' + s1 + ')' + '\\tkzGetPoint{B}'
				texte += '\n\t \\tkzDefPointBy[rotation= center ' + s0 + ' angle 90](B) \\tkzGetPoint{C}'
				texte += '\n\t \\tkzDefPointBy[homothety=center ' + s0 + ' ratio 0.1414](' + s1 + ')' + '\\tkzGetPoint{A}'
				texte += '\n\t \\tkzDefPointBy[rotation= center ' + s0 + ' angle 45](A) \\tkzGetPoint{A}'
				texte += '\n\t \\tkzDrawPolygon(' + s0 + ',B,A,C)' // Trace la marque d'angle droit

				if (alpha1deg > 0) { // rotation "angle droit dessous"
				texte += '\n\t \\tkzLabelPoints[below](' + s0 + ')' //nomme les points
				texte += '\n\t \\tkzLabelPoints[right](' + s1 + ')'
				texte += '\n\t \\tkzLabelPoints[left](' + s2 + ')'
			}
			else {		// rotation "angle droit dessus" position du nom inversée 
				texte += '\n\t \\tkzLabelPoints[above](' + s0 + ')' //nomme les points
				texte += '\n\t \\tkzLabelPoints[left](' + s1 + ')'
				texte += '\n\t \\tkzLabelPoints[right](' + s2 + ')'
			}
				texte += '\n \\end{tikzpicture}' // Balise de fin de figure
				texte += '\\end{minipage}'
			}
			else {
				texte = '\\begin{minipage}{.5 \\linewidth} 	\\vspace{0cm} Dans le triangle ' + `${nom_du_triangle}` + ' rectangle en ' + `${s0}` + ' : \\begin{itemize}'
				// texte += '\n\t\\item Le côté ' + `$[${s0 + s1}]$` + ' est perpendiculaire au côté ' + `$[${s0 + s2}]~;$`
				if (type_de_questions == 1) { //niveau 1 : Calcul de l'hypoténuse

					// enoncé  niveau 1

					texte += '\n\t\\item ' + `$${s0 + s1 + ' = ' + s01 + '~\\text{cm}~;'}$`
					texte += '\n\t\\item ' + `$${s0 + s2 + ' = ' + s02 + '~\\text{cm}~;'}$`
					texte += '\\end{itemize} \\bigskip\n\t  Calculer ' + `$${s1 + s2}$` + ' à 0,1 près. \\end{minipage}'
				}
				else { // niveau 2 : Calcul d'un côté de l'angle droit
					// enoncé  niveau 2

					texte += '\n\t\\item ' + `$${s1 + s2 + ' = ' + s12 + '~\\text{cm}~;'}$`
					texte += '\n\t\\item ' + `$${s0 + s1 + ' = ' + s01 + '~\\text{cm}~;'}$`
					texte += '\\end{itemize} \\bigskip  Calculer ' + `$${s0 + s2}$` + ' à 0,1 près. \\end{minipage}'
				}
			}
			this.liste_questions.push(texte) // on envoie la question
			// correction 
			if (type_de_questions == 2 || type_de_questions == 4) {		 //niveau 2 : Calcul d'un côté de l'angle droit
				texte_corr = 'Le triangle ' + `$${nom_du_triangle}$` + ' est rectangle en ' + `$${s0}.$` + '<br>\n D\'après le théorème de Pythagore, on a :~' + `$${s1 + s2}^2 = ${s0 + s1}^2~+~${s0 + s2}^2.$`
				texte_corr += '<br>\n D\'où ' + `$${s0 + s2}^2~=~${s1 + s2}^2~-~${s0 + s1}^2 = ${s12}^2~-~${s01}^2~=~${scarre12}~-~${scarre01}~=~${arrondi_virgule(carre12 - carre01, 2)}.$`
				texte_corr += '<br>\n Soit ' + `$${s0 + s2}~=~\\sqrt{${arrondi_virgule(carre12 - carre01, 2)}}~\\approx${s02}~\\text{cm}.$`
			}
			else {
				texte_corr = 'Le triangle ' + `$${nom_du_triangle}$` + ' est rectangle en ' + `$${s0}.$` + '<br>\n D\'après le théorème de Pythagore, on a ' + `$${s1 + s2}^2 = ${s0 + s1}^2~+~${s0 + s2}^2.$`
				texte_corr += '<br>\n D\'où ' + `$${s1 + s2}^2~=~${s01}^2~+~${s02}^2~=~${scarre01}~+~${scarre02}~=~${arrondi_virgule(carre02 + carre01, 2)}.$`
				texte_corr += '<br>\n Soit ' + `$${s1 + s2}~=~\\sqrt{${arrondi_virgule(carre02 + carre01, 2)}}~\\approx${s12}~\\text{cm}.$`

			}

			this.liste_corrections.push(texte_corr)

			liste_de_question_to_contenu_sans_numero(this);

			// }end for

		}
	}
	this.besoin_formulaire_numerique = ['Niveau de difficulté', 4, '1 : Calcul de l\'hypoténuse \n 2 : Calcul d\'un côté de l\'angle droit\n 3 : Calcul d\'un côté quelconque\n 4 : Sans la figure'];
}

/**
* @auteur Jean-Claude Lhote
*/
function Exercice_Trigo_longueurs() {
	'use strict';
	Exercice.call(this); // Héritage de la classe Exercice()
	this.titre = "Déterminer une longueur grâce à la trigonométrie";
	this.consigne = "";
	this.nb_questions = 1;
	this.nb_questions_modifiable = false;
	this.nb_cols = 1;
	this.nb_cols_corr = 1;
	this.spacing=1;
	this.quatrieme=false;
	this.sup = 1; // 1 utilisation du cosinus exclusivement 2 utilisation des 3 fonctions trigo 
	sortie_html ? this.spacing_corr = 3 : this.spacing_corr = 1.5;
	this.liste_packages = 'tkz-euclide';

	this.nouvelle_version = function (numero_de_l_exercice) {
			let lettre1,lettre2,texte,texte_corr;
			this.bouton_aide = modal_youtube(numero_de_l_exercice,"DYW-BTMFzd4","Trigonométrie (vidéo de digiSchool)")
			this.type_exercice = 'MG32';
			this.taille_div_MG32 = [700, 500];
			this.liste_questions = [];
			this.liste_corrections = []; // Liste de questions corrigées
			let lettre0 = randint(11, 25)  // aleatoirisation du nom des points
			let s0 = lettre_depuis_chiffre(lettre0)
			lettre1 = randint(11, 25, [lettre0])
			let s1 = lettre_depuis_chiffre(lettre1)
			lettre2 = randint(11, 25, [lettre0, lettre1])
			let s2 = lettre_depuis_chiffre(lettre2)
			let angle1
			let type_de_questions
			if (this.sup == 1) 	type_de_questions = choice([1,3,5]); // on multiplie par cos, sin ou tan
			if (this.sup == 2) 	type_de_questions = choice([2,4,6]); // on divise par cos, sin ou tan
			if (this.sup == 3)	type_de_questions = randint(1,6);
			if (this.quatrieme)	type_de_questions = ((type_de_questions-1)%2 +1);  // on n'utilise que le cosinus.
			let nom_du_triangle = choice([s0 + s1 + s2, s0 + s2 + s1, s1 + s0 + s2, s1 + s2 + s0, s2 + s0 + s1, s2 + s1 + s0])
			let k1 = Math.round((Math.random() * 5 + 1) * 10) / 10
			let k2 = Math.round((Math.random() * 5 + 1) * 10) / 10
			angle1=Math.round(Math.degres(Math.atan(k2/k1)));
			let alpha1 = Math.random() * Math.PI - Math.PI / 2
			let alpha1deg = Math.round(alpha1 * 180 / Math.PI)
			let x1 = k1	// coordonnées des deux sommets du triangle
			let y2 = k2
			let s01 = arrondi_virgule(k1, 1)			// mise en texte avec 1 chiffres après la virgule pour énoncé
			let s02 = arrondi_virgule(k2, 1)
			
			let dist12 = k1/Math.cos(Math.atan(k2/k1))	   //calcul de l'hypoténuse
			dist12 = Math.round(dist12 * 10) / 10		// On ne garde qu'une approximation au dixième pour l'exercice
			let s12 = arrondi_virgule(dist12, 1)
			texte_corr = `Dans le triangle $${nom_du_triangle}$ rectangle en $${s0}$ :<br>`;
			if (sortie_html) { // sortie html MG32
				let codeBase64
				if (alpha1deg < 0) {
					codeBase64 = "TWF0aEdyYXBoSmF2YTEuMAAAABI+TMzNAAJmcv###wEA#wEAAAAAAAAAAAYfAAADsgAAAQEAAAAAAAAAAQAAACL#####AAAAAQAKQ0NhbGNDb25zdAD#####AAJwaQAWMy4xNDE1OTI2NTM1ODk3OTMyMzg0Nv####8AAAABAApDQ29uc3RhbnRlQAkh+1RELRj#####AAAAAQAKQ1BvaW50QmFzZQD#####AAAAAAAWAAFBAMA7AAAAAAAAwCAAAAAAAAAFAAFAcLFHrhR64UBneFHrhR64#####wAAAAEAFENEcm9pdGVEaXJlY3Rpb25GaXhlAP####8BAAAAABYAAAEAAQAAAAEBP#AAAAAAAAD#####AAAAAQAPQ1BvaW50TGllRHJvaXRlAP####8BAAAAAA4AAUkAwBgAAAAAAAAAAAAAAAAAAAUAAUBHq0OVgQYlAAAAAv####8AAAABAAlDRHJvaXRlQUIA#####wEAAAAAEAAAAQABAAAAAQAAAAP#####AAAAAQAWQ0Ryb2l0ZVBlcnBlbmRpY3VsYWlyZQD#####AQAAAAAWAAABAAEAAAABAAAABP####8AAAABAAlDQ2VyY2xlT0EA#####wEAAAAAAQAAAAEAAAAD#####wAAAAEAEENJbnREcm9pdGVDZXJjbGUA#####wAAAAUAAAAG#####wAAAAEAEENQb2ludExpZUJpcG9pbnQA#####wEAAAAAFgAAAQUAAQAAAAcAAAAJAP####8BAAAAAA4AAUoAwCgAAAAAAADAEAAAAAAAAAUAAgAAAAf#####AAAAAgAHQ1JlcGVyZQD#####AObm5gABAAAAAQAAAAMAAAAJAAAAAAAAAQAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAT#wAAAAAAAAAAAAAT#wAAAAAAAA#####wAAAAEACkNVbml0ZXhSZXAA#####wAEdW5pdAAAAAr#####AAAAAQALQ0hvbW90aGV0aWUA#####wAAAAH#####AAAAAQAKQ09wZXJhdGlvbgMAAAABP#AAAAAAAAD#####AAAAAQAPQ1Jlc3VsdGF0VmFsZXVyAAAAC#####8AAAABAAtDUG9pbnRJbWFnZQD#####AQAAAAAQAAJXIgEBAAAAAAMAAAAM#####wAAAAEACUNMb25ndWV1cgD#####AAAAAQAAAA3#####AAAAAQAHQ0NhbGN1bAD#####AAJ4MQABNgAAAAFAGAAAAAAAAAAAABEA#####wACeDIAATQAAAABQBAAAAAAAAAAAAARAP####8ACGFscGhhZGVnAAMtOTD#####AAAAAQAMQ01vaW5zVW5haXJlAAAAAUBWgAAAAAAA#####wAAAAEAEENQb2ludERhbnNSZXBlcmUA#####wEAAAAAFgABWgDAFAAAAAAAAEAAAAAAAAAABwAAAAAKAAAAAQAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAEwD#####AQAAAAAWAAFGAAAAAAAAAAAAQAgAAAAAAAAHAAAAAAoAAAAOAAAADwAAAAEAAAAAAAAAAAAAABMA#####wEAAAAAFgABRAAAAAAAAAAAAEAIAAAAAAAABwAAAAAKAAAAAQAAAAAAAAAAAAAADgAAABD#####AAAAAQAJQ1JvdGF0aW9uAP####8AAAASAAAADgAAABEAAAAPAP####8AAAAAABYAAUIAQCoAAAAAAADALgAAAAAAAAcAAAAAEwAAABUAAAAPAP####8AAAAAABYAAUMAQBAAAAAAAADAOwAAAAAAAAcAAAAAFAAAABX#####AAAAAQAJQ1BvbHlnb25lAP####8AAAAAAAIAAAAEAAAAEgAAABYAAAAXAAAAEv####8AAAACABdDTWFycXVlQW5nbGVHZW9tZXRyaXF1ZQD#####AAAA#wAEAAAAAUAwAAAAAAAAAAAAFgAAABIAAAAX#####wAAAAEACENTZWdtZW50AP####8BAAD#ABAAAAEABAAAABcAAAAW#####wAAAAEAEENNYWNyb0FwcGFyaXRpb24A#####wD#AAAB#####xBAh8ij1wo9cUBHYUeuFHrhAgAAAAAAAAAAAAAAAAEAAAAAAAAAAAAFQXBwQkMAAAAAAAEAAAAaAP####8AAAABABFDTWFjcm9EaXNwYXJpdGlvbgD#####AP8AAAH#####EECKaKPXCj1xQEphR64UeuECAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAZNYXNxQkMAAAAAAAEAAAAa#####wAAAAEAC0NNYWNyb1BhdXNlAP####8A#wAAAf####8QQI1oo9cKPXFASuFHrhR64QIAAAAAAAAAAAAAAAABAAAAAAAAAAAABVBhdXNlAAAAAAABAAAAGQD#####AAAA#wH#####EECIIKPXCj1xQFqwo9cKPXACAAAAAAAAAAAAAAAAAQAAAAAAAAAAAApNYXNxQW5nZHJ0AAAAAAABAAAAGQAAABgA#####wAAAP8B#####xBAjAij1wo9cUBa8KPXCj1wAgAAAAAAAAAAAAAAAAEAAAAAAAAAAAAJQXBwQW5nRHJ0AAAAAAABAAAAGQD#####AAAAAQARQ01hY3JvU3VpdGVNYWNyb3MA#####wAAAP8B#####xBAWMUeuFHrhUB4fCj1wo9cAgAAAAAAAAAAAAAAAAEAAAAAAAAAAAALaHlwb3TDqW51c2UAAAAAAAsAAAAeAAAAGwAAAB0AAAAfAAAAHAAAAB0AAAAeAAAAGwAAAB0AAAAcAAAAHwAAABYA#####wAAAP8ABQAAACBAQIGJiJxJngAAAAEAAAAWAAAAFwAAAA7##########w=="
				}
				else {
					codeBase64 = "TWF0aEdyYXBoSmF2YTEuMAAAABI#AAAAAAJmcv###wEA#wEAAAAAAAAAAAYfAAADsgAAAQEAAAAAAAAAAQAAACL#####AAAAAQAKQ0NhbGNDb25zdAD#####AAJwaQAWMy4xNDE1OTI2NTM1ODk3OTMyMzg0Nv####8AAAABAApDQ29uc3RhbnRlQAkh+1RELRj#####AAAAAQAKQ1BvaW50QmFzZQD#####AAAAAAAWAAFBAMAUAAAAAAAAQBQAAAAAAAAFAAFAbFo9cKPXBkB0BhR64Ueu#####wAAAAEAFENEcm9pdGVEaXJlY3Rpb25GaXhlAP####8BAAAAABYAAAEAAQAAAAEBP#AAAAAAAAD#####AAAAAQAPQ1BvaW50TGllRHJvaXRlAP####8BAAAAAA4AAUkAwBgAAAAAAAAAAAAAAAAAAAUAAUBHq0OVgQYlAAAAAv####8AAAABAAlDRHJvaXRlQUIA#####wEAAAAAEAAAAQABAAAAAQAAAAP#####AAAAAQAWQ0Ryb2l0ZVBlcnBlbmRpY3VsYWlyZQD#####AQAAAAAWAAABAAEAAAABAAAABP####8AAAABAAlDQ2VyY2xlT0EA#####wEAAAAAAQAAAAEAAAAD#####wAAAAEAEENJbnREcm9pdGVDZXJjbGUA#####wAAAAUAAAAG#####wAAAAEAEENQb2ludExpZUJpcG9pbnQA#####wEAAAAAFgAAAQUAAQAAAAcAAAAJAP####8BAAAAAA4AAUoAwCgAAAAAAADAEAAAAAAAAAUAAgAAAAf#####AAAAAgAHQ1JlcGVyZQD#####AObm5gABAAAAAQAAAAMAAAAJAAAAAAAAAQAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAT#wAAAAAAAAAAAAAT#wAAAAAAAA#####wAAAAEACkNVbml0ZXhSZXAA#####wAEdW5pdAAAAAr#####AAAAAQALQ0hvbW90aGV0aWUA#####wAAAAH#####AAAAAQAKQ09wZXJhdGlvbgMAAAABP#AAAAAAAAD#####AAAAAQAPQ1Jlc3VsdGF0VmFsZXVyAAAAC#####8AAAABAAtDUG9pbnRJbWFnZQD#####AQAAAAAQAAJXIgEBAAAAAAMAAAAM#####wAAAAEACUNMb25ndWV1cgD#####AAAAAQAAAA3#####AAAAAQAHQ0NhbGN1bAD#####AAJ4MQABNgAAAAFAGAAAAAAAAAAAABEA#####wACeDIAATQAAAABQBAAAAAAAAAAAAARAP####8ACGFscGhhZGVnAAI5MAAAAAFAVoAAAAAAAP####8AAAABABBDUG9pbnREYW5zUmVwZXJlAP####8BAAAAABYAAVoAwBQAAAAAAABAAAAAAAAAAAcAAAAACgAAAAEAAAAAAAAAAAAAAAEAAAAAAAAAAAAAABIA#####wEAAAAAFgABRgAAAAAAAAAAAEAIAAAAAAAABwAAAAAKAAAADgAAAA8AAAABAAAAAAAAAAAAAAASAP####8BAAAAABYAAUQAAAAAAAAAAABACAAAAAAAAAcAAAAACgAAAAEAAAAAAAAAAAAAAA4AAAAQ#####wAAAAEACUNSb3RhdGlvbgD#####AAAAEgAAAA4AAAARAAAADwD#####AAAAAAAWAAFCAEAqAAAAAAAAwDgAAAAAAAAHAAAAABMAAAAVAAAADwD#####AAAAAAAWAAFDAMA3AAAAAAAAwEAAAAAAAAAHAAAAABQAAAAV#####wAAAAEACUNQb2x5Z29uZQD#####AAAAAAACAAAABAAAABIAAAAWAAAAFwAAABL#####AAAAAgAXQ01hcnF1ZUFuZ2xlR2VvbWV0cmlxdWUA#####wAAAP8ABAAAAAFAMAAAAAAAAAAAABYAAAASAAAAF#####8AAAABAAhDU2VnbWVudAD#####AQAA#wAQAAABAAQAAAAXAAAAFv####8AAAABABBDTWFjcm9BcHBhcml0aW9uAP####8A#wAAAf####8QQIfIo9cKPXFAR2FHrhR64QIAAAAAAAAAAAAAAAABAAAAAAAAAAAABUFwcEJDAAAAAAABAAAAGgD#####AAAAAQARQ01hY3JvRGlzcGFyaXRpb24A#####wAAAP8B#####xBAimij1wo9cUBKYUeuFHrhAgAAAAAAAAAAAAAAAAEAAAAAAAAAAAAGTWFzcUJDAAAAAAABAAAAGv####8AAAABAAtDTWFjcm9QYXVzZQD#####AP8AAAH#####EECNaKPXCj1xQErhR64UeuECAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAVQYXVzZQAAAAAAAQAAABgA#####wAAAP8B#####xBAh#Cj1wo9cUBbcKPXCj1wAgAAAAAAAAAAAAAAAAEAAAAAAAAAAAAKTWFzcUFuZ0RydAAAAAAAAQAAABkAAAAXAP####8AAAD#Af####8QQIw4o9cKPXFAXPCj1wo9cAIAAAAAAAAAAAAAAAABAAAAAAAAAAAACUFwcEFuZ0RydAAAAAAAAQAAABkA#####wAAAAEAEUNNYWNyb1N1aXRlTWFjcm9zAP####8AAAD#Af####8QQFjFHrhR64VAeHwo9cKPXAIAAAAAAAAAAAAAAAABAAAAAAAAAAAAC2h5cG90w6ludXNlAAAAAAALAAAAHgAAABsAAAAdAAAAHwAAABwAAAAdAAAAHgAAABsAAAAdAAAAHwAAABwAAAAVAP####8AAAD#AAUAAAAgQEHcp2T0QTQAAAABAAAAFgAAABcAAAAO##########8="
				}
				texte = `Dans la figure ci-dessous, le triangle $${nom_du_triangle}$ est rectangle en $${s0}$.<br>`
				

				if (type_de_questions == 1) { // calcul du côté adjacent (cosinus)
					texte += `L'angle $\\widehat{${s0 + s1 + s2}}$ mesure $${angle1}\\degree$, $${s1 + s2}=${s12}$ cm.<br>`;
					texte += `Calculer $${s0 + s1}$.`;


				}
				if (type_de_questions == 2) { // Calcul de l'hypoténuse (1/cosinus)
					texte += `L'angle $\\widehat{${s0 + s1 + s2}}$ mesure $${angle1}\\degree$, $${s0 + s1}=${s01}$ cm.<br>`;
					texte += `Calculer $${s1 + s2}$.`;

				}
				if (type_de_questions == 3) { // calcul du côté opposé (sinus)
					texte += `L'angle $\\widehat{${s0 + s1 + s2}}$ mesure $${angle1}\\degree$, $${s1 + s2}=${s12}$ cm.<br>`;
					texte += `Calculer $${s0 + s2}$.`;

				}
				if (type_de_questions == 4) { // Calcul de l'hypoténuse (1/sinus) 
					texte += `L'angle $\\widehat{${s0 + s1 + s2}}$ mesure $${angle1}\\degree$, $${s0 + s2}=${s02}$ cm.<br>`;
					texte += `Calculer $${s1 + s2}$.`;

				}
				if (type_de_questions == 5) { // calcul du côté opposé (tangente)
					texte += `L'angle $\\widehat{${s0 + s1 + s2}}$ mesure $${angle1}\\degree$, $${s0 + s1}=${s01}$ cm.<br>`;
					texte += `Calculer $${s0 + s2}$.`;

				}
				if (type_de_questions == 6) { // Calcul du côté adjacent (1/tangente) 
					texte += `L'angle $\\widehat{${s0 + s1 + s2}}$ mesure $${angle1}\\degree$, $${s0 + s2}=${s02}$ cm.<br>`;
					texte += `Calculer $${s0 + s1}$.`;

				}

				this.type_exercice = 'MG32';
				this.MG32codeBase64 = codeBase64
				this.MG32code_pour_modifier_la_figure = `
				mtg32App.giveFormula2("MG32svg${numero_de_l_exercice}", "x2", "${y2}");
		        mtg32App.giveFormula2("MG32svg${numero_de_l_exercice}", "x1", "${x1}");
				mtg32App.giveFormula2("MG32svg${numero_de_l_exercice}", "alphadeg", "${alpha1deg}");
				mtg32App.rename("MG32svg${numero_de_l_exercice}","A","${s0}");
				mtg32App.rename("MG32svg${numero_de_l_exercice}","B","${s1}");
				mtg32App.rename("MG32svg${numero_de_l_exercice}","C","${s2}");
				mtg32App.calculate("MG32svg${numero_de_l_exercice}");
	        	mtg32App.display("MG32svg${numero_de_l_exercice}");
				`
				texte += `<br>$\\footnotesize{\\textit{Le point \\thickspace ${s0} peut être déplacé (si la figure est tronquée).}}$<br>`;
			}
			else { //sortie Latex
				texte = `\\begin{minipage}{.7 \\linewidth} 	\\vspace{0cm} Sur la figure ci-contre, on a  : \\begin{itemize}`
				texte += `\n\t\\item Le triangle $${nom_du_triangle}$ est rectangle en $${s0}$~;`

				if (type_de_questions == 1) { // Calcul du coté adjacent (cosinus)
					texte += `\n\t\\item $${s1 + s2}=${s12}~\\text{cm}$`;
					texte += `\n\t\\item L'angle $\\widehat{${s0 + s1 + s2}}$~mesure~$${angle1}\\degree$.<br>`;
					texte += `\\end{itemize} \\bigskip\n\t  Calculer $${s0 + s1}$ à 0,1 près. \\end{minipage}`
				}
				if (type_de_questions == 2) { // Calcul de l'hypoténuse (1/cosinus)
					texte += `\n\t\\item $${s0 + s1}=${s01}~\\text{cm}$`;
					texte += `\n\t\\item L'angle $\\widehat{${s0 + s1 + s2}}$~mesure~$${angle1}\\degree$.<br>`;
					texte += `\\end{itemize} \\bigskip\n\t  Calculer $${s1 + s2}$ à 0,1 près. \\end{minipage}`
				}
				if (type_de_questions == 3) { // Calcul du coté opposé (sinus)
					texte += `\n\t\\item $${s1 + s2}=${s12}~\\text{cm}$`;
					texte += `\n\t\\item L'angle $\\widehat{${s0 + s1 + s2}}$~mesure~$${angle1}\\degree$.<br>`;
					texte += `\\end{itemize} \\bigskip\n\t  Calculer $${s0 + s2}$ à 0,1 près. \\end{minipage}`
				}
				if (type_de_questions == 4) { // Calcul de l'hypoténuse (1/sinus)
					texte += `\n\t\\item $${s0 + s2}=${s02}~\\text{cm}$`;
					texte += `\n\t\\item L'angle $\\widehat{${s0 + s1 + s2}}$~mesure~$${angle1}\\degree$.<br>`;
					texte += `\\end{itemize} \\bigskip\n\t  Calculer $${s1 + s2}$ à 0,1 près. \\end{minipage}`
				}
				if (type_de_questions == 5) { // Calcul du côté opposé (tangente)
					texte += `\n\t\\item $${s0 + s1}=${s01}~\\text{cm}$`;
					texte += `\n\t\\item L'angle $\\widehat{${s0 + s1 + s2}}$~mesure~$${angle1}\\degree$.<br>`;
					texte += `\\end{itemize} \\bigskip\n\t  Calculer $${s0 + s2}$ à 0,1 près. \\end{minipage}`
				}
				if (type_de_questions == 6) { // Calcul du côté adjacent (1/tangente)
					texte += `\n\t\\item $${s0 + s2}=${s02}~\\text{cm}$`;
					texte += `\n\t\\item L'angle $\\widehat{${s0 + s1 + s2}}$~mesure~$${angle1}\\degree$.<br>`;
					texte += `\\end{itemize} \\bigskip\n\t  Calculer $${s0 + s1}$ à 0,1 près. \\end{minipage}`
				}
				texte += '\\begin{minipage}{0.3 \\linewidth}'
				// dessin de la figure
				texte += '\n \\begin{tikzpicture}[scale=0.7]' // Balise début de figure
				texte += '\n\t \\tkzDefPoints{0/0/' + s0 + ',' + x1 + '/0/B,0/' + y2 + '/C}' // créer les points du triangle initial 
				// Définit les points M et N par homothétie de centre C et de rapport 0,3<k<0,8
				texte += '\n\t \\tkzDefPointBy[rotation= center ' + s0 + ' angle ' + alpha1deg + '](B) \\tkzGetPoint{' + s1 + '}' // transformer le premier point par rotation
				texte += '\n\t \\tkzDefPointBy[rotation= center ' + s0 + ' angle ' + alpha1deg + '](C) \\tkzGetPoint{' + s2 + '}' // transformer le deuxième point par rotation
				texte += '\n\t \\tkzDrawPolygon(' + s0 + ',' + s1 + ',' + s2 + ')' // Trace le triangle
				// marquer l'angle droit
				texte += '\n\t \\tkzDefPointBy[homothety=center ' + s0 + ' ratio 0.1](' + s1 + ')' + '\\tkzGetPoint{B}'
				texte += '\n\t \\tkzDefPointBy[rotation= center ' + s0 + ' angle 90](B) \\tkzGetPoint{C}'
				texte += '\n\t \\tkzDefPointBy[homothety=center ' + s0 + ' ratio 0.1414](' + s1 + ')' + '\\tkzGetPoint{A}'
				texte += '\n\t \\tkzDefPointBy[rotation= center ' + s0 + ' angle 45](A) \\tkzGetPoint{A}'
				texte += '\n\t \\tkzDrawPolygon(' + s0 + ',B,A,C)' // Trace la marque d'angle droit
				if (alpha1deg > 0) { // rotation "angle droit dessous"
					texte += '\n\t \\tkzLabelPoints[below](' + s0 + ')' //nomme les points
					texte += '\n\t \\tkzLabelPoints[above right](' + s1 + ')'
					texte += '\n\t \\tkzLabelPoints[left](' + s2 + ')'
				}
				else {		// rotation "angle droit dessus" position du nom inversée 
					texte += '\n\t \\tkzLabelPoints[left](' + s0 + ')' //nomme les points
					texte += '\n\t \\tkzLabelPoints[below left](' + s1 + ')'
					texte += '\n\t \\tkzLabelPoints[above right](' + s2 + ')'
				}
				texte += '\n \\end{tikzpicture}' // Balise de fin de figure
				texte += '\\end{minipage}'
			}
			if (type_de_questions == 1) {	
				texte_corr+=`Le cosinus de l'angle $\\widehat{${s0+s1+s2}}$ est défini par :<br>`;
				texte_corr +=`$\\cos \\left(\\widehat{${s0+s1+s2}}\\right)=${tex_fraction(s0 + s1,s1+s2)}$<br>`;
				texte_corr +=`Avec les données numériques :<br>`
				texte_corr +=`$\\dfrac{\\cos\\left(${angle1}\\degree\\right)}{\\color{red}{1}}=${tex_fraction(s0+s1,s12)}$<br>`;
				texte_corr +=`$\\bf\\textcolor{red}{Les~ produits~ en~ croix~ sont~ \\acute{e}gaux~donc~ :}$<br>`
				texte_corr += `$${s0+s1}=${quatrieme_proportionnelle('\\color{red}{1}',s12,`\\cos\\left(${angle1}\\degree\\right)`)}$<br>` // ${s12}\\times\\cos\\left(${angle1}\\degree\\right)$<br>`;
				texte_corr += `Soit $${s0 + s1}\\approx${s01}$ cm.`;
			}
			if (type_de_questions == 2) {
				texte_corr += `Le cosinus de l'angle $\\widehat{${s0+s1+s2}}$ est défini par :<br>`;
				texte_corr +=`$\\cos \\left(\\widehat{${s0+s1+s2}}\\right)=${tex_fraction(s0 + s1,s1+s2)}$<br>`;
				texte_corr +=`Avec les données numériques :<br>`
				texte_corr +=`$\\dfrac{\\cos\\left(${angle1}\\degree\\right)}{\\color{red}{1}}=${tex_fraction(s01,s1+s2)}$<br>`;
				texte_corr +=`$\\bf\\textcolor{red}{Les~ produits~ en~ croix~ sont~ \\acute{e}gaux~donc~ :}$<br>`
				texte_corr += `$${s1 + s2}=${quatrieme_proportionnelle(`\\cos\\left(${angle1}\\degree\\right)`,s01,'\\color{red}{1}')}$<br>`// ${s01}\\div\\cos\\left(${angle1}\\degree\\right)$<br>`;
				texte_corr += `Soit $${s1 + s2}\\approx${s12}$ cm.`;
			}	
			if (type_de_questions == 3) {
				texte_corr += `Le sinus de l'angle $\\widehat{${s0+s1+s2}}$ est défini par :<br>`;
				texte_corr += `$\\sin \\left(\\widehat{${s0+s1+s2}}\\right)=${tex_fraction(s0 + s2,s1+s2)}$<br>`;
				texte_corr +=`Avec les données numériques :<br>`
				texte_corr +=`$\\dfrac{\\sin\\left(${angle1}\\degree\\right)}{\\color{red}{1}}=${tex_fraction(s0+s2,s12)}$<br>`;
				texte_corr +=`$\\bf\\textcolor{red}{Les~ produits~ en~ croix~ sont~ \\acute{e}gaux~donc~ :}$<br>`
				texte_corr += `$${s0+s2}=${quatrieme_proportionnelle('\\color{red}{1}',s12,`\\sin\\left(${angle1}\\degree\\right)`)}$<br>`
				texte_corr += `Soit $${s0 + s2}\\approx${s02}$ cm.`;
			}
			if (type_de_questions == 4) {
				texte_corr = `Le sinus de l'angle $\\widehat{${s0+s1+s2}}$ est défini par :<br>`;
				texte_corr +=`$\\sin \\left(\\widehat{${s0+s1+s2}}\\right)=${tex_fraction(s0 + s2,s1+s2)}$<br>`;
				texte_corr +=`Avec les données numériques :<br>`
				texte_corr +=`$\\dfrac{\\sin\\left(${angle1}\\degree\\right)}{\\color{red}{1}}=${tex_fraction(s02,s1+s2)}$<br>`;
				texte_corr +=`$\\bf\\textcolor{red}{Les~ produits~ en~ croix~ sont~ \\acute{e}gaux~donc~ :}$<br>`
				texte_corr += `$${s1+s2}=${quatrieme_proportionnelle(`\\sin\\left(${angle1}\\degree\\right)`,s02,'\\color{red}{1}')}$<br>`				
				texte_corr += `Soit $${s1 + s2}\\approx${s12}$ cm.`;
			}
			if (type_de_questions == 5) {
				texte_corr = `La tangente de l'angle $\\widehat{${s0+s1+s2}}$ est définie par :<br>`;
				texte_corr += `$\\tan \\left(\\widehat{${s0+s1+s2}}\\right)=${tex_fraction(s0 + s2,s0+s1)}<br>$`;
				texte_corr +=`Avec les données numériques :<br>`
				texte_corr +=`$\\dfrac{\\tan\\left(${angle1}\\degree\\right)}{\\color{red}{1}}=${tex_fraction(s0+s2,s01)}$<br>`;
				texte_corr +=`$\\bf\\textcolor{red}{Les~ produits~ en~ croix~ sont~ \\acute{e}gaux~donc~ :}$<br>`
				texte_corr += `$${s0+s2}=${quatrieme_proportionnelle('\\color{red}{1}',s01,`\\tan\\left(${angle1}\\degree\\right)`)}$<br>`								
				texte_corr += `Soit $${s0 + s2}\\approx${s02}$ cm.`;
			}
			if (type_de_questions == 6) {
				texte_corr = `La tangente de l'angle $\\widehat{${s0+s1+s2}}$ est définie par :<br>`;
				texte_corr +=`$\\tan \\left(\\widehat{${s0+s1+s2}}\\right)=${tex_fraction(s0 + s2,s0+s1)}$<br>`;
				texte_corr +=`Avec les données numériques :<br>`
				texte_corr +=`$\\dfrac{\\tan\\left(${angle1}\\degree\\right)}{\\color{red}{1}}=${tex_fraction(s02,s0+s1)}$<br>`;
				texte_corr +=`$\\bf\\textcolor{red}{Les~ produits~ en~ croix~ sont~ \\acute{e}gaux~donc~ :}$<br>`
				texte_corr += `$${s0+s1}=${quatrieme_proportionnelle(`\\tan\\left(${angle1}\\degree\\right)`,s02,'\\color{red}{1}')}$<br>`					
				texte_corr += `Soit $${s0 + s1}\\approx${s01}$ cm.`;
			}
			// texte+=href('Comment calculer une longueur avec la trigonométrie','https://www.youtube.com/watch?v=DYW-BTMFzd4')
			this.liste_questions.push(texte);
			this.liste_corrections.push(texte_corr);
			liste_de_question_to_contenu_sans_numero(this);
	}
	this.besoin_formulaire_numerique = ['Niveau de difficulté', 3, '1 : Calculs faciles \n 2 : Calculs moins faciles \n 3 : Mélange'];
}
/**
* @auteur Jean-Claude Lhote
* Calcul d'angle dans le triangle rectangle
* Le niveau 1 se limite à l'utilisation de Arccos
* Le niveau 2 utilise la fonction trigo la plus pertinente pour un calcul direct
*/
function Exercice_Trigo_angles() {
	'use strict'
	Exercice.call(this); // Héritage de la classe Exercice()
	this.titre = "Déterminer un angle grâce à la trigonométrie";
	this.consigne = "";
	this.nb_questions = 1;
	this.nb_questions_modifiable = false;
	this.nb_cols = 1;
	this.nb_cols_corr = 1;
	this.sup = 1; // 1 calcul avec Arccos
	sortie_html ? this.spacing_corr = 3 : this.spacing_corr = 1.5;
	this.liste_packages = 'tkz-euclide';

	this.nouvelle_version = function (numero_de_l_exercice) {
		this.type_exercice = 'MG32';
		this.taille_div_MG32 = [700, 500];
		this.liste_questions = [];
		this.liste_corrections = []; // Liste de questions corrigées
		let lettre0 = randint(11, 25)  // aleatoirisation du nom des points
		let s0 = lettre_depuis_chiffre(lettre0)
		let lettre1 = randint(11, 25, [lettre0])
		let s1 = lettre_depuis_chiffre(lettre1)
		let lettre2 = randint(11, 25, [lettre0, lettre1])
		let s2 = lettre_depuis_chiffre(lettre2)
		let angle1,angle2
		let type_de_questions
		if (this.sup == 1) {
			type_de_questions = randint(1,2) // utilisation de Arccos
		}
		if (this.sup == 2) {
			type_de_questions = randint(1,6,[2]) // utilisation des 3 fonctions Arccos, Arcsin et Arctan
		}
		
		let nom_du_triangle = choice([s0 + s1 + s2, s0 + s2 + s1, s1 + s0 + s2, s1 + s2 + s0, s2 + s0 + s1, s2 + s1 + s0])
		let k1 = Math.round((Math.random() * 5 + 1) * 10) / 10
		let k2 = Math.round((Math.random() * 5 + 1) * 10) / 10
		angle1=Math.round(Math.degres(Math.atan(k2/k1)));
		angle2=90-angle1;
		let alpha1 = Math.random() * Math.PI - Math.PI / 2
		let alpha1deg = Math.round(alpha1 * 180 / Math.PI)
		let x1 = k1	// coordonnées des deux sommets du triangle
		let y2 = k2
		let s01 = arrondi_virgule(k1, 1)			// mise en texte avec 1 chiffres après la virgule pour énoncé
		let s02 = arrondi_virgule(k2, 1)
		
		let dist12 = k1/Math.cos(Math.atan(k2/k1))	   //calcul de l'hypoténuse
		dist12 = Math.round(dist12 * 10) / 10		// On ne garde qu'une approximation au dixième pour l'exercice
		let s12 = arrondi_virgule(dist12, 1);
		let texte;
		let texte_corr = `Dans le triangle $${nom_du_triangle}$ rectangle en $${s0}$ :<br>`;
		if (sortie_html) { // sortie html MG32
			let codeBase64
			if (type_de_questions%2!=0) {
				if (alpha1deg < 0) {
					codeBase64 = "TWF0aEdyYXBoSmF2YTEuMAAAABI+TMzNAAJmcv###wEA#wEAAAAAAAAAAAYfAAADsgAAAQEAAAAAAAAAAQAAACL#####AAAAAQAKQ0NhbGNDb25zdAD#####AAJwaQAWMy4xNDE1OTI2NTM1ODk3OTMyMzg0Nv####8AAAABAApDQ29uc3RhbnRlQAkh+1RELRj#####AAAAAQAKQ1BvaW50QmFzZQD#####AAAAAAAWAAFBAMA7AAAAAAAAwCAAAAAAAAAFAAFAcLFHrhR64UBneFHrhR64#####wAAAAEAFENEcm9pdGVEaXJlY3Rpb25GaXhlAP####8BAAAAABYAAAEAAQAAAAEBP#AAAAAAAAD#####AAAAAQAPQ1BvaW50TGllRHJvaXRlAP####8BAAAAAA4AAUkAwBgAAAAAAAAAAAAAAAAAAAUAAUBHq0OVgQYlAAAAAv####8AAAABAAlDRHJvaXRlQUIA#####wEAAAAAEAAAAQABAAAAAQAAAAP#####AAAAAQAWQ0Ryb2l0ZVBlcnBlbmRpY3VsYWlyZQD#####AQAAAAAWAAABAAEAAAABAAAABP####8AAAABAAlDQ2VyY2xlT0EA#####wEAAAAAAQAAAAEAAAAD#####wAAAAEAEENJbnREcm9pdGVDZXJjbGUA#####wAAAAUAAAAG#####wAAAAEAEENQb2ludExpZUJpcG9pbnQA#####wEAAAAAFgAAAQUAAQAAAAcAAAAJAP####8BAAAAAA4AAUoAwCgAAAAAAADAEAAAAAAAAAUAAgAAAAf#####AAAAAgAHQ1JlcGVyZQD#####AObm5gABAAAAAQAAAAMAAAAJAAAAAAAAAQAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAT#wAAAAAAAAAAAAAT#wAAAAAAAA#####wAAAAEACkNVbml0ZXhSZXAA#####wAEdW5pdAAAAAr#####AAAAAQALQ0hvbW90aGV0aWUA#####wAAAAH#####AAAAAQAKQ09wZXJhdGlvbgMAAAABP#AAAAAAAAD#####AAAAAQAPQ1Jlc3VsdGF0VmFsZXVyAAAAC#####8AAAABAAtDUG9pbnRJbWFnZQD#####AQAAAAAQAAJXIgEBAAAAAAMAAAAM#####wAAAAEACUNMb25ndWV1cgD#####AAAAAQAAAA3#####AAAAAQAHQ0NhbGN1bAD#####AAJ4MQABNgAAAAFAGAAAAAAAAAAAABEA#####wACeDIAATQAAAABQBAAAAAAAAAAAAARAP####8ACGFscGhhZGVnAAMtOTD#####AAAAAQAMQ01vaW5zVW5haXJlAAAAAUBWgAAAAAAA#####wAAAAEAEENQb2ludERhbnNSZXBlcmUA#####wEAAAAAFgABWgDAFAAAAAAAAEAAAAAAAAAABwAAAAAKAAAAAQAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAEwD#####AQAAAAAWAAFGAAAAAAAAAAAAQAgAAAAAAAAHAAAAAAoAAAAOAAAADwAAAAEAAAAAAAAAAAAAABMA#####wEAAAAAFgABRAAAAAAAAAAAAEAIAAAAAAAABwAAAAAKAAAAAQAAAAAAAAAAAAAADgAAABD#####AAAAAQAJQ1JvdGF0aW9uAP####8AAAASAAAADgAAABEAAAAPAP####8AAAAAABYAAUIAQCoAAAAAAADALgAAAAAAAAcAAAAAEwAAABUAAAAPAP####8AAAAAABYAAUMAQBAAAAAAAADAOwAAAAAAAAcAAAAAFAAAABX#####AAAAAQAJQ1BvbHlnb25lAP####8AAAAAAAIAAAAEAAAAEgAAABYAAAAXAAAAEv####8AAAACABdDTWFycXVlQW5nbGVHZW9tZXRyaXF1ZQD#####AAAA#wAEAAAAAUAwAAAAAAAAAAAAFgAAABIAAAAX#####wAAAAEACENTZWdtZW50AP####8BAAD#ABAAAAEABAAAABcAAAAW#####wAAAAEAEENNYWNyb0FwcGFyaXRpb24A#####wD#AAAB#####xBAh8ij1wo9cUBHYUeuFHrhAgAAAAAAAAAAAAAAAAEAAAAAAAAAAAAFQXBwQkMAAAAAAAEAAAAaAP####8AAAABABFDTWFjcm9EaXNwYXJpdGlvbgD#####AP8AAAH#####EECKaKPXCj1xQEphR64UeuECAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAZNYXNxQkMAAAAAAAEAAAAa#####wAAAAEAC0NNYWNyb1BhdXNlAP####8A#wAAAf####8QQI1oo9cKPXFASuFHrhR64QIAAAAAAAAAAAAAAAABAAAAAAAAAAAABVBhdXNlAAAAAAABAAAAGQD#####AAAA#wH#####EECIIKPXCj1xQFqwo9cKPXACAAAAAAAAAAAAAAAAAQAAAAAAAAAAAApNYXNxQW5nZHJ0AAAAAAABAAAAGQAAABgA#####wAAAP8B#####xBAjAij1wo9cUBa8KPXCj1wAgAAAAAAAAAAAAAAAAEAAAAAAAAAAAAJQXBwQW5nRHJ0AAAAAAABAAAAGQD#####AAAAAQARQ01hY3JvU3VpdGVNYWNyb3MA#####wAAAP8B#####xBAWMUeuFHrhUB4fCj1wo9cAgAAAAAAAAAAAAAAAAEAAAAAAAAAAAALaHlwb3TDqW51c2UAAAAAAAsAAAAeAAAAGwAAAB0AAAAfAAAAHAAAAB0AAAAeAAAAGwAAAB0AAAAcAAAAHwAAABYA#####wAAAP8ABQAAACBAQIGJiJxJngAAAAEAAAAWAAAAFwAAAA7##########w=="
				}
				else {
					codeBase64 = "TWF0aEdyYXBoSmF2YTEuMAAAABI#AAAAAAJmcv###wEA#wEAAAAAAAAAAAYfAAADsgAAAQEAAAAAAAAAAQAAACL#####AAAAAQAKQ0NhbGNDb25zdAD#####AAJwaQAWMy4xNDE1OTI2NTM1ODk3OTMyMzg0Nv####8AAAABAApDQ29uc3RhbnRlQAkh+1RELRj#####AAAAAQAKQ1BvaW50QmFzZQD#####AAAAAAAWAAFBAMAUAAAAAAAAQBQAAAAAAAAFAAFAbFo9cKPXBkB0BhR64Ueu#####wAAAAEAFENEcm9pdGVEaXJlY3Rpb25GaXhlAP####8BAAAAABYAAAEAAQAAAAEBP#AAAAAAAAD#####AAAAAQAPQ1BvaW50TGllRHJvaXRlAP####8BAAAAAA4AAUkAwBgAAAAAAAAAAAAAAAAAAAUAAUBHq0OVgQYlAAAAAv####8AAAABAAlDRHJvaXRlQUIA#####wEAAAAAEAAAAQABAAAAAQAAAAP#####AAAAAQAWQ0Ryb2l0ZVBlcnBlbmRpY3VsYWlyZQD#####AQAAAAAWAAABAAEAAAABAAAABP####8AAAABAAlDQ2VyY2xlT0EA#####wEAAAAAAQAAAAEAAAAD#####wAAAAEAEENJbnREcm9pdGVDZXJjbGUA#####wAAAAUAAAAG#####wAAAAEAEENQb2ludExpZUJpcG9pbnQA#####wEAAAAAFgAAAQUAAQAAAAcAAAAJAP####8BAAAAAA4AAUoAwCgAAAAAAADAEAAAAAAAAAUAAgAAAAf#####AAAAAgAHQ1JlcGVyZQD#####AObm5gABAAAAAQAAAAMAAAAJAAAAAAAAAQAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAT#wAAAAAAAAAAAAAT#wAAAAAAAA#####wAAAAEACkNVbml0ZXhSZXAA#####wAEdW5pdAAAAAr#####AAAAAQALQ0hvbW90aGV0aWUA#####wAAAAH#####AAAAAQAKQ09wZXJhdGlvbgMAAAABP#AAAAAAAAD#####AAAAAQAPQ1Jlc3VsdGF0VmFsZXVyAAAAC#####8AAAABAAtDUG9pbnRJbWFnZQD#####AQAAAAAQAAJXIgEBAAAAAAMAAAAM#####wAAAAEACUNMb25ndWV1cgD#####AAAAAQAAAA3#####AAAAAQAHQ0NhbGN1bAD#####AAJ4MQABNgAAAAFAGAAAAAAAAAAAABEA#####wACeDIAATQAAAABQBAAAAAAAAAAAAARAP####8ACGFscGhhZGVnAAI5MAAAAAFAVoAAAAAAAP####8AAAABABBDUG9pbnREYW5zUmVwZXJlAP####8BAAAAABYAAVoAwBQAAAAAAABAAAAAAAAAAAcAAAAACgAAAAEAAAAAAAAAAAAAAAEAAAAAAAAAAAAAABIA#####wEAAAAAFgABRgAAAAAAAAAAAEAIAAAAAAAABwAAAAAKAAAADgAAAA8AAAABAAAAAAAAAAAAAAASAP####8BAAAAABYAAUQAAAAAAAAAAABACAAAAAAAAAcAAAAACgAAAAEAAAAAAAAAAAAAAA4AAAAQ#####wAAAAEACUNSb3RhdGlvbgD#####AAAAEgAAAA4AAAARAAAADwD#####AAAAAAAWAAFCAEAqAAAAAAAAwDgAAAAAAAAHAAAAABMAAAAVAAAADwD#####AAAAAAAWAAFDAMA3AAAAAAAAwEAAAAAAAAAHAAAAABQAAAAV#####wAAAAEACUNQb2x5Z29uZQD#####AAAAAAACAAAABAAAABIAAAAWAAAAFwAAABL#####AAAAAgAXQ01hcnF1ZUFuZ2xlR2VvbWV0cmlxdWUA#####wAAAP8ABAAAAAFAMAAAAAAAAAAAABYAAAASAAAAF#####8AAAABAAhDU2VnbWVudAD#####AQAA#wAQAAABAAQAAAAXAAAAFv####8AAAABABBDTWFjcm9BcHBhcml0aW9uAP####8A#wAAAf####8QQIfIo9cKPXFAR2FHrhR64QIAAAAAAAAAAAAAAAABAAAAAAAAAAAABUFwcEJDAAAAAAABAAAAGgD#####AAAAAQARQ01hY3JvRGlzcGFyaXRpb24A#####wAAAP8B#####xBAimij1wo9cUBKYUeuFHrhAgAAAAAAAAAAAAAAAAEAAAAAAAAAAAAGTWFzcUJDAAAAAAABAAAAGv####8AAAABAAtDTWFjcm9QYXVzZQD#####AP8AAAH#####EECNaKPXCj1xQErhR64UeuECAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAVQYXVzZQAAAAAAAQAAABgA#####wAAAP8B#####xBAh#Cj1wo9cUBbcKPXCj1wAgAAAAAAAAAAAAAAAAEAAAAAAAAAAAAKTWFzcUFuZ0RydAAAAAAAAQAAABkAAAAXAP####8AAAD#Af####8QQIw4o9cKPXFAXPCj1wo9cAIAAAAAAAAAAAAAAAABAAAAAAAAAAAACUFwcEFuZ0RydAAAAAAAAQAAABkA#####wAAAAEAEUNNYWNyb1N1aXRlTWFjcm9zAP####8AAAD#Af####8QQFjFHrhR64VAeHwo9cKPXAIAAAAAAAAAAAAAAAABAAAAAAAAAAAAC2h5cG90w6ludXNlAAAAAAALAAAAHgAAABsAAAAdAAAAHwAAABwAAAAdAAAAHgAAABsAAAAdAAAAHwAAABwAAAAVAP####8AAAD#AAUAAAAgQEHcp2T0QTQAAAABAAAAFgAAABcAAAAO##########8="
				}
			}
			else {
				if (alpha1deg < 0) {
					codeBase64 = "TWF0aEdyYXBoSmF2YTEuMAAAABI+TMzNAAJmcv###wEA#wEAAAAAAAAAAAYfAAADsgAAAQEAAAAAAAAAAQAAACL#####AAAAAQAKQ0NhbGNDb25zdAD#####AAJwaQAWMy4xNDE1OTI2NTM1ODk3OTMyMzg0Nv####8AAAABAApDQ29uc3RhbnRlQAkh+1RELRj#####AAAAAQAKQ1BvaW50QmFzZQD#####AAAAAAAWAAFBAMA7AAAAAAAAwCAAAAAAAAAFAAFAcLFHrhR64UBneFHrhR64#####wAAAAEAFENEcm9pdGVEaXJlY3Rpb25GaXhlAP####8BAAAAABYAAAEAAQAAAAEBP#AAAAAAAAD#####AAAAAQAPQ1BvaW50TGllRHJvaXRlAP####8BAAAAAA4AAUkAwBgAAAAAAAAAAAAAAAAAAAUAAUBHq0OVgQYlAAAAAv####8AAAABAAlDRHJvaXRlQUIA#####wEAAAAAEAAAAQABAAAAAQAAAAP#####AAAAAQAWQ0Ryb2l0ZVBlcnBlbmRpY3VsYWlyZQD#####AQAAAAAWAAABAAEAAAABAAAABP####8AAAABAAlDQ2VyY2xlT0EA#####wEAAAAAAQAAAAEAAAAD#####wAAAAEAEENJbnREcm9pdGVDZXJjbGUA#####wAAAAUAAAAG#####wAAAAEAEENQb2ludExpZUJpcG9pbnQA#####wEAAAAAFgAAAQUAAQAAAAcAAAAJAP####8BAAAAAA4AAUoAwCgAAAAAAADAEAAAAAAAAAUAAgAAAAf#####AAAAAgAHQ1JlcGVyZQD#####AObm5gABAAAAAQAAAAMAAAAJAAAAAAAAAQAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAT#wAAAAAAAAAAAAAT#wAAAAAAAA#####wAAAAEACkNVbml0ZXhSZXAA#####wAEdW5pdAAAAAr#####AAAAAQALQ0hvbW90aGV0aWUA#####wAAAAH#####AAAAAQAKQ09wZXJhdGlvbgMAAAABP#AAAAAAAAD#####AAAAAQAPQ1Jlc3VsdGF0VmFsZXVyAAAAC#####8AAAABAAtDUG9pbnRJbWFnZQD#####AQAAAAAQAAJXIgEBAAAAAAMAAAAM#####wAAAAEACUNMb25ndWV1cgD#####AAAAAQAAAA3#####AAAAAQAHQ0NhbGN1bAD#####AAJ4MQABNgAAAAFAGAAAAAAAAAAAABEA#####wACeDIAATQAAAABQBAAAAAAAAAAAAARAP####8ACGFscGhhZGVnAAMtOTD#####AAAAAQAMQ01vaW5zVW5haXJlAAAAAUBWgAAAAAAA#####wAAAAEAEENQb2ludERhbnNSZXBlcmUA#####wEAAAAAFgABWgDAFAAAAAAAAEAAAAAAAAAABwAAAAAKAAAAAQAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAEwD#####AQAAAAAWAAFGAAAAAAAAAAAAQAgAAAAAAAAHAAAAAAoAAAAOAAAADwAAAAEAAAAAAAAAAAAAABMA#####wEAAAAAFgABRAAAAAAAAAAAAEAIAAAAAAAABwAAAAAKAAAAAQAAAAAAAAAAAAAADgAAABD#####AAAAAQAJQ1JvdGF0aW9uAP####8AAAASAAAADgAAABEAAAAPAP####8AAAAAABYAAUIAQCoAAAAAAADALgAAAAAAAAcAAAAAEwAAABUAAAAPAP####8AAAAAABYAAUMAQBAAAAAAAADAOwAAAAAAAAcAAAAAFAAAABX#####AAAAAQAJQ1BvbHlnb25lAP####8AAAAAAAIAAAAEAAAAEgAAABYAAAAXAAAAEv####8AAAACABdDTWFycXVlQW5nbGVHZW9tZXRyaXF1ZQD#####AAAA#wAEAAAAAUAwAAAAAAAAAAAAFgAAABIAAAAX#####wAAAAEACENTZWdtZW50AP####8BAAD#ABAAAAEABAAAABcAAAAW#####wAAAAEAEENNYWNyb0FwcGFyaXRpb24A#####wD#AAAB#####xBAh8ij1wo9cUBHYUeuFHrhAgAAAAAAAAAAAAAAAAEAAAAAAAAAAAAFQXBwQkMAAAAAAAEAAAAaAP####8AAAABABFDTWFjcm9EaXNwYXJpdGlvbgD#####AP8AAAH#####EECKaKPXCj1xQEphR64UeuECAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAZNYXNxQkMAAAAAAAEAAAAa#####wAAAAEAC0NNYWNyb1BhdXNlAP####8A#wAAAf####8QQI1oo9cKPXFASuFHrhR64QIAAAAAAAAAAAAAAAABAAAAAAAAAAAABVBhdXNlAAAAAAABAAAAGQD#####AAAA#wH#####EECIIKPXCj1xQFqwo9cKPXACAAAAAAAAAAAAAAAAAQAAAAAAAAAAAApNYXNxQW5nZHJ0AAAAAAABAAAAGQAAABgA#####wAAAP8B#####xBAjAij1wo9cUBa8KPXCj1wAgAAAAAAAAAAAAAAAAEAAAAAAAAAAAAJQXBwQW5nRHJ0AAAAAAABAAAAGQD#####AAAAAQARQ01hY3JvU3VpdGVNYWNyb3MA#####wAAAP8B#####xBAWMUeuFHrhUB4fCj1wo9cAgAAAAAAAAAAAAAAAAEAAAAAAAAAAAALaHlwb3TDqW51c2UAAAAAAAsAAAAeAAAAGwAAAB0AAAAfAAAAHAAAAB0AAAAeAAAAGwAAAB0AAAAcAAAAHwAAABYA#####wAAAP8AAwAAACBAQHXBUVjTVQAAAAEAAAAXAAAAFgAAAA7##########w=="
				}
				else {
					codeBase64 = "TWF0aEdyYXBoSmF2YTEuMAAAABI#AAAAAAJmcv###wEA#wEAAAAAAAAAAAYfAAADsgAAAQEAAAAAAAAAAQAAACL#####AAAAAQAKQ0NhbGNDb25zdAD#####AAJwaQAWMy4xNDE1OTI2NTM1ODk3OTMyMzg0Nv####8AAAABAApDQ29uc3RhbnRlQAkh+1RELRj#####AAAAAQAKQ1BvaW50QmFzZQD#####AAAAAAAWAAFBAMAUAAAAAAAAQBQAAAAAAAAFAAFAbFo9cKPXBkB0BhR64Ueu#####wAAAAEAFENEcm9pdGVEaXJlY3Rpb25GaXhlAP####8BAAAAABYAAAEAAQAAAAEBP#AAAAAAAAD#####AAAAAQAPQ1BvaW50TGllRHJvaXRlAP####8BAAAAAA4AAUkAwBgAAAAAAAAAAAAAAAAAAAUAAUBHq0OVgQYlAAAAAv####8AAAABAAlDRHJvaXRlQUIA#####wEAAAAAEAAAAQABAAAAAQAAAAP#####AAAAAQAWQ0Ryb2l0ZVBlcnBlbmRpY3VsYWlyZQD#####AQAAAAAWAAABAAEAAAABAAAABP####8AAAABAAlDQ2VyY2xlT0EA#####wEAAAAAAQAAAAEAAAAD#####wAAAAEAEENJbnREcm9pdGVDZXJjbGUA#####wAAAAUAAAAG#####wAAAAEAEENQb2ludExpZUJpcG9pbnQA#####wEAAAAAFgAAAQUAAQAAAAcAAAAJAP####8BAAAAAA4AAUoAwCgAAAAAAADAEAAAAAAAAAUAAgAAAAf#####AAAAAgAHQ1JlcGVyZQD#####AObm5gABAAAAAQAAAAMAAAAJAAAAAAAAAQAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAT#wAAAAAAAAAAAAAT#wAAAAAAAA#####wAAAAEACkNVbml0ZXhSZXAA#####wAEdW5pdAAAAAr#####AAAAAQALQ0hvbW90aGV0aWUA#####wAAAAH#####AAAAAQAKQ09wZXJhdGlvbgMAAAABP#AAAAAAAAD#####AAAAAQAPQ1Jlc3VsdGF0VmFsZXVyAAAAC#####8AAAABAAtDUG9pbnRJbWFnZQD#####AQAAAAAQAAJXIgEBAAAAAAMAAAAM#####wAAAAEACUNMb25ndWV1cgD#####AAAAAQAAAA3#####AAAAAQAHQ0NhbGN1bAD#####AAJ4MQABNgAAAAFAGAAAAAAAAAAAABEA#####wACeDIAATQAAAABQBAAAAAAAAAAAAARAP####8ACGFscGhhZGVnAAI5MAAAAAFAVoAAAAAAAP####8AAAABABBDUG9pbnREYW5zUmVwZXJlAP####8BAAAAABYAAVoAwBQAAAAAAABAAAAAAAAAAAcAAAAACgAAAAEAAAAAAAAAAAAAAAEAAAAAAAAAAAAAABIA#####wEAAAAAFgABRgAAAAAAAAAAAEAIAAAAAAAABwAAAAAKAAAADgAAAA8AAAABAAAAAAAAAAAAAAASAP####8BAAAAABYAAUQAAAAAAAAAAABACAAAAAAAAAcAAAAACgAAAAEAAAAAAAAAAAAAAA4AAAAQ#####wAAAAEACUNSb3RhdGlvbgD#####AAAAEgAAAA4AAAARAAAADwD#####AAAAAAAWAAFCAEAqAAAAAAAAwDgAAAAAAAAHAAAAABMAAAAVAAAADwD#####AAAAAAAWAAFDAMA3AAAAAAAAwEAAAAAAAAAHAAAAABQAAAAV#####wAAAAEACUNQb2x5Z29uZQD#####AAAAAAACAAAABAAAABIAAAAWAAAAFwAAABL#####AAAAAgAXQ01hcnF1ZUFuZ2xlR2VvbWV0cmlxdWUA#####wAAAP8ABAAAAAFAMAAAAAAAAAAAABYAAAASAAAAF#####8AAAABAAhDU2VnbWVudAD#####AQAA#wAQAAABAAQAAAAXAAAAFv####8AAAABABBDTWFjcm9BcHBhcml0aW9uAP####8A#wAAAf####8QQIfIo9cKPXFAR2FHrhR64QIAAAAAAAAAAAAAAAABAAAAAAAAAAAABUFwcEJDAAAAAAABAAAAGgD#####AAAAAQARQ01hY3JvRGlzcGFyaXRpb24A#####wAAAP8B#####xBAimij1wo9cUBKYUeuFHrhAgAAAAAAAAAAAAAAAAEAAAAAAAAAAAAGTWFzcUJDAAAAAAABAAAAGv####8AAAABAAtDTWFjcm9QYXVzZQD#####AP8AAAH#####EECNaKPXCj1xQErhR64UeuECAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAVQYXVzZQAAAAAAAQAAABgA#####wAAAP8B#####xBAh#Cj1wo9cUBbcKPXCj1wAgAAAAAAAAAAAAAAAAEAAAAAAAAAAAAKTWFzcUFuZ0RydAAAAAAAAQAAABkAAAAXAP####8AAAD#Af####8QQIw4o9cKPXFAXPCj1wo9cAIAAAAAAAAAAAAAAAABAAAAAAAAAAAACUFwcEFuZ0RydAAAAAAAAQAAABkA#####wAAAAEAEUNNYWNyb1N1aXRlTWFjcm9zAP####8AAAD#Af####8QQFjFHrhR64VAeHwo9cKPXAIAAAAAAAAAAAAAAAABAAAAAAAAAAAAC2h5cG90w6ludXNlAAAAAAALAAAAHgAAABsAAAAdAAAAHwAAABwAAAAdAAAAHgAAABsAAAAdAAAAHwAAABwAAAAVAP####8AAAD#AAMAAAAgQELJWhOPSZcAAAABAAAAFwAAABYAAAAO##########8="
				}
			}
			texte = `Dans la figure ci-dessous, le triangle $${nom_du_triangle}$ est rectangle en $${s0}$.<br>`
			

			if (type_de_questions == 1) { // calcul de l'angle 1 (arccos)
				texte += `$${s1 + s2}=${s12}$ cm<br>`;
				texte += `$${s0 + s1}=${s01}$ cm<br>`;
				texte += `Calculer l'angle $\\widehat{${s0 + s1 + s2}}$ à 1° près.`;


			}
			if (type_de_questions == 2) { // Calcul de l'angle 2 (90-arccos)
			texte += `$${s1 + s2}=${s12}$ cm<br>`;
			texte += `$${s0 + s1}=${s01}$ cm<br>`;
			texte += `Calculer l'angle $\\widehat{${s0 + s2 + s1}}$ à 1° près.`;
			}
			if (type_de_questions == 3) { // calcul de l'angle 1 (arcsin)
				texte += `$${s0 + s2}=${s02}$ cm<br>`;
				texte += `$${s1 + s2}=${s12}$ cm<br>`;
				texte += `Calculer l'angle $\\widehat{${s0 + s1 + s2}}$ à 1° près.`;


			}
			if (type_de_questions == 4) { // Calcul de l'angle 2 (arcsin)
			texte += `$${s1 + s2}=${s12}$ cm<br>`;
			texte += `$${s0 + s1}=${s01}$ cm<br>`;
			texte += `Calculer l'angle $\\widehat{${s0 + s2 + s1}}$ à 1° près.`;
			}
			if (type_de_questions == 5) { // calcul de l'angle 1 (arctan)
				texte += `$${s0 + s2}=${s02}$ cm<br>`;
				texte += `$${s0 + s1}=${s01}$ cm<br>`;
				texte += `Calculer l'angle $\\widehat{${s0 + s1 + s2}}$ à 1° près.`;


			}
			if (type_de_questions == 6) { // Calcul de l'angle 2 (arctan)
			texte += `$${s0 + s2}=${s02}$ cm<br>`;
			texte += `$${s0 + s1}=${s01}$ cm<br>`;
			texte += `Calculer l'angle $\\widehat{${s0 + s2 + s1}}$ à 1° près.`;
			}

			this.type_exercice = 'MG32';
			this.MG32codeBase64 = codeBase64
			this.MG32code_pour_modifier_la_figure = `
			mtg32App.giveFormula2("MG32svg${numero_de_l_exercice}", "x2", "${y2}");
			mtg32App.giveFormula2("MG32svg${numero_de_l_exercice}", "x1", "${x1}");
			mtg32App.giveFormula2("MG32svg${numero_de_l_exercice}", "alphadeg", "${alpha1deg}");
			mtg32App.rename("MG32svg${numero_de_l_exercice}","A","${s0}");
			mtg32App.rename("MG32svg${numero_de_l_exercice}","B","${s1}");
			mtg32App.rename("MG32svg${numero_de_l_exercice}","C","${s2}");
			mtg32App.calculate("MG32svg${numero_de_l_exercice}");
			mtg32App.display("MG32svg${numero_de_l_exercice}");
			`
			texte += `<br>$\\footnotesize{\\textit{Le point \\thickspace ${s0} peut être déplacé (si la figure est tronquée).}}$<br>`;
		}
		else { //sortie Latex
			texte = `\\begin{minipage}{.7 \\linewidth} 	\\vspace{0cm} Sur la figure ci-contre, on a  : \\begin{itemize}`
			texte += `\n\t\\item Le triangle $${nom_du_triangle}$ est rectangle en $${s0}$;`

			if (type_de_questions == 1) { // Calcul de l'angle coté adjacent (Arccos)
				texte += `\n\t\\item $${s1 + s2}=${s12}~\\text{cm}$`;
				texte += `\n\t\\item $${s0 + s1}=${s01}~\\text{cm}$`;
				texte += `\\end{itemize} \\bigskip\n\t  Calculer l'angle $\\widehat{${s0 + s1 + s2}}$ à 1° près. \\end{minipage}`
			}
			if (type_de_questions == 2) { // Calcul de l'angle opposé (90-Arccos)
				texte += `\n\t\\item $${s1 + s2}=${s12}~\\text{cm}$`;
				texte += `\n\t\\item $${s0 + s1}=${s01}~\\text{cm}$`;
				texte += `\\end{itemize} \\bigskip\n\t  Calculer l'angle $\\widehat{${s0 + s2 + s1}}$ à 1° près. \\end{minipage}`
			}
			if (type_de_questions == 3) { // Calcul de l'angle 1 (Arcsin)
				texte += `\n\t\\item $${s1 + s2}=${s12}~\\text{cm}$`;
				texte += `\n\t\\item $${s0 + s2}=${s02}~\\text{cm}$`;
				texte += `\\end{itemize} \\bigskip\n\t  Calculer l'angle $\\widehat{${s0 + s1 + s2}}$ à 1° près. \\end{minipage}`
			}
			if (type_de_questions == 4) { // Calcul de l'angle 2 (Arcsin)
				texte += `\n\t\\item $${s1 + s2}=${s12}~\\text{cm}$`;
				texte += `\n\t\\item $${s0 + s1}=${s01}~\\text{cm}$`;
				texte += `\\end{itemize} \\bigskip\n\t  Calculer l'angle $\\widehat{${s0 + s2 + s1}}$ à 1° près. \\end{minipage}`
			}
			if (type_de_questions == 5) { // Calcul de l'angle 1 (Arctan)
				texte += `\n\t\\item $${s0 + s2}=${s02}~\\text{cm}$`;
				texte += `\n\t\\item $${s0 + s1}=${s01}~\\text{cm}$`;
				texte += `\\end{itemize} \\bigskip\n\t  Calculer l'angle $\\widehat{${s0 + s1 + s2}}$ à 1° près. \\end{minipage}`
	
			}
			if (type_de_questions == 6) { // Calcul de l'angle 2 (Arctan)
				texte += `\n\t\\item $${s0 + s2}=${s02}~\\text{cm}$`;
				texte += `\n\t\\item $${s0 + s1}=${s01}~\\text{cm}$`;
				texte += `\\end{itemize} \\bigskip\n\t  Calculer l'angle $\\widehat{${s0 + s2 + s1}}$ à 1° près. \\end{minipage}`
			}
			texte += '\\begin{minipage}{0.3 \\linewidth}'
			// dessin de la figure
			texte += '\n \\begin{tikzpicture}[scale=0.7]' // Balise début de figure
			texte += '\n\t \\tkzDefPoints{0/0/' + s0 + ',' + x1 + '/0/B,0/' + y2 + '/C}' // créer les points du triangle initial 
			// Définit les points M et N par homothétie de centre C et de rapport 0,3<k<0,8
			texte += '\n\t \\tkzDefPointBy[rotation= center ' + s0 + ' angle ' + alpha1deg + '](B) \\tkzGetPoint{' + s1 + '}' // transformer le premier point par rotation
			texte += '\n\t \\tkzDefPointBy[rotation= center ' + s0 + ' angle ' + alpha1deg + '](C) \\tkzGetPoint{' + s2 + '}' // transformer le deuxième point par rotation
			texte += '\n\t \\tkzDrawPolygon(' + s0 + ',' + s1 + ',' + s2 + ')' // Trace le triangle
			// marquer l'angle droit
			texte += '\n\t \\tkzDefPointBy[homothety=center ' + s0 + ' ratio 0.1](' + s1 + ')' + '\\tkzGetPoint{B}'
			texte += '\n\t \\tkzDefPointBy[rotation= center ' + s0 + ' angle 90](B) \\tkzGetPoint{C}'
			texte += '\n\t \\tkzDefPointBy[homothety=center ' + s0 + ' ratio 0.1414](' + s1 + ')' + '\\tkzGetPoint{A}'
			texte += '\n\t \\tkzDefPointBy[rotation= center ' + s0 + ' angle 45](A) \\tkzGetPoint{A}'
			texte += '\n\t \\tkzDrawPolygon(' + s0 + ',B,A,C)' // Trace la marque d'angle droit
			if (alpha1deg > 0) { // rotation "angle droit dessous"
			texte += '\n\t \\tkzLabelPoints[below](' + s0 + ')' //nomme les points
			texte += '\n\t \\tkzLabelPoints[above right](' + s1 + ')'
			texte += '\n\t \\tkzLabelPoints[left](' + s2 + ')'
		}
		else {		// rotation "angle droit dessus" position du nom inversée 
			texte += '\n\t \\tkzLabelPoints[left](' + s0 + ')' //nomme les points
			texte += '\n\t \\tkzLabelPoints[below left](' + s1 + ')'
			texte += '\n\t \\tkzLabelPoints[above right](' + s2 + ')'
		}
			texte += '\n \\end{tikzpicture}' // Balise de fin de figure
			texte += '\\end{minipage}'
		}
		if (type_de_questions == 1) {	
			texte_corr+=`Le cosinus de l'angle $\\widehat{${s0+s1+s2}}$ est défini par :<br>`;
			texte_corr +=`$\\cos \\left(\\widehat{${s0+s1+s2}}\\right)=${tex_fraction(s0 + s1,s1+s2)}$<br>`;
			texte_corr +=`Avec les données numériques :<br>`
			texte_corr += `$\\cos\\left(\\widehat{${s0+s1+s2}}\\right)=${tex_fraction(s01,s12)}$<br>`;
			texte_corr += `On en déduit que $\\widehat{${s0+s1+s2}}=\\arccos\\left(${tex_fraction(s01,s12)}\\right)$<br>`;
			texte_corr += `Soit $\\widehat{${s0+s1+s2}}\\approx${angle1}\\degree$`
		}
		if (type_de_questions == 2) {
			texte_corr+=`Le cosinus de l'angle $\\widehat{${s0+s1+s2}}$ est défini par :<br>`;
			texte_corr +=`$\\cos \\left(\\widehat{${s0+s1+s2}}\\right)=${tex_fraction(s0 + s1,s1+s2)}$<br>`;
			texte_corr +=`Avec les données numériques :<br>`
			texte_corr += `$\\cos\\left(\\widehat{${s0+s1+s2}}\\right)=${tex_fraction(s01,s12)}$<br>`;
			texte_corr += `On en déduit que $\\widehat{${s0+s1+s2}}=\\arccos\\left(${tex_fraction(s01,s12)}\\right)$<br>`;
			texte_corr += `Soit $\\widehat{${s0+s1+s2}}\\approx${angle1}\\degree$<br>`
			texte_corr += `Or, dans un triangle rectangle les angles aigus sont complémentaires, donc :<br>`
			texte_corr += `$\\widehat{${s0+s2+s1}}\\approx90-${angle1}\\approx${angle2}\\degree$`
		}	
		if (type_de_questions == 3) {
			texte_corr+=`Le sinus de l'angle $\\widehat{${s0+s1+s2}}$ est défini par :<br>`;
			texte_corr +=`$\\sin \\left(\\widehat{${s0+s1+s2}}\\right)=${tex_fraction(s0 + s2,s1+s2)}$<br>`;
			texte_corr +=`Avec les données numériques :<br>`
			texte_corr += `$\\sin\\left(\\widehat{${s0+s1+s2}}\\right)=${tex_fraction(s02,s12)}$<br>`;
			texte_corr += `On en déduit que $\\widehat{${s0+s1+s2}}=\\arcsin\\left(${tex_fraction(s02,s12)}\\right)$<br>`;
			texte_corr += `Soit $\\widehat{${s0+s1+s2}}\\approx${angle1}\\degree$`
		}
		if (type_de_questions == 4) {
			texte_corr+=`Le sinus de l'angle $\\widehat{${s0+s2+s1}}$ est défini par :<br>`;
			texte_corr +=`$\\sin \\left(\\widehat{${s0+s2+s1}}\\right)=${tex_fraction(s0 + s1,s1+s2)}$<br>`;
			texte_corr +=`Avec les données numériques :<br>`
			texte_corr += `$\\sin\\left(\\widehat{${s0+s2+s1}}\\right)=${tex_fraction(s01,s12)}$<br>`;
			texte_corr += `On en déduit que $\\widehat{${s0+s2+s1}}=\\arcsin\\left(${tex_fraction(s01,s12)}\\right)$<br>`;
			texte_corr += `Soit $\\widehat{${s0+s2+s1}}\\approx${angle2}\\degree$`
		}
		if (type_de_questions == 5) {
			texte_corr+=`La tangente de l'angle $\\widehat{${s0+s1+s2}}$ est définie par :<br>`;
			texte_corr +=`$\\tan \\left(\\widehat{${s0+s1+s2}}\\right)=${tex_fraction(s0 + s2,s0+s1)}$<br>`;
			texte_corr +=`Avec les données numériques :<br>`
			texte_corr += `$\\tan\\left(\\widehat{${s0+s1+s2}}\\right)=${tex_fraction(s02,s01)}$<br>`;
			texte_corr += `On en déduit que $\\widehat{${s0+s1+s2}}=\\arctan\\left(${tex_fraction(s02,s01)}\\right)$<br>`;
			texte_corr += `Soit $\\widehat{${s0+s1+s2}}\\approx${angle1}\\degree$`
		}
		if (type_de_questions == 6) {
			texte_corr+=`La tangente de l'angle $\\widehat{${s0+s2+s1}}$ est définie par :<br>`;
			texte_corr +=`$\\tan \\left(\\widehat{${s0+s2+s1}}\\right)=${tex_fraction(s0 + s1,s0+s2)}$<br>`;
			texte_corr +=`Avec les données numériques :<br>`
			texte_corr += `$\\tan\\left(\\widehat{${s0+s2+s1}}\\right)=${tex_fraction(s01,s02)}$<br>`;
			texte_corr += `On en déduit que $\\widehat{${s0+s2+s1}}=\\arctan\\left(${tex_fraction(s01,s02)}\\right)$<br>`;
			texte_corr += `Soit $\\widehat{${s0+s2+s1}}\\approx${angle2}\\degree$`
		}
		this.liste_questions.push(texte);
		this.liste_corrections.push(texte_corr);
		liste_de_question_to_contenu_sans_numero(this);;
	}
	this.besoin_formulaire_numerique = ['Niveau de difficulté', 2, '1 : Calcul de l\'angle avec Acos \n 2 : Calcul de l\'angle avec Acos, Asin ou Atan'];
}

/**
* À partir de la donnée des 3 longueurs d'un triangle, déterminer si il est rectangle ou pas.
* @Auteur Rémi Angot
*/
function Reciproque_Pythagore(){
	Exercice.call(this); // Héritage de la classe Exercice()
	this.titre = "Déterminer si un triangle est rectangle ou pas.";
	this.consigne = "";
	this.nb_questions = 3;
	this.nb_cols = 1;
	this.nb_cols_corr = 1;
	sortie_html ? this.spacing_corr = 2 : this.spacing_corr = 1;

	this.nouvelle_version = function(numero_de_l_exercice){
		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées
		let liste_type_de_questions = combinaison_listes(['rectangle','rectangle','pas_rectangle','pas_rectangle'],this.nb_questions)
		let liste_triplets_pythagoriciens =  [[3,4,5],[5,12,13],[6,8,10],[7,24,25],[8,15,17],[9,12,15],[9,40,41], [10,24,26], [11,60,61], [12,16,20], [12,35,37], [13,84,85], [14,48,50], [15,20,25], [15,36,39], [16,30,34], [16,63,65], [18,24,30], [18,80,82],  [20,21,29], [20,48,52], [21,28,35], [21,72,75], [24,32,40], [24,45,51], [24,70,74], [25,60,65], [27,36,45], [28,45,53], [28,96,100], [30,40,50], [30,72,78], [32,60,68], [33,44,55], [33,56,65], [35,84,91], [36,48,60], [36,77,85], [39,52,65], [39,80,89], [40,42,58], [40,75,85], [42,56,70], [45,60,75], [48,55,73], [48,64,80], [51,68,85], [54,72,90], [57,76,95], [60,63,87], [60,80,100], [65,72,97]]
		let liste_noms_triangles = []; // on mémorise les noms des triangles pour ne pas les redonner
		for (let i = 0, texte, texte_corr, AB,BC,AC,a,b,c,nom_triangle,triplet, ordre_des_cotes, cpt=0; i < this.nb_questions && cpt<50; ) {
			nom_triangle = polygone(3,liste_noms_triangles);
			liste_noms_triangles.push(nom_triangle)
			A = nom_triangle[0];
			B = nom_triangle[1];
			C = nom_triangle[2];
			triplet = choice(liste_triplets_pythagoriciens);
			enleve_element(liste_triplets_pythagoriciens,triplet) // Supprime le triplet pour les prochaines questions
			a = triplet[0];
			b = triplet[1];
			c = triplet[2];
			if (liste_type_de_questions[i]=='pas_rectangle') {
				c += randint(-3,3,[0]) // on change la valeur de c 
				while (a**2+b**2==c**2){ // si par hasard (est-ce possible ?) on retombe sur un triplet pythagoricien on change les valeurs
					c += randint(-3,3,[0]) // on change la valeur de c
					b += randint(-3,3,[0]) // on change la valeur de b
				}
			}
			if (a>9 && choice([true,true,true,false]) ) { //le plus souvent on utilise des décimaux
				a = calcul(a/10);
				b = calcul(b/10);
				c = calcul(c/10);
			}
			ordre_des_cotes = randint(1,3)
			switch (ordre_des_cotes){
				case 1 : 
				texte = `Le triangle $${nom_triangle}$ est tel que $${A+B}=${tex_nombre(c)}$ cm, $${A+C}=${tex_nombre(b)}$ cm et $${B+C}=${tex_nombre(a)}$ cm.`
				break
				case 2 : 
				texte = `Le triangle $${nom_triangle}$ est tel que  $${B+C}=${tex_nombre(a)}$ cm, $${A+C}=${tex_nombre(b)}$ cm et $${A+B}=${tex_nombre(c)}$ cm.`
				break
				case 3 : 
				texte = `Le triangle $${nom_triangle}$ est tel que $${A+C}=${tex_nombre(b)}$ cm, $${A+B}=${tex_nombre(c)}$ cm,  et $${B+C}=${tex_nombre(a)}$ cm.`
				break 
			}
			texte += `<br>Ce triangle est-il rectangle ?`
			texte_corr = `Dans le triangle $${nom_triangle}$, le plus grand côté est $[${A+B}]$.`
			texte_corr += `<br>$${A+B}^2=${tex_nombre(c)}^2=${tex_nombrec(c**2)}$`
			texte_corr += `<br>$${A+C}^2+${B+C}^2=${tex_nombre(b)}^2+${tex_nombre(a)}^2=${tex_nombrec(b**2+a**2)}$`
			if (liste_type_de_questions[i]=='rectangle') {
				texte_corr += `<br>On constate que $${A+B}^2=${A+C}^2+${B+C}^2$, l'égalité de Pythagore est vérifiée donc $${nom_triangle}$ est rectangle en $${C}$.`
			} else {
				texte_corr += `<br>On constate que $${A+B}^2\\not=${A+C}^2+${B+C}^2$, l'égalité de Pythagore n'est pas vérifiée donc $${nom_triangle}$ n'est pas rectangle.`
			}
			
			
			if (this.liste_questions.indexOf(texte)==-1){ // Si la question n'a jamais été posée, on en créé une autre
				this.liste_questions.push(texte);
				this.liste_corrections.push(texte_corr);
				i++;
			}
			cpt++;	
		}
		liste_de_question_to_contenu(this);
	}
	//this.besoin_formulaire_numerique = ['Niveau de difficulté',3];
}

/**
* Problèmes utilisant le théorème de Pythagore ou sa réciproque et des propriétés des quadrilatères particuliers.
*
* * Dans un losange, on connait la longueur du côté et une diagonale, il faut calculer l'autre.
* * Dans un rectangle on connait la longueur et une diagonale, il faut calculer la largeur.
* * Dans un rectangle on connait la longueur et la largeur, il faut calculer la diagonale.
* * Est-ce qu'un parallélogramme est un losange ? On peut démontrer que les diagonales sont perpendiculaires ou pas.
* * Est-ce qu'un parallélogramme est un rectangle ? On peut démontrer qu'il possède un angle droit ou pas . 
* @Auteur Rémi Angot
*/
function Problemes_Pythagore(){
	Exercice.call(this); // Héritage de la classe Exercice()
	this.titre = "Problèmes utilisant le théorème de Pythagore";
	this.consigne = "";
	this.nb_questions = 2;
	this.nb_cols = 1;
	this.nb_cols_corr = 1;
	this.spacing = 1;
	sortie_html ? this.spacing_corr = 2 : this.spacing_corr = 1.5;

	this.nouvelle_version = function(numero_de_l_exercice){
		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées
		let type_de_questions_disponibles = ['losange','rectangle_diagonale_connue','rectangle_diagonale_a_trouver','parallelogramme_est_losange','parallelogramme_n_est_pas_losange','parallelogramme_est_rectangle','parallelogramme_n_est_pas_rectangle']
		let liste_type_de_questions = combinaison_listes(type_de_questions_disponibles,this.nb_questions)
		let liste_triplets_pythagoriciens =  [[3,4,5],[5,12,13],[6,8,10],[7,24,25],[8,15,17],[9,12,15],[9,40,41], [10,24,26], [11,60,61], [12,16,20], [12,35,37], [13,84,85], [14,48,50], [15,20,25], [15,36,39], [16,30,34], [16,63,65], [18,24,30], [18,80,82],  [20,21,29], [20,48,52], [21,28,35], [21,72,75], [24,32,40], [24,45,51], [24,70,74], [25,60,65], [27,36,45], [28,45,53], [28,96,100], [30,40,50], [30,72,78], [32,60,68], [33,44,55], [33,56,65], [35,84,91], [36,48,60], [36,77,85], [39,52,65], [39,80,89], [40,42,58], [40,75,85], [42,56,70], [45,60,75], [48,55,73], [48,64,80], [51,68,85], [54,72,90], [57,76,95], [60,63,87], [60,80,100], [65,72,97]];
		let liste_noms_quadrilateres = ['L','M','N','O'] // pour que le O ne soit pas une des 4 lettres
		for (let i = 0, texte, texte_corr, cpt=0; i < this.nb_questions && cpt<50; ) {
			let nom_quadrilatere = polygone(4,liste_noms_quadrilateres);
			liste_noms_quadrilateres.push(nom_quadrilatere)
			let A = nom_quadrilatere[0];
			let B = nom_quadrilatere[1];
			let C = nom_quadrilatere[2];
			let D = nom_quadrilatere[3]
			let O = `O`
			let triplet = choice(liste_triplets_pythagoriciens);
			enleve_element(liste_triplets_pythagoriciens,triplet) // Supprime le triplet pour les prochaines questions
			let a = triplet[0];
			let b = triplet[1];
			let c = triplet[2];
			if (liste_type_de_questions[i]=='parallelogramme_n_est_pas_losange' || liste_type_de_questions[i]=='parallelogramme_n_est_pas_rectangle') {
				c += randint(-3,3,[0]) // on change la valeur de c 
				while (a**2+b**2==c**2){ // si par hasard (est-ce possible ?) on retombe sur un triplet pythagoricien on change les valeurs
					c += randint(-3,3,[0]) // on change la valeur de c
					b += randint(-3,3,[0]) // on change la valeur de b
				}
			}
			if (a>9 && choice([true,true,true,false]) ) { //le plus souvent on utilise des décimaux
				a = calcul(a/10);
				b = calcul(b/10);
				c = calcul(c/10);
			}

			switch (liste_type_de_questions[i]) {
				case 'losange' :
				texte = `$${nom_quadrilatere}$ est un losange de centre $O$ tel que $${A+B}=${tex_nombre(c)}$ cm et $${A+C}=${tex_nombre(2*a)}$ cm.<br>`
				texte += `Calculer $${D+B}$.`

				if (sortie_html) {
					texte_corr = `<p style="margin-left:10%"><svg xmlns="http://www.w3.org/2000/svg" width="400" height="250" viewBox="0 0 400 250"><defs id="mtg32_patterns"/><rect width="100%" height="100%" fill="rgb(255,255,255)"/><g id="mtg32svgTraces" transform="scale(1)"/><g id=""/><g/><g id=""/><g id=""/><g/><g id=""/><g id=""/><g id="mtg32svg#6"/><text x="185.5" y="32.44" style="text-anchor : left;fill:rgb(0,0,0);font-size:16px;" id="name"  visibility="visible"><tspan>${A}</tspan></text><text x="220.5" y="134.44" style="text-anchor : left;fill:rgb(0,0,0);font-size:16px;" id="name"  visibility="visible"><tspan>${B}</tspan></text><line x1="190.5" y1="43.44" x2="216.5" y2="129.44" style="stroke-width:1;stroke:rgb(0,0,0);"  id=""/><g id=""/><text x="144.54431444308477" y="133.14525664249953" style="text-anchor : left;fill:rgb(0,0,0);font-size:16px;" id="name"  visibility="visible"><tspan>${D}</tspan></text><line x1="190.5" y1="43.44" x2="163.54431444308477" y2="129.14525664249953" style="stroke-width:1;stroke:rgb(0,0,0);"  id=""/><g id=""/><text x="183.54431444308474" y="234.14525664249953" style="text-anchor : left;fill:rgb(0,0,0);font-size:16px;" id="name"  visibility="visible"><tspan>${C}</tspan></text><line x1="216.5" y1="129.44" x2="189.54431444308474" y2="215.14525664249953" style="stroke-width:1;stroke:rgb(0,0,0);"  id=""/><line x1="189.54431444308474" y1="215.14525664249953" x2="163.54431444308477" y2="129.14525664249953" style="stroke-width:1;stroke:rgb(0,0,0);"  id=""/><g id=""/><g  id=""><line x1="208.86483613904568" y1="86.9074753482156" x2="199.2927218660596" y2="89.80137036097884" style="stroke-width:1;stroke:rgb(0,0,255);" /><line x1="207.7072781339404" y1="83.07862963902116" x2="198.13516386095432" y2="85.9725246517844" style="stroke-width:1;stroke:rgb(0,0,255);" /></g><g  id=""><line x1="207.19175809011574" y1="175.70062312711323" x2="197.652449829911" y2="172.70035681946817" style="stroke-width:1;stroke:rgb(0,0,255);" /><line x1="208.39186461317377" y1="171.88489982303136" x2="198.85255635296903" y2="168.8846335153863" style="stroke-width:1;stroke:rgb(0,0,255);" /></g><g  id=""><line x1="171.1794783040391" y1="171.67778129428393" x2="180.75159257702518" y2="168.78388628152072" style="stroke-width:1;stroke:rgb(0,0,255);" /><line x1="172.33703630914437" y1="175.50662700347834" x2="181.90915058213045" y2="172.61273199071513" style="stroke-width:1;stroke:rgb(0,0,255);" /></g><g  id=""><line x1="181.19175809011574" y1="89.70062312711323" x2="171.652449829911" y2="86.7003568194682" style="stroke-width:1;stroke:rgb(0,0,255);" /><line x1="182.39186461317377" y1="85.88489982303133" x2="172.85255635296903" y2="82.8846335153863" style="stroke-width:1;stroke:rgb(0,0,255);" /></g><text x="176.02215722154236" y="144.29262832124977" style="text-anchor : left;fill:rgb(0,0,0);font-size:16px;" id="name"  visibility="visible"><tspan>O</tspan></text><g  id=""><line x1="198.79500694133887" y1="129.34145667941502" x2="198.84383529950412" y2="120.56860695961849" style="stroke-dasharray:3 3;stroke-width:1;stroke:rgb(255,0,0);"/><line x1="190.0709855797076" y1="120.51977860145324" x2="198.84383529950412" y2="120.56860695961849" style="stroke-dasharray:3 3;stroke-width:1;stroke:rgb(255,0,0);"/></g><line x1="190.5" y1="43.44" x2="190.02215722154236" y2="129.29262832124977" style="stroke-dasharray:3 3;stroke-width:1;stroke:rgb(0,0,0);"  id=""/><line x1="190.02215722154236" y1="129.29262832124977" x2="189.54431444308474" y2="215.14525664249953" style="stroke-dasharray:3 3;stroke-width:1;stroke:rgb(0,0,0);"  id=""/><line x1="190.02215722154236" y1="129.29262832124977" x2="163.54431444308477" y2="129.14525664249953" style="stroke-dasharray:3 3;stroke-width:1;stroke:rgb(0,0,0);"  id=""/><line x1="190.02215722154236" y1="129.29262832124977" x2="216.5" y2="129.44" style="stroke-dasharray:3 3;stroke-width:1;stroke:rgb(0,0,0);"  id=""/><g  id=""><line x1="193.7768798113023" y1="89.9214712483418" x2="186.74527741024002" y2="82.81115707290796" style="stroke-width:1;stroke:rgb(255,0,0);" /><line x1="186.70592152305426" y1="89.88211536115601" x2="193.81623569848807" y2="82.85051296009375" style="stroke-width:1;stroke:rgb(255,0,0);" /></g><g  id=""><line x1="193.2990370328447" y1="175.77409956959156" x2="186.2674346317824" y2="168.66378539415774" style="stroke-width:1;stroke:rgb(255,0,0);" /><line x1="186.22807874459664" y1="175.7347436824058" x2="193.33839292003046" y2="168.7031412813435" style="stroke-width:1;stroke:rgb(255,0,0);" /></g><g  id=""><line x1="176.75540701760488" y1="134.21886503698207" x2="176.81106464702222" y2="124.21901992676723" style="stroke-width:1;stroke:rgb(255,0,0);" /></g><g  id=""><line x1="203.28890742547983" y1="124.36639160551746" x2="203.2332497960625" y2="134.3662367157323" style="stroke-width:1;stroke:rgb(255,0,0);" /></g></svg></p>`
				} else {
					texte_corr = ``
				}
				texte_corr += `$${nom_quadrilatere}$ est un losange donc ses diagonales se coupent en leur milieu : $${A+O}=${A+C}\\div2=${tex_nombre(2*a)}\\div2=${tex_nombre(a)}$ cm.<br>`
				texte_corr += `On sait que les diagonales d'un losange se coupent perpendiculairement donc $${A+O+C}$ est un triangle rectangle en $O$.<br>`
				texte_corr += `D'après le théorème de Pythagore, on a : $${A+O}^2+${O+B}^2=${A+B}^2$.<br>`
				texte_corr += `Donc $${O+B}^2=${A+B}^2-${A+O}^2=${tex_nombre(c)}^2-${tex_nombre(a)}^2=${tex_nombre(b**2)}$.<br>`
				texte_corr += `On a alors $${O+B}=\\sqrt{${tex_nombrec(b**2)}}=${tex_nombre(b)}$ cm.<br>`
				texte_corr += `Finalement comme $O$ est aussi le milieu de $[${D+B}]$ : $${D+B}=2\\times ${O+B}=2\\times${tex_nombre(b)}=${tex_nombre(2*b)}$ cm.`
				break

				case 'rectangle_diagonale_connue' :
				texte = `$${nom_quadrilatere}$ est un rectangle tel que $${A+B}=${tex_nombre(a)}$ cm et $${A+C}=${tex_nombre(c)}$ cm.<br>`
				texte += `Calculer $${B+C}$.`
				if (sortie_html) {
					texte_corr = `<p style="margin-left:10%"><svg xmlns="http://www.w3.org/2000/svg" width="400" height="200" viewBox="0 0 400 200"><defs id="mtg32_patterns"/><rect width="100%" height="100%" fill="rgb(255,255,255)"/><g id="mtg32svgTraces" transform="scale(1)"/><g id=""/><g/><g id=""/><g id=""/><g/><g id=""/><g id=""/><g id=""/><text x="113.5" y="49.44" style="text-anchor : left;fill:rgb(0,0,0);font-size:16px;" id="name"  visibility="visible"><tspan>${A}</tspan></text><g id=""/><text x="276.5" y="49.44" style="text-anchor : left;fill:rgb(0,0,0);font-size:16px;" id="name"  visibility="visible"><tspan>${B}</tspan></text><g id=""/><g id=""/><text x="276.5" y="138.44" style="text-anchor : left;fill:rgb(0,0,0);font-size:16px;" id="name"  visibility="visible"><tspan>${C}</tspan></text><g id=""/><text x="111.5" y="141.44" style="text-anchor : left;fill:rgb(0,0,0);font-size:16px;" id="name"  visibility="visible"><tspan>${D}</tspan></text><polygon points="126.500,53.440 272.500,53.440 272.500,124.440 126.500,124.440 " style="stroke-width:1;stroke:rgb(0,0,0);fill:none"  id=""/><g  id=""><line x1="142.5" y1="53.44" x2="142.5" y2="69.44" style="stroke-width:1;stroke:rgb(0,0,255);"/><line x1="126.5" y1="69.44" x2="142.5" y2="69.44" style="stroke-width:1;stroke:rgb(0,0,255);"/></g><g  id=""><line x1="272.5" y1="69.44" x2="256.5" y2="69.44" style="stroke-width:1;stroke:rgb(0,0,255);"/><line x1="256.5" y1="53.44" x2="256.5" y2="69.44" style="stroke-width:1;stroke:rgb(0,0,255);"/></g><g  id=""><line x1="256.5" y1="124.44" x2="256.5" y2="108.44" style="stroke-width:1;stroke:rgb(0,0,255);"/><line x1="272.5" y1="108.44" x2="256.5" y2="108.44" style="stroke-width:1;stroke:rgb(0,0,255);"/></g><g  id=""><line x1="126.5" y1="108.44" x2="142.5" y2="108.44" style="stroke-width:1;stroke:rgb(0,0,255);"/><line x1="142.5" y1="124.44" x2="142.5" y2="108.44" style="stroke-width:1;stroke:rgb(0,0,255);"/></g><line x1="126.5" y1="53.44" x2="272.5" y2="124.44" style="stroke-dasharray:3 3;stroke-width:1;stroke:rgb(0,0,0);"  id=""/></svg></svg></p>`
				} else {
					texte_corr = ``
				}
				texte_corr += `$${nom_quadrilatere}$ est un rectangle donc il possède 4 angles droits et $${A+B+C}$ est un triangle rectangle en $${B}$.<br>`
				texte_corr += `D'après le théorème de Pythagore, on a : $${A+B}^2+${B+C}^2=${A+C}^2$.<br>`
				texte_corr += `Donc $${B+C}^2=${A+C}^2-${A+B}^2=${tex_nombre(c)}^2-${tex_nombre(a)}^2=${tex_nombre(b**2)}$.<br>`
				texte_corr += `Finalement, $${B+C}=\\sqrt{${tex_nombrec(b**2)}}=${tex_nombre(b)}$ cm.`
				break

				case 'rectangle_diagonale_a_trouver' :
				texte = `$${nom_quadrilatere}$ est un rectangle tel que $${A+B}=${tex_nombre(a)}$ cm et $${B+C}=${tex_nombre(b)}$ cm.<br>`
				texte += `Calculer $${A+C}$.`
				if (sortie_html) {
					texte_corr = `<p style="margin-left:10%"><svg xmlns="http://www.w3.org/2000/svg" width="400" height="200" viewBox="0 0 400 200"><defs id="mtg32_patterns"/><rect width="100%" height="100%" fill="rgb(255,255,255)"/><g id="mtg32svgTraces" transform="scale(1)"/><g id=""/><g/><g id=""/><g id=""/><g/><g id=""/><g id=""/><g id=""/><text x="113.5" y="49.44" style="text-anchor : left;fill:rgb(0,0,0);font-size:16px;" id="name"  visibility="visible"><tspan>${A}</tspan></text><g id=""/><text x="276.5" y="49.44" style="text-anchor : left;fill:rgb(0,0,0);font-size:16px;" id="name"  visibility="visible"><tspan>${B}</tspan></text><g id=""/><g id=""/><text x="276.5" y="138.44" style="text-anchor : left;fill:rgb(0,0,0);font-size:16px;" id="name"  visibility="visible"><tspan>${C}</tspan></text><g id=""/><text x="111.5" y="141.44" style="text-anchor : left;fill:rgb(0,0,0);font-size:16px;" id="name"  visibility="visible"><tspan>${D}</tspan></text><polygon points="126.500,53.440 272.500,53.440 272.500,124.440 126.500,124.440 " style="stroke-width:1;stroke:rgb(0,0,0);fill:none"  id=""/><g  id=""><line x1="142.5" y1="53.44" x2="142.5" y2="69.44" style="stroke-width:1;stroke:rgb(0,0,255);"/><line x1="126.5" y1="69.44" x2="142.5" y2="69.44" style="stroke-width:1;stroke:rgb(0,0,255);"/></g><g  id=""><line x1="272.5" y1="69.44" x2="256.5" y2="69.44" style="stroke-width:1;stroke:rgb(0,0,255);"/><line x1="256.5" y1="53.44" x2="256.5" y2="69.44" style="stroke-width:1;stroke:rgb(0,0,255);"/></g><g  id=""><line x1="256.5" y1="124.44" x2="256.5" y2="108.44" style="stroke-width:1;stroke:rgb(0,0,255);"/><line x1="272.5" y1="108.44" x2="256.5" y2="108.44" style="stroke-width:1;stroke:rgb(0,0,255);"/></g><g  id=""><line x1="126.5" y1="108.44" x2="142.5" y2="108.44" style="stroke-width:1;stroke:rgb(0,0,255);"/><line x1="142.5" y1="124.44" x2="142.5" y2="108.44" style="stroke-width:1;stroke:rgb(0,0,255);"/></g><line x1="126.5" y1="53.44" x2="272.5" y2="124.44" style="stroke-dasharray:3 3;stroke-width:1;stroke:rgb(0,0,0);"  id=""/></svg></svg></p>`
				} else {
					texte_corr = ``
				}
				texte_corr += `$${nom_quadrilatere}$ est un rectangle donc il possède 4 angles droits et $${A+B+C}$ est un triangle rectangle en $${B}$.<br>`
				texte_corr += `D'après le théorème de Pythagore, on a : $${A+C}^2=${A+B}^2+${B+C}^2=${tex_nombrec(a)}^2+${tex_nombrec(b)}^2=${tex_nombrec(c**2)}$.<br>`
				texte_corr += `Finalement, $${A+C}=\\sqrt{${tex_nombrec(c**2)}}=${tex_nombre(c)}$ cm.`
				break

				case 'parallelogramme_est_losange' :
				texte = `$${nom_quadrilatere}$ est un parallélogramme de centre $O$ tel que $${A+O}=${tex_nombre(a)}$ cm, $${A+B}=${tex_nombre(c)}$ cm et $${B+O}=${tex_nombre(b)}$ cm.<br>`
				texte += `$${nom_quadrilatere}$ est-il un losange ?`
				if (sortie_html) {
					texte_corr = `<p style="margin-left:10%"><svg xmlns="http://www.w3.org/2000/svg" width="400" height="200" viewBox="0 0 400 200"><defs id="mtg32_patterns"/><rect width="100%" height="100%" fill="rgb(255,255,255)"/><g id="mtg32svgTraces" transform="scale(1)"/><text x="85.5" y="46.44" style="text-anchor : left;fill:rgb(0,0,0);font-size:16px;" id="name"  visibility="visible"><tspan>${A}</tspan></text><g id=""/><text x="252.5" y="45.44" style="text-anchor : left;fill:rgb(0,0,0);font-size:16px;" id="name"  visibility="visible"><tspan>${B}</tspan></text><text x="302.5" y="156.44" style="text-anchor : left;fill:rgb(0,0,0);font-size:16px;" id="name"  visibility="visible"><tspan>${C}</tspan></text><g id=""/><line x1="256.5" y1="52.44" x2="307.5" y2="138.44" style="stroke-width:1;stroke:rgb(0,0,0);"  id=""/><line x1="92.5" y1="52.44" x2="256.5" y2="52.44" style="stroke-width:1;stroke:rgb(0,0,0);"  id=""/><g id=""/><text x="137.5" y="155.44" style="text-anchor : left;fill:rgb(0,0,0);font-size:16px;" id="name"  visibility="visible"><tspan>${D}</tspan></text><line x1="307.5" y1="138.44" x2="143.5" y2="138.44" style="stroke-width:1;stroke:rgb(0,0,0);"  id=""/><line x1="143.5" y1="138.44" x2="92.5" y2="52.44" style="stroke-width:1;stroke:rgb(0,0,0);"  id=""/><line x1="92.5" y1="52.44" x2="307.5" y2="138.44" style="stroke-dasharray:3 3;stroke-width:1;stroke:rgb(0,0,0);"  id=""/><line x1="256.5" y1="52.44" x2="143.5" y2="138.44" style="stroke-dasharray:3 3;stroke-width:1;stroke:rgb(0,0,0);"  id=""/><text x="200" y="114.44" style="text-anchor : left;fill:rgb(0,0,0);font-size:16px;" id="name"  visibility="visible"><tspan>O</tspan></text></svg></p>`
				} else {
					texte_corr = ``
				}
				texte_corr += `Dans le triangle $${A+O+B}$, le plus grand côté est $[${A+B}]$.<br>`
				texte_corr += `$${A+B}^2=${tex_nombre(c)}^2=${tex_nombrec(c**2)}$<br>`
				texte_corr += `$${A+O}^2+${O+B}^2=${tex_nombre(a)}^2+${tex_nombre(b)}^2=${tex_nombrec(a**2+b**2)}$<br>`
				texte_corr += `On constate que $${A+B}^2=${A+O}^2+${O+B}^2$, l'égalité de Pythagore est vérifiée donc $${A+O+B}$ est rectangle en $O$.<br>`
				texte_corr += `Finalement, comme $${nom_quadrilatere}$ est un parallélogramme qui a ses diagonales perpendiculaires alors c'est aussi un losange.`
				break

				case 'parallelogramme_n_est_pas_losange' :
				texte = `$${nom_quadrilatere}$ est un parallélogramme de centre $O$ tel que $${A+O}=${tex_nombre(a)}$ cm, $${A+B}=${tex_nombre(c)}$ cm et $${B+O}=${tex_nombre(b)}$ cm.<br>`
				texte += `$${nom_quadrilatere}$ est-il un losange ?`
				if (sortie_html) {
					texte_corr = `<p style="margin-left:10%"><svg xmlns="http://www.w3.org/2000/svg" width="400" height="200" viewBox="0 0 400 200"><defs id="mtg32_patterns"/><rect width="100%" height="100%" fill="rgb(255,255,255)"/><g id="mtg32svgTraces" transform="scale(1)"/><text x="85.5" y="46.44" style="text-anchor : left;fill:rgb(0,0,0);font-size:16px;" id="name"  visibility="visible"><tspan>${A}</tspan></text><g id=""/><text x="252.5" y="45.44" style="text-anchor : left;fill:rgb(0,0,0);font-size:16px;" id="name"  visibility="visible"><tspan>${B}</tspan></text><text x="302.5" y="156.44" style="text-anchor : left;fill:rgb(0,0,0);font-size:16px;" id="name"  visibility="visible"><tspan>${C}</tspan></text><g id=""/><line x1="256.5" y1="52.44" x2="307.5" y2="138.44" style="stroke-width:1;stroke:rgb(0,0,0);"  id=""/><line x1="92.5" y1="52.44" x2="256.5" y2="52.44" style="stroke-width:1;stroke:rgb(0,0,0);"  id=""/><g id=""/><text x="137.5" y="155.44" style="text-anchor : left;fill:rgb(0,0,0);font-size:16px;" id="name"  visibility="visible"><tspan>${D}</tspan></text><line x1="307.5" y1="138.44" x2="143.5" y2="138.44" style="stroke-width:1;stroke:rgb(0,0,0);"  id=""/><line x1="143.5" y1="138.44" x2="92.5" y2="52.44" style="stroke-width:1;stroke:rgb(0,0,0);"  id=""/><line x1="92.5" y1="52.44" x2="307.5" y2="138.44" style="stroke-dasharray:3 3;stroke-width:1;stroke:rgb(0,0,0);"  id=""/><line x1="256.5" y1="52.44" x2="143.5" y2="138.44" style="stroke-dasharray:3 3;stroke-width:1;stroke:rgb(0,0,0);"  id=""/><text x="200" y="114.44" style="text-anchor : left;fill:rgb(0,0,0);font-size:16px;" id="name"  visibility="visible"><tspan>O</tspan></text></svg></p>`
				} else {
					texte_corr = ``
				}
				texte_corr += `Dans le triangle $${A+O+B}$, le plus grand côté est $[${A+B}]$.<br>`
				texte_corr += `$${A+B}^2=${tex_nombre(c)}^2=${tex_nombrec(c**2)}$<br>`
				texte_corr += `$${A+O}^2+${O+B}^2=${tex_nombre(a)}^2+${tex_nombre(b)}^2=${tex_nombrec(a**2+b**2)}$<br>`
				texte_corr += `On constate que $${A+B}^2\\not=${A+O}^2+${O+B}^2$, l'égalité de Pythagore n'est pas vérifiée donc $${A+O+B}$ n'est pas un triangle rectangle.<br>`
				texte_corr += `Si $${nom_quadrilatere}$ était un losange alors ses diagonales devraient être perpendiculaires et $${A+O+B}$ devrait être un triangle rectangle.<br>`
				texte_corr += `Finalement comme $${A+O+B}$ n'est pas un triangle rectangle, $${nom_quadrilatere}$ n'est pas un losange.`
				break

				case 'parallelogramme_est_rectangle' :
				texte = `$${nom_quadrilatere}$ est un parallélogramme de centre $O$ tel que $${A+B}=${tex_nombre(a)}$ cm, $${A+C}=${tex_nombre(c)}$ cm et $${B+C}=${tex_nombre(b)}$ cm.<br>`
				texte += `$${nom_quadrilatere}$ est-il un rectangle ?`
				if (sortie_html) {
					texte_corr = `<p style="margin-left:10%"><svg xmlns="http://www.w3.org/2000/svg" width="400" height="200" viewBox="0 0 400 200"><defs id="mtg32_patterns"/><rect width="100%" height="100%" fill="rgb(255,255,255)"/><g id="mtg32svgTraces" transform="scale(1)"/><text x="85.5" y="46.44" style="text-anchor : left;fill:rgb(0,0,0);font-size:16px;" id="name"  visibility="visible"><tspan>${A}</tspan></text><g id=""/><text x="252.5" y="45.44" style="text-anchor : left;fill:rgb(0,0,0);font-size:16px;" id="name"  visibility="visible"><tspan>${B}</tspan></text><text x="302.5" y="156.44" style="text-anchor : left;fill:rgb(0,0,0);font-size:16px;" id="name"  visibility="visible"><tspan>${C}</tspan></text><g id=""/><line x1="256.5" y1="52.44" x2="307.5" y2="138.44" style="stroke-width:1;stroke:rgb(0,0,0);"  id=""/><line x1="92.5" y1="52.44" x2="256.5" y2="52.44" style="stroke-width:1;stroke:rgb(0,0,0);"  id=""/><g id=""/><text x="137.5" y="155.44" style="text-anchor : left;fill:rgb(0,0,0);font-size:16px;" id="name"  visibility="visible"><tspan>${D}</tspan></text><line x1="307.5" y1="138.44" x2="143.5" y2="138.44" style="stroke-width:1;stroke:rgb(0,0,0);"  id=""/><line x1="143.5" y1="138.44" x2="92.5" y2="52.44" style="stroke-width:1;stroke:rgb(0,0,0);"  id=""/><line x1="92.5" y1="52.44" x2="307.5" y2="138.44" style="stroke-dasharray:3 3;stroke-width:1;stroke:rgb(0,0,0);"  id=""/><line x1="256.5" y1="52.44" x2="143.5" y2="138.44" style="stroke-dasharray:3 3;stroke-width:1;stroke:rgb(0,0,0);"  id=""/><text x="200" y="114.44" style="text-anchor : left;fill:rgb(0,0,0);font-size:16px;" id="name"  visibility="visible"><tspan>O</tspan></text></svg></p>`
				} else {
					texte_corr = ``
				}
				texte_corr += `Dans le triangle $${A+B+C}$, le plus grand côté est $[${A+C}]$.<br>`
				texte_corr += `$${A+C}^2=${tex_nombre(c)}^2=${tex_nombrec(c**2)}$<br>`
				texte_corr += `$${A+B}^2+${B+C}^2=${tex_nombre(a)}^2+${tex_nombre(b)}^2=${tex_nombrec(a**2+b**2)}$<br>`
				texte_corr += `On constate que $${A+C}^2=${A+B}^2+${B+C}^2$, l'égalité de Pythagore est vérifiée donc $${A+B+C}$ est rectangle en $${B}$.<br>`
				texte_corr += `Finalement, comme $${nom_quadrilatere}$ est un parallélogramme qui a un angle droit en $${B}$ alors c'est aussi un rectangle.`
				break

				case 'parallelogramme_n_est_pas_rectangle' :
				texte = `$${nom_quadrilatere}$ est un parallélogramme de centre $O$ tel que $${A+B}=${tex_nombre(a)}$ cm, $${A+C}=${tex_nombre(c)}$ cm et $${B+C}=${tex_nombre(b)}$ cm.<br>`
				texte += `$${nom_quadrilatere}$ est-il un rectangle ?`
				if (sortie_html) {
					texte_corr = `<p style="margin-left:10%"><svg xmlns="http://www.w3.org/2000/svg" width="400" height="200" viewBox="0 0 400 200"><defs id="mtg32_patterns"/><rect width="100%" height="100%" fill="rgb(255,255,255)"/><g id="mtg32svgTraces" transform="scale(1)"/><text x="85.5" y="46.44" style="text-anchor : left;fill:rgb(0,0,0);font-size:16px;" id="name"  visibility="visible"><tspan>${A}</tspan></text><g id=""/><text x="252.5" y="45.44" style="text-anchor : left;fill:rgb(0,0,0);font-size:16px;" id="name"  visibility="visible"><tspan>${B}</tspan></text><text x="302.5" y="156.44" style="text-anchor : left;fill:rgb(0,0,0);font-size:16px;" id="name"  visibility="visible"><tspan>${C}</tspan></text><g id=""/><line x1="256.5" y1="52.44" x2="307.5" y2="138.44" style="stroke-width:1;stroke:rgb(0,0,0);"  id=""/><line x1="92.5" y1="52.44" x2="256.5" y2="52.44" style="stroke-width:1;stroke:rgb(0,0,0);"  id=""/><g id=""/><text x="137.5" y="155.44" style="text-anchor : left;fill:rgb(0,0,0);font-size:16px;" id="name"  visibility="visible"><tspan>${D}</tspan></text><line x1="307.5" y1="138.44" x2="143.5" y2="138.44" style="stroke-width:1;stroke:rgb(0,0,0);"  id=""/><line x1="143.5" y1="138.44" x2="92.5" y2="52.44" style="stroke-width:1;stroke:rgb(0,0,0);"  id=""/><line x1="92.5" y1="52.44" x2="307.5" y2="138.44" style="stroke-dasharray:3 3;stroke-width:1;stroke:rgb(0,0,0);"  id=""/><line x1="256.5" y1="52.44" x2="143.5" y2="138.44" style="stroke-dasharray:3 3;stroke-width:1;stroke:rgb(0,0,0);"  id=""/><text x="200" y="114.44" style="text-anchor : left;fill:rgb(0,0,0);font-size:16px;" id="name"  visibility="visible"><tspan>O</tspan></text></svg></p>`
				} else {
					texte_corr = ``
				}
				texte_corr += `Dans le triangle $${A+B+C}$, le plus grand côté est $[${A+C}]$.<br>`
				texte_corr += `$${A+C}^2=${tex_nombre(c)}^2=${tex_nombrec(c**2)}$<br>`
				texte_corr += `$${A+B}^2+${B+C}^2=${tex_nombre(a)}^2+${tex_nombre(b)}^2=${tex_nombrec(a**2+b**2)}$<br>`
				texte_corr += `On constate que $${A+C}^2\\not=${A+B}^2+${B+C}^2$, l'égalité de Pythagore n'est pas vérifiée donc $${A+B+C}$ n'est pas rectangle en $${B}$.<br>`
				texte_corr += `Finalement, comme $${nom_quadrilatere}$ n'a pas d'angle droit en $${B}$ ce n'est pas un rectangle.`
				break
			}
				
			
			if (this.liste_questions.indexOf(texte)==-1){ // Si la question n'a jamais été posée, on en créé une autre
				this.liste_questions.push(texte);
				this.liste_corrections.push(texte_corr);
				i++;
			}
			cpt++;	
		}
		liste_de_question_to_contenu(this);
	}
	//this.besoin_formulaire_numerique = ['Niveau de difficulté',3];
}

/**
* Puissances d'un relatif (1)
* * L’objectif est de travailler le sens des règles de calcul sur les puissances plutôt que les formules magiques
*
* Paramétrages possibles :
* * 1 : produit de puissances de même base
* * 2 : quotient de puissances de même base
* * 3 : puissance de puissance
* * 4 : produit de puissances de même exposant
* * 5 : mélange des trois autres niveaux
* @Auteur Sébastien Lozano
*/
function Puissances_d_un_relatif_1(){
	'use strict';
	Exercice.call(this); // Héritage de la classe Exercice()
	this.sup = 1 ; 
	this.titre = "Puissances : Le sens des règles de calculs"; 
	sortie_html ? this.consigne = "Écrire sous la forme $\\mathbf{a^n}$.":  this.consigne = "Écrire sous la forme $a^n$.";
	sortie_html ? this.spacing = 3 : this.spacing = 2;
	sortie_html ? this.spacing_corr = 2: this.spacing_corr = 1;
	this.nb_questions = 5;
	this.correction_detaillee_disponible = true;
	this.nb_cols_corr = 1;
	this.sup = 5;

	this.nouvelle_version = function(numero_de_l_exercice){
		let type_de_questions;
		this.bouton_aide = modal_pdf(numero_de_l_exercice,"pdf/FichePuissances-4N21.pdf","Aide mémoire sur les puissances (Sébastien Lozano)","Aide mémoire")
		
		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées

		let type_de_questions_disponibles = [];
		if (this.sup==1){
			type_de_questions_disponibles = [1]; // produit de puissances de même base
		} else if (this.sup==2){
			type_de_questions_disponibles = [2]; // quotient de puissances de même base
		} else if (this.sup==3){
			type_de_questions_disponibles = [3]; // puissance de puissance
		} else if (this.sup==4){
			type_de_questions_disponibles = [4]; // produit de puissances de même exposant
		} else if (this.sup==5){
			type_de_questions_disponibles = [1,2,3,4]; // mélange
		};


		let liste_type_de_questions = combinaison_listes(type_de_questions_disponibles,this.nb_questions);

		// pour pouvoir adapter les couleurs en cas de besoin
		let coul0 = 'red';
		let coul1 = 'blue';

		for (let i = 0, base0, base1, base, base_utile, exp0, exp1, exp, coul_exp0, coul_exp1, lettre, texte, texte_corr, cpt=0; i < this.nb_questions&&cpt<50;) {
			type_de_questions = liste_type_de_questions[i];

			base = randint(2,9)*choice([-1,1]); // on choisit une base sauf 1 ... penser à gérer le cas des bases qui sont des puissances
			exp0 = randint(1,9);
			exp1 = randint(1,9,[exp0]);
			exp = [exp0,exp1]; // on choisit deux exposants différents c'est mieux
			lettre = lettre_depuis_chiffre(i+1); // on utilise des lettres pour les calculs	

			if (base<0) {
				base_utile = '('+base+')'; // on définit une base avec des parenthèses pour l'affichage du cas negatif
			} else {
				base_utile = base;
			};
			
			switch (type_de_questions) {
				case 1 : // produit de puissances de même base
					texte =  `$${lettre}=${base_utile}^${exp[0]}\\times ${base_utile}^${exp[1]}$`;	

					texte_corr = `$${lettre}=${base_utile}^${exp[0]}\\times ${base_utile}^${exp[1]}$`;
					if (this.correction_detaillee) {
						texte_corr += `<br>`;
						texte_corr += `$${lettre}=${eclatePuissance(base_utile,exp[0],coul0)} \\times ${eclatePuissance(base_utile,exp[1],coul1)}$`;
					};
					texte_corr += `<br>`;
					texte_corr += `Il y a donc $\\mathbf{\\color{${coul0}}{${exp[0]}}~\\color{black}{+}~\\color{${coul1}}{${exp[1]}}}$ facteurs tous égaux à $${base_utile}$`;
					texte_corr += `<br>`;
					texte_corr += `$${lettre}=${base_utile}^{${exp[0]}+${exp[1]}} = ${base_utile}^{${exp[0]+exp[1]}}`;
					// attention la base_utile est de type str alors que la fonction switch sur un type number					
					if (simpNotPuissance(base,exp[0]+exp[1]) != ` `) {
						texte_corr += `=${simpNotPuissance(base,exp[0]+exp[1])}`;  
					}
					texte_corr += `$`;
					texte_corr += `<br>`;
					break;			
				case 2 : // quotient de puissances de même base
					// Pour que la couleur de la base associée à l'exposant max soit toujours rouge.
					if (Math.max(exp[0],exp[1])==exp[0]) {
						coul_exp0 = coul0;
						coul_exp1 = coul1;
					} else {
						coul_exp0 = coul1;
						coul_exp1 = coul0;
					};
					
					texte =  `$${lettre}=\\dfrac{${base_utile}^${exp[0]}}{${base_utile}^${exp[1]}}$`;	

					texte_corr = `$${lettre}=\\dfrac{${base_utile}^${exp[0]}}{${base_utile}^${exp[1]}}$`;
					if (this.correction_detaillee) {
						texte_corr += `<br><br>`;
						texte_corr += `$${lettre}=\\dfrac{${eclatePuissance(base_utile,exp[0],coul_exp0)}}{${eclatePuissance(base_utile,exp[1],coul_exp1)}}$`;
					};
					texte_corr += `<br><br>`;				
					texte_corr += `Il y a donc $\\mathbf{\\color{${coul1}}{${Math.min(exp[0],exp[1])}}}$ simplifications par $${base_utile}$ possibles.`;
					if (this.correction_detaillee) {
						texte_corr += `<br><br>`;					
					};
					if ((exp[0]-exp[1])==0) {
						if (this.correction_detaillee) {
							texte_corr += `$${lettre}=\\dfrac{${eclatePuissance(`\\cancel{${base_utile}}`,exp[0],coul_exp0)}}{${eclatePuissance(`\\cancel{${base_utile}}`,exp[0],coul_exp1)}}$`;
						};
						texte_corr += `<br><br>`;
						texte_corr += `$${lettre}=1`
					} else if (exp[0]-exp[1]<0) {
						if (this.correction_detaillee) {
							texte_corr += `$${lettre}=\\dfrac{${eclatePuissance(`\\cancel{${base_utile}}`,exp[0],coul_exp0)}}{${eclatePuissance(`\\cancel{${base_utile}}`,exp[0],coul_exp1)}\\times${eclatePuissance(base_utile,exp[1]-exp[0],coul_exp1)}}$`;
						};
						texte_corr += `<br><br>`;
						texte_corr += `$${lettre}=\\dfrac{1}{${base_utile}^{${exp[1]}-${exp[0]}}}=\\dfrac{1}{${base_utile}^{${exp[1]-exp[0]}}}`
						if (simpNotPuissance(base,exp[1]-exp[0]) != ` `) {
							texte_corr += `=\\dfrac{1}{${simpNotPuissance(base,exp[1]-exp[0])}}=${simpNotPuissance(base,exp[0]-exp[1])}`
						} else {
							texte_corr += `=${base_utile}^{${exp[0]-exp[1]}}`
						}						
					} else {
						if (this.correction_detaillee) {
							texte_corr += `$${lettre}=\\dfrac{${eclatePuissance(`\\cancel{${base_utile}}`,exp[1],coul_exp0)}\\times${eclatePuissance(base_utile,exp[0]-exp[1],coul_exp0)}}{${eclatePuissance(`\\cancel{${base_utile}}`,exp[1],coul_exp1)}}$`;
						};
						texte_corr += `<br><br>`;
						texte_corr += `$${lettre}=${base_utile}^{${exp[0]}-${exp[1]}}=${base_utile}^{${exp[0]-exp[1]}}`;
						if (simpNotPuissance(base,exp[0]-exp[1]) != ` `) {
							texte_corr += `=${simpNotPuissance(base,exp[0]-exp[1])}`;
						}; 						
					}; 
					texte_corr += `$`;
					texte_corr += `<br>`;			
					break;			
				case 3 : // exponentiation
					exp = [randint(2,4),randint(2,4)]; // on redéfinit les deux exposants pour ne pas avoir d'écritures trop longues et pour éviter 1
					texte =  `$${lettre}=(${base_utile}^${exp[0]})^{${exp[1]}}$`;	
					
					texte_corr = `$${lettre}=(${base_utile}^${exp[0]})^{${exp[1]}}$`;
					if (this.correction_detaillee) {
						texte_corr += `<br>`;
						texte_corr += `$${lettre}=\\color{${coul0}}{\\underbrace{${eclatePuissance(`(${base_utile}^${exp[0]})`,exp[1],coul0)}}_{${exp[1]}\\thickspace\\text{facteurs}}}$`;
						texte_corr += `<br>`;
						texte_corr += `$${lettre}=\\color{${coul0}}{\\underbrace{${eclatePuissance(`(\\color{${coul1}}{\\underbrace{${eclatePuissance(base_utile,exp[0],coul1)}}_{${exp[0]}\\thickspace\\text{facteurs}}}\\color{${coul0}})`,exp[1],coul0)}}_{${exp[1]}\\times\\color{${coul1}}{${exp[0]}}\\thickspace\\color{black}{\\text{facteurs}}}}$`;
					};
					texte_corr += `<br>`;
					texte_corr += `Il y a donc $\\mathbf{\\color{${coul0}}{${exp[1]}}~\\color{black}{\\times}~\\color{${coul1}}{${exp[0]}}}$ facteurs tous égaux à $${base_utile}$`;
					texte_corr += `<br>`;
					texte_corr += `$${lettre}=${base_utile}^{${exp[0]}\\times${exp[1]}} = ${base_utile}^{${exp[0]*exp[1]}}`;				
					if (simpNotPuissance(base,exp[0]*exp[1]) != ` `) {
					texte_corr += `= ${simpNotPuissance(base,exp[0]*exp[1])}`; 
					};
					texte_corr += `$`;
					texte_corr += `<br>`;
					break;
				case 4 : // produit de puissances de même exposant
					base0 = randint(2,8,[4,6]);
					base1 = randint(2,8,[4,6,base0]); 
					base = [base0,base1]; // on choisit 2 bases différentes c'est mieux
					exp = randint(2,5,6); // on choisit un exposant
					texte = `$${lettre}=${base[0]}^${exp}\\times ${base[1]}^${exp}$`;
					texte_corr += `<br>`;
					texte_corr = `$${lettre}=${base[0]}^${exp}\\times ${base[1]}^${exp}$`;
					if (this.correction_detaillee) {
						texte_corr += `<br>`;
						texte_corr += `$${lettre}=${eclatePuissance(base[0],exp,coul0)} \\times ${eclatePuissance(base[1],exp,coul1)}$`;
						texte_corr += `<br>`;
						texte_corr += `$${lettre}=${reorganiseProduitPuissance(base[0],base[1],exp,coul0,coul1)}$`;
					};
					texte_corr += `<br>`;
					texte_corr += `$${lettre}= (\\color{${coul0}}{\\mathbf{${base[0]}}} \\color{black}{\\times} \\color{${coul1}}{\\mathbf{${base[1]}}}\\color{black}{)^{${exp}}}=${base[0]*base[1]}^${exp}$`;
					texte_corr += `<br>`;
					break;																
			};


		
			if (this.liste_questions.indexOf(texte)==-1){ // Si la question n'a jamais été posée, on en créé une autre
				this.liste_questions.push(texte);
				this.liste_corrections.push(texte_corr);
				i++;
			}
			cpt++
		}		
		liste_de_question_to_contenu_sans_numero(this);
	}
	this.besoin_formulaire_numerique = ['Règle à travailler',5,"1 : Produit de deux puissances de même base\n2 : Quotient de deux puissances de même base\n3 : Puissance de puissance\n4 : Produit de puissances de même exposant\n5 : Mélange"]; 
}

/**
* Puissances d'un relatif (2)
* * Travailler des résultats automatisés 
* * mais aussi d'utiliser les propriétés du produit de puissance, du quotient de puissances et des puissances de puissances
* @Auteur Sébastien Lozano
*/
function Puissances_d_un_relatif_2(){
	'use strict';
	Exercice.call(this); // Héritage de la classe Exercice()
	this.sup = 1 ; 
	this.titre = "Puissances : Calculs automatisés et règles de calculs"; 
	sortie_html ? this.consigne = "Écrire sous la forme $\\mathbf{a^n}$.":  this.consigne = "Écrire sous la forme $a^n$.";
	this.spacing = 2;
	this.spacing_corr = 2.5;
	this.nb_questions = 8;
	this.nb_cols_corr = 1;


	this.nouvelle_version = function(numero_de_l_exercice){
		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées

		let type_de_questions_disponibles = [1,2,3,4,5,6,7,8];	
		let liste_type_de_questions = combinaison_listes(type_de_questions_disponibles,this.nb_questions);

		this.bouton_aide = modal_pdf(numero_de_l_exercice,"pdf/FichePuissances-4N21.pdf","Aide mémoire sur les puissances (Sébastien Lozano)","Aide mémoire")

		for (let i = 0, base ,exp , texte, texte_corr, cpt=0; i < this.nb_questions&&cpt<50;) {
			let type_de_questions = liste_type_de_questions[i];
			
			switch (type_de_questions) {
				case 1 :
					base = 3; // on travaille sur cette base mais on pourrait rendre la base aléatoire
					exp = [randint(1,7,[1]),randint(1,7,[1]),randint(1,7,[1])]; // on a besoin de 3 exposants distincts
					texte = `$\\dfrac{${base}^${exp[0]}\\times ${base*base}}{${base}^${exp[1]} \\times ${base}^${exp[2]}}$`;
					texte_corr = `$\\dfrac{${base}^${exp[0]}\\times ${base*base}}{${base}^${exp[1]} \\times ${base}^${exp[2]}}`;
					texte_corr += ` = \\dfrac{${base}^${exp[0]}\\times ${base}^{2}}{${base}^${exp[1]} \\times ${base}^${exp[2]}}`;
					texte_corr += ` = \\dfrac{${base}^{${exp[0]}+2}}{${base}^{${exp[1]}+${exp[2]}}}`;
					texte_corr += ` = \\dfrac{${base}^{${exp[0]+2}}}{${base}^{${exp[1]+exp[2]}}}`;
					texte_corr += ` = ${base}^{${exp[0]+2}-${exp[1]+exp[2]}}`;					
					texte_corr += ` = ${base}^{${exp[0]+2-exp[1]-exp[2]}}`;
					if ((exp[0]+2-exp[1]-exp[2])==0 || (exp[0]+2-exp[1]-exp[2])==1) {
						// on ne teste l'exposant que pour la sortie puisque l'exposant 1 est évincé
						texte_corr += `=`+simpExp(base,exp[0]+2-exp[1]-exp[2]);
					};
					texte_corr += `$`;
					break;
				case 2 :
					base = 2; // on travaille sur cette base mais on pourrait rendre la base aléatoire
					exp = [randint(1,7,[1]),randint(1,7,[1])]; // on a besoin de 2 exposants distincts
					texte = `$\\dfrac{${base}^${exp[0]}\\times ${base**3}}{${base}^${exp[1]}}$`;
					texte_corr = `$\\dfrac{${base}^${exp[0]}\\times ${base**3}}{${base}^${exp[1]}}`;
					texte_corr += ` = \\dfrac{${base}^${exp[0]}\\times ${base}^3}{${base}^${exp[1]}}`;
					texte_corr += ` = \\dfrac{${base}^{${exp[0]}+3}}{${base}^${exp[1]}}`;
					texte_corr += ` = \\dfrac{${base}^{${exp[0]+3}}}{${base}^${exp[1]}}`;
					texte_corr += ` = ${base}^{${exp[0]+3}-${exp[1]}}`;
					texte_corr += ` = ${base}^{${exp[0]+3-exp[1]}}`;
					if ((exp[0]+3-exp[1])==0 || (exp[0]+3-exp[1])==1) {
						// on ne teste l'exposant que pour la sortie puisque l'exposant 1 est évincé
						texte_corr += `=`+simpExp(base,exp[0]+3-exp[1]);
					};
					texte_corr += `$`;
					break;
				case 3 :
					base = 5; // on travaille sur cette base mais on pourrait rendre la base aléatoire
					exp = [randint(1,7,[1]),randint(1,2)]; // on a besoin de 2 exposants distincts
					// le second exposant ne peut valoir que 1 ou 2 la fonction testExp ne convient pas à l'affichage ici					
					if (exp[1]==2) {
						texte = `$\\dfrac{${base}\\times ${base}^${exp[0]}}{${base**2}^${exp[1]}}$`;
						texte_corr = `$\\dfrac{${base}\\times ${base}^${exp[0]}}{${base**2}^${exp[1]}}`;
						texte_corr += `=\\dfrac{${base}^{1+${exp[0]}}}{(${base}^2)^${exp[1]}}`;
						texte_corr += `=\\dfrac{${base}^{1+${exp[0]}}}{${base}^{2 \\times ${exp[1]}}}`;
						texte_corr += `=\\dfrac{${base}^{${1+exp[0]}}}{${base}^{${2*exp[1]}}}`;
					} else {						
						texte = `$\\dfrac{${base}\\times ${base}^${exp[0]}}{${base**2}}$`;
						texte_corr = `$\\dfrac{${base}\\times ${base}^${exp[0]}}{${base**2}}`;
						texte_corr += `=\\dfrac{${base}^{1+${exp[0]}}}{${base}^2}`;
					};
					texte_corr += `=${base}^{${1+exp[0]}-${2*exp[1]}}`;
					texte_corr += `=${base}^{${1+exp[0]-2*exp[1]}}`;
					if ((1+exp[0]-2*exp[1])==0 || (1+exp[0]-2*exp[1])==1) {
						// on ne teste l'exposant que pour la sortie puisque l'exposant 1 est évincé
						texte_corr += `=`+simpExp(base,1+exp[0]-2*exp[1]);
					};
					texte_corr += `$`;
					break;
				case 4 :
					base = 2; // on travaille sur cette base mais on pourrait rendre la base aléatoire
					exp = [randint(1,7,[1])]; // on a besoin de 1 exposant
					texte = `$\\dfrac{${base}\\times ${base}^${exp[0]}}{${base**2}\\times ${base**2}}$`;
					texte_corr = `$\\dfrac{${base}\\times ${base}^${exp[0]}}{${base**2}\\times ${base**2}}`;
					texte_corr += `=\\dfrac{${base}^{1+${exp[0]}}}{${base}^2\\times ${base}^2}`;
					texte_corr += `=\\dfrac{${base}^{${1+exp[0]}}}{${base}^{2+2}}`;
					texte_corr += `=\\dfrac{${base}^{${1+exp[0]}}}{${base}^{${2+2}}}`;
					texte_corr += `=${base}^{${1+exp[0]}-${2+2}}`;					
					texte_corr += `=${base}^{${1+exp[0]-2-2}}`;
					if ((1+exp[0]-2-2)==0 || (1+exp[0]-2-2)==1) {
						// on ne teste l'exposant que pour la sortie puisque l'exposant 1 est évincé
						texte_corr += `=`+simpExp(base,1+exp[0]-2-2);
					};
					texte_corr += `$`;
					break;
				case 5 :
					base = 2; // on travaille sur cette base mais on pourrait rendre la base aléatoire
					exp = [randint(1,7,[1])]; // on a besoin de 1 exposant
					texte = `$\\dfrac{${base**2}^${exp[0]}}{${base}}$`;
					texte_corr = `$\\dfrac{${base**2}^${exp[0]}}{${base}}`;
					texte_corr += `=\\dfrac{(${base}^2)^${exp[0]}}{${base}}`;
					texte_corr += `=\\dfrac{${base}^{2\\times ${exp[0]}}}{${base}}`;
					texte_corr += `=\\dfrac{${base}^{${2*exp[0]}}}{${base}}`;
					texte_corr += `=${base}^{${2*exp[0]}-1}`;					
					texte_corr += `=${base}^{${2*exp[0]-1}}$`;
					// Inutile de tester l'exposant final car il vaut au minimum 3
					break;
				case 6 :
					base = 3; // on travaille sur cette base mais on pourrait rendre la base aléatoire
					exp = [randint(1,3,[1])]; // on a besoin de 1 exposant
					texte = `$\\dfrac{${base**3}^${exp[0]}}{${base}}$`;
					texte_corr = `$\\dfrac{${base**3}^${exp[0]}}{${base}}`;
					texte_corr += `=\\dfrac{(${base}^3)^${exp[0]}}{${base}}`;
					texte_corr += `=\\dfrac{${base}^{3\\times ${exp[0]}}}{${base}}`;
					texte_corr += `=\\dfrac{${base}^{${3*exp[0]}}}{${base}}`;
					texte_corr += `=${base}^{${3*exp[0]}-1}`;
					texte_corr += `=${base}^{${3*exp[0]-1}}$`;
					// inutile de tester l'exposant final car il vaut au minimum 5 
					break;
				case 7 :
					base = 3; // on travaille sur cette base mais on pourrait rendre la base aléatoire
					exp = [randint(1,7,[1]),randint(1,7,[1]),randint(1,4,[1])]; // on a besoin de 3 exposants distincts
					texte = `$\\dfrac{${base}^${exp[0]}\\times ${base}^${exp[1]}}{${base**2}^${exp[2]}}\\times ${base}$`;
					texte_corr = `$\\dfrac{${base}^${exp[0]}\\times ${base}^${exp[1]}}{${base**2}^${exp[2]}}\\times ${base}`;
					texte_corr += `=\\dfrac{${base}^{${exp[0]}+${exp[1]}}}{(${base}^2)^${exp[2]}}\\times ${base}`;
					texte_corr += `=\\dfrac{${base}^{${exp[0]+exp[1]}}}{${base}^{2\\times ${exp[2]}}}\\times ${base}`;
					texte_corr += `=\\dfrac{${base}^{${exp[0]+exp[1]}}}{${base}^{${2*exp[2]}}}\\times ${base}`;
					texte_corr += `=\\dfrac{${base}^{${exp[0]+exp[1]}}\\times ${base}}{${base}^{${2*exp[2]}}}`;
					texte_corr += `=\\dfrac{${base}^{${exp[0]+exp[1]}+1}}{${base}^{${2*exp[2]}}}`;
					texte_corr += `=\\dfrac{${base}^{${exp[0]+exp[1]+1}}}{${base}^{${2*exp[2]}}}`;
					texte_corr += `=${base}^{${exp[0]+exp[1]+1}-${2*exp[2]}}`;					
					texte_corr += `=${base}^{${exp[0]+exp[1]+1-2*exp[2]}}`;
					if ((exp[0]+exp[1]+1-2*exp[2])==0 || (exp[0]+exp[1]+1-2*exp[2])==1) {
						// on ne teste l'exposant que pour la sortie puisque l'exposant est évincé
						texte_corr += `=`+simpExp(base, exp[0]+exp[1]+1-2*exp[2]);
					};
					texte_corr += `$`;
					break;
				case 8 :
					base = 2; // on travaille sur cette base mais on pourrait rendre la base aléatoire
					exp = [randint(1,7,[1])]; // on a besoin de 1 exposant
					texte = `$\\dfrac{${base**3}\\times ${base}}{${base**2}^${exp[0]}}$`;
					texte_corr = `$\\dfrac{${base**3}\\times ${base}}{${base**2}^${exp[0]}}`;
					texte_corr += `=\\dfrac{${base}^3\\times ${base}}{(${base}^2)^${exp[0]}}`;
					texte_corr += `=\\dfrac{${base}^{3+1}}{${base}^{2\\times${exp[0]}}}`;
					texte_corr += `=\\dfrac{${base}^{4}}{${base}^{${2*exp[0]}}}`;
					texte_corr += `=${base}^{4-${2*exp[0]}}`;
					texte_corr += `=${base}^{${3+1-2*exp[0]}}`;
					if ((3+1-2*exp[0])==0 || (3+1-2*exp[0])==1) {
						// on ne teste l'exposant que pour la sortie puisque l'exposant est évincé
						texte_corr += `=`+simpExp(base,3+1-2*exp[0]);
					};
					texte_corr += `$`;
					break;
																
			};
			

		
			if (this.liste_questions.indexOf(texte)==-1){ // Si la question n'a jamais été posée, on en créé une autre
				this.liste_questions.push(texte);
				this.liste_corrections.push(texte_corr);
				i++;
			}
			cpt++
		}
		liste_de_question_to_contenu(this); //Espacement de 2 em entre chaque questions.
	}
	
}

function Puissances_de_dix() {
	'use strict';
	Exercice.call(this); // Héritage de la classe Exercice()
	this.sup = 1 ; 
	this.titre = "Puissances de 10 : Le sens des règles de calculs"; 
	sortie_html ? this.consigne = "Écrire sous la forme $\\mathbf{10^n}$.":  this.consigne = "Écrire sous la forme $10^n$.";
	sortie_html ? this.spacing = 3 : this.spacing = 2;
	sortie_html ? this.spacing_corr = 3: this.spacing_corr = 2;
	this.nb_questions = 5;
	this.correction_detaillee_disponible = true;
	this.nb_cols_corr = 1;
	this.sup = 1;
	this.nouvelle_version = function(numero_de_l_exercice){
		let type_de_questions;
		this.bouton_aide = modal_pdf(numero_de_l_exercice,"pdf/FichePuissances-4N21.pdf","Aide mémoire sur les puissances (Sébastien Lozano)","Aide mémoire")
		
		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées

		let type_de_questions_disponibles = [];
		if (this.sup==1){
			type_de_questions_disponibles = [1,2,3]; // produit, quotient et exponentiation de puissances de 10
		} else if (this.sup==2){
			type_de_questions_disponibles = [4,5,6,7,8,9,10,11]; // calculs première série
		} else if (this.sup==3){
			type_de_questions_disponibles = [1,2,3,4,5,6,7,8,9,10,11]; // calculs deuxième série
		};
		let liste_type_de_questions = combinaison_listes(type_de_questions_disponibles,this.nb_questions);

		// pour pouvoir adapter les couleurs en cas de besoin
		let coul0 = 'red';
		let coul1 = 'blue';

		for (let i = 0, exp0, exp1, exp, coul_exp0, coul_exp1, lettre, texte, texte_corr, cpt=0; i < this.nb_questions&&cpt<50;) {
			type_de_questions = liste_type_de_questions[i];


			exp0 = randint(1,9);
			exp1 = randint(1,9,[exp0]);
			exp = [exp0,exp1]; // on choisit deux exposants différents c'est mieux
			lettre = lettre_depuis_chiffre(i+1); // on utilise des lettres pour les calculs	
		
			switch (type_de_questions) {
				case 1 : // produit de puissances de même base
					texte =  `$${lettre}=10^${exp[0]}\\times 10^${exp[1]}$`;	

					texte_corr = `$${lettre}=10^${exp[0]}\\times 10^${exp[1]}$`;
					if (this.correction_detaillee) {
						texte_corr += `<br>`;
						texte_corr += `$${lettre}=${eclatePuissance(10,exp[0],coul0)} \\times ${eclatePuissance(10,exp[1],coul1)}$`;
					};
					texte_corr += `<br>`;
					texte_corr += `Il y a donc $\\mathbf{\\color{${coul0}}{${exp[0]}}~\\color{black}{+}~\\color{${coul1}}{${exp[1]}}}$ facteurs tous égaux à $10$`;
					texte_corr += `<br>`;
					texte_corr += `$${lettre}=10^{${exp[0]}+${exp[1]}} = 10^{${exp[0]+exp[1]}}`;
					// attention la base est de type str alors que la fonction switch sur un type number					
					if (simpNotPuissance(10,exp[0]+exp[1]) != ` `) {
						texte_corr += `=${simpNotPuissance(10,exp[0]+exp[1])}`;  
					}
					texte_corr += `$`;
					texte_corr += `<br>`;
					break;			
				case 2 : // quotient de puissances de même base
					// Pour que la couleur de la 10 associée à l'exposant max soit toujours rouge.
					if (Math.max(exp[0],exp[1])==exp[0]) {
						coul_exp0 = coul0;
						coul_exp1 = coul1;
					} else {
						coul_exp0 = coul1;
						coul_exp1 = coul0;
					};
					
					texte =  `$${lettre}=\\dfrac{10^${exp[0]}}{10^${exp[1]}}$`;	

					texte_corr = `$${lettre}=\\dfrac{10^${exp[0]}}{10^${exp[1]}}$`;
					if (this.correction_detaillee) {
						texte_corr += `<br><br>`;
						texte_corr += `$${lettre}=\\dfrac{${eclatePuissance(10,exp[0],coul_exp0)}}{${eclatePuissance(10,exp[1],coul_exp1)}}$`;
					};
					texte_corr += `<br><br>`;				
					texte_corr += `Il y a donc $\\mathbf{\\color{${coul1}}{${Math.min(exp[0],exp[1])}}}$ simplifications par $10$ possibles.`;
					if (this.correction_detaillee) {
						texte_corr += `<br><br>`;					
					};
					if ((exp[0]-exp[1])==0) {
						if (this.correction_detaillee) {
							texte_corr += `$${lettre}=\\dfrac{${eclatePuissance(`\\cancel{10}`,exp[0],coul_exp0)}}{${eclatePuissance(`\\cancel{10}`,exp[0],coul_exp1)}}$`;
						};
						texte_corr += `<br><br>`;
						texte_corr += `$${lettre}=1`
					} else if (exp[0]-exp[1]<0) {
						if (this.correction_detaillee) {
							texte_corr += `$${lettre}=\\dfrac{${eclatePuissance(`\\cancel{10}`,exp[0],coul_exp0)}}{${eclatePuissance(`\\cancel{10}`,exp[0],coul_exp1)}\\times${eclatePuissance(10,exp[1]-exp[0],coul_exp1)}}$`;
						};
						texte_corr += `<br><br>`;
						texte_corr += `$${lettre}=\\dfrac{1}{10^{${exp[1]}-${exp[0]}}}=\\dfrac{1}{10^{${exp[1]-exp[0]}}}`
						if (simpNotPuissance(10,exp[1]-exp[0]) != ` `) {
							texte_corr += `=\\dfrac{1}{${simpNotPuissance(10,exp[1]-exp[0])}}=${simpNotPuissance(10,exp[0]-exp[1])}`
						} else {
							texte_corr += `=10^{${exp[0]-exp[1]}}`
						}						
					} else {
						if (this.correction_detaillee) {
							texte_corr += `$${lettre}=\\dfrac{${eclatePuissance(`\\cancel{10}`,exp[1],coul_exp0)}\\times${eclatePuissance(10,exp[0]-exp[1],coul_exp0)}}{${eclatePuissance(`\\cancel{10}`,exp[1],coul_exp1)}}$`;
						};
						texte_corr += `<br><br>`;
						texte_corr += `$${lettre}=10^{${exp[0]}-${exp[1]}}=10^{${exp[0]-exp[1]}}`;
						if (simpNotPuissance(10,exp[0]-exp[1]) != ` `) {
							texte_corr += `=${simpNotPuissance(10,exp[0]-exp[1])}`;
						}; 						
					}; 
					texte_corr += `$`;
					texte_corr += `<br>`;			
					break;			
				case 3 : // exponentiation
					exp = [randint(2,4),randint(2,4)]; // on redéfinit les deux exposants pour ne pas avoir d'écritures trop longues et pour éviter 1
					texte =  `$${lettre}=(10^${exp[0]})^{${exp[1]}}$`;	
					
					texte_corr = `$${lettre}=(10^${exp[0]})^{${exp[1]}}$`;
					if (this.correction_detaillee) {
						texte_corr += `<br>`;
						texte_corr += `$${lettre}=\\color{${coul0}}{\\underbrace{${eclatePuissance(`(10^${exp[0]})`,exp[1],coul0)}}_{${exp[1]}\\thickspace\\text{facteurs}}}$`;
						texte_corr += `<br>`;
						texte_corr += `$${lettre}=\\color{${coul0}}{\\underbrace{${eclatePuissance(`(\\color{${coul1}}{\\underbrace{${eclatePuissance(10,exp[0],coul1)}}_{${exp[0]}\\thickspace\\text{facteurs}}}\\color{${coul0}})`,exp[1],coul0)}}_{${exp[1]}\\times\\color{${coul1}}{${exp[0]}}\\thickspace\\color{black}{\\text{facteurs}}}}$`;
					};
					texte_corr += `<br>`;
					texte_corr += `Il y a donc $\\mathbf{\\color{${coul0}}{${exp[1]}}~\\color{black}{\\times}~\\color{${coul1}}{${exp[0]}}}$ facteurs tous égaux à $10$`;
					texte_corr += `<br>`;
					texte_corr += `$${lettre}=10^{${exp[0]}\\times${exp[1]}} = 10^{${exp[0]*exp[1]}}`;				
					if (simpNotPuissance(10,exp[0]*exp[1]) != ` `) {
					texte_corr += `= ${simpNotPuissance(10,exp[0]*exp[1])}`; 
					};
					texte_corr += `$`;
					texte_corr += `<br>`;
					break;
                case 4 :
                        exp = [randint(1,7,[1]),randint(1,7,[1]),randint(1,7,[1])]; // on a besoin de 3 exposants distincts
                        texte = `$\\dfrac{10^${exp[0]}\\times 100}{10^${exp[1]} \\times 10^${exp[2]}}$`;
                        texte_corr = `$\\dfrac{10^${exp[0]}\\times 100}{10^${exp[1]} \\times 10^${exp[2]}}`;
                        texte_corr += ` = \\dfrac{10^${exp[0]}\\times 10^{2}}{10^${exp[1]} \\times 10^${exp[2]}}`;
                        texte_corr += ` = \\dfrac{10^{${exp[0]}+2}}{10^{${exp[1]}+${exp[2]}}}`;
                        texte_corr += ` = \\dfrac{10^{${exp[0]+2}}}{10^{${exp[1]+exp[2]}}}`;
                        texte_corr += ` = 10^{${exp[0]+2}-${exp[1]+exp[2]}}`;					
                        texte_corr += ` = 10^{${exp[0]+2-exp[1]-exp[2]}}`;
                        if ((exp[0]+2-exp[1]-exp[2])==0 || (exp[0]+2-exp[1]-exp[2])==1) {
                            // on ne teste l'exposant que pour la sortie puisque l'exposant 1 est évincé
                            texte_corr += `=`+simpExp(10,exp[0]+2-exp[1]-exp[2]);
                        };
                        texte_corr += `$`;
                        break;
                case 5 :
    
                        exp = [randint(1,7,[1]),randint(1,7,[1])]; // on a besoin de 2 exposants distincts
                        texte = `$\\dfrac{10^${exp[0]}\\times 1000}{10^${exp[1]}}$`;
                        texte_corr = `$\\dfrac{10^${exp[0]}\\times 1000}{10^${exp[1]}}`;
                        texte_corr += ` = \\dfrac{10^${exp[0]}\\times 10^3}{10^${exp[1]}}`;
                        texte_corr += ` = \\dfrac{10^{${exp[0]}+3}}{10^${exp[1]}}`;
                        texte_corr += ` = \\dfrac{10^{${exp[0]+3}}}{10^${exp[1]}}`;
                        texte_corr += ` = 10^{${exp[0]+3}-${exp[1]}}`;
                        texte_corr += ` = 10^{${exp[0]+3-exp[1]}}`;
                        if ((exp[0]+3-exp[1])==0 || (exp[0]+3-exp[1])==1) {
                            // on ne teste l'exposant que pour la sortie puisque l'exposant 1 est évincé
                            texte_corr += `=`+simpExp(10,exp[0]+3-exp[1]);
                        };
                        texte_corr += `$`;
                        break;
                case 6 :

                        exp = [randint(1,7,[1]),randint(1,2)]; // on a besoin de 2 exposants distincts
                        // le second exposant ne peut valoir que 1 ou 2 la fonction testExp ne convient pas à l'affichage ici					
                        if (exp[1]==2) {
                            texte = `$\\dfrac{10\\times 10^${exp[0]}}{100^${exp[1]}}$`;
                            texte_corr = `$\\dfrac{10\\times 10^${exp[0]}}{100^${exp[1]}}`;
                            texte_corr += `=\\dfrac{10^{1+${exp[0]}}}{(10^2)^${exp[1]}}`;
                            texte_corr += `=\\dfrac{10^{1+${exp[0]}}}{10^{2 \\times ${exp[1]}}}`;
                            texte_corr += `=\\dfrac{10^{${1+exp[0]}}}{10^{${2*exp[1]}}}`;
                        } else {						
                            texte = `$\\dfrac{10\\times 10^${exp[0]}}{100}$`;
                            texte_corr = `$\\dfrac{10\\times 10^${exp[0]}}{100}`;
                            texte_corr += `=\\dfrac{10^{1+${exp[0]}}}{10^2}`;
                        };
                        texte_corr += `=10^{${1+exp[0]}-${2*exp[1]}}`;
                        texte_corr += `=10^{${1+exp[0]-2*exp[1]}}`;
                        if ((1+exp[0]-2*exp[1])==0 || (1+exp[0]-2*exp[1])==1) {
                            // on ne teste l'exposant que pour la sortie puisque l'exposant 1 est évincé
                            texte_corr += `=`+simpExp(10,1+exp[0]-2*exp[1]);
                        };
                        texte_corr += `$`;
                        break;
                case 7 :

                        exp = [randint(1,7,[1])]; // on a besoin de 1 exposant
                        texte = `$\\dfrac{10\\times 10^${exp[0]}}{100\\times 100}$`;
                        texte_corr = `$\\dfrac{10\\times 10^${exp[0]}}{100\\times 100}`;
                        texte_corr += `=\\dfrac{10^{1+${exp[0]}}}{10^2\\times 10^2}`;
                        texte_corr += `=\\dfrac{10^{${1+exp[0]}}}{10^{2+2}}`;
                        texte_corr += `=\\dfrac{10^{${1+exp[0]}}}{10^{${2+2}}}`;
                        texte_corr += `=10^{${1+exp[0]}-${2+2}}`;					
                        texte_corr += `=10^{${1+exp[0]-2-2}}`;
                        if ((1+exp[0]-2-2)==0 || (1+exp[0]-2-2)==1) {
                            // on ne teste l'exposant que pour la sortie puisque l'exposant 1 est évincé
                            texte_corr += `=`+simpExp(10,1+exp[0]-2-2);
                        };
                        texte_corr += `$`;
                        break;
                case 8 :
                        exp = [randint(1,7,[1])]; // on a besoin de 1 exposant
                        texte = `$\\dfrac{100^${exp[0]}}{10}$`;
                        texte_corr = `$\\dfrac{100^${exp[0]}}{10}`;
                        texte_corr += `=\\dfrac{(10^2)^${exp[0]}}{10}`;
                        texte_corr += `=\\dfrac{10^{2\\times ${exp[0]}}}{10}`;
                        texte_corr += `=\\dfrac{10^{${2*exp[0]}}}{10}`;
                        texte_corr += `=10^{${2*exp[0]}-1}`;					
                        texte_corr += `=10^{${2*exp[0]-1}}$`;
                        // Inutile de tester l'exposant final car il vaut au minimum 3
                        break;
                case 9 :
                        exp = [randint(1,3,[1])]; // on a besoin de 1 exposant
                        texte = `$\\dfrac{1000^${exp[0]}}{10}$`;
                        texte_corr = `$\\dfrac{1000^${exp[0]}}{10}`;
                        texte_corr += `=\\dfrac{(10^3)^${exp[0]}}{10}`;
                        texte_corr += `=\\dfrac{10^{3\\times ${exp[0]}}}{10}`;
                        texte_corr += `=\\dfrac{10^{${3*exp[0]}}}{10}`;
                        texte_corr += `=10^{${3*exp[0]}-1}`;
                        texte_corr += `=10^{${3*exp[0]-1}}$`;
                        // inutile de tester l'exposant final car il vaut au minimum 5 
                        break;
                case 10 :
                        exp = [randint(1,7,[1]),randint(1,7,[1]),randint(1,4,[1])]; // on a besoin de 3 exposants distincts
                        texte = `$\\dfrac{10^${exp[0]}\\times 10^${exp[1]}}{100^${exp[2]}}\\times 10$`;
                        texte_corr = `$\\dfrac{10^${exp[0]}\\times 10^${exp[1]}}{100^${exp[2]}}\\times 10`;
                        texte_corr += `=\\dfrac{10^{${exp[0]}+${exp[1]}}}{(10^2)^${exp[2]}}\\times 10`;
                        texte_corr += `=\\dfrac{10^{${exp[0]+exp[1]}}}{10^{2\\times ${exp[2]}}}\\times 10`;
                        texte_corr += `=\\dfrac{10^{${exp[0]+exp[1]}}}{10^{${2*exp[2]}}}\\times 10`;
                        texte_corr += `=\\dfrac{10^{${exp[0]+exp[1]}}\\times 10}{10^{${2*exp[2]}}}`;
                        texte_corr += `=\\dfrac{10^{${exp[0]+exp[1]}+1}}{10^{${2*exp[2]}}}`;
                        texte_corr += `=\\dfrac{10^{${exp[0]+exp[1]+1}}}{10^{${2*exp[2]}}}`;
                        texte_corr += `=10^{${exp[0]+exp[1]+1}-${2*exp[2]}}`;					
                        texte_corr += `=10^{${exp[0]+exp[1]+1-2*exp[2]}}`;
                        if ((exp[0]+exp[1]+1-2*exp[2])==0 || (exp[0]+exp[1]+1-2*exp[2])==1) {
                            // on ne teste l'exposant que pour la sortie puisque l'exposant est évincé
                            texte_corr += `=`+simpExp(10, exp[0]+exp[1]+1-2*exp[2]);
                        };
                        texte_corr += `$`;
                        break;
                case 11 :
                        exp = [randint(1,7,[1])]; // on a besoin de 1 exposant
                        texte = `$\\dfrac{1000\\times 10}{100^${exp[0]}}$`;
                        texte_corr = `$\\dfrac{1000\\times 10}{100^${exp[0]}}`;
                        texte_corr += `=\\dfrac{10^3\\times 10}{(10^2)^${exp[0]}}`;
                        texte_corr += `=\\dfrac{10^{3+1}}{10^{2\\times${exp[0]}}}`;
                        texte_corr += `=\\dfrac{10^{4}}{10^{${2*exp[0]}}}`;
                        texte_corr += `=10^{4-${2*exp[0]}}`;
                        texte_corr += `=10^{${3+1-2*exp[0]}}`;
                        if ((3+1-2*exp[0])==0 || (3+1-2*exp[0])==1) {
                            // on ne teste l'exposant que pour la sortie puisque l'exposant est évincé
                            texte_corr += `=`+simpExp(10,3+1-2*exp[0]);
                        };
                        texte_corr += `$`;
                        break;														
			};
			if (this.liste_questions.indexOf(texte)==-1){ // Si la question n'a jamais été posée, on en créé une autre
				this.liste_questions.push(texte);
				this.liste_corrections.push(texte_corr);
				i++;
			}
			cpt++
		}		
		liste_de_question_to_contenu(this);
	}
	this.besoin_formulaire_numerique = ['Règle à travailler',3,"1 : Calculs de base\n2 : Calculs plus complexes\n3 : Mélange"]; 
}


/**
 * problèmes de grandeurs composées
 * @Auteur Jean-Claude Lhote
 */
function problemes_grandeurs_composees(){
	'use strict';
	Exercice.call(this); // Héritage de la classe Exercice()
	this.titre = "Résoudre des problèmes de grandeurs composées et de conversion d'unités complexes";
	this.consigne = "";
	this.nb_questions = 1;
	this.nb_questions_modifiable = false;
	this.nb_cols = 1;
	this.nb_cols_corr = 1;
	sortie_html? this.spacing = 3 : this.spacing = 1.5; 
	sortie_html? this.spacing_corr = 3 : this.spacing_corr = 2;
	this.sup=false;
	this.sup2=1;
	
	this.nouvelle_version = function(numero_de_l_exercice){
		this.liste_questions = []; // Liste de questions
		this.liste_corrections = []; // Liste de questions corrigées
		// let liste_index_disponibles=[1,2,3,4,5,6,7,8,9,10,11,12,13,14];
		// let liste_index=combinaison_listes(liste_index_disponibles,this.nb_questions);
		let grandeurs = []
		if (!this.sup) { // Si aucune grandeur n'est saisie
			grandeurs = [1,2,3,4,5,6,7,8,9,10,11,12,13,14]
		}
		else {
			if (typeof(this.sup)=='number'){ // Si c'est un nombre c'est qu'il y a qu'une seule grandeur
				grandeurs[0] = this.sup
				this.nb_questions=1
			} else {
				grandeurs = this.sup.split(";");// Sinon on créé un tableau à partir des valeurs séparées par des ;
				this.nb_questions=grandeurs.length
			}	
		}

		let liste_index=combinaison_listes(grandeurs,this.nb_questions);
		let monchoix;
		let type_aide=1;
		if (!sortie_html) type_aide=0;
		let solutes=[[`sel`,`d'eau`,300],[`sucre`,`d'eau`,2000],[`dioxyde de carbone`,`d'eau`,3],[`bicarbonate de sodium`,`d'eau`,9],[`carbonate de sodium`,`d'eau`,300]] //soluté, masse maximale en gramme pour saturer 1 L de solvant
		let materiaux=[[`Paladium`,12000],[`acier`,7800],[`fonte`,7100],[`aluminium`,2700],[`argent`,10500],[`bronze`,8800],[`cuivre`,8960],[`fer`,7860],[`lithium`,530],[`mercure`,13545],[`nickel`,8900],[`or`,19300],[`platine`,21450],[`titane`,4500],[`zinc`,7150]]
		let villes=[[`Nice`,342637,71.9],[`Montpellier`,281613,56.9],[`Rennes`,216268,50.4],[`Dijon`,155090,40.4],[`Orléans`,114782,27.5],[`Clermont-Ferrand`,142686,42.7],[`Nantes`,306694,65.2],[`Paris`,2190327,105.4],[`Lyon`,515695,47.9],[`Marseille`,862211,240.6],[`Bordeaux`,252040,49.4],[`Nancy`,104592,15],[`Toulouse`,475438,118.300],[`Lille`,232440,34.800],[`Strasbourg`,279284,78.3]] //[Ville, population, superfice en ha, année du recensement]
		let locations=[[`un vélo`,1.5,2,8],[`un canoé`,10,2,4],[`des rollers`,7,2,5],[`un char à voile`,12,2,4]]
		let cours=[[`de piano`,20],[`de maths`,25],[`yoga`,5],[`dessin`,12],[`voile`,15]]
		let fruits=[[`pêches`,4,10,30],[`Noix`,5.4,4,13],[`cerises`,5.6,11,20],[`pommes`,2.2,20,40],[`framboises`,15,1,5],[`fraises`,7.5,5,10],[`citrons`,1.5,15,30],[`bananes`,1.5,15,25]]
		let appareils=[[`radiateur`,2000,20],[`téléviseur`,350,12],[`four électrique`,2500,4],[`ordinateur`,450,8]] // [appareil,puissance,durée maxi de fonctionnement]
		let liquides=[[`de lait entier`,1.032],[`d'essence`,0.755],[`de diesel`,0.83],[`d'huile`,0.910],[`de bière`,0.9],[`de sable`,1.6]] // [nom,densité]
		let rivieres=[[`Marne`,`Gournay-sur-Marne`,110,550,`avril 1983`,`la `,`de la `],[`Seine`,`Alfortville`,218,2100,`janvier 1982`,`la `,`de la `],[`Oise`,`Pont-Sainte-Maxence`,109,665,`février 1995`,`l'`,`de l'`],[`Loire`,`Saint-Nazaire`,931,5350,`décembre 1999`,`la `,`de la`],[`Rhin`,`Strasbourg`,951,3310,`juin 2016`,`le `,`du `],[`Rhône`,`Beaucaire`,1690,11500,`décembre 2003`,`le `,`du `],[`Meuse`,`Chooz`,144,1610,`janvier 1995`,`la `,`de la `]]
						// [Nom de rivière,Lieu de passage,débit moyen annuel, débitmax, date de la crue, article défini, article partitif]
		let vitesses=[[`sur un vélo`,4,12,8],[`dans un train`,50,100,5],[`dans une voiture`,15,30,5],[`en avion`,150,250,12],[`à pied`,2,4,5]] // [moyen de transport, vitesse min,vitesse max en m/s,durée max en h] 
		for (let i = 0,j,index,index1,index2,duree,quidam,nbheures,nbminutes,nbsecondes,vitesse_moy,distance,masse,masse2,masse3,prix1,prix2,prix3,texte, texte_corr, cpt=0; i < this.nb_questions && cpt<50;) {
			switch (parseInt(liste_index[i])) {
				case 1 : // problème de consommation éléctrique
					index=randint(0,3);
					let appareil=appareils[index][0];
					let puissance=appareils[index][1];
					let duree_max=appareils[index][2];
					let nbquartsdheures=randint(0,3);
					nbheures=randint(duree_max/4,duree_max,[1]);
					duree=nbheures+nbquartsdheures*0.25;
					let prixkwh=calcul(randint(0,5)/100+0.14);
					texte =`L'étiquette apposée au dos d'un ${appareil} indique une puissance de ${puissance} Watts. On le fait fonctionner pendant ${Math.floor(duree)} heures `;
					if (nbquartsdheures!=0) texte +=`et ${nbquartsdheures*15} minutes`;
					texte+=`.<br>Le prix d'un kWh est de ${tex_nombrec(prixkwh)} €.<br>`
					if (sortie_html) { // les boutons d'aide uniquement pour la version html
							
				}
					texte+=num_alpha(0)+` Exprimer en kWh l' `+ katex_Popup2(numero_de_l_exercice+i+1,type_aide,"énergie",`Définition : énergie (grandeur physique)`,`C’est le produit de la puissance électrique (Watt) par le temps (s) et se mesure en Joule (J).<br>1 J=1 W × 1 s.<br>Cependant pour mesurer des énergies plus importantes on utilise plutôt le kiloWattheure (kWh).<br>1 kWh=1000 W × 1 h.`)+` consommée.<br>`;
					texte+=num_alpha(1)+` Calculer la dépense correspondante.`
					texte_corr = num_alpha(0)+` Un ${appareil} d'une puissance de ${puissance} Watts qui fonctionne pendant ${Math.floor(duree)} heures `;
					if (nbquartsdheures!=0) texte_corr +=`et ${nbquartsdheures*15} minutes`;
					texte_corr+=` consomme : <br>`;
					if (nbquartsdheures!=0) texte_corr +=`$${nbheures}\\text{ h } ${nbquartsdheures*15} = ${nbheures}\\text{ h} + ${tex_fraction_reduite(nbquartsdheures,4)}\\text{ h} =${tex_nombre(nbheures+nbquartsdheures*0.25)}\\text{ h}$<br>`;
					texte_corr+=`$${puissance}\\text{ W}\\times${tex_nombre(duree)}\\text{ h}=${tex_nombre(puissance/1000)}\\text{ kW}\\times${tex_nombre(duree)}\\text{ h}=${tex_nombre(calcul(puissance*duree*0.001))}\\text{ kWh}.$<br>`
					texte_corr+=num_alpha(1)+` Le prix de cette énergie consommée est : $${tex_nombre(prixkwh)}$ €$\\text{ /kWh} \\times${tex_nombre(calcul(puissance*duree*0.001))}\\text{ kWh}`;
					if (!(prixkwh*puissance*duree/10==Math.round(prixkwh*puissance*duree/10))) texte_corr+= `\\approx${arrondi_virgule(prixkwh*puissance/1000*duree,2)}$ €`
					else texte_corr+= `=${arrondi_virgule(prixkwh*puissance/1000*duree,2)}$ €`
					break;
				case 2 : // problèmes de volumes
					index1=randint(0,1)
					switch (index1) {
						case 0 : // Volume d'une piscine
							let h1=180+randint(0,10)*10;
							let h2=80+randint(0,4)*10;
							let l=5+randint(0,5);
							let L=l*2+randint(0,4)*2;
							let deltat=randint(2,5);
							texte = `Une piscine a la forme d'un prisme droit. La profondeur à son extrémité nord est de ${h1} cm et la profondeur à son extrémité sud est de ${h2} cm.<br>`
							texte +=`D\'une extrémité à l\'autre la pente au fond de la piscine est régulière.<br>La largeur de la piscine (Est-Ouest) est de ${l} m et sa longueur (Nord-Sud) est de ${L} m.<br>`
							texte += num_alpha(0)+` Calculer le `+katex_Popup2(numero_de_l_exercice+i*3,type_aide,"volume",`Définition : volume (grandeur physique)`,`C’est le produit de trois longueurs ou le produit d'une aire et d'une longueur.<br>L'unité de mesure du volume est le mètre cube (m${exposant(3)}) mais on peut aussi rencontrer le litre (L) avec comme correspondance 1dm${exposant(3)}=1L`)+` d'eau en m${exposant(3)} contenu dans cette piscine quand elle est pleine.<br>`
							texte += num_alpha(1)+` Sachant que pour élever la température d'un litre d'eau de 1 degré, il faut une énergie de 1,162 Wattheure.<br> Quelle est l'énergie consommée en kWh pour augmenter de ${deltat} degrés ?<br>`							
							texte_corr = num_alpha(0)+` La base de ce prisme droit est un trapèze rectangle de petite base ${h2} cm, de grande base ${h1} cm et de hauteur ${L} m.<br>`
							texte_corr += `$\\mathcal{A}=\\dfrac{\\left(${h1}\\text{ cm}+${h2}\\text{ cm}\\right)}{2}\\times${L}\\text{ m}$`
							texte_corr += ` $=\\dfrac{\\left(${arrondi_virgule(h1/100)}\\text{ m}+${arrondi_virgule(h2/100)}\\text{ m}\\right)}{2}\\times${L}\\text{ m}$`
							texte_corr += ` $=\\dfrac{${arrondi_virgule((h1+h2)/100)}\\text{ m}}{2}\\times${L}\\text{ m}$`
							texte_corr += ` $=${arrondi_virgule((h1+h2)/200)}\\text{ m}\\times${L}\\text{ m}$`
							texte_corr += ` $=${arrondi_virgule((h1+h2)/200*L)}\\text{ m}$${exposant(2)}<br>`
							texte_corr += `Le volume de ce prisme et donc par extension le volume d'eau conteu dans la piscine est :<br>`
							texte_corr += `$\\mathcal{A}\\times\\mathcal{h}=${arrondi_virgule((h1+h2)/200*L)}\\text{ m}^2\\times${l}\\text{ m}$`
							texte_corr += ` $=${arrondi_virgule((h1+h2)/200*L*l)}$m${exposant(3)}.<br>`
							texte_corr += num_alpha(1)+` Convertissons le volume de la piscine en litres : $${arrondi_virgule((h1+h2)/200*L*l)}\\text{ m}^3=${tex_nombre((h1+h2)*L*l*5)}\\text{ dm}^3=${tex_nombre((h1+h2)*L*l*5)}\\text{ L}$<br>`
							texte_corr += ` L'énergie consomée pour élever la température de l'eau de cette piscine de ${deltat} degrés est :<br>`
							texte_corr += `$\\mathcal{E}=${tex_nombre((h1+h2)*L*l*5)}\\text{ L}\\times${deltat}\\text{ °C}\\times 1,162 \\dfrac{\\text{Wh}}{\\text{°C}\\times\\text{L}}=${tex_nombre(arrondi((h1+h2)*L*l*5*deltat*1.162,3))}\\text{ Wh}=${tex_nombre(arrondi((h1+h2)*L*l/200*deltat*1.162,7))}\\text{ kWh}$<br>`
							break;
						case 1 : // Volume d'un tonneau cylindrique
						index2=randint(0,5);
						let r=randint(10,15)*2;
						let h=randint(0,10)+r*4;
						texte = `Un tonneau cylindrique a un rayon de ${r} cm et une hauteur de ${h} cm.<br>`;
						texte +=num_alpha(0)+` Calculer le `+katex_Popup2(numero_de_l_exercice+i*3,type_aide,"volume",`Définition : volume (grandeur physique)`,`C’est le produit de trois longueurs ou le produit d'une aire et d'une longueur.<br>L'unité de mesure du volume est le mètre cube ($\\text{m}^3$) mais on peut aussi rencontrer le litre (L) avec comme correspondance $\\text{1dm}^3=\\text{1L}$`)+` en dm${exposant(3)} à 0,1 près de ce tonneau.<br>`
						texte +=num_alpha(1)+` Si on le remplit ${liquides[index2][0]} (dont la `+katex_Popup2(numero_de_l_exercice+i*3,type_aide,"densité",`Définition : densité (grandeur physique)`,`La densité d'une substance est égale à la masse volumique de la substance divisée par la masse volumique du corps de référence à la même température.<br>Pour les liquides et les solides, l'eau est utilisée comme référence (sa masse volumique est de 1kg/dm$^3$), pour les gaz, la mesure s'effectue par rapport à l'air.<br>Donc pour les liquides, la densité est égale à la masse volumique exprimée en kg/dm$^3$.`)+` est de ${tex_nombrec(liquides[index2][1])}), quelle masse ${liquides[index2][0]} en kg contiendra-t-il au gramme près ?<br>`
						texte_corr=num_alpha(0)+` Le volume d'un cylindre est donné par la formule $\\mathcal{A}\\text{ire de base}\\times\\mathcal{h}$.<br> Ici la base est un disque de rayon ${r} cm.<br>`
						texte_corr+=`$\\mathcal{A}\\text{ire de base}\\times\\mathcal{h}=\\pi\\times${r}^{2}\\text{ cm}^2\\times${h}\\text{ cm}=${r*r*h}\\pi\\text{ cm}^3\\approx${tex_nombre(arrondi(r*r*h*Math.PI,1))}\\text{ cm}^3\\approx${tex_nombre(arrondi(r*r*h*Math.PI/1000,1))}\\text{ dm}^3$<br>`
						texte_corr+=num_alpha(1)+` La masse de lait contenue dans ce tonneau est :<br>`
						texte_corr+=`$${tex_nombre(arrondi(r*r*h*Math.PI/1000,1))}\\text{ dm}^3\\times ${tex_nombrec(liquides[index2][1])} \\times 1 \\dfrac{kg}{dm}^3\\approx${tex_nombre(arrondi(r*r*h*Math.PI/1000*liquides[index2][1],3))}\\text{ kg}$`
						break

					}
					break;
				case 3 :  // Problème de quantité de mouvement et d'énergie cinétique
					quidam=prenom()
					index1=randint(0,4)
					masse=randint(50,80)
					vitesse_moy=randint(vitesses[index1][1],vitesses[index1][2]) // vitesse choisie pour l'exo
					texte =`${quidam} se déplace ${vitesses[index1][0]} à la `+katex_Popup2(numero_de_l_exercice+i*3,type_aide,`vitesse`,`Définition : Vitesse (grandeur physique)`,`La vitesse est le quotient de la distance parcourue par le temps de parcours.<br>L'unité officielle est le mètre par seconde ($\\text{m/s}$  ou  $\\text{m.s}^{-1}$) mais on utilise souvent le kilomètre par heure ($\\text{km/h}$  ou  $\\text{km.h}^{-1}$)`)+` de ${tex_nombrec(vitesse_moy)} m/s.<br>`
					texte +=`Il pèse ${masse} kg.<br>`
					texte+=num_alpha(0)+` Calculer sa `+katex_Popup2(numero_de_l_exercice+i*3+1,type_aide,"quantité de mouvement",`Définition : quantité de mouvement (grandeur physique)`,`C’est le produit de la masse d'un corps par sa vitesse.<br>L'unité de mesure de la quantité de mouvement est le ($\\text{kg.m.s}^{-1}$)`) +` en $\\text{kg.m.s}^{-1}$.<br>`
					texte+=num_alpha(1)+` En déduire son `+katex_Popup2(numero_de_l_exercice+i*3+2,type_aide,"énergie cinétique",`Définition : énergie cinétique (grandeur physique)`,`L'énergie cinétique d'un corps de masse $m$ (en kg) assimilé à un point matériel se déplaçant à la vitesse $v$ (en m/s) est donné par la formule $E=\\dfrac{1}{2}\\times m\\times v^2$.<br>L'unité de mesure de l'énergie cinétique est le Joule (J).<br>$1J=1\\text{ kg.m}^2\\text{s}^{-2}$.`) +` en Joules.`
					texte_corr = num_alpha(0)+` La quantité de mouvement de ${quidam} est : $${masse} \\text{ kg}\\times ${vitesse_moy}\\text{ m/s}=${tex_nombrec(masse*vitesse_moy)}\\text{ kg.m.s}^{-1}$<br>`
					texte_corr +=num_alpha(1)+` L'énergie cinétique de ${quidam} est : $\\dfrac{1}{2}\\times ${masse} \\text{ kg}\\times (${vitesse_moy}\\text{ m/s})^2=\\dfrac{${masse}\\times${vitesse_moy}^2}{2}\\text{ J}=${tex_nombrec(masse*vitesse_moy**2/2)}\\text{ J}$`
					break;
				case 4 : // problème de moment et de couple de forces qui s'annulent.
					quidam=prenom()
					index=randint(60,90) //masse du père (recyclage de variable)
					masse=randint(20,30) //masse de l'enfant
					distance=arrondi(randint(25,35)/10)
					texte = `${quidam} qui pèse ${masse} kg se trouve sur le siège d'une balançoire "`+ katex_Popup2(numero_de_l_exercice+i*3,2,`trébuchet`,`Schéma explicatif`,`images/trebuchet.png`) +`" dans un jardin d'enfant. Le siège est situé à ${tex_nombre(distance)} m du pivot central de la balançoire (bras de levier).<br>`
					texte+= num_alpha(0)+` Calculer le `+katex_Popup2(numero_de_l_exercice+i*3+1,type_aide,`moment`,`Définition : momnent (grandeur physique)`,`Le moment d'une force d'intensité F(en Newton ou kg.m.s$^{-2}$) en un point M par rapport à un pivot P est le produit de F par la distance PM (appelée bras de levier) exprimée en mètres (lorsque cette force s'exerce perpendiculairement au bras de levier). Le moment est l'energie permettant de faire tourner l'objet autour du pivot.<br>L'unité de mesure du moment est le Joule (J).<br>$1J=1\\text{ kg.m}^2\\text{s}^{-2}$.`) +` du `+katex_Popup2(numero_de_l_exercice+i*3+2,type_aide,`poids`,`Définition : Poids`,`Le poids est le produit de la masse d'un objet par l'accélération de la pesanteur terrestre ($9,81\\text{ m.s}^{-2}$).<br>L'unité du poids est le Newton (N) : 1N=1kg.m.s$^{-2}$`)+` de ${quidam} sur son siège par rapport au pivot central du trébuchet en Joules (on admettra que le bras de levier est horizontal).<br>`
					texte+= num_alpha(1)+` Le père de ${quidam} vient s'installer de l'autre côté du pivot central. Il pèse ${index} kg et s'installe de façon à ce que son poids permette d'équilibrer la balançoire à l'horizontale. Quelle doit être la longueur du bras de levier de son côté ( à quelle distance du pivot est-il assis ) ?<br>`
					texte_corr=num_alpha(0)+` Le moment du poids de ${quidam} appliqué sur son siège par rapport au pivot central du trébuchet est :<br>`
					index1=arrondi(masse*9.81*distance) //pour éviter d'avoir trop de variable, je recycle
					texte_corr += `$${masse}\\text{ kg} \\times 9,81 \\text{m.s}^{-2} \\times ${tex_nombre(distance)} \\text{ m} = ${tex_nombre(index1)}\\text{ kg.m}^2\\text{.s}^{-2}=${tex_nombre(index1)}\\text{ J}$<br>`
					texte_corr +=num_alpha(1)+` Afin d'équilibrer le trébuchet, le père de ${quidam} doit se placer de façon que le moment de son poids sur son point d'assise par rapport au pivot central du trébuchet soit égal à celui de ${quidam}, on obtient l'équation suivante où $${mise_en_evidence(`d`,`black`)}$ représente sa distance par rapport au pivot central :<br>`
					texte_corr+=`$ ${index}\\text{ kg}\\times 9,81 \\text{m.s}^{-2} \\times ${mise_en_evidence(`d`,`black`)} \\text{ m}=${tex_nombre(index1)}\\text{ J}$<br>`
					texte_corr +=`D'où $${mise_en_evidence(`d`,`black`)}\\text{ m} = \\dfrac{${tex_nombre(index1)}\\text{ J}}{${index}\\text{ kg}\\times 9,81 \\text{m.s}^{-2}}\\approx${tex_nombrec(arrondi(index1/(9.81*index)))}\\text{ m}.$`
					break;
				case 5 : //problème de trafic de coyageurs.
					let d1=randint(3,6)
					let d2=randint(3,6,[d1])
					let k=randint(5,8)
					let n1=k*d2
					let n2=k*d1
					texte = num_alpha(0)+` Un bus de ville transporte en moyenne ${n1} personnes à la fois.<br> La longueur moyenne de déplacement est de ${d1} km.<br> Calculer le `+katex_Popup2(numero_de_l_exercice+i*3,type_aide,`trafic`,`Définition : Trafic de voyageurs`,`Le trafic de voyageurs est le produit du nombre de voyageurs par la distance parcourue. L'unité est le voyageur.km qui correspond au déplacement d'un voyageur sur 1km`)+` moyen de voyageurs en voyageurs.km.<br> `
					texte += num_alpha(1)+` Un autre bus de ville transporte en moyenne ${n2} personnes à la fois.<br> La longueur moyenne de déplacement est de ${d2} km.<br> Montrer que le trafic de voyageur est le même qu'à la question `+num_alpha(0)
					texte_corr =num_alpha(0)+ ` Le trafic moyen de ce bus de ville est : $${n1}\\text{voyageurs}\\times${d1}\\text{km}=${n1*d1}\\text{voyageurs.km}$.<br>`
					texte_corr +=num_alpha(1)+ ` Le trafic moyen de ce bus de ville est : $${n2}\\text{voyageurs}\\times${d2}\\text{km}=${n2*d2}\\text{voyageurs.km}$, donc ces deux bus ont le même trafic.`
					break;
				case 6 : //problème de puissance électrique.
					index=randint(0,3)
					index1=randint(0,3,[index])
					let I1=arrondi(appareils[index][1]/230,0)+1
					texte = num_alpha(0)+` Un ${appareils[index][0]} est protégé par un fusible de ${I1} ampères, quelle est la `+katex_Popup2(numero_de_l_exercice+i*3+1,type_aide,`puissance`,`Définition : Puissance (grandeur physique)`,`C’est le produit de la force électromotrice (tension) exprimée en Volt (V) par l'intensité du courant électrique exprimée en ampères (A).<br>L'unité de mesure de la puissance est le Watt (W)`)+` maximale de cet appareil si il fonctionne sur le secteur ?<br>`
					texte += num_alpha(1)+` Un ${appareils[index1][0]} fonctionne à une puissance maximum de ${appareils[index1][1]} W.<br>Quel est l'ampérage minimum nécessaire pour le fusible qui protégera ce ${appareils[index][0]} des court-ciruits ?<br>`
					texte_corr =num_alpha(0)+ ` La tension du secteur étant de 230V, la puissance maximale de ce ${appareils[index][0]} est de :<br>`
					texte_corr+=`$230\\text{ V}\\times${I1}\\text{ A}=${230*I1}\\text{ W}$<br>`
					let I2=Math.floor(appareils[index1][1]/230)+1;
					texte_corr += num_alpha(1)+` Pour fonctionner à la puissance maximum, cet appareil a besoin d'un courant d'une intensité de :<br>`
					texte_corr += `$\\dfrac{${appareils[index1][1]}\\text{ W}}{230 \\text{ V}} \\approx ${tex_nombrec(arrondi(appareils[index1][1]/230))}\\text{ A}$.<br>`
					texte_corr += `Le fusible nécessaire pour protéger cet appareil des courts-circuits devra avoir une intensité de rupture minimum de ${I2} ampères.`
					break;
				case 7 : // problème de vitesses
					index2=randint(0,2)
					quidam=prenom() //prenom choisi
					switch (index2) {	
						case 0 : // problème de déplacements
							index1=randint(0,4)
							vitesse_moy=randint(vitesses[index1][1],vitesses[index1][2]) // vitesse choisie pour l'exo
							distance=Math.round(vitesse_moy*3.6*vitesses[index1][3]*randint(5,20)/10) //distance choisie pour question b
							duree = randint(2,vitesses[index1][3])
							texte =`${quidam} se déplace ${vitesses[index1][0]} à la `+katex_Popup2(numero_de_l_exercice+i*3,type_aide,`vitesse`,`Définition : Vitesse (grandeur physique)`,`La vitesse est le quotient de la distance parcourue par le temps de parcours.<br>L'unité officielle est le mètre par seconde ($\\text{m/s}$  ou  $\\text{m.s}^{-1}$) mais on utilise souvent le kilomètre par heure ($\\text{km/h}$  ou  $\\text{km.h}^{-1}$)`)+` de ${tex_nombrec(vitesse_moy)} m/s.<br>`
							texte +=num_alpha(0)+` En se déplaçant à cette vitesse pendant ${duree} h, quelle est la distance parcourue par ${quidam} en km ?<br>`
							texte+= num_alpha(1)+` Si ${quidam} veut parcourir ${nombre_avec_espace(distance)} km à cette vitesse, combien de temps durera le trajet ? Donner le résultat en heures, minutes et secondes.`
							texte_corr = num_alpha(0)+` La distance parcourue par ${quidam} ${vitesses[index1][0]} en ${duree} h à la vitesse de ${tex_nombrec(vitesse_moy)} m/s est :<br>`
							texte_corr +=`$${tex_nombrec(vitesse_moy)}\\text{ m/s}\\times${duree}\\text{ h}=\\dfrac{${tex_nombrec(vitesse_moy)}\\text{ m}}{1 \\text{ s}}\\times ${duree}\\times ${tex_nombre(3600)}\\text{ s}`
							texte_corr +=`=${tex_nombrec(vitesse_moy*3600*duree)}\\text{ m}=${tex_nombrec(vitesse_moy*3.6*duree)}\\text{ km}$<br>`
							texte_corr +=num_alpha(1)+` Pour parcourir ${nombre_avec_espace(distance)} km à cette vitesse, ${quidam} mettra :<br>`
							texte_corr +=` Partons de la formule $\\mathcal{V}=\\dfrac{\\mathcal{d}}{\\mathcal{t}}$ et remplaçons : $\\dfrac{${vitesse_moy}\\text{ m}}{1 \\text{ s}}=\\dfrac{${tex_nombre(distance)}\\text{ km}}{\\mathcal{t}\\text{ h}}$<br>`
							texte_corr +=`Rendons les unités homogènes : $\\dfrac{${vitesse_moy}\\text{ m}}{1 \\text{ s}}=\\dfrac{${tex_nombrec(distance*1000)}\\text{ m}}{\\mathcal{t}\\text{ h}\\times ${tex_nombre(3600)}\\text{ s/h}}$<br>`
							texte_corr +=`Appliquons l'égalité des produits en croix : ${produits_en_croix([[`${vitesse_moy}\\text{ m}`,`1 \\text{ s}`],[`${tex_nombrec(distance*1000)}\\text{ m}`,`\\mathcal{t}\\times ${tex_nombre(3600)}\\text{ s/h}`]])}<br>`
							texte_corr +=`D'où : $\\mathcal{t}=\\dfrac{1 \\text{ s}\\times${tex_nombrec(distance*1000)}\\text{ m}}{${vitesse_moy}\\text{ m}\\times${tex_nombre(3600)}\\text{ s}}$ (t est le nombre décimal d'heures : les mètres et les secondes disparaissent car elles sont présentes au numérateur et au dénominateur.)<br>`
							texte_corr +=`Soit : $\\mathcal{t}\\approx${tex_nombrec(distance*1000/vitesse_moy/3600)}\\text{ h}\\approx${tex_nombrec(arrondi(distance*1000/vitesse_moy,0))}\\text{ s}\\approx`
							nbheures = Math.floor(distance*1000/vitesse_moy/3600); //conversion en h min s
							nbminutes = Math.floor((Math.floor(distance*1000/vitesse_moy)%3600)/60)
							nbsecondes = arrondi(distance*1000/vitesse_moy-3600*nbheures-60*nbminutes,0)
							texte_corr+=`(${tex_nombre(nbheures)}\\times ${tex_nombre(3600)}+${tex_nombre(nbminutes)}\\times 60+${tex_nombre(nbsecondes)})\\text{ s}\\approx`
							if (nbheures!=0) texte_corr+=`${tex_nombre(nbheures)}\\text{ h }`//affichage de la réponse
							if (nbminutes!=0) texte_corr+=`${tex_nombre(nbminutes)}\\text{ min }`
							texte_corr+=`${tex_nombre(nbsecondes)}\\text{ s}$`
							break
						case 1 : // l'orage et la vitesse du son
							duree=randint(2,15) //durée pour question a)
							distance=randint(5,15,[duree])*340 //distance de l'orage en m pour question b
							texte=`Le son se déplace dans l'air à la `+katex_Popup2(numero_de_l_exercice+i*3,type_aide,`vitesse`,`Définition : Vitesse (grandeur physique)`,`La vitesse est le quotient de la distance parcourue par le temps de parcours.<br>L'unité officielle est le mètre par seconde ($\\text{m/s}$  ou  $\\text{m.s}^{-1}$) mais on utilise souvent le kilomètre par heure ($\\text{km/h}$  ou  $\\text{km.h}^{-1}$)`)+` de 340 m/s.<br>`
							texte+=num_alpha(0)+` ${quidam} voit un éclair dans le ciel et compte dans sa tête ${duree} secondes avant d'entendre le tonnerre.<br>`
							texte+=`Quelle est la distance à laquelle l'éclair est tombé ?<br>`
							texte+=num_alpha(1)+` L'éclair suivant tombe sur le paratonnerre situé sur le clocher de l'église du village voisin.<br>`
							texte+=`${quidam} sait que le clocher est situé à ${distance} m de sa position. Combien de temps se passe-t-il avant que ${quidam} n'entende le tonnerre ?`
							texte_corr=num_alpha(0)+` Calculons la distance à laquelle le premier éclair est tombé en utilisant la vitesse du son (on considère que la vitesse de la lumière est telle que l'éclair est visible instantanément) :<br>`
							texte_corr+=`$340\\text{ m/s}=\\dfrac{340\\text{ m}}{1\\text{ s}}=\\dfrac{${mise_en_evidence(duree)}\\times 340\\text{ m}}{${mise_en_evidence(duree)}\\times 1\\text{ s}}=\\dfrac{${tex_nombrec(duree*340)}}{${duree}\\text{ s}}$<br>`
							texte_corr+=`La distance à laquelle l'éclair est tombé est donc de ${nombre_avec_espace(duree*340)} m.<br>`
							texte_corr+=num_alpha(1)+` Avec les données de l'énoncé nous pouvons écrire :<br>`
							texte_corr+=`$\\dfrac{340\\text{ m}}{1\\text{ s}}=\\dfrac{${tex_nombre(distance)}\\text{ m}}{\\mathcal{T}\\text{ s}}$<br>`
							texte_corr+=`Soit grâce à l'égalité des produits en croix : $\\mathcal{T}\\text{ s}=${quatrieme_proportionnelle(`340 \\text{ m}`,`1 \\text{ s}`,distance+`\\text{ m}`,0)}=${tex_nombrec(arrondi(distance/340))}\\text{ s}$<br>`
							texte_corr+=`${quidam} entendra le tonnerre ${tex_nombrec(arrondi(distance/340))} secondes après avoir vu l'éclair tomber sur le clocher.`
							break
						case 2 : // Le coureur
							vitesse_moy=randint(vitesses[4][1]*5,vitesses[4][2]*5)/5
							distance=randint(5,12)
							texte=`${quidam} vient de courir ${distance} kilomètres. Sa montre connectée a enregistré l'`+katex_Popup2(numero_de_l_exercice+i,type_aide,`allure`,`Définition : allure (grandeur physique)`,`L'allure est le temps exprimé en h,min,s pour parcourir un kilomètre.<br>L'unité est alors h/km ou min/km`)+`pour chaque kilomètre parcouru :`
							let allures=[]
							for (let j=0;j<distance;j++) {
								duree=Math.round(1000/(vitesse_moy*(1+randint(-10,10)*0.01)))
								nbsecondes=duree%60
								nbminutes=(duree-nbsecondes)/60
								allures.push([nbminutes,nbsecondes])
							}
							texte+='$\\def\\arraystretch{1.5}\\begin{array}{|c'; // On construit le tableau des allures
							texte+='|c';
							for (let j=0;j<allures.length;j++) texte+='|c';
							texte+='}\\hline  \\text{kilomètre}';
							for (let j=0;j<allures.length;j++)  texte+='&'+tex_nombre(j+1);
							texte+='\\\\\\hline \\text{allure en minutes et secondes (par km)}';
							for (j=0;j<allures.length;j++) 	texte+='&'+allures[j][0]+`\\text{ min }`+allures[j][1]+`\\text{ s}`;
							texte+='\\\\\\hline\\end{array}$<br>';
							texte+=num_alpha(0)+` Calculer la durée totale de la course de ${quidam}.<br>`
							texte+=num_alpha(1)+` En déduire sa	`+ katex_Popup2(numero_de_l_exercice+i,type_aide,`vitesse`,`Définition : Vitesse (grandeur physique)`,`La vitesse est le quotient de la distance parcourue par le temps de parcours.<br>L'unité officielle est le mètre par seconde ($\\text{m/s}$  ou  $\\text{m.s}^{-1}$) mais on utilise souvent le kilomètre par heure ($\\text{km/h}$  ou  $\\text{km.h}^{-1}$)`)+` moyenne en km/h sur le trajet total.<br>`
							texte+=num_alpha(2)+` ${quidam} s'entraîne pour un semi-marathon (21,0975 km). En courant à la même vitesse, combien de temps durerait son semi-marathon ?`
							texte_corr=num_alpha(0)+` La durée totale de la course de ${quidam} est :<br>`
							allures.push([0,0])
							duree=0

							for (let j=0;j<distance;j++) {
								allures[distance][1]+=allures[j][1]
								if (allures[distance][1]>59) {
									allures[distance][0]+=1
									allures[distance][1]=allures[distance][1]%60
								}
								allures[distance][0]+=allures[j][0]
								if (allures[distance][0]>59) {
									duree++
									allures[distance][0]=allures[distance][0]%60
								}
							}
							for (let j=0;j<distance-1;j++) {
							texte_corr+=`${allures[j][0]} min ${allures[j][1]} s + `
							}
							texte_corr+=`${allures[distance-1][0]} min ${allures[distance-1][1]} s = `
							if (duree!=0) texte_corr+=`${duree} h `
							if (allures[distance][0]!=0) texte_corr+=`${allures[distance][0]} min `
							if (allures[distance][1]!=0) texte_corr+=`${allures[distance][1]} s.`
							texte_corr+=`<br>`+num_alpha(1)+` ${quidam} a effectué ${distance} km en `
							if (duree!=0) texte_corr+=`${duree} h `
							if (allures[distance][0]!=0) texte_corr+=`${allures[distance][0]} min `
							if (allures[distance][1]!=0) texte_corr+=`${allures[distance][1]} s<br>Soit `
							if (duree!=0) texte_corr+=`${duree} h `
							if (allures[distance][0]!=0) texte_corr+=` $\\dfrac{${allures[distance][0]}}{60}$ h `
							if (allures[distance][1]!=0) texte_corr+=` $\\dfrac{${allures[distance][1]}}{${tex_nombre(3600)}}$ h = `
							texte_corr+=`$\\dfrac{`
							if (duree!=0) texte_corr+=`${duree}\\times ${tex_nombre(3600)} + `
							texte_corr+=`${allures[distance][0]}\\times 60+${allures[distance][1]}}{${tex_nombre(3600)}}$ h = `
							texte_corr+=`$\\dfrac{`
							if (duree!=0) {
								duree=duree*3600+allures[distance][0]*60+allures[distance][1]
								texte_corr+=`${duree}}`
							}
							else {
								duree=allures[distance][0]*60+allures[distance][1]
								texte_corr+=`${duree}}`
							}
							texte_corr+=`{${tex_nombre(3600)}}$ h.<br>`
							texte_corr+=`Sa vitesse en km/h est par conséquent :<br>$${distance} \\text{ km}\\div\\dfrac{${duree}}{${tex_nombre(3600)}}\\text{ h}=`
							texte_corr+=`${distance} \\text{ km}\\times\\dfrac{${tex_nombre(3600)}}{${duree}}\\text{ h}^{-1}=\\dfrac{${distance}\\times${tex_nombre(3600)}}{${duree}}\\text{km.h}^{-1}`
							vitesse_moy=arrondi(distance*3600/duree)
							texte_corr+=`\\approx${tex_nombrec(vitesse_moy)}$ km/h<br>`
							texte_corr+=num_alpha(2)+` Si elle court 21,0975 km à cette vitesse de ${tex_nombre(vitesse_moy)} km/h, ${quidam} mettra :<br>`
							duree=arrondi(21.0975/vitesse_moy,4)
							texte_corr+=`$\\dfrac{${tex_nombre(21.0975)} \\text{ km}}{${tex_nombre(vitesse_moy)} \\text{ km.h}^{-1}}\\approx${tex_nombre(duree)}$ h soit `
							nbheures=Math.floor(duree)
							duree=(duree-nbheures)*60
							nbminutes=Math.floor(duree)
							duree=Math.round((duree-nbminutes)*60)
							texte_corr+=` environ ${nbheures} h ${nbminutes} min ${duree} s.`
							break;
						}
						break;
				case 8 : //problème de prix massique
					index1=randint(0,7)
					index2=randint(0,5,[index])
					index=randint(0,5,[index1,index2])
					masse=arrondi(randint(fruits[index1][2],fruits[index1][3])/10)
					masse2=arrondi(randint(fruits[index2][2],fruits[index2][3])/10)
					masse3=arrondi(randint(fruits[index][2],fruits[index][3])/10)
					prix1=arrondi(masse*fruits[index1][1])
					prix2=arrondi(masse2*fruits[index2][1])
					prix3=arrondi(masse3*fruits[index][1])
					quidam=prenomF()
					texte = `${quidam} se rends à l'épicerie de son quartier. Elle y achète ${tex_nombre(masse)} kg de ${fruits[index1][0]} à ${tex_prix(fruits[index1][1])} €/kg et pour ${tex_prix(prix2)} € de ${fruits[index2][0]} à ${tex_prix(fruits[index2][1])} €/kg.<br>`
					texte +=`Enfin, elle achète ${tex_nombre(masse3)} kg de ${fruits[index][0]} pour ${tex_prix(prix3)} €.<br>`
					texte+=num_alpha(0)+` Combien lui coûtent les ${fruits[index1][0]} ?<br>`
					texte+=num_alpha(1)+` Quelle masse de ${fruits[index2][0]} a-t-elle achetée ?<br>`
					texte+=num_alpha(2)+` Quel est le prix au kilogramme des ${fruits[index][0]} ?`
					texte_corr =num_alpha(0)+` ${quidam} dépense pour les ${fruits[index1][0]} : $${tex_nombre(masse)}\\text{ kg} \\times ${tex_prix(fruits[index1][1])}$ €$\\text{/kg} = ${tex_prix(prix1)}$ €.<br>`
					texte_corr+=num_alpha(1)+` La masse de ${fruits[index2][0]} qu'elle a achetée est : $${tex_prix(prix2)} $ €$ \\div ${tex_prix(fruits[index2][1])}$ €$\\text{/kg} = ${tex_nombre(masse2)}\\text{ kg}$.<br>`
					texte_corr+=num_alpha(2)+` Enfin, ${quidam} a acheté des ${fruits[index][0]} au prix unitaire de : $${tex_prix(prix3)}$ € $\\div ${tex_nombre(masse3)}\\text{ kg} = ${tex_prix(fruits[index][1])}$ €$\\text{/kg}$.`
					break;
				case 9 : //problème de prix horaire
					index1=randint(0,3)
					index2=randint(0,4)
					nbheures=randint(locations[index1][1],locations[index1][2])
					prix1=locations[index1][1]
					prix2=cours[index2][1]*randint(2,6)
					quidam=prenomF()
					texte = `${quidam} a prévu de louer ${locations[index1][0]} pendant ${tex_nombre(nbheures)} heures. L'heure de location coûte ${tex_prix(prix1)} €.<br>`
					texte+=num_alpha(0)+` Combien cette location va lui coûter ?<br>`
					texte+=num_alpha(1)+` ${quidam} a pris des leçons particulières ${cours[index2][0]}. En tout ce mois-ci elle a eu ${tex_nombrec(prix2/cours[index2][1])} heures de cours pour ${tex_prix(prix2)} €. Combien demande son professeur pour une heure de cours ?<br>`
					texte_corr =num_alpha(0)+` ${quidam} va dépenser pour sa location : $${tex_nombre(nbheures)}\\text{ h} \\times ${tex_prix(prix1)}$ €$\\text{/h} = ${tex_prix(nbheures*prix1)}$ €.<br>`
					texte_corr+=num_alpha(1)+` L'heure de cours ${cours[index2][0]} coûte : $${tex_prix(prix2)}$ € $ \\div ${tex_nombre(prix2/cours[index2][1])}\\text{ h} = ${tex_prix(cours[index2][1])}$ €$\\text{/h}$.<br>`
					break;
				case 10 : //problème de densité de population
					index1=randint(0,14)
					index2=randint(0,14,[index1])
					let ville1=villes[index1][0]
					let ville2=villes[index2][0]
					texte = num_alpha(0)+` En 2016, à ${villes[index1][0]} il y avait $${tex_nombre(villes[index1][1])}$ habitants pour une superficie de $${tex_nombre(villes[index1][2]*100)}$ ha.<br> Calculer la densité de population en hab/km$^2$.<br>`
					texte += num_alpha(1)+` La même année, la `+katex_Popup2(numero_de_l_exercice+i*3+1,type_aide,`densité de population`,`Définition : Densité de population`,`C’est le quotient du nombre d'habitants par la superficie en km$^2$.<br>L'unité de la densité de population est l'habitant par km$^2$ (hab/km$^2$).`)+` de ${villes[index2][0]} était de $${tex_nombrec(villes[index2][1]/villes[index2][2])}$ hab/km$^2$ pour une superficie de $${tex_nombrec(villes[index2][2]*100)}$ ha.<br> Calculer le nombre d'habitants de ${villes[index2][0]} à cette date.<br>`
					texte_corr = num_alpha(0)+` En 2016, la densité de population à ${villes[index1][0]} était de :<br> $\\dfrac{${tex_nombre(villes[index1][1])}\\text{ hab}}{${tex_nombre(villes[index1][2]*100)}\\text{ ha}}=\\dfrac{${tex_nombre(villes[index1][1])}\\text{ hab}}{${tex_nombre(villes[index1][2])}\\text{ km}^2}=${tex_nombrec(villes[index1][1]/villes[index1][2])}\\text{ hab/km}^{2}$.<br>`
					texte_corr+= num_alpha(1)+` A cette date, le nombre d'habitants de ${villes[index2][0]} était de :<br> $${tex_nombrec(villes[index2][1]/villes[index2][2])}\\text{ hab/km}^2\\times ${tex_nombrec(villes[index2][2]*100)}\\text{ ha}=${tex_nombrec(villes[index2][1]/villes[index2][2])}\\text{ hab/km}^2\\times ${tex_nombrec(villes[index2][2])}\\text{ km}^{2}=${tex_nombre(villes[index2][1])}\\text{ hab}$.`
					break;
				case 11 : //problème de masse volumique
					index1=randint(0,14)
					index2=randint(0,14,[index1])
					let V1=randint(50,100)
					masse2=randint(5,30)
					masse=arrondi(materiaux[index1][1]*V1/1000000)
					let V2=arrondi(masse2/materiaux[index2][1],7)
					texte = num_alpha(0)+` La `+katex_Popup2(numero_de_l_exercice+i*3+1,type_aide,`masse volumique`,`Définition : Masse volumique (grandeur physique)`,`La masse volumique d'un élément est le quotient de la masse de cet élément par le volume qu'il occupe.<br>L'unité de la masse volumique dépend de la nature de l'élément et peut s'exprimer kg/m$^3$ pour les solides g/L pour les gaz par exemple.`)+` du ${materiaux[index1][0]} est de $${tex_nombre(materiaux[index1][1])}\\text{ kg/m}^3$.<br>`
					texte +=`Quelle est la masse d'une pièce de ce métal de $${tex_nombre(V1)}\\text{ cm}^3$ ?<br>`
					texte += num_alpha(1)+` Quel est le volume d'une pièce de ${materiaux[index2][0]} ayant une masse de `
					texte+=`$${tex_nombre(masse2)}\\text{ kg}$ (la masse volumique du ${materiaux[index2][0]} est de $${tex_nombre(materiaux[index2][1])}\\text{ kg/m}^3$)<br>`
					texte_corr =num_alpha(0)+ ` La masse de cette pièce de ${materiaux[index1][0]} est de :<br>$${tex_nombre(materiaux[index1][1])}\\text{ km/m}^3\\times ${tex_nombre(V1)}\\text{ cm}^3=${tex_nombre(materiaux[index1][1])}\\text{ km/m}^3\\times ${tex_nombrec(V1/1000000)}\\text{ m}^3=${tex_nombre(masse)}\\text{ kg}$.<br>`
					texte_corr+=num_alpha(1)+ ` Le volume de cette pièce de ${materiaux[index2][0]} est de :<br>$${tex_nombre(masse2)}\\text{ kg}\\div ${tex_nombre(materiaux[index2][1])}\\text{ kg/m}^3\\approx${tex_nombre(V2)}\\text{ m}^3\\approx${tex_nombrec(V2*1000000)}\\text{ cm}^3$<br>`
					break;
				case 12 : //problème de concentration massique
					index1=randint(0,4)
					index2=randint(0,4,[index1])
					let Volume1=arrondi(randint(2,15,[10])/10)
					let Volume2=arrondi(randint(2,15,[10])/10)
					if (solutes[index1][2]<10) masse=arrondi(randint(11,solutes[index1][2]*10)*Volume1/10)
					else masse=arrondi(randint(2,solutes[index1][2])*Volume1)
					let concentration2
					if (solutes[index2][2]<10) concentration2=arrondi(randint(11,solutes[index2][2]*10)/10) //concentration en g/L soluté 2.
					else concentration2=randint(2,solutes[index2][2])

					texte = num_alpha(0)+` On a dissout $${tex_nombre(masse)}\\text{ g}$ de ${solutes[index1][0]} dans $${tex_nombre(Volume1)}\\text{ litres}$ ${solutes[index1][1]}.<br>Calculer la concentration massique de cette solution.<br>`
					texte+= num_alpha(1)+` On dispose de $${tex_nombre(Volume2)}$ litres de solution aqueuse de ${solutes[index2][0]} à $${tex_nombre(concentration2)}\\text{ g/L}$.<br>Quelle masse de ${solutes[index2][0]} a été dissoute dans l'eau ?`
					texte_corr =  num_alpha(0)+` La concentration en ${solutes[index1][0]} de cette solution aqueuse est de :<br>`
					texte_corr+= ` $\\dfrac{${tex_nombre(masse)}\\text{ g}}{${tex_nombre(Volume1)}\\text{ litres}}=${tex_nombrec(arrondi(masse/Volume1))}\\text{ g/L}$<br>`
					texte_corr+= num_alpha(1)+` La masse de ${solutes[index2][0]} dissoute est de :<br>`
					texte_corr+=`$${tex_nombre(Volume2)}\\text{ L}\\times ${tex_nombre(concentration2)}\\text{ g/L}=${tex_nombre(arrondi(Volume2*concentration2))}\\text{ g}$`
				break;

				case 13 : //problème de débit
					index2=randint(0,6)
					duree=randint(2,24)
					let vmax=rivieres[index2][3]*3600
					texte = `Le `+katex_Popup2(numero_de_l_exercice+i,type_aide,`débit`,`Définition : Débit (grandeur physique)`,`Le débit est le quotient d'un volume d'eau écoulée dans une section de conduit par le temps d'écoulement.<br>L'unité officielle est le mètre cube par seconde ($\\text{m}^3/\\text{s}$  et dans certains cas on peut utiliser le litre par minute (L/min)`)+` annuel moyen ${rivieres[index2][6]}${rivieres[index2][0]} mesuré à ${rivieres[index2][1]} est de ${rivieres[index2][2]} m${exposant(3)}/s.<br>`
					texte += num_alpha(0)+` Calculer le volume d'eau en m${exposant(3)} écoulé en ${duree} heures à ce débit.<br>`
					texte += num_alpha(1)+` En ${rivieres[index2][4]} à ${rivieres[index2][1]}, ${rivieres[index2][5]}${rivieres[index2][0]} a débité ${nombre_avec_espace(vmax)} m${exposant(3)} en une heure. Quel a été alors le débit en m³/s ?`
					texte_corr = num_alpha(0)+` En ${duree} heures il s'écoule en moyenne dans ${rivieres[index2][5]}${rivieres[index2][0]} à ${rivieres[index2][1]} :<br>`
					texte_corr+= `$\\mathcal{V}=${duree}\\text{ h}\\times${rivieres[index2][2]}\\text{ m}^3\\text{/s}=${duree}\\times 3600\\text{ s}\\times${rivieres[index2][2]}\\text{ m}^3\\text{/s}=${tex_nombre(duree*3600*rivieres[index2][2])}\\text{ m}^3$<br>`
					texte_corr += num_alpha(1)+` En ${rivieres[index2][4]} lors de la crue historique ${rivieres[index2][6]}${rivieres[index2][0]} à ${rivieres[index2][1]} le débit maximal a été de :<br>`
					texte_corr+= `Débit =$${tex_nombre(vmax)}\\text{ m}^3\\text{/h}=\\dfrac{${tex_nombre(vmax)}\\text{ m}^3}{1\\text{ h}}=\\dfrac{${tex_nombre(vmax)}\\text{ m}^3}{${tex_nombre(3600)}\\text{ s}}=${tex_nombrec(vmax/3600)}\\text{ m}^3\\text{/s}$<br>`
				
					break	
				case 14 : // problème de vitesse de téléchargement		
					let unites=[`ko`,`Mo`,`Go`]
					index=randint(0,1)
					if (index==0)	vitesse_moy=randint(200,999)
					else 	vitesse_moy=randint(1,20)	
					quidam=prenom()
					nbminutes=randint(3,10)
					nbsecondes=randint(2,59)
					masse=arrondi(randint(15,35)/10)
					texte=num_alpha(0)+` ${quidam} télécharge un fichier depuis un espace de stockage en ligne. Sa `+katex_Popup2(numero_de_l_exercice+i,type_aide,`vitesse de téléchargement`,`Définition : Vitesse de téléchargement`,`La vitesse de téléchargement est le quotient de la quantité de données téléchargées (en ko,Mo ou Go) par la durée de téléchargement (en seconde).<br>L'unité de cette grandeur quotient est le ko/s (ou Mo/s)`)+` est de ${vitesse_moy} ${unites[index]}/s.<br>`
					texte+=`Le téléchargement dure ${nbminutes} minutes et ${nbsecondes} secondes. Quelle est la taille du fichier téléchargé en ${unites[index]} ?<br>`
					texte+=num_alpha(1)+` ${quidam} veut télécharger un fichier de ${tex_nombre(masse)} Go. Quelle sera la durée du téléchargement si sa vitesse de téléchargement est de ${vitesse_moy} ${unites[index]}/s ?<br>`
					texte_corr=num_alpha(0)+` La taille du fichier téléchargé est :<br>`
					let taille_fichier=(nbminutes*60+nbsecondes)*vitesse_moy
					texte_corr+=`$(${nbminutes}\\times 60 +${nbsecondes})\\text{ s}\\times ${vitesse_moy} \\text{ ${unites[index]}/s} = ${nbminutes*60+nbsecondes}\\text{ s}\\times ${vitesse_moy} \\text{ ${unites[index]}/s} = ${taille_fichier} \\text{ ${unites[index]} }$`
					if (taille_fichier>1000) texte_corr+=`$ =${tex_nombrec(taille_fichier/1000)} \\text{ ${unites[index+1]}}.$<br>`
					texte_corr+=num_alpha(1)+` La durée du téléchargement sera de :<br>`
					if (index==0) {
						texte_corr+= `$${masse}\\times ${tex_nombrec(10**6)} \\text{ ko} \\div ${vitesse_moy} \\text{ ${unites[index]}/s}$`
						taille_fichier=masse*10**6
					}
					else {
						texte_corr+= `$${masse}\\times ${tex_nombrec(10**3)} \\text{ Mo} \\div ${vitesse_moy} \\text{ ${unites[index]}/s}$`
						taille_fichier=masse*10**3
					}
					texte_corr+=`$=\\dfrac{${taille_fichier}}{${vitesse_moy}}\\text{ s}`
					nbheures=Math.floor((taille_fichier/vitesse_moy)/3600)
					nbminutes=Math.floor((taille_fichier/vitesse_moy-3600*nbheures)/60)
					nbsecondes=arrondi(taille_fichier/vitesse_moy-3600*nbheures-60*nbminutes,0)
					if (taille_fichier/vitesse_moy==nbsecondes+60*nbheures+3600*nbheures) texte_corr+=`=`
					else texte_corr +=`\\approx`
					if (nbheures!=0) texte_corr+=`${nbheures} \\text{ h }`
					if (nbminutes!=0) texte_corr+=`${nbminutes} \\text{ min }`
					if (nbsecondes!=0) texte_corr+= `${nbsecondes} \\text { s}`
					texte_corr+=`$`

					break
				}
			if (this.liste_questions.indexOf(texte)==-1){ // Si la question n'a jamais été posée, on en créé une autre
				this.liste_questions.push(texte);
				this.liste_corrections.push(texte_corr);
				i++;
			}
			cpt++;
		}
		liste_de_question_to_contenu(this); //Espacement de 2 em entre chaque questions.
	}	
	//this.besoin_formulaire_case_a_cocher =['Choix des exercices aléatoire'];
	//this.besoin_formulaire2_numerique = ['Type d\'exercice', 14, '1 : Energie consommée\n 2 :  Volumes\n 3 : Quantité de mouvement & Energie cinétique\n 4 : Moment de force\n 5 : Trafic de voyageurs\n 6 : Puissance électrique\n 7 : Vitesses\n 8 : Prix massique\n 9 : Prix horaire\n 10 : Densité de population\n 11 : Masse volumique\n 12 : Concentration massique\n 13 : Débits\n 14 : Transfert de fichiers'];
	this.besoin_formulaire_texte = ['Choix des grandeurs','Nombres séparés par des points-virgules\n 1 : Energie consommée\n 2 :  Volumes\n 3 : Quantité de mouvement & Energie cinétique\n 4 : Moment de force\n 5 : Trafic de voyageurs\n 6 : Puissance électrique\n 7 : Vitesses\n 8 : Prix massique\n 9 : Prix horaire\n 10 : Densité de population\n 11 : Masse volumique\n 12 : Concentration massique\n 13 : Débits\n 14 : Transfert de fichiers'] // Texte, tooltip

};
