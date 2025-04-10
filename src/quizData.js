// src/data/quizData.js (or data/quizData.js)

export const formations = {
    "Grande école post bac": {
        "description": "Formation sélective en 5 ans (niveau Master) axée ingénierie ou commerce, alliant théorie, pratique et forte professionnalisation. Rythme exigeant, bon encadrement.",
        "tags": ["long", "sélectif", "exigeant", "équilibré_théorie_pratique", "professionnalisant", "encadré"]
    },
    "BTS": {
        "description": "Formation courte (2 ans) très professionnalisante dans un domaine spécifique. Rythme soutenu, proche du lycée (petites classes, suivi régulier). Vise l'emploi rapide.",
        "tags": ["court", "professionnalisant", "pratique", "encadré", "rythme_soutenu"]
    },
    "Formations préparatoires à l'enseignement supérieur": {
        "description": "Formation en 1 an pour affiner son projet d'orientation, se remettre à niveau ou préparer l'entrée dans certaines filières. Idéal si on est perdu ou pas prêt.",
        "tags": ["très_court", "préparatoire", "orientation", "remise_niveau"]
    },
    "BUT": {
        "description": "Formation universitaire en 3 ans (niveau Licence) dans un domaine technologique ou tertiaire. Bon équilibre théorie/pratique, projets, stages. Vise l'emploi ou la poursuite d'études.",
        "tags": ["moyen", "professionnalisant", "équilibré_théorie_pratique", "universitaire", "rythme_soutenu"]
    },
    "C.M.I": {
        "description": "Cursus universitaire sélectif et renforcé en 5 ans (Licence + Master) orienté ingénierie/recherche. Très exigeant, plus théorique, demande autonomie et forte capacité de travail.",
        "tags": ["long", "sélectif", "exigeant", "théorique", "recherche", "universitaire", "autonomie"]
    },
    "CPGE": {
        "description": "Classe préparatoire en 2 ans (en lycée) très intensive et théorique, visant les concours des Grandes Écoles (Ingénieur, Commerce, ENS...). Très exigeant, compétitif, excellent encadrement.",
        "tags": ["préparatoire_longue", "exigeant", "théorique", "compétitif", "encadré", "sélectif"]
    },
    "DEUST": {
        "description": "Formation universitaire en 2 ans très orientée vers un métier précis d'un secteur local. Professionnalisante, stages. Alternative au BTS à l'université.",
        "tags": ["court", "professionnalisant", "pratique", "universitaire", "métier_spécifique"]
    },
    "CS": {
        "description": "Certificat de Spécialisation en 1 an après un CAP ou Bac Pro pour acquérir une compétence pointue. Très concret et professionnalisant. (Nécessite diplôme pro préalable).",
        "tags": ["très_court", "professionnalisant", "spécialisé", "pratique", "post_cap_bacpro"]
    },
    "CUPGE": {
        "description": "Cycle Universitaire Préparatoire en 2 ou 3 ans (Licence) préparant aux concours des Grandes Écoles, alternative à la CPGE à l'université. Exigeant mais souvent moins intense que la CPGE.",
        "tags": ["préparatoire_longue", "sélectif", "exigeant", "théorique", "universitaire", "moins_compétitif_que_cpge"]
    },
    "Licence (L1)": {
        "description": "Formation universitaire générale en 3 ans dans une discipline (Droit, Lettres, Sciences...). Plus théorique, demande beaucoup d'autonomie. Vise la poursuite d'études (Master).",
        "tags": ["moyen", "théorique", "généraliste", "autonomie", "universitaire", "poursuite_études"]
    }
};

export const quizQuestions = [
    {
        "text": "Pour apprendre quelque chose de nouveau, tu as tendance à préférer :",
        "answers": [
            "D'abord bien comprendre le *pourquoi* et les idées générales avant de passer à la pratique.",
            "Apprendre *en faisant*, manipuler, essayer des choses concrètes pour voir comment ça marche.",
        ],
        "scoring": [
            // Théorie d'abord
            {"Licence (L1)": 1, "CPGE": 1, "C.M.I": 1, "CUPGE": 1, "Grande école post bac": 1, "BUT": -1, "BTS": -1, "DEUST": -1, "CS": -1},
            // Pratique d'abord
            {"BTS": 1, "DEUST": 1, "CS": 1, "BUT": 1, "Grande école post bac": -1, "Licence (L1)": -1, "CPGE": -1, "C.M.I": -1, "CUPGE": -1}
        ]
    },
    {
        "text": "Pour bien travailler, tu as plutôt besoin :",
        "answers": [
            "D'un cadre clair : un emploi du temps fixe, des profs qui te suivent de près, un peu comme au lycée.",
            "De liberté pour t'organiser : pouvoir gérer ton emploi du temps et ton travail personnel, même si ça demande plus d'autonomie.",
        ],
        "scoring": [
            // Cadre structuré
            {"BTS": 2, "CPGE": 2, "DEUST": 2, "Formations préparatoires à l'enseignement supérieur": 0, "BUT": 1, "Grande école post bac": 1, "Licence (L1)": -2, "C.M.I": -2, "CUPGE": 1},
            // Liberté / Autonomie
            {"Licence (L1)": 2, "C.M.I": 2, "CUPGE": 2, "BUT": 1, "Grande école post bac": 0, "DEUST": -1, "BTS": -2, "CPGE": -2} // CPGE demande autonomie DANS le cadre
        ]
    },
    {
        "text": "Tu imagines mieux tes cours se passer :",
        "answers": [
            "Dans une petite classe où le prof peut t'aider individuellement mais où tu es obligé de suivre le cours.",
            "Dans des cours avec beaucoup d'étudiants (cours magistraux) où le prof ne peut pas t'aider individuellement mais avec plus d'autonomie.",
            "Tant que il y a un bon équilibre entre les cours magistraux et les petits groupes de travail ça me va.",
        ],
        "scoring": [
            // Petite classe
            {"BTS": 2, "DEUST": 2, "CPGE": 2, "CS": 1, "Formations préparatoires à l'enseignement supérieur": 1, "BUT": -1, "Grande école post bac": 2, "Licence (L1)": -2, "C.M.I": -2, "CUPGE": 2},
            // Grand cours + Petits groupes
            {"Licence (L1)": 2, "BUT": 2, "C.M.I": 1, "CUPGE": -1, "Grande école post bac": -1, "DEUST": 0, "BTS": -2, "CPGE": -2}, // CPGE a aussi des cours type lycée mais prépare à l'après
            // Équilibre entre les deux
            {"BTS": 0, "DEUST": 0, "CPGE": -1, "CS": 1, "Formations préparatoires à l'enseignement supérieur": 1, "BUT": 1, "Grande école post bac": 2, "Licence (L1)": 1, "C.M.I": 1, "CUPGE": 0},
            
        ]
    },
    {
        "text": "En termes d'évaluation, qu'est-ce qui te correspondrait le mieux ?",
        "answers": [
            "Des contrôles très réguliers avec des passages au tableau pour vérifier que tu suis bien.",
            "Des évaluations basées sur des projets concrets, des réalisations pratiques ou des stages en entreprise.",
            "Des examens importants à la fin de chaque semestre pour valider tes connaissances sur une période plus longue."
        ],
        "scoring": [
            // Contrôle continu intense / Colles
            {"CPGE": 2, "CUPGE": 2, "BTS": 1, "BUT": 0, "Grande école post bac": 1.5, "DEUST": 0, "Licence (L1)": -1},
            // Évaluation par projets / Stages
            {"BUT": 2, "BTS": 1, "DEUST": 2, "CS": 3, "Grande école post bac": 1, "C.M.I": 0, "CPGE": -2},
             // Examens semestriels
            {"Licence (L1)": 2, "C.M.I": 1, "BUT": 1, "Grande école post bac": 1, "DEUST": 1, "BTS": 0, "CPGE": -1} // Mix dans beaucoup de formations
        ]
    },
    {
        "text": "Imagines une semaine type avec beaucoup d'heures de cours (plus de 30h) Et pas mal de travail à faire chez toi. Ta réaction serait plutôt :",
        "answers": [
            "Pas de problème ! Je suis prêt(e) à travailler énormément, même si c'est très intense et stressant, pour atteindre un objectif élevé !",
            "Je préfère un rythme soutenu mais qui me laisse quand même le temps de respirer et de bien comprendre sans être sous pression constante.",
            "Je préfère une formation avec beaucoup de temps libre pour m'organiser à ma façon"
        ],
        "scoring": [
             // Prêt pour l'intensité forte
            {"CPGE": 3, "C.M.I": 2, "Grande école post bac": 2, "CUPGE": 2, "BUT": 1, "BTS": 0, "Licence (L1)": -2, "DEUST": -2, "CS": -2, "Formations préparatoires à l'enseignement supérieur": -1},
            // Préférence pour rythme gérable
            {"Licence (L1)": 0, "DEUST": 1, "CS": 2, "Formations préparatoires à l'enseignement supérieur": 1, "BTS": 1, "BUT": 2, "CPGE": -1, "C.M.I": 2, "Grande école post bac": 2, "CUPGE": -0.5},
            {"Licence (L1)": 3, "DEUST": 3, "CS": 3, "Formations préparatoires à l'enseignement supérieur": 2, "BTS": -1, "BUT": 1, "CPGE": -3, "C.M.I": -3, "Grande école post bac": -2, "CUPGE": -2}
        ]
    },
    {
        "text": "L'idée d'essayer d'entrer dans une formation très demandée, où il y a beaucoup de candidats et peu de places :",
        "answers": [
            "Ça me motive particulièrement,  j'aime les défis et viser des parcours difficiles d'accès.",
            "Je préfère une formation intéressante où j'ai as de bonnes chances d'être pris(e) si mon dossier est correct.",
        ],
        "scoring": [
            // Motivé par la sélection/défi
            {"CPGE": 3, "Grande école post bac": 2, "C.M.I": 2, "CUPGE": 2, "BUT": -2, "BTS": -2, "Licence (L1)" : -2}, // BUT/BTS/L1 ont sélection mais moins perçue comme "compétition féroce"
            // Préfère moins de stress à l'entrée
            {"BTS": 2, "DEUST": 2, "Licence (L1)": 1, "CS": 1, "Formations préparatoires à l'enseignement supérieur": 1, "BUT": 1, "CPGE": -3, "Grande école post bac": -1, "C.M.I": -2, "CUPGE": -2}
        ]
    },
     {
        "text": "Comment te sens-tu par rapport à une ambiance compétitive ou il y a un classement des meilleurs étudiants ?",
        "answers": [
            "Ça me stimule ! La compétition et l'objectif de se classer me poussent à donner le meilleur de moi-même.",
            "Je préfère une ambiance plus basée sur l'entraide et la progression personnelle, où la comparaison constante est moins présente.",
        ],
        "scoring": [
            // Stimulé par la compétition/classement
            {"CPGE": 3, "CUPGE": 1, "Grande école post bac": 1, "C.M.I": 0, "BTS": -2, "BUT": -1, "Licence (L1)": -1}, // GE/CMI peuvent avoir compétition implicite
            // Préfère ambiance collaborative
            {"BTS": 2, "BUT": 2, "DEUST": 2, "Licence (L1)": 1, "CS": 1, "Formations préparatoires à l'enseignement supérieur": 1, "C.M.I": 1, "Grande école post bac": 0, "CUPGE": 0, "CPGE": -3}
        ]
    },
    {
        "text": "Après le bac, tu te vois plutôt parti(e) pour :",
        "answers": [
            "Une formation très courte environ 1 an pour te mettre à niveau ou prendre le temps de mieux choisir ta voie.",
            "Une formation courte environ 2 ans pour apprendre un métier et pouvoir chercher du travail rapidement après.",
            "Une formation où tu peux choisir de continuer les études pour des postes à hautes responsabilités après 3 ans ou travailler directement.",
            "Des études longues (5 ans ou plus) pour devenir vraiment expert(e) dans un domaine et viser des postes à très haute responsabilités"
        ],
        "scoring": [
            // 1 an
            {"CS": 1, "Formations préparatoires à l'enseignement supérieur": 4, "BTS": -2, "DEUST": -2, "BUT": -3, "Licence (L1)": -3, "Grande école post bac": -4, "C.M.I": -4, "CPGE": -4, "CUPGE": -4}, // Pénalise fortement les longs cursus
            // 2 ans
            {"BTS": 3, "DEUST": 3, "CPGE": 0, "CUPGE": 0,"CS": -2, "Formations préparatoires à l'enseignement supérieur": -2, "BUT": -1, "Licence (L1)": -2, "Grande école post bac": -3, "C.M.I": -3}, // CPGE/CUPGE durent 2/3 ans mais visent +5
            // 3 ans
            {"BUT": 2, "Licence (L1)": 4, "CUPGE": -1, "CPGE": -1,"BTS": 1, "DEUST": 1, "CS": -3, "Formations préparatoires à l'enseignement supérieur": -3, "Grande école post bac": 1, "C.M.I": 1}, // GE/CMI peuvent inclure L3 mais sont des parcours 5 ans
            // 5 ans et +
            {"Grande école post bac": 4, "C.M.I": 4, "CPGE": 4, "CUPGE": 4, "Licence (L1)": 1, "BUT": -3, "BTS": -4, "DEUST": -4, "CS": -4, "Formations préparatoires à l'enseignement supérieur": -4} // L1/BUT peuvent mener à +5 mais ce n'est pas le parcours direct
        ]
    },
    ////// Un peu la même question que 8
    //  {
    //     "text": "9 Ton objectif principal serait plutôt de :",
    //     "answers": [
    //         "Te former à un métier précis pour pouvoir chercher du travail directement.",
    //         "Avoir une formation solide et assez générale pour pouvoir ensuite choisir une spécialisation plus pointue (en Master, en école...).",
    //         "Suivre un parcours long et exigeant dès le début pour viser des postes à responsabilités (ingénieur, manager, cadre...).",
    //     ],
    //     "scoring": [
    //         // Job direct post-formation
    //         {"BTS": 3, "DEUST": 3, "CS": 3, "BUT": 1, "Licence (L1)": -2, "CPGE": -3, "CUPGE": -3, "C.M.I": -1, "Grande école post bac": -1}, // BUT vise aussi l'emploi, mais moins systématiquement que BTS/DEUST/CS. GE/CMI peuvent insérer mais visent plus haut.
    //         // Formation générale -> Spécialisation
    //         {"Licence (L1)": 3, "BUT": 1, "CPGE": 2, "CUPGE": 2, "Grande école post bac": 0, "C.M.I": 0, "BTS": -2, "DEUST": -2, "CS": -3}, // CPGE/CUPGE sont générales avant la spécialisation en école. L1 est la voie générale type. BUT est plus spécialisé mais permet poursuite.
    //         // Parcours direct vers haut poste
    //         {"Grande école post bac": 3, "C.M.I": 3, "CPGE": 1, "CUPGE": 1, "Licence (L1)": -1, "BUT": -1, "BTS": -3, "DEUST": -3, "CS": -4} // CPGE/CUPGE préparent à ces postes via les concours.
    //     ]
    // },
    //  {
    //     "text": "Concernant ton projet d'avenir :",
    //     "answers": [
    //         "Tu as déjà une idée assez claire du secteur d'activité ou même du métier qui te plaît.",
    //         "Tu as plusieurs centres d'intérêt, mais tu aimerais une formation assez généraliste avant de te spécialiser.",
    //         "Tu sens que tu as besoin d'une année pour prendre du recul ou te remettre à niveau dans certaines matières avant de t'engager dans une voie.",
    //     ],
    //     "scoring": [
    //         // Idée précise
    //         {"BTS": 2, "BUT": 1, "DEUST": 2, "CS": 3, "C.M.I": 1, "Grande école post bac": 0, "Licence (L1)": -1, "CPGE": 0, "CUPGE": 0, "Formations préparatoires à l'enseignement supérieur": -3}, // Formations spécialisées favorisées
    //         // Besoin d'explorer
    //         {"Licence (L1)": 2, "BUT": 1, "Grande école post bac": 1, "CPGE": 1, "CUPGE": 1, "C.M.I": 0, "Formations préparatoires à l'enseignement supérieur": -1, "BTS": -1, "DEUST": -1, "CS": -2}, // Formations plus générales ou polyvalentes
    //         // Besoin d'une année de réflexion/prépa
    //         {"Formations préparatoires à l'enseignement supérieur": 4, "Licence (L1)": 0, "BUT": -1, "BTS": -2, "DEUST": -2, "CS": -3, "CPGE": -1, "CUPGE": -1, "C.M.I": -2, "Grande école post bac": -2} // Orientation claire vers les prépas/remises à niveau
    //     ]
    // },
    ////// Un peu bizarre comme question, peut-être à supprimer
    // {
    //     "text": "11 Qu'est-ce qui te motive le plus intellectuellement ?",
    //     "answers": [
    //         "Creuser des théories, comprendre des concepts abstraits, peut-être même participer à des projets de recherche pour aller au fond des choses.",
    //         "Apprendre des techniques concrètes, maîtriser des savoir-faire pratiques, savoir *comment faire* pour résoudre des problèmes ou réaliser quelque chose.",
    //     ],
    //     "scoring": [
    //         // Théorie / Recherche / Abstraction
    //         {"C.M.I": 3, "Licence (L1)": 2, "CPGE": 2, "CUPGE": 1, "Grande école post bac": 1, "BUT": -1, "BTS": -3, "DEUST": -3, "CS": -3},
    //         // Technique / Pratique / Savoir-faire
    //         {"BTS": 3, "DEUST": 3, "CS": 3, "BUT": 2, "Grande école post bac": 0, "C.M.I": -2, "Licence (L1)": -2, "CPGE": -1, "CUPGE": -1}
    //     ]
    // },
    {
        "text": "À propos de ton projet professionnel :", // Numéro de question ajusté si besoin
        "answers": [
            "Tu penses que tu as le temps, les études c'est (aussi) fait pour découvrir ce qu'on aime.",
            "Tu as déjà une idée assez précise du type de métier ou de secteur qui t'attire.",
            "Tu veux surtout faire les meilleures études possibles, quitte à choisir ta voie plus tard.",
            "Tu sais dans quelle direction aller, le plus important est de choisir une formation avec de bons débouchés."
        ],
        "scoring": [
            // 1. Temps pour découvrir
            {"Licence (L1)": 2, "BUT": 1, "Grande école post bac": 1.5, "CPGE": 1, "CUPGE": 1, "Formations préparatoires à l'enseignement supérieur": 2, "C.M.I": -1, "BTS": -2, "DEUST": -2, "CS": -3},
            // 2. Idée précise de métier/secteur
            {"BTS": 3, "DEUST": 3, "CS": 3, "BUT": 2, "C.M.I": 1, "Grande école post bac": 1, "Licence (L1)": 1, "CPGE": 1, "CUPGE": -1, "Formations préparatoires à l'enseignement supérieur": -3},
            // 3. Viser les "meilleures études" (prestige/niveau), voie décidée plus tard
            {"CPGE": 3, "CUPGE": 2, "Grande école post bac": 2, "C.M.I": 2, "Licence (L1)": 1, "BUT": -1, "Formations préparatoires à l'enseignement supérieur": -1, "BTS": -2, "DEUST": -2, "CS": -3},
            // 4. Direction connue, focus sur les débouchés
            {"BUT": 3, "Grande école post bac": 2, "BTS": 2, "DEUST": 2, "C.M.I": 1, "Licence (L1)": -1, "CPGE": 1, "CUPGE": 1, "CS": 0, "Formations préparatoires à l'enseignement supérieur": -2}
        ]
    },
    {
        "text": "Quand tu rentres le soir après les cours :", // Numéro de question ajusté si besoin
        "answers": [
            "Franchement, tu as souvent du mal à te motiver pour faire tes devoirs ou réviser.",
            "Tu as tendance à relire tes notes et à travailler surtout les matières qui t'intéressent le plus.",
            "Tu arrives à travailler un peu ce qui est important et aussi ce qui te plaît, même si ce n'est pas toujours facile.",
            "En général, tu te mets au travail assez facilement pour revoir tes cours et faire ce qu'il y a à faire."
        ],
        "scoring": [
            // 1. Du mal à s'y mettre
            {"CPGE": -2, "C.M.I": -2, "Grande école post bac": -1, "CUPGE": -1, "Licence (L1)": 0, "BUT": 1, "BTS": 1, "DEUST": 1, "CS": 1, "Formations préparatoires à l'enseignement supérieur": 1}, // Peut être la raison de choisir une formation préparatoire/remise à niveau
            // 2. Travaille surtout ce qui intéresse
            {"Licence (L1)": 2, "BUT": 2, "Formations préparatoires à l'enseignement supérieur": 1, "Grande école post bac": 2, "C.M.I": 1, "CUPGE": 1, "BTS": 1, "DEUST": 1, "CS": 1, "CPGE": 1}, // Difficile dans les cursus très exigeants où tout compte
            // 3. Travaille l'important et l'intéressant (compromis réaliste)
            {"BUT": 2, "Grande école post bac": 2, "BTS": 1, "DEUST": 1, "Licence (L1)": 2, "C.M.I": 0, "CUPGE": 2, "CS": 0, "Formations préparatoires à l'enseignement supérieur": 2, "CPGE": 1}, // Ok pour la plupart, un peu juste pour CPGE
            // 4. S'y met facilement (bonne autonomie/discipline)
            {"CPGE": 3, "C.M.I": 2, "Grande école post bac": 2, "CUPGE": 2, "BUT": 1, "Licence (L1)": 1, "BTS": 1, "DEUST": 1, "CS": 1, "Formations préparatoires à l'enseignement supérieur": 1} // Très positif pour les formations exigeantes
        ]
    },
    {
        "text": "14/14: Quel mot qualifierait le mieux les études idéales pour toi :", // Ajuster le numéro si besoin
        "answers": [
            "Ambitieuses", // Vise haut, sélectif, prestigieux, exigeant
            "Ambiance",    // Importance du cadre, des relations, du bien-être, moins de pression
            "Pratiques",   // Concret, savoir-faire, stages, métier rapide
            "Généralistes" // Large, ouvert, pas spécialisé tout de suite, découvrir
        ],
        "scoring": [
            // 1. Ambitieuses
            {"CPGE": 3, "Grande école post bac": 2, "C.M.I": 1, "CUPGE": 2, "BUT": -1, "Licence (L1)": 0, "Formations préparatoires à l'enseignement supérieur": -1, "BTS": -2, "DEUST": -2, "CS": -3},
            // 2. Ambiance (interprété comme bonne ambiance, soutien, moins de compétition féroce)
            {"BTS": 1, "DEUST": 1, "BUT": 1, "CS": 1, "Formations préparatoires à l'enseignement supérieur": 1, "Licence (L1)": 1, "Grande école post bac": 2, "C.M.I": 0, "CUPGE": -2, "CPGE": -3},
            // 3. Pratiques
            {"BTS": 3, "DEUST": 3, "CS": 3, "BUT": 2, "Grande école post bac": 0, "C.M.I": -1, "Licence (L1)": -2, "Formations préparatoires à l'enseignement supérieur": -2, "CUPGE": -3, "CPGE": -3},
            // 4. Généralistes
            {"Licence (L1)": 3, "CPGE": 1, "CUPGE": 1, "BUT": 0, "Grande école post bac": 0, "Formations préparatoires à l'enseignement supérieur": 1, "C.M.I": -1, "BTS": -3, "DEUST": -3, "CS": -3}
        ]
    }
];  