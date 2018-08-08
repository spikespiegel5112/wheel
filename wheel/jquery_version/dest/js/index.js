/**
 * zhejianghuishu
 * Created by AlanSun on 2018/06/10.
 */
$(function () {
	var tips = ["超级豪华大礼", "100元现金红包", "50元现金红包", "20元现金红包", "谢谢参与~"],
		$ring = $(".ring"),
		$prize = $(".prize"),
		$btn = $("#btn"),
		$change = $("#change"),
		$li = $(".scroll li"),
		$sNum = $(".start-num"),
		$eNum = $(".end-num"),
		$info = $(".info"),
		data = {count: 5},
		bool = false,
		timer;

	init();

	function init()
	{
		timer = setInterval(function () {
			$ring.toggleClass("light");
		}, 1000);
	}

	$btn.click(function () {
		if (bool)
		{
			return;
		}
		bool = true;
		if (data.count <= 0)
		{
			$change.html(0);
			bool = false;
			alert("没有次数了");
		}
		else
		{
			data.count--;
			data.count <= 0 && (data.count = 0);
			$change.html(data.count);
			$prize.removeClass("running");
			clickFn();
		}
	});

	function clickFn()
	{
		var data = [1, 2, 3, 4, 5, 6];
		data = 1;
		switch (data)
		{
			case 1:
				rotateFn(1, 0, tips[0]);
				break;
			case 2:
				rotateFn(2, -60, tips[1]);
				break;
			case 3:
				rotateFn(3, -120, tips[2]);
				break;
			case 4:
				rotateFn(4, -180, tips[3]);
				break;
			case 5:
				rotateFn(5, -240, tips[4]);
				break;
			case 6:
				rotateFn(6, -300, tips[5]);
				break;
		}
	}

	function rotateFn(awards, angle, text)
	{
		bool = true;
		$prize.stopRotate();
		$prize.rotate({
			angle: 0,
			duration: 4000,
			animateTo: angle + 1440,
			callback: function () {
				bool = false;
				show(1, 1, text);
			}
		});
	}

	function show(sNum, eNum, text)
	{
		$sNum.eq(2).html(sNum);
		$eNum.eq(2).html(eNum);
		$info.eq(2).html(text);
		$li.css("top", "-" + 40 / 75 + "rem");
		setTimeout(function () {
			$li.css({
				"top": "0",
				"transition": "all 0s ease-in-out"
			});
			$sNum.eq(0).html($sNum.eq(1).html());
			$eNum.eq(0).html($eNum.eq(1).html());
			$info.eq(0).html($info.eq(1).html());
			$info.eq(1).html($info.eq(2).html());
			$sNum.eq(1).html($sNum.eq(2).html());
			$eNum.eq(1).html($eNum.eq(2).html());
		}, 500);
		$li.css("transition", "all 0.5s ease-in-out");
	}

	$("#close,.win,.btn").click(function () {
		$prize.addClass("running");
		init();
	});
});

