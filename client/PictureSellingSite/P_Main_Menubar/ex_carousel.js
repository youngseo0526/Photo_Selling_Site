FlowRouter.template('/', 'ex_carousel');

Template.ex_carousel.onRendered(function() {

    Session.set('tag', ''); // 태그 담는 역할. 처음에는 빈 태그로 초기화
    Session.set('picture_link', ''); // 상세보기 사진링크 담는 역할.
    Session.set('link_id', ''); // 상세보기 버튼 누르면 해당 id로 가게 만들었음.

});

var count = 0;

// "Session은 변수 공유" 줠라 중요
// 디버깅 할 때, 항상 Console 창 켜놓고 코딩하기 그리고 주석 쳐가면서 어디가 오류인지 항상 확인해보기

// 내가 실수했던 점 (핵심 : Session이랑 디버깅 연습)
// 1. events에서 받은 변수를 helpers에서 받을 생각을 하니까 잘 안됬음.
// 2. Session은 변수를 공유해주는 역할이어서 Session을 통해 events에 있는 변수를 helpers에서 사용할 수 있게 됨.
// 3. find에서 Session을 쓰는 이유는 tag라는 Session에 input 값을 받아놨기 때문에 사용할 수 있고, 그냥 input 값을 넣어버리면 변수 공유가 안 되기 때문에 Session을 사용해야 함.
// 4. html 코드에서 input 창을 감싸고 있는게 <form>이었는데 <form> 형식으로 받으니까 새로고침이 되고 받은 데이터가 다시 사라져버림. <form> 태그의 역할 자세히 다시 찾아보기

Template.ex_carousel.helpers({
    tags: function() {
        // return DB_PIC.find({tags: '야경'}).fetch(); // 이런 형식으로 들어가야 함!!
        return DB_PIC.find({tags: Session.get('tag')}).fetch(); // Session은 변수 공유 역할을 해준다!!
    },

    link: function() { // 사진 id 불러오는 역할
        return DB_FILES.findOne({_id: this.file_id}).link();
    },

    link_id: function() { // 상세보기 버튼 눌렀을 때, 선택한 사진의 id를 반환하도록 하였음. click #mybtn 46번째 줄 참고!!
        return Session.get('link_id'); 
    },
    
    modal_picture: function() { // modal 창에서 사진 불러오는 역할 이것 또한 click #mybtn 부분에서 세션으로 저장하였다
        return Session.get('picture_link');
    },
    // 결론 : Session은 변수 공유가 가능하게 해주므로, events에서 Session에 값을 저장하면 helpers에서도 사용할 수 있다!! 그래서 Session이 엄청 편한거야 개꿀
});

Template.ex_carousel.events({
    'keyup #inp-search': function(evt) {
        if(evt.which === 13){ // enter 키 ASCII 코드 번호 그리고 'evt'는 누르는 것을 의미해
            Session.set('tag', $('#inp-search').val()); // enter키가 눌려지면 실행되는 함수. tag라는 Session 값이 input값으로 set됨
        }
    },

    'click #mybtn': function(evt) {
        Session.set('link_id', this._id); // modalpicture.{{_id}} 로 가기 위한 세션 저장 (사진 상세보기 창으로 넘어가기 위해)
        Session.set('picture_link', $(evt.target).parent().attr('value')); // modal 팝업 창에서 사진 미리보기 가능하도록 세션 저장
        
        // modal 창 띄우기
        var modal = document.getElementById('myModal');
        var btn = document.getElementById("mybtn");
        modal.style.display = "block";
    },

      'click #myclose': function() {
        // modal 창 닫기
        var modal = document.getElementById('myModal');
        var span = document.getElementsByClassName("myclose"); 
        modal.style.display = "none";
    },
});