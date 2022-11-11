'use strict'

$(function(){

//gnb 스크립트
  let pwElem = $('#navi .page-wrap');
  let pageElem = $('#navi .page-wrap .page');
  let pageLeng = pageElem.length;
  pwElem.css('width',parseInt(pageElem.css('width'))*pageLeng);

  $('#navi a').click(function(){
     let imgSrc = $(this).attr('href');
     let checkAni = $('#main img:last').is(':animated');
     console.log(checkAni);
     if(!checkAni) {
       // $('#main img:last').stop().css('opacity',0);
       // $('#main img:last').remove();
       // $('#main img').attr('src',imgSrc);
     }
     $('#main img:last').animate({opacity: 0},{
       duration: 1000,
       easing: 'swing',
       start: function(){
         $(this).before('<img src="'+imgSrc+'">');
       },
       complete: function(){
         $(this).remove();
       }
     });
     return false;
  });

//갤러리 스크립트
  const marginNumber = parseInt(pageElem.css('width'));
  function pageBtnFunc(el){
    el.click(function(){
      let marginLeftPw = parseInt(pwElem.css('margin-left'));
      let isAni = pwElem.is(':animated');
      if( isAni == false ) {
        if( $(el).hasClass('next') && marginLeftPw > -(marginNumber*(pageLeng-1)) ){// -(marginNumber*(pageLeng-1))
          pwElem.animate({marginLeft: `${marginLeftPw - marginNumber}`},'fast');
        }else if( $(el).hasClass('prev') && marginLeftPw < 0 ){
          pwElem.animate({marginLeft: `${marginLeftPw + marginNumber}`},'fast');
        }else if( marginLeftPw == -(marginNumber*(pageLeng-1)) || marginLeftPw == 0 ){
          alert('더 이상 이미지가 없습니다.');
        }
      }
    });
  }
  $('img.btn').each(function(){
    pageBtnFunc($(this))
  });

  // 아코디언 스타일 FAQ 제작
  // $('.accordion dd:not(:first)').css('display','none');
  // $('.accordion dl dt').click(function(){
  //   if($('+dd',this).css('display') == 'none'){
  //     $('dd').slideUp({ duration: 1500, easing: 'easeInOutExpo'});
  //     $('+dd',this).slideDown({ duration: 1500, easing: 'easeInOutExpo'});
  //   };
  // });
  //animate method를 사용하여 위와 같은 로직을 구현하시오.
  //정답
  let initialDdHeight = $('.accordion dd').css('height');
  initialDdHeight = parseInt(initialDdHeight);
  // console.log(parseInt(initialDdHeight));
  $('.accordion dd:not(:last)').css({
    'display':'none',
    'height':0
  });
  $('.accordion dl dt').click(function(){
    let thisElem = $(this);
    if($('+dd',thisElem).css('display') == 'none'){
      let isAni = $('dd').is(':animated');
      //console.log(isAni); //클릭시 false가 떠야 정상
      if(!isAni){ //if(isAni == false){랑 같은말!
        $('.accordion dd').each(function(){
          if( parseInt($(this).css('height')) == initialDdHeight ){ //300일때 //parseInt 100%이런 것을 정수로 바꿔주겠다!
            $(this).animate({height:0},400,function(){
              $(this).css('display','none'); //눌렀는걸 줄어들게 만드는 코드임!
            });
          }
        });
        $('+dd', thisElem).css('display','block').animate({ height:300 },400);
      }
    };
  });

  //table y축 포커스 스크립트
  $('.common-table td').mouseover(function(){
    var thisIndex = $(this).index() + 1;
    $('td:nth-child('+thisIndex+')').addClass('hover');
  }).mouseout(function(){
    $('td').removeClass('hover');
  });

});
