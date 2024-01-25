#!/usr/bin/env sh

# abort on errors
set -e

# build
npm run build

# navigation to output directory
cd dist
cp index.html 404.html
# git instrucction

git init 
git add -A
git commit -m "deploy"


# Para desplegar nuestra pagina en gh-pages  https://<USERNAME>.github.io/<REPO>


git push -f https://github.com/copugarute/carrito-compras.git master

cd -