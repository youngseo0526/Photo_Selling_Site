FlowRouter.template('/ex_login_custom', 'ex_login_custom');

Template.ex_login_custom.onRendered(function() {
  // 화면 로드 시 스크린 사이즈 전체를 활용하기 위한 설정
  $('html').css('height', '100%');
  $('body').css('height', '100%');
  $('#__blaze-root').css('height', '100%');
});

Template.ex_login_custom.onDestroyed(function() {
  // 화면 이동 시 스크린 사이즈 전체를 활용을 해제 하기 위한 설정
  $('html').css('height', '');
  $('body').css('height', '');
  $('#__blaze-root').css('height', '');
});

Template.ex_login_custom.helpers({
  email: function() {
    return Meteor.user().emails[0].address; //화면에 사용자의 이메일을 전달
  },
  isSignUpMode: function() {
    return Session.get('isSignUpMode'); // false : 로그인 true : 정보 받는 창
  },
  userInfo: function() {
    return Meteor.user();
  }
});

Template.ex_login_custom.events({

  // 로그인하기 버튼
  'click #btn-signIn': function() {
    var email = $('#inp-email').val();
    var password = $('#inp-password').val();
    DB_PIC.insert({
      tags: ['야경', '바다', '수상스포츠']
    })
    Meteor.loginWithPassword(email, password, function(err) { //로그 오류 발생 시 처리 콜백 함수
      if (err) {
        alert(err);
      }
      else {
        alert('로그인 되었습니다.');
        // 여기에 바로 홈화면으로 넘어가게 할 수는 없을까?
      }
    });
  }, // 이 상태 끝나면 사이트에서는 로그인 한 상태로 유지 가능

  'click #btn-logout': function() {
    // Meteor.logout(); // 이게 로그아웃이다~~~~~~~
    alert("로그아웃 되었습니다.");
  },

  // 회원가입하기 버튼 누르면 isSingUPMode가 true가 되서 get isSignUpMode를 html에 넘겨주나봄
  'click #btn-signUpMode': function() {
    Session.set('isSignUpMode', true);  //회원 가입 모드 On
  },
  // 뒤로가기 버튼 : 회원가입 탈출
  'click #btn-back': function() {
    Session.set('isSignUpMode', false); //회원 가입 모드 Off
  },

  'click #btn-ex_carousel': function() {
    Session.set('isSignUpMode', false); //회원 가입 모드 Off
  },

  // 회원가입하기 버튼 : DB로 넘어갈 듯
  'click #btn-signUp': function() {
    // var file = $('#inp-file').prop('files')[0];   // 화면에서 선택 된 파일 가져오기 // 이게 사진인듯
    // var file_id = DB_FILES.insertFile(file);
    //사용자 입력 정보 저장
    var email = $('#inp-email').val();
    var password = $('#inp-password').val();
    var passwordConfirm = $('#inp-passwordConfirm').val();
    var cash = 0;

    if(password == passwordConfirm) { // 비밀번호와 확인이 동일하게 입력 되었는지 확인
      Accounts.createUser({ //사용자 생성 함수 
        email: email,
        password: password, // 여기에 다른 정보도 추가할 수 있다는 거임!!~~~~~~~~~~~~
        profile: { // 여기에 다 넣을수 잇
          // mypage 정보에 필요한 정보들
          profile_picture: 'default',
          name: 'user',
          introduce: 'Hello World!',
          cash: 100,
          cart: [],
          my_pic: [] // 구매내역DB
        },
      }, function(err) { //사용자 생성 오류 시 처리 콜백 함수
        if (err) {
          alert(err);
        }
      });
    }
    else {
      alert('비밀번호가 일치하지 않습니다. 다시 확인 해 주세요.');
    }
  },
  
  // 정보수정하는 버튼
  'click #btn-update-profile': function() {
    var userInfo = Meteor.user();
    // var profile_picture = $('#inp-name').val(); // html 에서는 이미지 첨부파일을 받아야함
    // var nickname = $('#inp-address').val();
    // var introduce = $('#inp-mobile').val();

    // 그냥 Meteor.users는 DB라고 생각하면 됨
    Meteor.users.update({_id: userInfo._id}, { // 아마 이거 현재 잔액 계산 할때 update 쓰일 수 있음
      $set: { // 기존에 있는거는 유지하기 위해서 $set을 사용하는 것임!!
        'profile.name': name,
        'profile.address': address,
        'profile.mobile': mobile
      }
    });

    // DB_EMAIL에도 수정가능하게 하면 됨.

    alert('사용자 프로파일을 수정 하였습니다.');
  }
});
