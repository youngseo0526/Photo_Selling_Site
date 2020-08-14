FlowRouter.template('/ex_mypagepl2/:_id', 'ex_mypagepl2');

Template.ex_mypagepl2.helpers({
    mypagepic: function() { // 장바구니 불러오기
        // Session.set('init_remove_arr', Meteor.user().profile.cart); // 장바구니에 모든 장바구니 원소들 추가
        // console.log("1", Meteor.user())
        return Meteor.user().profile.my_pic; // 장바구니 정보 가져오고... 거기에 이제 가져온 정보(장바구니)의 정보(장바구니 내 요소)를 가져와야 함
        
      },
    
      inpic: function() { // 장바구니 내 각각의 요소들 하나씩 짚어가기
        var userInfo = Meteor.user()?.profile; // 유저정보 불러오고 
        var _id = this+'' // '' 안 붙이면 String 객체 & 붙이면 String 형식!!
        // console.log(DB_PIC.findOne({_id: _id}))
        return DB_PIC.findOne({_id: _id}); // cart는 배열로 저장되어 있으므로, 인덱스를 0부터 늘려가면서 각각 요소들의 정보를 전부 뽑아오기 
      },
    
      link: function() {
        return DB_FILES.findOne({_id: this.file_id}).link(); // 사진 링크 불러오기.
      },
});
