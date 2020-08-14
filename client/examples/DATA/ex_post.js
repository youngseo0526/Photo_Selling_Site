FlowRouter.template('/ex_post/:_id', 'ex_post');

Template.ex_post.onCreated(function() {
  var _id = FlowRouter.getParam('_id')
  DB_POSTS.update({_id: _id}, {
    $inc: {readCount: 1}  //조회수 1 증가 업데이트
  });
});

Template.ex_post.helpers({
  board: function() {
    var _id = FlowRouter.getParam('_id')
    return DB_POSTS.findOne({_id: _id});
  },
  createdAt: function() {
    return this.createdAt.toStringYMDHMS();
  },
  link: function() { // 얘가 여기 있어야해?
    // 저장 된 이미지 링크를 반환
    return DB_FILES.findOne({_id: this.file_id}).link();
  }
});