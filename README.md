# Fai Rúa

“Fai Rúa” é un proxecto audiovisual que nace coa vontade de rexistrar a memoria colectiva de parte do barrio vello de Vigo, en pleno proceso de transformación, e de rescatar aquelas historias e persoas que construíron a súa identidade. A través de distintas pezas audiovisuais o espectador poderá gozar dun paseo virtual por esta parte da cidade.

Podes visitar o sitio en http://fairua.com

## Instalación

Fai Rúa esta realizado en [Cactus](https://github.com/koenbok/cactus) e aloxado en [github pages](https://pages.github.com/). Para instalar, simplemente tes que clonar o repositorio:

    git clone git@github.com:fasouto/fairua.git

e executar o servidor incluído en Cactus

    cactus serve
    
podes visitar a web en `http://127.0.0.1:8000/`

Se fas cambios no CSS ou JavaScript precisas instalar as dependencias e crear a `build` con gulp:

    npm install
    gulp


Además Fai Rúa usa as seguintes tecnoloxías:

- [Bootstrap 3](http://getbootstrap.com/css/) para o grid é a compatibilidade entre navegadores. Non fai uso do javascript.
- [Gulp](https://gulpjs.com/) para compilar e minimizar o JavaScript e CSS
- [Leaflet](http://leafletjs.com/) para o renderizado dos mapas, usando [Here](https://developer.here.com/) como proveedor.

## Licencia

O código está baixo a licencia [MIT](http://opensource.org/licenses/MIT) é tanto os vídeos coma as imaxes teñen licencia [Creative Commons Atribución-Non comercial-Non derivadas 4.0.](https://creativecommons.org/licenses/by-nc-nd/4.0/deed.gl)