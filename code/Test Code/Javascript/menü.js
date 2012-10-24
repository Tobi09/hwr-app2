
    var navigationInitialized = ' ';
    var menuOpen = ' ';

    $(document).on("pagebeforeshow", "#page1", function(){
      if( navigationInitialized == 'X'){
        var newItems = '<li data-role="list-divider">Page Options</li>';
        newItems += '<li><a href="#" class="time">Time</a></li>';
        $(".pageOpts").empty();
        $(".pageOpts").append(newItems).listview("refresh");
      }
    });

    $(document).on("pagebeforeshow", "#page2", function(){
      if( navigationInitialized == 'X'){
        var newItems = '<li data-role="list-divider">Page Options</li>';
        newItems += '<li><a href="#" class="add">Add Item</a></li>';
        newItems += '<li><a href="#" class="empty">Clear List</a></li>';
        $(".pageOpts").empty();
        $(".pageOpts").append(newItems).listview("refresh");
      }
    });

    $(document).on("pagebeforeshow", "#page3", function(){
      if( navigationInitialized == 'X'){
        var newItems = '<li data-role="list-divider">Page Options</li>';
        newItems += '<li><a href="#" class="show1">List 1</a></li>';
        newItems += '<li><a href="#" class="show2">List 2</a></li>';
        newItems += '<li><a href="#" class="show3">List 3</a></li>';
        $(".pageOpts").empty();
        $(".pageOpts").append(newItems).listview("refresh");
      }
    });

    $(document).on("pageinit", "#page1", function(){
      navigationInitialized = 'X';
      var scrollX = 0;
      var scrollY = 0;
      var pagePosition = 0;
      var counter = 1;
      var percent = .25;
      var scrollPrevented = false;

      if(navigator.userAgent.match(/Android/i) ||
         navigator.userAgent.match(/webOS/i)   ||
         navigator.userAgent.match(/iPhone/i)  ||
         navigator.userAgent.match(/iPod/i)    ||
         navigator.userAgent.match(/BlackBerry/i)
         ){
          percent = .5;
         }

      initializeMenu();

      $(document).on('orientationchange', function(){
        if(menuOpen == 'X'){
          pagePosition = $(window).width() * percent;
        }
        initializeMenu();
      });

      $(document).on('vmousedown', ".body", function(event){
        var startPosition = pagePosition;
        $(document).on('vmousemove', ".body", function(event2){
          scrollX = event2.pageX;
          scrollY = event2.pageY;
          $("#test").val(scrollX);
          $("#test2").val(scrollY);
          $("#start").val(event.pageX + ", " + event.pageY);
          pagePosition = startPosition + scrollX - event.pageX;
          if( Math.abs(pagePosition - startPosition) > 30){
            if(scrollPrevented != true){
              $('body').bind('touchmove', function (ev) {
                ev.preventDefault();
              });
              scrollPrevented = true;
            }
            $('#menu').css({
              'z-index': '-1'
            });
            if( pagePosition > $(window).width() * percent){
              pagePosition = $(window).width() * percent;
            } else if(pagePosition < 0){
              pagePosition = 0;
            }
            menuSlide();
            $("#menu").show();
          }
        });
      });

      $(document).on('vmouseup', ".body", function(){
        if(scrollPrevented == true){
          $('body').unbind('touchmove');
          scrollPrevented = false;
        }
        $(document).off('vmousemove', ".body", stopScroll());
      });

      $(document).on("click", ".menu", function(){
        if( menuOpen == ' ' ){
          pagePosition = $(window).width() * percent;
          menuOpen = 'X';
        } else {
          pagePosition = 0;
          menuOpen = ' ';
        }
        menuSlide();
        $("#menu").toggle();
      });

      $(document).on("click", ".add", function(){
        counter = counter + 1;
        var newItem = '<li>Test Item ' + counter + '</li>';
        $(".log").append(newItem).listview('refresh');
      });

      $(document).on("click", ".empty", function(){
        $(".log").empty().listview('refresh');
        counter = 0;
      });

      $(document).on("click", ".time", function(){
        var currentTime = new Date();
        var hours = currentTime.getHours();
        var minutes = currentTime.getMinutes();
        var seconds = currentTime.getSeconds();
        var suffix;
        if( hours > 12 ){
          hours = hours - 12;
          suffix = 'PM';
        } else {
          suffix = 'AM';
        }
        if( minutes < 10 ){
          minutes = '0' + minutes;
        }
        var clock = hours + ':' + minutes + ':' + seconds + ' ' + suffix;

        alert(clock);
      });

      function stopScroll(){

        $("#test").val('0');
        $("#test2").val('0');
        $("#start").val('0');

        var setValue = $(window).width() * (percent / 2);
        if( pagePosition >= setValue){
          pagePosition = $(window).width() * percent;
          menuOpen = 'X';
          menuSlide();
          $("#menu").show();
          $('#menu').css({
            'z-index': '1500'
          });
        } else {
          pagePosition = 0;
          menuOpen = ' ';
          menuSlide();
          $("#menu").hide();
        }

      }

      function setMenuHeight(){

        $('#menu').css({
          width:  $(window).width() * percent,
          height: $(window).height(),
        }).page();

      }

      function menuToggle(){
        if(menuOpen == ' '){
          var newWidth = $(window).width();
        } else {
          var newWidth = $(window).width() * (1 - percent);
        }
        $("#page1").css({
          left: pagePosition,
          width: newWidth
        }).page();

        $("#page2").css({
          left: pagePosition,
          width: newWidth
        }).page();

        $("#page3").css({
          left: pagePosition,
          width: newWidth
        }).page();
      }

      function menuSlide(){
        var newWidth = $(window).width() - pagePosition;
        $("#page1").css({
          left: pagePosition,
          width: newWidth,
        }).page();

        $("#page2").css({
          left: pagePosition,
          width: newWidth
        }).page();

        $("#page3").css({
          left: pagePosition,
          width: newWidth
        }).page();

      }

      function initializeMenu(){
        $('#menu').css({
          position: "absolute",
          width:  $(window).width() * percent,
          height: $(window).height(),
          left: 0,
          'z-index': '-1'
        }).page();

        menuToggle();
      }
    });

    $(document).on("pageinit", function(){
      setTimeout(function(){
        if( navigationInitialized != 'X' ){
          alert("Redirecting to first page");
          $.mobile.changePage("#page1");
          location.reload(true);
        }
      },500);
    });

    $(document).on("click", ".show1", function(){
      $("#div1").show();
      $("#div2").hide();
      $("#div3").hide();
    });

    $(document).on("click", ".show2", function(){
      $("#div2").show();
      $("#div1").hide();
      $("#div3").hide();
    });

    $(document).on("click", ".show3", function(){
      $("#div3").show();
      $("#div1").hide();
      $("#div2").hide();
    });

