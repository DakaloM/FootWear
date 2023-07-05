echo "Switchiong to branch main"
git checkout main

echo "Building app ... "
npm run build

echo "Deploying files to server ... "
scp -r build/* dakalo@31.220.63.113:/var/www/31.220.63.113/


echo "Done!"