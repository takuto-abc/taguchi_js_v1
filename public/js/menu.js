$(document).ready(function() {
    // 初期表示設定
    updateMenuDisplay();

    // 画面リサイズ時の表示設定
    $(window).resize(function() {
        updateMenuDisplay();
    });

    // メニューボタンクリック時の処理
    $('#menu-button').click(function() {
        $('#nav-menu').toggleClass('active');
        $('#nav-menu').slideToggle();  // メニューの表示/非表示をスライドで切り替える
    });


    $(document).ready(function(){
        $('.navbar-toggle').click(function(){
            $('#nav-menu').toggle();  // メニューの表示・非表示を切り替え
        });
    });
 
    
    function updateMenuDisplay() {
        if ($(window).width() < 768) {
            // 768px未満の場合はメニューボタンを表示し、ナビゲーションメニューを非表示にする
            $('#menu-button').show();
            $('#nav-menu').hide();
        } else {
            // 768px以上の場合はメニューボタンを非表示にし、ナビゲーションメニューを表示する
            $('#menu-button').hide();
            $('#nav-menu').show();
        }
    }
});
