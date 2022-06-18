
/**
1.Render songs -- ok
2.Scroll top --ok
3.Play-pause-seek -- OK
4.Progress (Thanh tiến độ bài hát) -- ok
4.CD rotate -- ok
5.Next/prev -- ok
6.Random -- ok
7.Next / repeat when ended --OK
8.Active songs -- OK
9.in to views --    OK
10.listen to click on song list--   OK

**/

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const heading = $(".header h2");
const CD_img = $(".CD_img");
const audio = $('#audio');

const playlist = $('.playlist'); 
const btn_toggle_play = $('.btn-toggle-play'); 
const CD = $('.CD');
const CD_Width = CD_img.offsetWidth ;
const progress = $("#progress");
const btn__redo = $(".btn-repeat");
const btn__random = $(".btn-random");
const btn__next = $(".btn-next");
const btn__prev = $(".btn-prev");


const app = {
    isPlaying: false,
    currentIndex: 0,
    isRedo:false,
    isRandom:false,
    songs: [

        {
            name: "Lỡ Duyên",
            singer: "Rum ft. Nit x Dứa",
            path: "./accets/Music_List/LoDuyen-TienToi-7204783.mp3",
            image: "https://avatar-ex-swe.nixcdn.com/song/2022/05/08/9/8/a/c/1651972474622_500.jpg"
        },

        {
            name: "Đừng xin lỗi nữa",
            singer: "Min x Erik",
            path: "./accets/Music_List/DungXinLoiNuaDontSaySorry-ERIKMIN-5355218.mp3",
            image: "https://avatar-ex-swe.nixcdn.com/singer/avatar/2022/03/22/2/2/c/b/1647920572265.jpg"
        },

        {
            name: "Yêu đương khó quá thì chạy về khóc với anh",
            singer: "Erik",
            path: "./accets/Music_List/YeuDuongKhoQuaThiChayVeKhocVoiAnhAcousticVersion-ERIK-7187246.mp3",
            image: "https://avatar-ex-swe.nixcdn.com/playlist/2022/06/15/6/0/4/9/1655275564112_500.jpg"
        },

        {
            name: "Vì mẹ anh bắt chia tay",
            singer: "Karik x Miu Lê",
            path: "./accets/Music_List/ViMeAnhBatChiaTay-MiuLeKarikChauDangKhoa-7479220.mp3",
            image: "https://avatar-ex-swe.nixcdn.com/song/2022/06/14/9/6/4/c/1655187824693_500.jpg"
        },

        {
            name: "I know",
            singer: "Edward Duong Nguyen x Mr.A",
            path: "./accets/Music_List/IKnow-EdwardDuongNguyenMrA-5354580.mp3",
            image: "https://avatar-ex-swe.nixcdn.com/singer/avatar/2018/01/18/f/d/8/e/1516264746110.jpg"
        },

        {
            name: "Hôm nay tôi buồn",
            singer: "Phùng Khánh Linh",
            path: "./accets/Music_List/HomNayToiBuon-PhungKhanhLinh-5383740.mp3",
            image: "https://avatar-ex-swe.nixcdn.com/singer/avatar/2020/07/28/a/7/b/7/1595920032430.jpg"
        },

        {
            name: "Như ngày hôm qua",
            singer: "Xếp Tùng MT-P",
            path: "./accets/Music_List/NhuNgayHomQuaUpgrade-SonTungMTP-4282962.mp3",
            image: "https://avatar-ex-swe.nixcdn.com/song/2018/05/05/d/2/4/a/1525507567109_500.jpg"
        },

        {
            name: "Thương em",
            singer: "Châu Khải Phong x ACV",
            path: "./accets/Music_List/Thuong-Em-Chau-Khai-Phong-ACV.mp3",
            image: "https://avatar-ex-swe.nixcdn.com/song/2022/06/01/4/b/6/9/1654097962439_500.jpg"
        },

        {
            name: "Thấc giấc",
            singer: "Da LAB",
            path: "./accets/Music_List/ThucGiac-DaLAB-7048212.mp3",
            image: "https://avatar-ex-swe.nixcdn.com/song/2021/07/14/8/c/f/9/1626231010810_500.jpg"
        },

        {
            name: "Chạy về nơi phía anh",
            singer: "Khắc Việt",
            path: "./accets/Music_List/ChayVeNoiPhiaAnh-KhacViet-7129688.mp3",
            image: "https://avatar-ex-swe.nixcdn.com/song/2022/02/10/2/a/7/7/1644475457323_500.jpg"
        },

        {
            name: "Có hẹn với thanh xuân",
            singer: "MONSTAR",
            path: "./accets/Music_List/cohenvoithanhxuan-MONSTAR-7050201.mp3",
            image: "https://avatar-ex-swe.nixcdn.com/song/2021/07/16/f/4/9/8/1626425507034_500.jpg"
        },

        {
            name: "Yêu em hơn mỗi ngày",
            singer: "Andiez",
            path: "./accets/Music_List/YeuEmHonMoiNgay-Andiez-7136374.mp3",
            image: "https://avatar-ex-swe.nixcdn.com/song/2022/03/11/1/a/0/3/1647001991460_500.jpg"
        },
    ],
    // In danh sách bài hát
    render: function(){
        const htmls = app.songs.map(function(song,index){
            return `
            <div class="song ${index === Number(app.currentIndex) ? 'active' : ''}" data-index="${index}">
                <div class="thumb" style="background-image: url('${song.image}')">
                </div>
                <div class="body">
                    <h3 class="title">${song.name}</h3>
                    <p class="author">${song.singer}</p>
                </div>
                <div class="option">
                    <i class="fas fa-ellipsis-h"></i>
                </div>
            </div>
            `;
        });
        playlist.innerHTML = htmls.join("");
         //Load active song in to views
         app.activeSongInToView();
    },


    // Định nghĩa các thuộc tính của Object
    defineProperties: function() {
        Object.defineProperty(app, "currentSong", {
            get: function() {
                return app.songs[app.currentIndex];
            }
        });     
    },

    
    // Xử lý sự kiện 
    handleEvent: function(){

        // Xử lý CD quay / dừng
        // Handle CD spins / stops
        const cdThumbAnimate = CD_img.animate([{
            transform: "rotate(360deg)"
        }],{
            duration: 15000,
            iterations : Infinity
        });
        cdThumbAnimate.pause();

        btn_Playing_onclick= function() {
            if (app.isPlaying) {
                audio.pause();
                cdThumbAnimate.pause();
                $(".play_active").classList.remove("play_active");
                $(".fa-play").classList.add("play_active");
    
              } else {
                audio.play();
                cdThumbAnimate.play();
                $(".play_active").classList.remove("play_active");
                $(".fa-pause").classList.add("play_active");
              }
        },


        //Xử lý click play / pause

        btn_toggle_play.onclick = function () {
           btn_Playing_onclick();
          };

        //   xử lý thanh tiến độ bài hát
          audio.ontimeupdate = function(){
           
            if(audio.duration){
                const progressPercent = (audio.currentTime / audio.duration * 100).toFixed();
                progress.value = progressPercent;
            };
            
          };

          audio.onplay = function () {
            app.isPlaying = true;
          };
          audio.onpause = function () {
            app.isPlaying = false;
          };

          //   Xử lý khi tua bài hát
          progress.oninput = function (e) {
            audio.currentTime = (e.target.value / 100 * audio.duration).toFixed();
          };


        //   Xử lý Scroll
        document.onscroll = function () {
            
            const newWidth = window.scrollY || document.documentElement.scrollTop;
            if(CD_Width - newWidth <= 0){
                CD_img.style.width = 0;
                CD_img.style.opacity = 0;
            }else{
                CD_img.style.width = CD_Width - newWidth + 'px';
                CD_img.style.opacity = 1- (newWidth / CD_Width);
            }
          };
        

        //   Khi click nút redo và nút random
        btn__redo.onclick = function(){
            btn__redo.classList.toggle("active");
            const redoActive = $(".btn-repeat.active");
            if (redoActive){
                app.isRedo = true;
            }else{
                app.isRedo = false;
            }
        };
        btn__random.onclick = function(){
            btn__random.classList.toggle("active");
            const radomActive = $(".btn-random.active");
            if (radomActive){
                app.isRandom = true;
            }else{
                app.isRandom = false;
            }
        };
        
        // Khi click nút next
        btn__next.onclick = function(){
            if (app.isRandom){
                app.playingRandom();
                cdThumbAnimate.play();
            }else{
                app.playingInOrder();
                cdThumbAnimate.play();//Đĩa quay
            }
        };
        // Khi click prev
        btn__prev.onclick = function(){
            app.currentIndex--;
                if(app.currentIndex < 0){
                    app.currentIndex = app.songs.length - 1;
                }
                app.playMusic();
        };

        // Khi audio Ended
        // Khi redo on
        audio.onended = function(){
            if(app.isRedo){
                audio.play();
            }else{
                if(app.isRandom){  
                    app.playingRandom();
                }else{
                    app.playingInOrder();
                }
            }
        };

        // Bắt sự kiện click on list songs
        playlist.onclick = function(e){
            if(e.target.closest('.song') !== $('.song.active')){
                app.currentIndex = Number(e.target.closest('.song').getAttribute('data-index')) ;
                app.playMusic();
                cdThumbAnimate.play();
            }
        };

    },
    // Kết thúc handleEvent

    // Phát theo thứ tự danh sách bài hát
    playingInOrder: function(){
        app.currentIndex++;
        if(app.currentIndex >= app.songs.length){
            app.currentIndex = 0;
        }
        app.playMusic();
    },

    // load random song
    playingRandom: function(){
         let newCurrentIndex;
         do{
             newCurrentIndex = (Math.random() * (app.songs.length - 1)).toFixed();
         }while(newCurrentIndex === app.currentIndex);
        app.currentIndex = newCurrentIndex;    
        app.playMusic();
    },

    //   Tải thông tin bài hát đầu tiên khi chạy app
    loadCurrentSong: function(){
        heading.textContent = app.currentSong.name;
        CD_img.src = `${app.currentSong.image}`;
        audio.src = `${app.currentSong.path}`;
    },

    // active song in to views
    activeSongInToView : function(){
        const activeSong = $('.song.active');
        setTimeout(function(){
            activeSong.scrollIntoView({
                behavior: "smooth", 
                block: "end", 
                inline: "nearest"
            });
        },300);
    },

    playMusic: function(){
        app.loadCurrentSong();
        $(".play_active").classList.remove("play_active");
        $(".fa-pause").classList.add("play_active");
        audio.play();
        app.render();
    },

    
    // Hàm để chạy app
    start: function(){
        // Định nghĩa các thuộc tính cho Object
        app.defineProperties();

        //Tải thông tin bài hát đầu tiên khi chạy app
        app.loadCurrentSong();

        // render bài hát
        app.render(); 
        
        
        // Lắng nghe các sự kiện
        app.handleEvent();
        
    
    }

}


app.start();

