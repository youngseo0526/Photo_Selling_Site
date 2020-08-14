FlowRouter.template('/ex_mypagepl/:_id', 'ex_mypagepl');

Template.ex_mypagepl.helpers({
  board: function() {
    var _id = FlowRouter.getParam('_id')
    return Meteor.users.findOne({_id: _id}); // users랑 user()의 차이점?
      },
  link: function() {
  return DB_FILES.findOne({_id: this.file_id}).link(); // 사진 링크 불러오기.
    },
  link_id: function() { // 상세보기 버튼 눌렀을 때, 선택한 사진의 id를 반환하도록 하였음. click #mybtn 46번째 줄 참고!!
    return Session.get('link_id'); 
},
pic: function() { 
    // Session.set('init_remove_arr', Meteor.user().profile.cart); // 장바구니에 모든 장바구니 원소들 추가
    // console.log("1", Meteor.user())
    return DB_PIC.findAll({userID: Meteor.userId()})
    // return Meteor.user().profile.cart; // 장바구니 정보 가져오고... 거기에 이제 가져온 정보(장바구니)의 정보(장바구니 내 요소)를 가져와야 함
    
  },
  post: function() { 
    var userInfo = Meteor.user().profile; // 유저정보 불러오고 
    // console.log(userInfo?.profile?.cart)
    // console.log("2",Meteor.user())
    // console.log(DB_PIC.find().count())
    console.log(this)
    console.log(this._id)
    var _id = this+'' // '' 안 붙이면 String 객체 & 붙이면 String 형식!!
    console.log(DB_PIC.findAll({userID: Meteor.userId()}))
    return DB_PIC.findOne({_id: this._id}); // cart는 배열로 저장되어 있으므로, 인덱스를 0부터 늘려가면서 각각 요소들의 정보를 전부 뽑아오기 
  }
});
