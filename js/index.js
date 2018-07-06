$(document).ready(function() {
			$(".container").css('height', window.innerHeight);
//			$(".img-box img").css('height', window.innerHeight);
			
			var imgW = imgH = 0;
			
			var content = $(".temp-wrap");
			var canvase = document.createElement("canvas");
			var context = canvase.getContext("2d");
			var devicePixelRatio = window.devicePixelRatio || 1;
			// 浏览器在渲染canvas之前存储画布信息的像素比
			var backingStoreRatio = context.webkitBackingStorePixelRatio ||
			                    context.mozBackingStorePixelRatio ||
			                    context.msBackingStorePixelRatio ||
			                    context.oBackingStorePixelRatio ||
			                    context.backingStorePixelRatio || 1;
			// canvas的实际渲染倍率
			var ratio = devicePixelRatio / backingStoreRatio;
			
			
			//点击生成海报
			$(".btn").click(function() {
				var phone_number = $("#tel").val();

				var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
				console.log(phone_number)
				console.log(!myreg.test(phone_number))
				if(!myreg.test(phone_number)) {
					$(".prompt").text("请输入正确的手机号");
					$(".prompt").css("visibility","visible");
					return false;
				} else {
					$.ajax({
						type:"post",
						url:"http://testgate.zan-qian.com/promotion-service/1.0.0/addPromotionCode/{phone_number}",
						data:{
							phone_number:phone_number
						},
						ContentType:"application/x-www-form-urlencoded",
						async:true,
						success:function(res){
							console.log(res)
							if(res.result){
								$(".code").text(res.code);
								$(".prompt").css("visibility","hidden");
								$(".poster-wrap").show();
								//生成图片
                                imgW = $(".temp-wrap").width();
                                imgH = $(".temp-wrap").height();
                                //console.log(ratio,imgW,imgH)
                                canvase.width = imgW * ratio;
                                canvase.height = imgH * ratio;
                                canvase.style.width = imgW + 'px';
                                canvase.style.height = imgH + 'px';
                                context.scale(ratio,ratio);
                                var opts = {
                                    scale: ratio,
                                    canvas: canvase,
                                    logging: true,
                                    width:imgW,
                                    height:imgH
                                };
                                html2canvas(content,opts).then(function(canvas){
                                    var imageUrl = canvas.toDataURL("image/png");
                                    if(imageUrl) {
                                        $(".img-box").hide();
                                        $('.saveImg').show();
                                        $('.saveImg').attr("src", imageUrl);
                                    }
                                })
							}else{
								$(".prompt").text("你还不是团长哦!");
								$(".prompt").css("visibility","visible");
								$(".poster-wrap").hide();
							}
						}
					});
				}

			})
			
//			// 扩展API加载完毕后调用onPlusReady回调函数 
//			document.addEventListener( "plusready", onPlusReady, false );
//			var r = null; 
//			// 扩展API加载完毕，现在可以正常调用扩展API 
//			function onPlusReady() {
//			}
//			// 保存图片到相册中 
//			function savePicture() {
//				plus.gallery.save($('.saveImg').attr("src"), function () {
//					alert( "保存图片到相册成功" );
//				},function(){
//					alert("保存失败")
//				});
//			}
//	
//	
//			$(".save-btn").click(function() {
//				alert(1)
//				savePicture();
//			})

			//			$(".save-btn").click(function() {
//				imgW = $(".posterCode").width();
//				imgH = $(".posterCode").height();
//				console.log(ratio)
//				canvase.width = imgW * ratio;
//				canvase.height = imgH * ratio;
//				canvase.style.width = imgW + 'px';
//				canvase.style.height = imgH + 'px';
//				context.scale(ratio,ratio);
//				html2canvas(content, {
//					canvas:canvase,
//					onrendered: function(canvase) {
//						var imageUrl = canvase.toDataURL("image/png");
//						$("body").append(canvase)
//						if(imageUrl) {
//							$(".img-box").hide();
//							$('.saveImg').show();
//							$('.saveImg').attr("src", imageUrl);
//						}
//					}
//				})
//			})
		
		})