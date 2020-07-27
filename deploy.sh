set -e

# 构建
npm run build

# cd 到构建输出的目录下 
cd dist
git init
git add -A
git commit -m 'deploy'

git push -f git@github.com:genyu818/vue-show.git master:gh-pages

cd -