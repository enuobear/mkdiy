<!doctype html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <meta name="format-detection" content="telephone=no" />
    <title>time</title>
    <style type="text/css">
        *{ padding:0; margin:0; }
        body{
			font-size:12px;
			padding:10px;
			-webkit-text-size-adjust:none;
		}
        ul,li{
			list-style:none;
		}
        li{
			line-height:20px;
			background:#f8f8f8;
			margin-bottom:10px;
			padding:10px;
			color:#ccc;
			-webkit-box-shadow:1px 1px 1px rgba(0,0,0,.1);
		}
		li span{
			font:16px/30px Arial;
			color:#999;
		}
    </style>
</head>
<body>
    <ul id="time">
        <li data-time="2014-03-10 18:52:00">1</li>
        <li data-time="2014-03-11 15:10:00">2</li>
        <li data-time="2014-03-12 15:15:00">3</li>
        <li data-time="2014-03-13 15:20:00">4</li>
        <li data-time="2014-03-14 15:25:00">5</li>
    </ul>
    <script type="text/javascript">
        var TimeCount = function(){};

        TimeCount.prototype = {
            init: function(conf){
                var self = this,
                    conf = conf || {};

                tType        = conf.type || false;
                self.elem    = conf.elem;
                self.disTime = conf.times;

                self.htmlText = '还有下面时间开始';

                // self.endTime = new Date(self.disTime).getTime();
                // self.endTime = new Date(2014, 02, 10, 16, 05, 00).getTime();

                // self.endTime = (new Date(2014, 02, 10, 16, 40, 00).getTime())/1000;

                self.endTime = self.formatTime(self.disTime);

                if(!tType){
                    self.nowTime = parseInt(<?php echo time() ?>) + 1;
                    // console.log('php');
                }else{
                    self.nowTime = Math.floor(parseInt((new Date().getTime())/1000)) + 1;
                    // console.log('js');
                }
                // self.nowTime = new Date().getTime();
                self.setLoop();
            },
            setLoop: function(){
                var self = this;

                // var leftTime = parseInt((self.endTime - self.nowTime)/1000);

                var leftTime = self.endTime - self.nowTime;
                if(leftTime <= 0){
                    // leftTime = parseInt((self.nowTime - self.endTime)/1000);
                    leftTime = self.nowTime - self.endTime;
                    self.htmlText = '时间都过了';
                }

                var tDay    = Math.floor(leftTime/(60*60*24)),
                    tHour   = Math.floor((leftTime-tDay*24*60*60)/3600),
                    tMinute = Math.floor((leftTime-tDay*24*60*60-tHour*3600)/60),
                    tSecond = Math.floor(leftTime-tDay*24*60*60-tHour*3600-tMinute*60);

                
                self.elem.innerHTML = self.disTime+'<br>'+self.htmlText+'<br><span>'+tDay+'天'+tHour+'小时'+tMinute+'分'+tSecond+'秒</span>';
                

                self.nowTime += 1;

                setTimeout(function(){
                    self.setLoop();
                }, 1000);
            },
            formatTime: function(time){
                var self = this;
                // self.endTime = (new Date(2014, 02, 10, 16, 40, 00).getTime())/1000;

                var a = [];
                a = time.split(' ');

                var b = [];
                b = a[0].split('-');

                var c = [];
                c = a[1].split(':');

                var time = (new Date(b[0], b[1]-1, b[2], c[0], c[1], c[2]).getTime())/1000;
                return time;
            },
        };

        var tmpe = document.getElementById('time');
            numTime = tmpe.getElementsByTagName('li'),
            timeCount = [],
            timeNew = [];
        for(var num=numTime.length,i=0; i<num; i++){
            timeCount[i] = new TimeCount();
            timeNew[i] = numTime[i].getAttribute('data-time');

            timeCount[i].init({
                type: true,
                elem: numTime[i],
                times: timeNew[i]
            })
        }

    </script>
</body>
</html>
