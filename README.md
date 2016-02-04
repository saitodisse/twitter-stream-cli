# REPLACE_PROJECT_NAME

> REPLACE_TODO_DESCRIPTION

# TODO

Suposing your project name is `my-cli-tool` and your github url is `https://github.com/azukiapp/my-cli-tool`.

## Unzip and initialize git

```sh
wget https://github.com/azukiapp/azk-cli-boilerplate/archive/master.zip
unzip master.zip
mv azk-cli-boilerplate-master my-cli-tool
rm master.zip
cd my-cli-tool
git init
git add . -A
git commit -m"[Project] Initial version from boilerplate"

```

## Replaces in files/code

#### Replacing string in code

Now you can find and replace all occurencies of `REPLACE_`. You can also execute sed to this for you if you want:

> **Change** to real values

```sh
find . -name 'REPLACE_PROJECT_NAME.js' -type f -exec bash -c 'mv "$1" "${1/REPLACE_PROJECT_NAME.js/my-cli-tool.js}"' -- {} \;
git add . -A

find . -type f -not -path "./node_modules/*" -not -path "./.git/*" -not -path "./lib/*" -exec sed -i 's/REPLACE_PROJECT_GITHUB_URI/https:\/\/github.com\/azukiapp\/my-cli-tool/g' {} +

find . -type f -not -path "./node_modules/*" -not -path "./.git/*" -not -path "./lib/*" -exec sed -i 's/REPLACE_PROJECT_NAME/my-cli-tool/g' {} +

find . -type f -not -path "./node_modules/*" -not -path "./.git/*" -not -path "./lib/*" -exec sed -i 's/REPLACE_TODO_DESCRIPTION/My Incredible Cli Tool/g' {} +

find . -type f -not -path "./node_modules/*" -not -path "./.git/*" -not -path "./lib/*" -exec sed -i 's/REPLACE_TODO_BIN_DESCRIPTION/Run incredible main function/g' {} +

find . -type f -not -path "./node_modules/*" -not -path "./.git/*" -not -path "./lib/*" -exec sed -i 's/REPLACE_TODO_AUTHOR/The Author/g' {} +
```

- search all other `TODO` in code and replace with right values. Do not forget `CHANGELOG`.md and `LICENSE` files.

## Check if its still working

```sh
npm install
npm test
node ./bin/my-cli-tool.js -h
```

## Github

Create `my-cli-tool` on Github and include remote

```sh
git remote add origin git@github.com:azukiapp/my-cli-tool.git
git push origin master -u
```

- Now you can **delete** this section from README ;)

------------

### Install

```sh
npm install REPLACE_PROJECT_NAME -g
```

### Run

```sh
REPLACE_PROJECT_NAME             # REPLACE_TODO_DESCRIPTION
```

### Test and run locally

```sh
npm install
npm test
node ./bin/REPLACE_PROJECT_NAME.js -h
```

