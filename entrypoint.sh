#!/bin/bash
reset="\033[0m"

green="\033[32m"

success() { printf "${green}%s${reset}\n" "$@"
}

missing_vars=()

check_variable() {
  if [ -z "${!1}" ]; then
    missing_vars+=("$1")
  fi
}

# check_dev_env(){
    # check_variable "USDT_CONTRACT"
# }

# check_prod_env(){
    # check_variable "USDT_CONTRACT"
# }

if [ "$NODE_ENV" ]; then
    success "🚧 server starting enviroment $NODE_ENV";
    # check_dev_env
else
    echo "[ERROR][Entrypoint]: NODE_ENV not set up";
    exit 1;
fi


if [ ${#missing_vars[@]} -gt 0 ]; then
  echo "[ERROR] [Entrypoint]: Container is uninitialized with enviroment set up"
  echo "You need to specify one of the following:"
  for var in "${missing_vars[@]}"; do
    echo "- $var"
  done
  exit 1
fi

#将静态文件中的字符串替换成docker-compose传入的环境变量
# ROOT_DIR=/usr/share/nginx/html

# echo "Replacing env constants in JS"
# for file in $ROOT_DIR/assets/*.js* ;
# do
#   echo "Processing $file ...";
#   sed -i 's|"USDT_CONTRACT"|'"${USDT_CONTRACT}"'|g' $file
# done

exec "$@"