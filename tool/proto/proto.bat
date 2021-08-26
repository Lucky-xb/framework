::执行协议生成命令
call pb-egret generate

::移动生成的.d.ts文件
move ..\..\bin\libs\protobuf-bundles.d.ts ..\..\libs\protobuf-bundles.d.ts

pause