#!/bin/bash

################################
#+ 基础配置
################################
LOCAL_DIR=$(pwd)
EXCLUDE_FILE=".exclude"                     # 排除文件列表

# 多台服务器配置，格式: "名字|user@host:port:/remote/dir"
SERVERS=(
    "正式服务器|root@220.130.202.18:50022:/www/wwwroot/tvsoga.com"
)

# ANSI 转义颜色代码
GREEN='\033[0;32m'
RED='\033[0;31m'
BLUE='\033[0;34m'
PURPLE='\033[1;35m'
NC='\033[0m' # 无色

################################
#+ 同步代码函数
################################
sync_code() {
    local server_info=$1
    IFS='@' read -r user host_port_dir <<< "$server_info"
    IFS=':' read -r host port remote_dir <<< "$host_port_dir"

    echo -e "${BLUE}同步代码到服务器 ${user}@${host}:${remote_dir} ...${NC}"
    rsync -avz --partial --progress --delete \
          -e "ssh -p ${port}" \
          --exclude-from=${EXCLUDE_FILE} \
          "${LOCAL_DIR}"/ "${user}@${host}:${remote_dir}"
    echo -e "${GREEN}同步完成 ${host}!${NC}"
}

################################
#+ 菜单显示函数
################################
show_server_menu() {
    echo -e "${BLUE}请选择要部署的服务器(可多选, 用逗号隔开, 默认全选):${NC}"
    for i in "${!SERVERS[@]}"; do
        server_name=$(echo "${SERVERS[$i]}" | cut -d'|' -f1)
        echo -e "${BLUE}$((i+1))) $server_name${NC}"
    done
    echo -e "${BLUE}0) 取消部署${NC}"
}

################################
#+ 主程序
################################
while true; do
    show_server_menu
    read -r selection
    if [[ -z "$selection" ]]; then
        # 默认全选
        selected_indices=($(seq 1 ${#SERVERS[@]}))
    else
        IFS=',' read -ra selected_indices <<< "$selection"
    fi

    if [[ " ${selected_indices[*]} " =~ "0" ]]; then
        echo -e "${BLUE}已取消部署...${NC}"
        break
    fi

    for idx in "${selected_indices[@]}"; do
        idx=$((idx-1)) # 数组从0开始
        if [[ $idx -ge 0 && $idx -lt ${#SERVERS[@]} ]]; then
            server_info=$(echo "${SERVERS[$idx]}" | cut -d'|' -f2)
            sync_code "$server_info"
        fi
    done

    echo -e "${GREEN}部署完成！${NC}"
    break
done
