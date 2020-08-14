FlowRouter.template('/exp_mypage', 'exp_mypage');

Template.exp_mypage.onRendered(function() {
});

Template.exp_mypage.helpers({
  boards: function() {
    return Meteor.users.findAll();
  },
  link: function() {
    return Meteor.user().profile.profile_picture;
  },
  name: function() {
    return Meteor.user().profile.name;
  },
  title: function() {
    return Meteor.user().profile.introduce;
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

Template.exp_mypage.events({ // 일단 삭제버튼 없애야함. 4번째
  'click #btn-remove': function() {
    if(confirm('삭제 하시겠습니까?')) {
      DB_POSTS.remove({_id: this._id});
      alert('삭제 되었습니다.');
    }
  }
});