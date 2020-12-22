---
title: iterm2 配置
tag: iterm
date: 2020-08-07
---


> 主要是自己看 所有会有些乱
### 更新zsh
macOs 自带zsh 不过要更新版本
```bash
brew install zsh
```
### 查看当前SHELL
```bash
echo $SHELL # 查看当前SHELL
cat /etc/shells #查看所有的SHELL
chsh -s /bin/zsh #切换zsh  如果失败就加上sudo
```

### 安装 oh my zsh
```bash
sh -c "$(wget -O- https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"
```
如果不能用，使用手动方式安装
https://github.com/robbyrussell/oh-my-zsh 仓库下面的tools目录`install.sh`文件
`chmod 777 install.sh`
执行完就ok了

### 安装p10k皮肤
> p10k 启动时会安装字体 不用担心字体问题
```bash
git clone --depth=1 https://github.com/romkatv/powerlevel10k.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/themes/powerlevel10k\n
```
可以使用 `p10k configure`来设置
```bash
cd ~/.oh-my-zsh/themes && ls # 之后可以改oh my zsh 其它内置皮肤，这是查看所有内置皮肤的命令
```

### 下载所有配色
```bash
git clone https://github.com/mbadolato/iTerm2-Color-Schemes.git --depth=1
```

---
```bash
git clone https://github.com/dracula/iterm.git ## 个人较喜欢的配色
```
---
### 装插件
```bash
ls ~/.oh-my-zsh/plugins
```
上面是查看所有oh my zsh内置插件的命令
先将`z`插件加到.zshrc
```bash
brew install zsh-syntax-highlighting
brew install zsh-autosuggestions
```
安装完后
修改`vim ~/.zshrc`文件,在文件底部增加
```bash
source /usr/local/share/zsh-syntax-highlighting/zsh-syntax-highlighting.zsh
source /usr/local/share/zsh-autosuggestions/zsh-autosuggestions.zsh
```
执行 `source ~/.zshrc`生效

### 隐藏用户名和主机名
  
修改`vim ~/.zshrc`文件,在文件底部增加
---
```bash
prompt_context() {}
```

###### 只保留用户名，隐藏主机名

```bash
prompt_context() {
  if [[ "$USER" != "$DEFAULT_USER" || -n "$SSH_CLIENT" ]]; then
    prompt_segment black default "%(!.%{%F{yellow}%}.)$USER"
  fi
}
```

###### 只保留主机名，隐藏用户名

```bash
prompt_context() {
  if [[ "$USER" != "$DEFAULT_USER" || -n "$SSH_CLIENT" ]]; then
    prompt_segment black default "%(!.%{%F{yellow}%}.)$HOST"
  fi
}
```

修改后记得执行 `source ~/.zshrc`