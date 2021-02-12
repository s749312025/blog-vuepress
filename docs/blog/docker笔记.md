```
安装：yum -y install docker-ce
开启：systemctl start docker
开机自启:systemctl enable docker
docker version
docker：docker run hello-world
查看帮助： docker    |     docker image
拉取镜像：docker pull mariadb
Dockerfile:名字不能修改
		# StudyDocker
		from scratch
		add hello /
		cmd ["/hello"]

docker history ID 
docker build -t gochaochao/hello-world .
docker run -it centos 交互式，进入此系统
docker container ls (-a)
docker container ls -aq 列出ID
docker rm ID / docker rm $(docker container ls -aq) 删除
docker container ls -f "state=exited" -q //没运行的
docker exec -it ID /bin/bash 	//进入容器交互
docker run -d -p 9000:80 --name=web nginx      //端口映射，后台
			--network none/bridge/host    // 无网络，安全/桥接/共享宿主机命名空间
			-e redius-host=39.36.36.36 
			--link name/id					//容器连接
			-v path:path
创建镜像：
	1. docker build Dockerfile
	2. 容器变化，从容器打包:
		docker commit NAME/ID gochaochao/centos-docker
		//--change有时是个有用的选项
	3. 从容器中导出文件
    	docker export -o "archName.tar" ID  ===>docker import fileName
        与save不同的是export会丢失层(也可用于精简镜像体积)
资源限制：
	docker run –memory=200M
	docker run --cpu-shares=4 –-name=test1
Docker设置国内镜像
// 自行申请https://dev.aliyun.com/search.html
vi /etc/docker/daemon.json 
{ 
"registry-mirrors": ["https://s2hl5qgj.mirror.aliyuncs.com"]
}
#搭建私有仓库用 "insecure-registrise":["IP:PORT"]
systemctl daemon-reload 
systemctl restart docker
Docker 网络相关
docker network ls
docker network inspect
```
```
# Dockerfile详解
#FROM  #LABEL #RUN #WORKDIR #ADD and COPY #ENV #CMD and ENTRYPOINT
#---------------------------
#FROM:文件开始
FROM scratch      #从头开始制作一个最简的
FROM centos		#使用centos系统作为开始，没有则拉取
FROM centos:7.0	#指定版本
#LABEL:相当于注释或者说明信息
LABEL version="1.0"		#任意内容
LABEL auther="DY"
#RUN:执行命令，每执行一条RUN，就会多一层. \ 表示换行，写在一条提升性能
RUN yum -y update && yum install -y lrzsz\
	something
#WORKDIR:进入或创建目录。无->创建->进入。有->进入
	WORKDIR /root  #进入/root 目录
	WORKDIR /test 	#创建test
	RUN pwd			# /test/demo
#ADD and COPY	将本地文件添加到镜像。  ADD可以解压缩
	ADD hello /  #将当前目录下的hello添加到根目录
	ADD xxx.tar.gz / #添加并解压到根目录
	#------------
	WORKDIR /root/test
	COPY hello .	#/root/test/hello	
#ENV
ENV MYSQL_VERSION 5.6	#设置常量
RUN yum install mysql-server="$MYSQL_VERSION"
#CMD and ENTRYPOINT
CMD会被前面的ENTRYPOINT覆盖，会被docker run 时的命令覆盖，多个 CMD 时，后边的会覆盖前边的(仅执行最后一条)。
#shell && exec
shell:run yum install sl
exec:run ["yum","install","sl"]
另外定义 ENV 时，exec需要 -c 才能使用$变量
```
```
# Docker发布
dylone
img以自己docker hub的用户名开头
docker login            ->
docker image push dy/centos-dd
# 搭建私有仓库
官方started：https://hub.docker.com/_/registry
仓库机器：docker run -d -p 5000:5000 --restart always --name registry registry:2 
本地：
docker build -t 目标机器IP:端口/名字 #或者 打tag
docker push 镜像
```
```
### 数据持久化
docker volume 
#MySQL
docker run -v/-e   MySQL
## docker compose
# 安装 
---
docker-compose up/stop--->down
# 交互
docker-compose exec mysql bash
```
```
环境变量
vim etc/profile

sl cowsay
linux好玩的命令：
https://www.jianshu.com/p/dd24e4227deb
https://blog.csdn.net/zhongbeida_xue/article/details/78820731
https://www.cnblogs.com/sukai/archive/2013/06/08/3127031.html
```
```
-it  / -d     前台后台
docker search 
退出：Ctrl + P + Q  / exit
docker run = docker create + start
docker stop  / kill
docker 与Linux下运行nginx不同，无前台运行程序自动关闭
docker log		#查看容器日志
docker top		#查看容器里边进程
docker inspect #查看容器细节
docker attach #进入一个已经打开的容器
docker cp 12314564asd:/tmp/yum.log /root	从容器中复制一个文件
docker commit -a auther -m "description" id
docker -v	/-volumes-from	#容器挂载共享【从host共享】  -v可以一次指定多个
```
```
FROM scratch
MAINTAINER 镜像维护者姓名&邮箱
RUN 构建容器时用的命令
EXPOSE	对外暴露端口
WORKDIR	创建容器后进入的目录(无则先创建再进入)
ENV 构建镜像过程中的环境变量
ADD  添加，自动处理URL和解压缩
COPY src des  // ["src","des"]
VOLUME	[]
CMD			指定容器启动时的命令,多个CMD命令仅最后一条生效,会被run时的命令覆盖
ENTRYPOINT	指定容器启动时的命令,多个CMD命令仅最后一条生效,	/curl追加-i[exec格式执行]
ONBUILD		
.dockerignore /USER
```
镜像加载原理
![](https://pic.rmb.bdstatic.com/bjh/cc00dc25f0bfd17a48c3d7bcdcccf016.png)