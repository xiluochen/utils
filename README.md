# ReadMe

&emsp;&emsp;该项目是通过`Vue+NodeJS`实现的一个简单的前后端分离项目  
&emsp;&emsp;包含一些简单的常用工具  

## 文档结构

```
utils
├─util-proj
│  
├─util_server
│ 
└─util_server_lowdb
```
### util-proj
&emsp;&emsp;基于Vue+Vite+Vue-Router+Vuex实现页面上显示的小工具  
&emsp;&emsp;主要包含：`Todos`, `计算器`, `记账本`  
&emsp;&emsp;可通过侧边栏切换`明/暗`主题  
### util_server
&emsp;&emsp;通过Nodejs+Mongoose实现的后端代码  
&emsp;&emsp;数据库中主要存储`todos`和`账单数据`  
### util-server_jsondb
&emsp;&emsp;通过Nodejs+fs实现简单的“数据库”交互  
&emsp;&emsp;通过`json`格式存储数据  
&emsp;&emsp;注意:**文件读取尚未优化，故尽量不要存放过多的数据在该文件中**  
