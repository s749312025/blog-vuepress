---
title: Andorid下的webview缓存全解析
tag: javascript
date: 2020-05-20
---

## HTML5缓存介绍

* HTML 5 Web 存储
    * 在客户端存储数据（DOM Storage 分为 sessionStorage 和 localStorage。HTML5 中引入了 DOM Storage 机制用于存储键值对，它的设计目的是提供大规模、易用的存储功能， 并且程序员可以通过调用标准的接口，简单地访问存储的数据。目前，许多新版本的浏览器都支持 DOM Storage 功能。 当老版本的浏览器不支持 HTML5 提供的 DOM Storage 机制时，可以考虑用 Dojo 来实现相同的功能。）
    * HTML5 提供了两种在客户端存储数据的新方法：
        * localStorage - 没有时间限制的数据存储
        * sessionStorage - 针对一个 session 的数据存储
            * 之前，这些都是由 cookie 完成的。但是 cookie 不适合大量数据的存储，因为它们由每个对服务器的请求来传递，这使得 cookie 速度很慢而且效率也不高。在 HTML5 中，数据不是由每个服务器请求传递的，而是只有在请求时使用数据。它使在不影响网站性能的情况下存储大量数据成为可能。对于不同的网站，数据存储于不同的区域，并且一个网站只能访问其自身的数据。HTML5 使用 JavaScript 来存储和访问数据。
* HTML 5 应用程序缓存
    * 什么是应用程序缓存（Application Cache）？
        * HTML5 引入了应用程序缓存，这意味着 web 应用可进行缓存，并可在没有因特网连接时进行访问。
    * 应用程序缓存为应用带来三个优势：
        * 离线浏览 - 用户可在应用离线时使用它们
        * 速度 - 已缓存资源加载得更快
        * 减少服务器负载 - 浏览器将只从服务器下载更新过或更改过的资源。
        * 浏览器支持
            * 所有主流浏览器均支持应用程序缓存，除了 Internet Explorer。

## Android中WebView的缓存可以分为页面缓存和数据缓存,以下分别对两者进行阐述:")Android中WebView的缓存可以分为页面缓存和数据缓存,以下分别对两者进行阐述:

* 页面缓存是指加载一个网页时的html、JS、CSS等页面或者资源数据。这些缓存资源是由于浏览器的行为而产生，开发者只能通过配置HTTP响应头影响浏览器的行为才能间接地影响到这些缓存数据。他们的索引存放在/data/data/package_name/databases下。他们的文件存放在/data/data/package_name/cache/xxxwebviewcachexxx下。文件夹的名字在2.x和4.x上有所不同，但都文件夹名字中都包含webviewcache。
    * 1、缓存构成
        * /data/data/package_name/cache/
        * /data/data/package_name/database/webview.db
        * /data/data/package_name/database/webviewCache.db
    * 2、缓存模式(5种)
        * LOAD_CACHE_ONLY: 不使用网络，只读取本地缓存数据
        * LOAD_DEFAULT: 根据cache-control决定是否从网络上取数据。
        * LOAD_CACHE_NORMAL: API level 17中已经废弃, 从API level 11开始作用同LOAD_DEFAULT模式
        * LOAD_NO_CACHE: 不使用缓存，只从网络获取数据.
        * LOAD_CACHE_ELSE_NETWORK，只要本地有，无论是否过期，或者no-cache，都使用缓存中的数据。
            * 如：www.taobao.com的cache-control为no-cache，在模式LOAD_DEFAULT下，无论如何都会从网络上取数据，如果没有网络，就会出现错误页面；在LOAD_CACHE_ELSE_NETWORK模式下，无论是否有网络，只要本地有缓存，都使用缓存。本地没有缓存时才从网络上获取。www.360.com.cn的cache-control为max-age=60，在两种模式下都使用本地缓存数据。

* 数据缓存分为两种：AppCache和DOM Storage（Web Storage）。他们是因为页面开发者的直接行为而产生。所有的缓存数据都由开发者直接完全地掌控。
    * AppCache使我们能够有选择的缓冲web浏览器中所有的东西，从页面、图片到脚本、css等等。尤其在涉及到应用于网站的多个页面上的CSS和JavaScript文件的时候非常有用。其大小目前通常是5M。
        * 在Android上需要手动开启（setAppCacheEnabled），并设置路径（setAppCachePath）和容量（setAppCacheMaxSize）
        * Android中Webkit使用一个db文件来保存AppCache数据（my_path/ApplicationCache.db）
    * 如果需要存储一些简单的用key/value对即可解决的数据，DOM Storage是非常完美的方案。根据作用范围的不同，有Session Storage和Local Storage两种，分别用于会话级别的存储（页面关闭即消失）和本地化存储（除非主动删除，否则数据永远不会过期）。
        * 在Android中可以手动开启DOM Storage（setDomStorageEnabled），设置存储路径（setDatabasePath）
        * Android中Webkit会为DOM Storage产生两个文件（my_path/localstorage/http_h5.m.taobao.com_0.localstorage和my_path/localstorage/Databases.db）
    * 另外，在Android中清除缓存时，如果需要清除Local Storage的话，仅仅删除Local Storage的本地存储文件是不够的，内存里面有缓存数据。如果再次进入页面，Local Storage中的缓存数据同样存在。需要杀死程序运行的当前进程再重新启动才可以。

## [](http://thisismrwu.site/2017/06/03/Android%E4%B8%8BwebView%E7%BC%93%E5%AD%98%E5%85%A8%E8%A7%A3%E6%9E%90/#webSetting%E5%85%B3%E4%BA%8E%E7%BC%93%E5%AD%98%E7%9B%B8%E5%85%B3%E7%9A%84API "webSetting关于缓存相关的API")webSetting关于缓存相关的API

* setAppCacheEnabled (boolean flag)
    * 应用缓存API是否可用，默认值false, 结合setAppCachePath(String)使用。
* setAppCachePath(String)
    * 设置应用缓存文件的路径。为了让应用缓存API可用，此方法必须传入一个应用可写的路径。该方法只会执行一次，重复调用会被忽略。
* setAppCacheMaxSize (long appCacheMaxSize)
    * 已废弃。设置应用缓存内容的最大值。所传值会被近似为数据库支持的最近似值，因此这是一个指示值，而不是一个固定值。所传值若小于数据库大小不会让数据库调整大小。默认值是MAX_VALUE，建议将默认值设置为最大值。
* setCacheMode (int mode)
    * 重写使用缓存的方式，默认值LOAD_DEFAULT。缓存的使用方式基于导航类型，正常的页面加载，检测缓存，需要时缓存内容复现。导航返回时，内容不会复现，只有内容会从缓存盘中恢复。该方法允许客户端通过指定LOAD_DEFAULT, LOAD_CACHE_ELSE_NETWORK, LOAD_NO_CACHE or LOAD_CACHE_ONLY的其中一项来重写其行为。
* setDatabaseEnabled (boolean flag)
    * 数据库存储API是否可用，默认值false。如何正确设置数据存储API参见setDatabasePath(String)。该设置对同一进程中的所有WebView实例均有效。注意，只能在当前进程的任意WebView加载页面之前修改此项，因为此节点之后WebView的实现类可能会忽略该项设置的改变。
* setDatabasePath (String databasePath)
    * 已废弃，数据库路径由实现（implementation）管理，调用此方法无效。设置数据库的存储路径，为了保证数据库正确运行，该方法必须使用一个应用可写的路径。此方法只能执行一次，重复调用会被忽略。
* setDomStorageEnabled (boolean flag)
    * DOM存储API是否可用，默认false。

## webSetting相关API总结：
```java

setAllowContentAccess (boolean allow)

是否允许在WebView中访问内容URL（Content Url），默认允许。内容Url访问允许WebView从安装在系统中的内容提供者载入内容。

setAllowFileAccess (boolean allow)

是否允许访问文件，默认允许。注意，这里只是允许或禁止对文件系统的访问，Assets 和 resources 文件使用file:///android_asset和file:///android_res仍是可访问的。

setAllowFileAccessFromFileURLs (boolean flag)

是否允许运行在一个URL环境（the context of a file scheme URL）中的JavaScript访问来自其他URL环境的内容，为了保证安全，应该不允许。也请注意，这项设置只影响对file schema 资源的JavaScript访问，其他形式的访问，例如来自图片HTML单元的访问不受影响。为了防止相同的域策略（same domain policy）对ICE_CREAM_SANDWICH以及更老机型的侵害，应该显式地设置此值为false。

setAllowUniversalAccessFromFileURLs (boolean flag)

是否允许运行在一个file schema URL环境下的JavaScript访问来自其他任何来源的内容，包括其他file schema URLs. 参见setAllowFileAccessFromFileURLs(boolean)，为了确保安全，应该设置为不允许，注意这项设置只影响对file schema 资源的JavaScript访问，其他形式的访问，例如来自图片HTML单元的访问不受影响。为了防止相同的域策略（same domain policy）对ICE_CREAM_SANDWICH以及更老机型的侵害，应该显式地设置此值为false。ICE_CREAM_SANDWICH_MR1 以及更老的版本此默认值为true，JELLY_BEAN以及更新版本此默认值为false

setAppCacheEnabled (boolean flag)

应用缓存API是否可用，默认值false, 结合setAppCachePath(String)使用。

setAppCachePath(String)

设置应用缓存文件的路径。为了让应用缓存API可用，此方法必须传入一个应用可写的路径。该方法只会执行一次，重复调用会被忽略。

setAppCacheMaxSize (long appCacheMaxSize)

已废弃。设置应用缓存内容的最大值。所传值会被近似为数据库支持的最近似值，因此这是一个指示值，而不是一个固定值。所传值若小于数据库大小不会让数据库调整大小。默认值是MAX_VALUE，建议将默认值设置为最大值。

setBlockNetworkImage (boolean flag)

是否禁止从网络（通过http和https URI schemes访问的资源）下载图片资源，默认值为false。注意，除非getLoadsImagesAutomatically()返回true,否则该方法无效。还请注意，即使此项设置为false，使用setBlockNetworkLoads(boolean)禁止所有网络加载也会阻止网络图片的加载。当此项设置的值从true变为false，WebView当前显示的内容所引用的网络图片资源会自动获取。

setBlockNetworkLoads (boolean flag)

是否禁止从网络下载数据，如果app有INTERNET权限，默认值为false，否则默认为true。使用setBlockNetworkImage(boolean) 只会禁止图片资源的加载。注意此值由true变为false，当前WebView展示的内容所引用的网络资源不会自动加载，直到调用了重载。如果APP没有INTERNET权限，设置此值为false会抛出SecurityException。

setBuiltInZoomControls (boolean enabled)

是否使用内置的缩放机制。内置的缩放机制包括屏幕上的缩放控件（浮于WebView内容之上）和缩放手势的运用。通过setDisplayZoomControls(boolean)可以控制是否显示这些控件，默认值为false。

setCacheMode (int mode)

重写使用缓存的方式，默认值LOAD_DEFAULT。缓存的使用方式基于导航类型，正常的页面加载，检测缓存，需要时缓存内容复现。导航返回时，内容不会复现，只有内容会从缓存盘中恢复。该方法允许客户端通过指定LOAD_DEFAULT, LOAD_CACHE_ELSE_NETWORK, LOAD_NO_CACHE or LOAD_CACHE_ONLY的其中一项来重写其行为。

setCursiveFontFamily (String font)

设置WebView字体库字体，默认“cursive”

setDatabaseEnabled (boolean flag)

数据库存储API是否可用，默认值false。如何正确设置数据存储API参见setDatabasePath(String)。该设置对同一进程中的所有WebView实例均有效。注意，只能在当前进程的任意WebView加载页面之前修改此项，因为此节点之后WebView的实现类可能会忽略该项设置的改变。

setDatabasePath (String databasePath)

已废弃，数据库路径由实现（implementation）管理，调用此方法无效。

设置数据库的存储路径，为了保证数据库正确运行，该方法必须使用一个应用可写的路径。此方法只能执行一次，重复调用会被忽略。

setDefaultFixedFontSize (int size)

设置默认固定的字体大小，默认为16，可取值1到72

setDefaultFontSize (int size)

设置默认的字体大小，默认16，可取值1到72

setDefaultTextEncodingName (String encoding)

设置默认的字符编码集，默认”UTF-8”.

setDefaultZoom (WebSettings.ZoomDensity zoom)

已废弃。设置默认的缩放密度，必须在UI线程调用，默认值MEDIUM.该项设置在新应用中不推荐使用。如果WebView用于展示手机页面，可以通过调整页面的’meta viewport’ 标记中的’width’ 和 ‘initial-scale’属性实现预期效果，对于漏用标记的页面，可以使用setInitialScale(int)和setUseWideViewPort(boolean) .

setDisplayZoomControls (boolean enabled)

使用内置的缩放机制时是否展示缩放控件，默认值true。参见setBuiltInZoomControls(boolean).

setDomStorageEnabled (boolean flag)

DOM存储API是否可用，默认false。

setEnableSmoothTransition (boolean enable)

已废弃，将来会成为空操作（no-op），设置当panning或者缩放或者持有当前WebView的window没有焦点时是否允许其光滑过渡，若为true，WebView会选择一个性能最大化的解决方案。例如过渡时WebView的内容可能不更新。若为false，WebView会保持精度（fidelity），默认值false。

setFantasyFontFamily (String font)

设置fantasy字体集（font family）的名字默认为“fantasy”

setFixedFontFamily (String font)

设置固定的字体集的名字，默认为”monospace”。

setGeolocationDatabasePath (String databasePath)

定位数据库的保存路径，为了确保定位权限和缓存位置的持久化，该方法应该传入一个应用可写的路径。

setGeolocationEnabled (boolean flag)

定位是否可用，默认为true。请注意，为了确保定位API在WebView的页面中可用，必须遵守如下约定:

(1) app必须有定位的权限，参见ACCESS_COARSE_LOCATION, ACCESS_FINE_LOCATION；

(2) app必须提供onGeolocationPermissionsShowPrompt(String, GeolocationPermissions.Callback)回调方法的实现，在页面通过JavaScript定位API请求定位时接收通知。

作为可选项，可以在数据库中存储历史位置和Web初始权限，参见setGeolocationDatabasePath(String).

setJavaScriptCanOpenWindowsAutomatically (boolean flag)

让JavaScript自动打开窗口，默认false。适用于JavaScript方法window.open()。

setJavaScriptEnabled (boolean flag)

设置WebView是否允许执行JavaScript脚本，默认false，不允许。

setLayoutAlgorithm (WebSettings.LayoutAlgorithm l)

设置布局，会引起WebView的重新布局（relayout）,默认值NARROW_COLUMNS

setLightTouchEnabled (boolean enabled)

已废弃。从 JELLY_BEAN 开始，该设置无效。允许使用轻触摸做出选择和光标悬停。

setLoadWithOverviewMode (boolean overview)

是否允许WebView度超出以概览的方式载入页面，默认false。即缩小内容以适应屏幕宽度。该项设置在内容宽度超出WebView控件的宽度时生效，例如当getUseWideViewPort() 返回true时。

setLoadsImagesAutomatically (boolean flag)

WebView是否下载图片资源，默认为true。注意，该方法控制所有图片的下载，包括使用URI嵌入的图片（使用setBlockNetworkImage(boolean) 只控制使用网络URI的图片的下载）。如果该设置项的值由false变为true，WebView展示的内容所引用的所有的图片资源将自动下载。

setMediaPlaybackRequiresUserGesture (boolean require)

WebView是否需要用户的手势进行媒体播放，默认值为true。

setMinimumFontSize (int size)

设置最小的字号，默认为8

setMinimumLogicalFontSize (int size)

设置最小的本地字号，默认为8。

setMixedContentMode (int mode)

当一个安全的来源（origin）试图从一个不安全的来源加载资源时配置WebView的行为。默认情况下，KITKAT及更低版本默认值为MIXED_CONTENT_ALWAYS_ALLOW，LOLLIPOP版本默认值MIXED_CONTENT_NEVER_ALLOW，WebView首选的最安全的操作模式为MIXED_CONTENT_NEVER_ALLOW ，不鼓励使用MIXED_CONTENT_ALWAYS_ALLOW。

setNeedInitialFocus (boolean flag)

调用requestFocus(int, Android.graphics.Rect)时是否需要设置节点获取焦点，默认值为true。

setOffscreenPreRaster (boolean enabled)

当WebView切换到后台但仍然与窗口关联时是否raster tiles，打开它可以避免在WebView从后台切换到前台时重新绘制，默认值false。在这种模式下后台的WebView占用更多的内存。请按如下准则显示内存的使用：

    WebView的尺寸不能比设备的屏幕尺寸更大；

    限制在少数WebView上使用该模式；

    在可见的WebView和即将显现的WebView上使用；

setPluginState (WebSettings.PluginState state)

在API18以上已废弃。未来将不支持插件，不要使用。告诉WebView启用、禁用或者有即用（on demand）的插件，即用模式是指如果存在一个可以处理嵌入内容的插件，会显示一个占位图标，点击时开启。默认值OFF。

setRenderPriority (WebSettings.RenderPriority priority)

在API18以上已废弃。不建议调整线程优先级，未来版本不会支持这样做。设置绘制（Render，很多书上翻译成渲染，貌似很专业，但是不易懂，不敢苟同）线程的优先级。不像其他设置，同一进程中只需调用一次，默认值NORMAL。

setSansSerifFontFamily (String font)

设置无衬线字体集（sans-serif font family）的名字。默认值”sans-serif”.

setSaveFormData (boolean save)

WebView是否保存表单数据，默认值true。

setSavePassword (boolean save)

API18以上版本已废弃。未来版本将不支持保存WebView中的密码。设置WebView是否保存密码，默认true。

setSerifFontFamily (String font)

设置衬线字体集（serif font family）的名字，默认“sans-serif”。

setStandardFontFamily (String font)

设置标准字体集的名字，默认值“sans-serif”。

setSupportMultipleWindows (boolean support)

设置WebView是否支持多窗口。如果设置为true，主程序要实现onCreateWindow(WebView, boolean, boolean, Message)，默认false。

setSupportZoom (boolean support)

WebView是否支持使用屏幕上的缩放控件和手势进行缩放，默认值true。设置setBuiltInZoomControls(boolean)可以使用特殊的缩放机制。该项设置不会影响zoomIn() and zoomOut()的缩放操作。

setTextSize (WebSettings.TextSize t)

API14版本以上已废弃。请取代使用setTextZoom(int)。设置页面文本的尺寸，默认NORMAL。

setTextZoom (int textZoom)

设置页面上的文本缩放百分比，默认100。

setUseWideViewPort (boolean use)

WebView是否支持HTML的“viewport”标签或者使用wide viewport。设置值为true时，布局的宽度总是与WebView控件上的设备无关像素（device-dependent pixels）宽度一致。当值为true且页面包含viewport标记，将使用标签指定的宽度。如果页面不包含标签或者标签没有提供宽度，那就使用wide viewport。

setUserAgentString (String ua)

设置WebView的用户代理字符串。如果字符串为null或者empty，将使用系统默认值。注意从KITKAT版本开始，加载网页时改变用户代理会让WebView再次初始化加载。

supportMultipleWindows ()

获取WebView是否支持多窗口的值。

supportZoom ()

获取WebView是否支持缩放的值。```