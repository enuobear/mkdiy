html5 cache
===========

Manifest文件
-----------
	manifest 文件是简单的文本文件，它告知浏览器被缓存的内容（以及不缓存的内容）。
	manifest 文件可分为三个部分：
	* CACHE MANIFEST - 在此标题下列出的文件将在首次下载后进行缓存
	* NETWORK - 在此标题下列出的文件需要与服务器的连接，且不会被缓存
	* FALLBACK - 在此标题下列出的文件规定当页面无法访问时的回退页面（比如 404 页面）

###CACHE MANIFEST

	第一行，CACHE MANIFEST，是必需的：
	CACHE MANIFEST
	/theme.css
	/logo.gif
	/main.js
	上面的 manifest 文件列出了三个资源：一个 CSS 文件，一个 GIF 图像，以及一个 JavaScript 文件。当 manifest 文件加载后，浏览器会从网站的根目录下载这三个文件。然后，无论用户何时与因特网断开连接，这些资源依然是可用的。

### NETWORK

	下面的 NETWORK 小节规定文件 "login.asp" 永远不会被缓存，且离线时是不可用的：
	NETWORK:
	login.asp
	可以使用星号来指示所有其他其他资源/文件都需要因特网连接：
	NETWORK:
	*

### FALLBACK

	下面的 FALLBACK 小节规定如果无法建立因特网连接，则用 "offline.html" 替代 /html5/ 目录中的所有文件：
	FALLBACK:
	/html5/ /404.html
	注释：第一个 URI 是资源，第二个是替补。



applicationCache对象，及属性、事件、接口
===========

	//当前文档对应的applicationCache对象
	window.applicationCache

	//当前缓存所处的状态，为0～5的整数值，分别对应一个状态，并分别对应一个常量
	window.applicationCache.status

	window.applicationCache.UNCACHED === 0    //未缓存，比如一个页面没有制定缓存清单，其状态就是UNCACHED
	window.applicationCache.IDLE === 1 //空闲，缓存清单指定的文件已经全部被页面缓存，此时状态就是IDLE
	window.applicationCache.CHECKING === 2 //页面正在检查当前离线缓存是否需要更新
	window.applicationCache.DOWNLOADING === 3 //页面正在下载需要更新的缓存文件
	window.applicationCache.UPDATEREADY === 4  //页面缓存更新完毕
	window.applicationCache.OBSOLETE === 5  //缓存过期，比如页面检查缓存是否过期时，发现服务器上的.manifest文件被删掉了

	//常用API，在后面会稍详细介绍
	window.applicationCache.update()  //update方法调用时，页面会主动与服务器通信，检查页面当前的缓存是否为最新的，如不是，则下载更新后的资源
	window.applicationCache.swapCache()  //updateready后，更新到最新的应用缓存
