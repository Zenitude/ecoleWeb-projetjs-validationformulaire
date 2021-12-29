/* Variables */

    /* Ciblage et création d'éléments */

    const form = document.querySelector('.form-inscription');
    const nom = document.querySelector('#nom');
    const mail = document.querySelector('#mail');
    const mdp = document.querySelector('#mdp');
    const confirmeMdp = document.querySelector('#confirmeMdp');
    const puissanceMdp = document.querySelector('.puissanceMdp');
    const btn = document.querySelector('button');
    const faible = document.createElement('span');
    const moyen = document.createElement('span');
    const fort = document.createElement('span');
    const imgValidation = document.querySelectorAll('img');

    /* Variables */
    let mdpConforme = false;
    let formValide = [];

/* Événements */

    /* Nom d'utilisateur */

        nom.addEventListener('input', () =>
        {
            if(nom.value.length > 0 && nom.value.length < 3)
            {
                document.querySelector('.utilisateur span').innerHTML = `Nom d'utilisateur entre 3 et 24 caractères.`;
                donneesInvalide(0);
                formValide[0] = false;
            }
            else if(nom.value.length >= 3 && nom.value.length < 25)
            {
                document.querySelector('.utilisateur span').innerHTML = "";
                donneesValide(0);
                formValide[0] = true;
            }
            else if(nom.value.length <= 0 )
            {
                document.querySelector('.utilisateur span').innerHTML = "";
                donneesVide(0);
                formValide[0] = false;
            }
        });

    /* Email */

        mail.addEventListener('input', () => 
        {
            if(mail.value.length <= 0)
            {
                document.querySelector('.email span').innerHTML = "";
                donneesVide(1);
                formValide[1] = false;
            }
            else if(verifMail(mail.value))
            {
                document.querySelector('.email span').innerHTML = "";
                donneesValide(1);
                formValide[1] = true;
            }
            else
            {
                document.querySelector('.email span').innerHTML = "Rentrez un email valide.";
                donneesInvalide(1);
                formValide[1] = false;
            }
        });

    /* Mot de passe */

        mdp.addEventListener('input', () =>
        {
            if(mdp.value.length <= 0)
            {
                document.querySelector('.motDePasse span').innerHTML = "";
                donneesVide(2);
                
                mdp.style.border = 'none';

                puissanceMdp.removeChild(faible);
                puissanceMdp.removeChild(moyen);
                puissanceMdp.removeChild(fort);
                formValide[2] = false;
            }
            else if(mdp.value.length >= 1)
            {
                puissanceMdp.appendChild(faible);
                puissanceMdp.appendChild(moyen);
                puissanceMdp.appendChild(fort);

                faible.classList.add('faible');
                faible.innerText = 'Faible';
                moyen.classList.add('moyen');
                moyen.innerText = 'Moyen';
                fort.classList.add('fort');
                fort.innerText = 'Fort';

                document.querySelector('.motDePasse span').innerHTML = "Un symbole, une lettre minuscule, un chiffre";

                verifMdp(mdp.value);

                if(mdpConforme === true)
                {
                    donneesValide(2);
                    formValide[2] = true;
                }
                else
                {
                    donneesInvalide(2);
                    formValide[2] = false;
                }

                if(mdp.value.length >= 9)
                {
                    mdp.style.border = '2px solid green';
                }
                else if(mdp.value.length >= 6 && mdp.value.length < 9)
                {
                    mdp.style.border = '2px solid orange';
                }
                else
                {
                    mdp.style.border = '2px solid red';
                }
            }
        });

    /* Confirmer Mot de passe */

        confirmeMdp.addEventListener('input', () =>
        {
            if(confirmeMdp.value <= 0)
            {
                donneesVide(3);
                formValide[3] = false;
                document.querySelector('.confirmeMotDePasse span').innerHTML = "";
            }
            else if(confirmeMdp.value === mdp.value)
            {
                donneesValide(3);
                document.querySelector('.confirmeMotDePasse span').innerHTML = "";
                formValide[3] = true;
            }
            else
            {
                donneesInvalide(3);
                document.querySelector('.confirmeMotDePasse span').innerHTML = "Les mots de passe ne sont pas identique.";
                formValide[3] = false;
            }
        })

/* Fonctions */

    function donneesValide(indice)
    {
        imgValidation[indice].setAttribute('src', 'ressources/check.svg');
        imgValidation[indice].style.display = 'inline';
    }

    function donneesInvalide(indice)
    {
        imgValidation[indice].setAttribute('src', 'ressources/error.svg');
        imgValidation[indice].style.display = 'inline';

    }

    function donneesVide(indice)
    {
        imgValidation[indice].style.display = 'none';
    }

    function verifMail(email) 
    {
        const regMail = new RegExp('^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-.]+\.[a-zA-Z]{2,3}$', 'g');
        return regMail.test(email);
    }

    function verifMdp(mdp)
    {
        let verifMdp = [false, false, false];

        const regSymbole = new RegExp('[^a-zA-z0-9]');
        const regMinuscule = new RegExp('[a-z]', 'i');
        const regChiffre = new RegExp('[0-9]');

        if(mdp.search(regSymbole) !== -1)
        {
            verifMdp[0] = true;
        }
        if(mdp.search(regMinuscule) !== -1)
        {
            verifMdp[1] = true;
        }
        if(mdp.search(regChiffre) !== -1)
        {
            verifMdp[2] = true;
        }
        
        if(verifMdp[0] === true && verifMdp[1] === true && verifMdp[2] === true)
        {
            mdpConforme = true;
        }
        else
        {
            mdpConforme = false;
        }
    }