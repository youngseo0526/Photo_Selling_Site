FlowRouter.template('/ex_modalpicture/:_id', 'ex_modalpicture');

Template.ex_modalpicture.onCreated(function() {
  var _id = FlowRouter.getParam('_id')
  Session.set('cart', []); // 장바구니 세션
  Session.set('picture_price', 0); // 구매하기 버튼 눌렀을 때 사용할 사진 가격 불러오는 세션
});

Template.ex_modalpicture.helpers({
  board: function() { // 사진 정보 불러오기
    var _id = FlowRouter.getParam('_id')
    Session.set('picture_price', DB_PIC.findOne({_id: _id}).price); // 사진 가격 미리 세션에 저장
    return DB_PIC.findOne({_id: _id}); // DB_PIC에 올린 사진 정보를 불러오는 역할.
  },

  link: function() {
    return DB_FILES.findOne({_id: this.file_id}).link(); // 사진 링크 불러오기.
  },

  currentcash: function() { // 현재 내가 가지고 있는 cash를 Integer 형식으로 불러오는 역할
    return parseInt(Meteor.user().profile.cash);
  }
});

Template.ex_modalpicture.events({
  
  // 장바구니에 담기 버튼
  'click #btn-cart': function() { 
    var userInfo = Meteor.user(); // 사용자 정보 가져오기
    
    // 장바구니 세션에 선택한 사진 id를 배열로 저장
    var cart_update = Session.get('cart');
    cart_update.push(this._id);
    Session.set('cart', cart_update);

    var arraycart = Meteor.user().profile.cart;

    // Meteor.user().profile.cart.forEach(function(_id) {
    //   console.log(Session.get('cart')[0])
    //   if(Session.get('cart')[0] === _id){
    //     console.log("중복됨");
    //     return false;
    //   } else {
    //     console.log("중복안됨")
    //   }
    //   return false;
    // })

    var flag = false;

    for(var i=0; i < arraycart.length ; i++) {
        if(Session.get('cart')[0] === Meteor.user().profile.cart[i]){
          // console.log("중복됨");
          flag = true;
          break;
        } else {
          // console.log("중복안됨");
      }
    }
    // console.log(flag);

    if(flag) {
      alert("이미 장바구니에 담긴 사진입니다.");
    } else {
          // 장바구니 업데이트
      Meteor.users.update({_id: userInfo._id}, {
        $push: { 
          'profile.cart': this._id // _id를 배열에 하나씩 push
        }
      });
      alert('장바구니에 등록되었습니다.');
    }
  },

  // 구매하시겠습니까? 에서 나오는 구매하기 버튼
  'click #btn-buyinmodal': function() {
    var userInfo = Meteor.user(); // 사용자 정보 가져오기

    var currentmoney = Meteor.user().profile.cash; // 사용자 돈
    var picturemoney = Session.get('picture_price'); // 사진 가격

    if(parseInt(currentmoney) < parseInt(picturemoney)) { // 잔액이 부족할 때 (사용자 돈 < 사진 가격)
      alert("현재 잔액이 부족하여 캐시 충전으로 이동합니다."); 
      document.location.href="/ex_cashcharge"; // alert 알림에서 확인을 누르면 캐시 충전으로 이동할 수 있음
    } else {
      Meteor.users.update({_id: userInfo._id}, {
        $set: { // 여기는 기존 상태 유지하면서 profile.cash의 값만 바꾸는거니까 $set 사용
          'profile.cash': parseInt(currentmoney) - parseInt(picturemoney) // parseInt()를 통해서 Integer로 변환해주어야 함!!
        }
      });
      Meteor.users.update({_id: userInfo._id}, {
        $push: { 
          'profile.my_pic': this._id // _id를 배열에 하나씩 push
        }
      });
      alert("구매가 완료되었습니다.");
    }

    // 자동으로 창 닫아지는 것처럼 보여짐
    var modal = document.getElementById('myModal');
    modal.style.display = "none";
  },

  'click #btn-buy': function(evt) {
    // 구매하기 버튼을 누르면 modal 창을 띄워줌
    var modal = document.getElementById('myModal');
    modal.style.display = "block";
  },

  'click #myclose': function() {
    var modal = document.getElementById('myModal');
    modal.style.display = "none";
  },
});