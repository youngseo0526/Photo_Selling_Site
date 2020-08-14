FlowRouter.template('/ex_cart','ex_cart'); // 아이디 붙어야 되나...? 메테오 불러올꺼니까 안해도 될 듯

Template.ex_cart.onRendered(function() {
  Session.set('sum', 0); // 장바구니에 있는 사진들 가격 합 구할 수 있게 해주는 세션
  Session.set('init_cart_session', []); // checkbox와 연관해서 쓰는 세션, 배열을 선택하는 세션
  Session.set('init_remove_arr', []); // "전체 장바구니 배열"이라고 보면 된다!!
  Session.set('cart_number', 0);
});

// 아이디어 //
// init_cart_session은 "checkbox 누른 사진 가격들의 총합을 구할 수 있게" 만들어 놓은 세션

Template.ex_cart.helpers({
  cart: function() { // 장바구니 불러오기
    // Session.set('init_remove_arr', Meteor.user().profile.cart); // 장바구니에 모든 장바구니 원소들 추가
    // console.log("1", Meteor.user())
    return Meteor.user()?.profile.cart; // 장바구니 정보 가져오고... 거기에 이제 가져온 정보(장바구니)의 정보(장바구니 내 요소)를 가져와야 함
    
  },

  incart: function() { // 장바구니 내 각각의 요소들 하나씩 짚어가기
    var userInfo = Meteor.user()?.profile; // 유저정보 불러오고 
    // console.log(userInfo?.profile?.cart)
    // console.log("2",Meteor.user())
    // console.log(DB_PIC.find().count())
    // console.log(this)
    var _id = this+'' // '' 안 붙이면 String 객체 & 붙이면 String 형식!!
    // console.log(DB_PIC.findOne({_id: _id}))
    return DB_PIC.findOne({_id: _id}); // cart는 배열로 저장되어 있으므로, 인덱스를 0부터 늘려가면서 각각 요소들의 정보를 전부 뽑아오기 
  },

  link: function() {
    return DB_FILES.findOne({_id: this.file_id}).link(); // 사진 링크 불러오기.
  },

  // cart_number: function(){ // 장바구니 순서
  //   var b = Session.get('cart_number');
  //   Session.set('cart_number', b+1);
  //   return Session.get('cart_number');
  // },

  sum: function() { // checkbox 선택한 것들의 합을 return 하는 함수
    return Session.get('sum');
  },
});

Template.ex_cart.events({
  'click #input_check': function(evt) {
    if ( $(evt.target).prop('checked') ) {  // 뜻 : 누른 이벤트의 체크박스 상태가 'checked' 되어 있을 때 즉, 값이 1이라고 보면 돼     

      // 체크 한 상태일때는 Session 배열에 추가!!
      var update_cart_session = Session.get('init_cart_session');
      update_cart_session.push($(evt.target).attr('value1')); // value1에는 id를 저장해 두었음
      Session.set('init_cart_session', update_cart_session);
      console.log(Session.get('init_cart_session'));

      // 체크 한 상태일때는 구매할거니까 즉, 장바구니 DB에서 나갈꺼니까 제거
      var update_remove_arr = Session.get('init_remove_arr');
      update_remove_arr.splice(update_remove_arr.indexOf($(evt.target).attr('value1')),1);
      Session.set('init_remove_arr', update_remove_arr);
      // console.log(Session.get('init_remove_arr'));
      
      // 선택한 사진들 가격 총합 구하기
      var cash = $(evt.target).attr('value2'); // value2에는 사진 가격을 저장해 두었음
      Session.set('sum', Session.get('sum') + parseInt(cash));

    } else {  // 뜻 : 누른 이벤트의 체크박스 상태가 'checked' 되어 있지 않을 때 즉, 값이 0이라고 보면 돼 
      
      // 체크 안한 상태일때는 Session 배열에서 삭제!!
      var update_cart_session = Session.get('init_cart_session');
      update_cart_session.splice(update_cart_session.indexOf($(evt.target).attr('value1')),1);
      Session.set('init_cart_session', update_cart_session);

      // 체크 안 한 상태일때는 아직 구매 안할꺼니까, 장바구니 DB에 남아 있어야겠지??
      var update_remove_arr = Session.get('init_remove_arr');
      update_remove_arr.push($(evt.target).attr('value1')); // 순서 섞이지만 딱히 상관은 없을 듯...
      Session.set('init_remove_arr', update_remove_arr);
      // console.log(Session.get('init_remove_arr'));

      // 선택 안 한 사진들의 가격은 총합에서 빼야 되겠지??
      var cash = $(evt.target).attr('value2');
      Session.set('sum', Session.get('sum') - parseInt(cash));

    }
  },

  'click #btn-buyincart': function() { // 이 코드 고쳐야 함!!
    var userInfo = Meteor.user(); // 사용자 정보 가져오기
    var initcartsession = Session.get('init_cart_session');
    
    Session.set('sum', 0);

    // 어차피 아무것도 안넣어도 구매내역 DB에 안 들어갈거임
    if(Session.get('init_cart_session').length <= 0) {
      alert('사진을 선택하십시오.');
    } else {
      Session.get('init_cart_session').forEach(function(_id) {
        userInfo.profile.cart = userInfo.profile.cart.filter(e => e !== _id) //여기에 포함 된 특정 값을 지우고 싶어.
      })
      Meteor.users.update({_id: userInfo._id}, {
        $set: {
          'profile.cart': userInfo.profile.cart
        }
      })
  
      for(var i = 0; i < initcartsession.length; i++) {
        Meteor.users.update({_id: userInfo._id}, {
          $push: { 
            'profile.my_pic': Session.get('init_cart_session')[i]
          }
        });
      }
      alert('구매를 완료하였습니다.');
    }
  },
  
  
});
