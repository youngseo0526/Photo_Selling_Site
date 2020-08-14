FlowRouter.template('/ex_viewpicture/:_id', 'ex_viewpicture');

Template.ex_viewpicture.onCreated(function() {
  var _id = FlowRouter.getParam('_id')
});

Template.ex_viewpicture.helpers({
  board: function() {
    var _id = FlowRouter.getParam('_id')
    return DB_PIC.findOne({_id: _id}); // DB_PIC에 올린 사진 정보를 불러오는 역할.
  },
  link: function() {
    return DB_FILES.findOne({_id: this.file_id}).link(); // 사진 링크 불러오기.
  },
  // userInfomation: function() {
  //   var _id = FlowRouter.getParam('_id');
  //   var info = DB_PIC.findOne({_id: _id}).userInfo; // userInfo 앞은 사진을 선택했다는 의미. 선택한 사진 사용자 아이디
  //   return Meteor.users.findOne({_id: info}).emails[0].address; // 현재 로그인 된 것만 가져올 수 있네...
  //   // return db.getCollection('users').find({_id: info}).emails[0].address;
  //   // return info;
  // }
});