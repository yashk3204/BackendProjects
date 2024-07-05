mkdir config controllers models utils 
touch .gitignore
echo "node_modules" > .gitignore
cd config
touch default.json
cd ..
npm init -y
touch app.js
npm install express config axios mongoose
 
