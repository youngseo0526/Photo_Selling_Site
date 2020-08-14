FlowRouter.template('/newex_posts', 'newex_posts');

Template.newex_posts.onRendered(function() {

});

Template.newex_posts.helpers({
  boards: function() {
    return DB_POSTS.findAll({}, {sort: {createdAt: -1}});
  },
  YMD: function() {
    return this.createdAt.toStringYMD();
  },
  HMS: function() {
    return this.createdAt.toStringHMS();
  },
  link: function() { // 얘가 여기 있어야해?
    // 저장 된 이미지 링크를 반환
    return DB_FILES.findOne({_id: this.file_id}).link();
  },
  post: function() {
    var _id = FlowRouter.getParam('_id');
    if(_id === 'newPosting') {
      return {};    //새글 작성일때는 화면에 비어있는 데이터를 제공.
    }

    Meteor.setTimeout(function() { //화면 에디터에 편집 모드를 초기화 하기 위한 트릭
      $('#editor').summernote('reset')
    });

    return DB_POSTS.findOne({_id: _id});
  }
});

Template.newex_posts.events({
  'click #btn-remove': function() {
    if(confirm('삭제 하시겠습니까?')) {
      DB_POSTS.remove({_id: this._id});
      alert('삭제 되었습니다.');
    }
  }
});